// src/questions-options/questions.module.ts
import { Module } from '@nestjs/common';
import { ProfileResponsesModule } from './profile/module';
import { BfiResponsesModule } from './bfi/module';
import { ProductResponsesModule } from './product/module';


@Module({
  imports: [ 
    ProfileResponsesModule,
    BfiResponsesModule,
    ProductResponsesModule
  ],
  exports: [ 
    ProfileResponsesModule,
    BfiResponsesModule,
    ProductResponsesModule
  ]
})
export class ResponsesModule {}