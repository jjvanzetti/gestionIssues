import { Module } from '@nestjs/common';
import { UsuarioSistemaService } from './usuario-sistema.service';
import { UsuarioSistemaController } from './usuario-sistema.controller';
import { UsuarioSisteamaRepository } from './prisma-usuario-sistema.repository';
import { NormalizeDenominacionPipe } from 'src/modules/common/pipes/normalize-denominacion.pipe';
import { UsuarioSistemaPersistenceService } from './usuario-sistema.adapater.persistencia';

@Module({
  controllers: [UsuarioSistemaController],
  providers: [UsuarioSistemaService,
    {
      provide: 'IUsuarioSistemaRepository',
      useClass:  UsuarioSisteamaRepository,
    },
    NormalizeDenominacionPipe,
    UsuarioSistemaPersistenceService ,
  ],
  exports: [UsuarioSistemaService],
})
export class UsuarioSistemaModule {}
