// src/abacus/module.ts

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AbacusPersonalizationService } from './personalization.service';
import { AbacusContextService } from './context.service';
import { ScheduleModule } from '@nestjs/schedule';
import { AbacusHealthCheckService } from './health.check.service';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot()],
  providers: [
    AbacusPersonalizationService,
    AbacusContextService,
    AbacusHealthCheckService
  ],
  exports: [AbacusPersonalizationService],
})
export class AbacusModule {}
