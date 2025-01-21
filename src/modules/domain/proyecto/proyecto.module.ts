import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { NormalizeDenominacionPipe } from 'src/modules/common/pipes/normalize-denominacion.pipe';
import { ProyectoRepository } from './prisma-proyecto.repository';
import { ProyectoPersistenceService } from './proyecto.adapater.persistencia';
import { ClienteModule } from '../cliente/cliente.module';
import { UsuarioSistemaModule } from '../usuario-sistema/usuario-sistema.module';


@Module({
  controllers: [ProyectoController],
  providers: [
    ProyectoService,
    {
      provide: 'IProyectoRepository',
      useClass: ProyectoRepository,
    },
    NormalizeDenominacionPipe, 
    ProyectoPersistenceService ,
  ],
  imports: [ClienteModule,UsuarioSistemaModule,], // Importa el módulo correspondiente
  exports: [ProyectoService],
  
})  
export class ProyectoModule {}

