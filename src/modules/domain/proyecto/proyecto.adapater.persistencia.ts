import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, proyecto } from '@prisma/client';
import { DatabaseConnectionException } from 'src/modules/common/exceptions/database-connection.exception';
import { EntityConflictException } from 'src/modules/common/exceptions/entityConflictException';
import { EntityNotFoundException } from 'src/modules/common/exceptions/entityNotFoundException';

import { DatabaseErrorUtil } from 'src/modules/common/exceptions/database-error-util';

import { IProyectoRepository } from './proyecto-repository.interface';
import { CreateProyectoDto } from './dto/create-proyecto.dto';

@Injectable()
export class ProyectoPersistenceService implements IProyectoRepository {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(ProyectoPersistenceService.name);

  /*
  async create(data: CreateProyectoDto): Promise<proyecto> {
    try {
      return await this.prisma.proyecto.create({ data });
    } catch (error) {
      DatabaseErrorUtil.handleDatabaseError(error);
    }
  }*/


  async create(data: CreateProyectoDto): Promise<proyecto> {
    try {
      const { usuariosistemaIds, ...rest } = data;
  
      // Transforma usuariosistemaIds en un formato compatible con Prisma
      const usuariosistema = usuariosistemaIds
        ? { connect: usuariosistemaIds.map((id) => ({ id })) }
        : undefined;
  
      return await this.prisma.proyecto.create({
        data: {
          ...rest,
          usuariosistema, // Incluye la relación transformada
        },
      });
    } catch (error) {
      DatabaseErrorUtil.handleDatabaseError(error);
    }
  }
  



  async findAll(skip = 0, take = 10): Promise<proyecto[]> {
    try {
      return this.prisma.proyecto.findMany({
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

  async findOne(id: number): Promise<proyecto | null> {
    try {
      const entity = await this.prisma.proyecto.findFirst({
        where: { id, deletedAt: null },
      });

      this.logger.warn(`Proyecto con entity: ${entity}.`);
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
  ): Promise<proyecto[]> {
    try {
      return this.prisma.proyecto.findMany({
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

  async findByClienteWithPagination(
    clienteId: number,
    skip = 0,
    take = 10,
  ): Promise<proyecto[]> {
    try {
      return this.prisma.proyecto.findMany({
        where: { clienteId, deletedAt: null },
        skip, // Número de elementos a saltar
        take, // Número de elementos a tomar
        orderBy: { denominacion: 'asc' }, // Ordenar por denominación
      });
    } catch (error) {
      throw new DatabaseConnectionException(
        'Error al conectar con la base de datos.',
      );
    }
  }

  async findByDenominacion(denominacion: string): Promise<proyecto | null> {
    try {
      const entity = this.prisma.proyecto.findFirst({
        where: { denominacion, deletedAt: null },
      });
      return entity;
    } catch (error) {
      throw new DatabaseConnectionException(
        'Error al conectar con la base de datos.',
      );
    }
  }

  async update(id: number, data: Partial<proyecto>): Promise<proyecto> {
    try {
      return this.prisma.proyecto.update({ where: { id }, data });
    } catch (error) {
      DatabaseErrorUtil.handleDatabaseError(error);
    }
  }

  async remove(id: number): Promise<proyecto> {
    const entity = await this.prisma.proyecto.findUnique({
      where: { id },
    });

    if (!entity || entity.deletedAt) {
      throw new NotFoundException('Entidad no encontrada o ya eliminada.');
    }
    try {
      return this.prisma.proyecto.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      DatabaseErrorUtil.handleDatabaseError(error);
    }
  }



}
