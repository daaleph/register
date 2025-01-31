// backend/src/app.module.ts
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/module';
import { QuestionsModule } from './questions-options/module';
import { ResponsesModule } from './responses/module';
import { AbacusModule } from './abacus/module';
import { SupabaseModule } from './supabase/module';
import { SharedModule } from './shared/shared.module';
import { RateLimitGuard } from './guards/rateLimit';
import { CsrfMiddleware } from './middleware/csrf.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    ProfileModule,
    QuestionsModule,
    ResponsesModule,
    AbacusModule,
    SupabaseModule,
    SharedModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CsrfMiddleware).forRoutes('*'); // Apply CSRF middleware to all routes
  }
}
