import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, usuariosistema, } from '@prisma/client';
import { DatabaseConnectionException } from 'src/modules/common/exceptions/database-connection.exception';
import { EntityConflictException } from 'src/modules/common/exceptions/entityConflictException';
import { EntityNotFoundException } from 'src/modules/common/exceptions/entityNotFoundException';

import { DatabaseErrorUtil } from 'src/modules/common/exceptions/database-error-util';
import { IUsuarioSistemaRepository } from './usuario-sistema-repository.interface';
import { CreateUsuarioSistemaDto } from './dto/create-usuario-sistema.dto';

@Injectable()
export class UsuarioSistemaPersistenceService implements  IUsuarioSistemaRepository {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger( UsuarioSistemaPersistenceService.name);

  async create(data: CreateUsuarioSistemaDto): Promise<usuariosistema> {
    try {
      return await this.prisma.usuariosistema.create({ data });
    } catch (error) {
      DatabaseErrorUtil.handleDatabaseError(error);
    }
  }

  async findAll(skip = 0, take = 10): Promise<usuariosistema[]> {
    try {
      return this.prisma.usuariosistema.findMany({
        where: { deletedAt: null },
        skip,
        take,
        orderBy: { denominacion: 'desc' },
      });
    } catch (error) {
      throw new DatabaseConnectionException(
        'Error al conectar con la base de datos.',
      );
    }
  }


  async findOne(id: number): Promise<usuariosistema | null> {
    try {
      const entity = await this.prisma.usuariosistema.findFirst({
        where: { id, deletedAt: null },
      });
  
      this.logger.warn(`Usuario Sistema con entity: ${entity}.`);
      if (!entity) {
        throw new EntityNotFoundException('Entidad no encontrada.');
      }
      return entity;
    } catch (error) {
      if (error instanceof EntityNotFoundException) {
        // Deja pasar la excepción específica
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.logger.error(`Error conocido: ${error.message}`);
      }
      // Otros errores son considerados como problemas de conexión
      throw new DatabaseConnectionException(
        'Error al conectar con la base de datos.',
      );
    }
  }

  async findByDenominacionFiltered(
    denominacion: string,
    skip = 0,
    take = 10,
  ): Promise<usuariosistema[]> {
    try {
      return this.prisma.usuariosistema.findMany({
        where: {
          denominacion: {
            contains: denominacion.toLowerCase(),
          },
          deletedAt: null,
        },
        skip,
        take,
        orderBy: {
          denominacion: 'desc',
        },
      });
      
    } catch (error) {
      throw new DatabaseConnectionException(
        'Error al conectar con la base de datos.',
      );
    }
  }
  


  async findByDenominacion(denominacion: string): Promise<usuariosistema | null> {
    try {
      const entity = this.prisma.usuariosistema.findUnique({
        where: { denominacion, deletedAt: null },
      });
      return entity;
    } catch (error) {
      throw new DatabaseConnectionException(
        'Error al conectar con la base de datos.',
      );
    }
  }

  async update(id: number, data: Partial<usuariosistema>): Promise<usuariosistema> {
    try {
      return this.prisma.usuariosistema.update({ where: { id }, data });
    } catch (error) {
      DatabaseErrorUtil.handleDatabaseError(error);
    }
  }

  async remove(id: number): Promise<usuariosistema> {
    const entity = await this.prisma.usuariosistema.findUnique({
      where: { id },
    });

    if (!entity || entity.deletedAt) {
      throw new NotFoundException('Entidad no encontrada o ya eliminada.');
    }

    return this.prisma.usuariosistema.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async validateUsuariosistemaIds(ids: number[]) {
    const existingUsers = await this.prisma.usuariosistema.findMany({
      where: { id: { in: ids } },
      select: { id: true },
    });
  
    const missingIds = ids.filter((id) => !existingUsers.some((user) => user.id === id));
  
    if (missingIds.length > 0) {
      throw new BadRequestException(
        `Los siguientes IDs de usuarios no existen: ${missingIds.join(', ')}`
      );
    }
  }

}
