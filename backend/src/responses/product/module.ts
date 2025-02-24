// backend/src/responses/product/module.ts

import { Module } from '@nestjs/common';
import { ProductResponsesController } from './controller';
import { Service } from './service';
import { Repository } from '../../repositories/responses/product';
import { SupabaseModule } from 'src/supabase/module';

@Module({
  imports: [SupabaseModule],
  controllers: [ProductResponsesController],
  providers: [Service, Repository],
  exports: [Service],
})
export class ProductResponsesModule {}
