// src/abacus/module.ts

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AbacusPersonalizationService } from './personalization.service';
import { AbacusContextService } from './context.service';

@Module({
  imports: [HttpModule],
  providers: [AbacusPersonalizationService, AbacusContextService],
  exports: [AbacusPersonalizationService],
})
export class AbacusModule {}
