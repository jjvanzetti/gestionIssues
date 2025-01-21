import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeedService {
  constructor(private readonly prisma: PrismaService) {}

  async executeSeed() {
    try {
      // Seed para Clientes
      const clientes = Array.from({ length: 10 }, (_, i) => ({
        denominacion: `2Cliente ${i + 1}`,
        createdAt: new Date(),
      }));

      await this.prisma.cliente.createMany({
        data: clientes,
      });

      // Seed para UsuarioProyecto
      const usuariosProyectos = Array.from({ length: 10 }, (_, i) => ({
        denominacion: `2UsuarioProyecto ${i + 1}`,
        createdAt: new Date(),
      }));

      await this.prisma.usuariosistema.createMany({
        data: usuariosProyectos,
      });

      // Seed para Proeycto
      const proyectos = Array.from({ length: 10 }, (_, i) => ({
        denominacion: `2Proyecto ${i + 1}`,
        createdAt: new Date(),
        clienteId:i+1,
      }));

      await this.prisma.proyecto.createMany({
        data: proyectos,
      });

      return {
        message: 'Seed ejecutado con éxito',
        clientesCount: clientes.length,
        usuariosProyectosCount: usuariosProyectos.length,
        proyectosCount: proyectos.length,
      };
    } catch (error) {
      throw new Error(`Error al ejecutar el seed: ${error.message}`);
    }
  }
}
