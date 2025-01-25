// src/questions-options/product/module.ts
import { Module } from '@nestjs/common';
import { AbacusModule } from '../../abacus/module';
import { SupabaseModule } from 'src/supabase/module';
import { ProductQuestionsService } from './service';
import { ProductQuestionsRepository } from 'src/repositories/questions';
import { ProductQuestionsController } from './controller';

@Module({
  imports: [AbacusModule, SupabaseModule],
  controllers: [ProductQuestionsController],
  providers: [ProductQuestionsService, ProductQuestionsRepository],
  exports: [ProductQuestionsService]
})

export class ProductQuestionsModule {}