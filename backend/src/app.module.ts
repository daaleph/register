// src/app.module.ts

import { Module } from '@nestjs/common';
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
  providers: [AppService],
})
export class AppModule {}
