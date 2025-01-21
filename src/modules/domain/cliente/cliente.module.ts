import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { NormalizeDenominacionPipe } from 'src/modules/common/pipes/normalize-denominacion.pipe';
import { ClienteRepository } from './prisma-cliente.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientePersistenceService } from './cliente.adapater.persistencia';

@Module({
  imports: [PrismaModule],
  controllers: [ClienteController],
  providers: [
    ClienteService,
    {
      provide: 'IClienteRepository',
      useClass: ClienteRepository,
    },
    NormalizeDenominacionPipe,
    ClientePersistenceService,

  ],
  exports: [ClienteService],
})
export class ClienteModule {}
