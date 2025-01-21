import { Module } from '@nestjs/common';
import { CsfService } from './csf.service';
import { CsfController } from './csf.controller';

@Module({
  controllers: [CsfController],
  providers: [CsfService],
})
export class CsfModule {}
