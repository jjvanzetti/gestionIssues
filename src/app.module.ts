import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './modules/domain/cliente/cliente.module';
import { ProyectoModule } from './modules/domain/proyecto/proyecto.module';
import { CsfModule } from './modules/domain/csf/csf.module';
import { IssuesModule } from './modules/issues/issues/issues.module';
import { TipoIssuesModule } from './modules/issues/tipo-issues/tipo-issues.module';
import { DeudaTecnicaModule } from './modules/issues/deuda-tecnica/deuda-tecnica.module';
import { UsuarioSistemaModule } from './modules/domain/usuario-sistema/usuario-sistema.module';
import { SeedModule } from './modules/seed/seed.module';


@Module({
  imports: [ClienteModule, ProyectoModule, CsfModule, IssuesModule, TipoIssuesModule, DeudaTecnicaModule, UsuarioSistemaModule, SeedModule],
  controllers: [AppController],
  providers: [AppService
    
  ],
})
export class AppModule {}
