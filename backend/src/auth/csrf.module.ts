// backend/src/csrf/csrf.module.ts
import { Module } from '@nestjs/common';
import { CsrfService } from './csrf.service';

@Module({
  providers: [CsrfService],
  exports: [CsrfService],
})
export class CsrfModule {}