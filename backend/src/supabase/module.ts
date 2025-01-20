// src/supabase/module.ts
import { Module } from '@nestjs/common';
import { SupabaseService } from './service';

@Module({
    providers: [SupabaseService],
    exports: [SupabaseService]
})
export class SupabaseModule {}