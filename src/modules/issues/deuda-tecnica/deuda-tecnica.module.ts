import { Module } from '@nestjs/common';
import { DeudaTecnicaService } from './deuda-tecnica.service';
import { DeudaTecnicaController } from './deuda-tecnica.controller';

@Module({
  controllers: [DeudaTecnicaController],
  providers: [DeudaTecnicaService],
})
export class DeudaTecnicaModule {}
