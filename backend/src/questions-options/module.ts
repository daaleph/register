// src/questions-options/questions.module.ts
import { Module } from '@nestjs/common';
import { ProfileQuestionsModule } from './profile/module';
import { BfiQuestionsModule } from './bfi/module';
import { ProductQuestionsModule } from './product/module';
import { AbacusModule } from '../abacus/module';

@Module({
  imports: [
    ProfileQuestionsModule,
    BfiQuestionsModule,
    ProductQuestionsModule,
    AbacusModule,
  ],
  exports: [ProfileQuestionsModule, BfiQuestionsModule, ProductQuestionsModule],
})
export class QuestionsModule {}
