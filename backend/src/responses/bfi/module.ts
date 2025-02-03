// backend/src/responses/bfi/module.ts

import { Module } from '@nestjs/common';
import { BfiResponsesController } from './controller';
import { Service } from './service';
import { Repository } from '../../repositories/responses/bfi';
import { SupabaseModule } from 'src/supabase/module';

@Module({
  imports: [SupabaseModule],
  controllers: [BfiResponsesController],
  providers: [Service, Repository],
  exports: [Service],
})
export class BfiResponsesModule {}
