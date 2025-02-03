// backend/src/app.module.ts
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
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    ProfileModule,
    QuestionsModule,
    ResponsesModule,
    AbacusModule,
    SupabaseModule,
    SharedModule,
    AuthModule,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CsrfMiddleware)
      .exclude(
        { path: 'auth/csrf-token', method: RequestMethod.GET },
        { path: 'health', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
