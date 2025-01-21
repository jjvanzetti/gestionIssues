import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioSistemaDto } from '../domain/usuario-sistema/dto/create-usuario-sistema.dto';
import { UpdateUsuarioSistemaDto } from '../domain/usuario-sistema/dto/update-usuario-sistema.dto';
import { IUsuarioSistemaRepository } from '../domain/usuario-sistema/usuario-sistema-repository.interface';
import { EntityConflictException } from 'src/modules/common/exceptions/entityConflictException';
import { DatabaseConnectionException } from 'src/modules/common/exceptions/database-connection.exception';
import { cliente, usuariosistema } from '@prisma/client';
import { EntityNotFoundException } from 'src/modules/common/exceptions/entityNotFoundException';

@Injectable()
export class UsuarioSistemaService {
  private readonly logger = new Logger(UsuarioSistemaService.name);

  constructor(
    @Inject('IUsuarioSistemaRepository')
    private readonly usuarioSistemaRepository: IUsuarioSistemaRepository,
  ) {}

  private async checkDenominacionExists(denominacion: string): Promise<void> {
    const existingEntry =
      await this.usuarioSistemaRepository.findByDenominacion(denominacion);
    if (existingEntry) {
      this.logger.warn(
        `Conflicto: Denominación ${denominacion} ya está en uso.`,
      );

      throw new ConflictException('El nombre ya está en uso.');
    }
  }

  async create(dto: CreateUsuarioSistemaDto) {
    try {
      this.logger.log(
        `Creando usuario-sistema con denominación: ${dto.denominacion}`,
      );

      await this.checkDenominacionExists(dto.denominacion);
      const cliente = await this.usuarioSistemaRepository.create(dto);

      this.logger.log(`Usuario-Sistema creado exitosamente: ${cliente.id}`);

      return cliente;
    } catch (e) {
      this.logger.error('Error al crear el Usuario-Sistema', e.stack);

      if (e instanceof ConflictException) throw e;

      if (e instanceof EntityConflictException) throw e;

      if (e instanceof DatabaseConnectionException) {
        throw e;
      }
      throw new DatabaseConnectionException('Error al crear la entidad.');
    }
  }

  async update(id: number, dto: UpdateUsuarioSistemaDto): Promise<cliente> {
    try {
      this.logger.log(`Actualizando Usuario Sistema con ID: ${id}`);

      const foundEntry = await this.findOne(id);

      if (
        dto.denominacion &&
        dto.denominacion.trim().toLowerCase() !== foundEntry.denominacion
      ) {
        await this.checkDenominacionExists(dto.denominacion);
      }

      const updateEntry = await this.usuarioSistemaRepository.update(id, dto);

      this.logger.log(` Usuario Sistema  actualizado con éxito: ${id}`);

      return updateEntry;
    } catch (e) {
      this.logger.error(
        `Error al actualizar el  Usuario Sistema ID: ${id}`,
        e.stack,
      );

      if (e instanceof ConflictException) throw e;

      if (e instanceof EntityConflictException) throw e;

      if (e instanceof DatabaseConnectionException) {
        throw e;
      }
      throw new DatabaseConnectionException('Error al crear la entidad.');
    }
  }

  async findAll(skip = 0, take = 10): Promise<usuariosistema[]> {
    this.logger.log(
      `Recuperando Usuario-Sistema con skip: ${skip}, take: ${take}`,
    );
    return this.usuarioSistemaRepository.findAll(skip, take);
  }

  async findByDenominacionFiltered(
    denominacion: string,
    skip = 0,
    take = 10,
  ): Promise<usuariosistema[]> {
    this.logger.log(
      `Recuperando Usuario-Sistema con denominación: ${denominacion}, skip=${skip}, take=${take}`,
    );
    return this.usuarioSistemaRepository.findByDenominacionFiltered(
      denominacion,
      skip,
      take,
    );
  }

  async findOne(id: number): Promise<usuariosistema> {
    try {
      const foundEntry = await this.usuarioSistemaRepository.findOne(id);
      if (!foundEntry) {
        this.logger.warn(
          `Usuario-Sistemacon ID: ${id} no encontrado o inactivo.`,
        );
        throw new NotFoundException('Usuario-Sistema no encontrado.');
      }
      return foundEntry;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof EntityNotFoundException
      ) {
        throw error; // Deja pasar estas excepciones
      }
      this.logger.error(
        `Error al buscar el Usuario-Sistema ID: ${id}`,
        error.stack,
      );
      throw new DatabaseConnectionException(
        'Error al conectar con la base de datos.',
      );
    }
  }

  async remove(id: number): Promise<usuariosistema> {
    try {
      this.logger.log(`Desactivando Usuario-Sistema con ID: ${id}`);

      await this.findOne(id);

      const result = await this.usuarioSistemaRepository.remove(id);

      this.logger.warn(`Usuario-Sistema con ID: ${id} marcada como inactiva.`);

      return result;
    } catch (e) {
      this.logger.error(
        `Error al desactivar Usuario-Sistema con ID: ${id}`,
        e.stack,
      );

      throw e;
    }
  }
}
