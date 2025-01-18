import { Module } from '@nestjs/common';
import { ProfileQuestionsModule } from './profile-questions/profile-questions.module';
import { BfiQuestionsModule } from './bfi-questions/bfi-questions.module';
import { ProductQuestionsModule } from './product-questions/product-questions.module';

@Module({
  imports: [ProfileQuestionsModule, BfiQuestionsModule, ProductQuestionsModule]
})
export class QuestionsModule {}
