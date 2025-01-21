import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { cliente, Prisma } from '@prisma/client';
import { DatabaseConnectionException } from 'src/modules/common/exceptions/database-connection.exception';
import { EntityConflictException } from 'src/modules/common/exceptions/entityConflictException';
import { EntityNotFoundException } from 'src/modules/common/exceptions/entityNotFoundException';
import { IClienteRepository } from './cliente-repository.interface';
import { DatabaseErrorUtil } from 'src/modules/common/exceptions/database-error-util';

@Injectable()
export class ClientePersistenceService implements IClienteRepository {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(ClientePersistenceService.name);

  async create(data: CreateClienteDto): Promise<cliente> {
    try {
      return await this.prisma.cliente.create({ data });
    } catch (error) {
      DatabaseErrorUtil.handleDatabaseError(error);
    }
  }

  async findAll(skip = 0, take = 10): Promise<cliente[]> {
    try {
      return this.prisma.cliente.findMany({
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


  async findOne(id: number): Promise<cliente | null> {
    try {
      const entity = await this.prisma.cliente.findFirst({
        where: { id, deletedAt: null },
      });
  
      this.logger.warn(`Cliente con entity: ${entity}.`);
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
  ): Promise<cliente[]> {
    try {
      return this.prisma.cliente.findMany({
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
  


  async findByDenominacion(denominacion: string): Promise<cliente | null> {
    try {
      const entity = this.prisma.cliente.findUnique({
        where: { denominacion, deletedAt: null },
      });
      return entity;
    } catch (error) {
      throw new DatabaseConnectionException(
        'Error al conectar con la base de datos.',
      );
    }
  }

  async update(id: number, data: Partial<cliente>): Promise<cliente> {
    try {
      return this.prisma.cliente.update({ where: { id }, data });
    } catch (error) {
      DatabaseErrorUtil.handleDatabaseError(error);
    }
  }

  async remove(id: number): Promise<cliente> {
    const entity = await this.prisma.cliente.findUnique({
      where: { id },
    });

    if (!entity || entity.deletedAt) {
      throw new NotFoundException('Entidad no encontrada o ya eliminada.');
    }

    return this.prisma.cliente.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }



  

}
