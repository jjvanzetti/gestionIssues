import { Module } from '@nestjs/common';
import { TipoIssuesService } from './tipo-issues.service';
import { TipoIssuesController } from './tipo-issues.controller';

@Module({
  controllers: [TipoIssuesController],
  providers: [TipoIssuesService],
})
export class TipoIssuesModule {}
