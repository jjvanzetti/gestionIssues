import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Hace que el módulo esté disponible en toda la aplicación sin importar dónde se importe.
@Module({
  providers: [PrismaService], // Registra PrismaService como un proveedor.
  exports: [PrismaService],   // Permite que otros módulos usen PrismaService.
})
export class PrismaModule {}