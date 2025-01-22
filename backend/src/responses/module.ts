// src/questions-options/questions.module.ts
import { Module } from '@nestjs/common';
import { ProfileResponsesModule } from './profile/module';

@Module({
  imports: [ ProfileResponsesModule ],
  exports: [ ProfileResponsesModule ]
})
export class ResponsesModule {}