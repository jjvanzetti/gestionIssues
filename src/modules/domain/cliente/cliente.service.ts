import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { IClienteRepository } from './cliente-repository.interface';
import { EntityConflictException } from 'src/modules/common/exceptions/entityConflictException';
import { DatabaseConnectionException } from 'src/modules/common/exceptions/database-connection.exception';
import { cliente } from '@prisma/client';
import { EntityNotFoundException } from 'src/modules/common/exceptions/entityNotFoundException';

@Injectable()
export class ClienteService {
  private readonly logger = new Logger(ClienteService.name);

  constructor(
    @Inject('IClienteRepository')
    private readonly clienteRepository: IClienteRepository,
  ) {}

  private async checkDenominacionExists(denominacion: string): Promise<void> {
    const existingEntry =
      await this.clienteRepository.findByDenominacion(denominacion);
    if (existingEntry) {
      this.logger.warn(
        `Conflicto: Denominación ${denominacion} ya está en uso.`,
      );

      throw new ConflictException('El nombre ya está en uso.');
    }
  }

  async create(dto: CreateClienteDto) {
    try {
      this.logger.log(`Creando cliente con denominación: ${dto.denominacion}`);

      await this.checkDenominacionExists(dto.denominacion);
      const cliente = await this.clienteRepository.create(dto);

      this.logger.log(`Cliente creado exitosamente: ${cliente.id}`);

      return cliente;
    } catch (e) {
      this.logger.error('Error al crear el cliente', e.stack);

      if (e instanceof ConflictException) throw e;

      if (e instanceof EntityConflictException) throw e;

      if (e instanceof DatabaseConnectionException) {
        throw e;
      }
      throw new DatabaseConnectionException('Error al crear la entidad.');
    }
  }

  async update(id: number, dto: UpdateClienteDto): Promise<cliente> {
    try {
      this.logger.log(`Actualizando talle con ID: ${id}`);

      const foundEntry = await this.findOne(id);

      if (
        dto.denominacion &&
        dto.denominacion.trim().toLowerCase() !== foundEntry.denominacion
      ) {
        await this.checkDenominacionExists(dto.denominacion);
      }

      const updateEntry = await this.clienteRepository.update(id, dto);

      this.logger.log(`cliente actualizado con éxito: ${id}`);

      return updateEntry;
    } catch (e) {
      this.logger.error(`Error al actualizar el cliente ID: ${id}`, e.stack);

      if (e instanceof ConflictException) throw e;

      if (e instanceof EntityConflictException) throw e;

      if (e instanceof DatabaseConnectionException) {
        throw e;
      }
      throw new DatabaseConnectionException('Error al crear la entidad.');
    }
  }

  async findAll(skip = 0, take = 10): Promise<cliente[]> {
    this.logger.log(`Recuperando clientes con skip: ${skip}, take: ${take}`);

    return this.clienteRepository.findAll(skip, take);
  }

  async findByDenominacionFiltered(
    denominacion: string,
    skip = 0,
    take = 10,
  ): Promise<cliente[]> {
    this.logger.log(
      `Recuperando clientes con denominación: ${denominacion}, skip=${skip}, take=${take}`,
    );
    return this.clienteRepository.findByDenominacionFiltered(
      denominacion,
      skip,
      take,
    );
  }

  async findOne(id: number): Promise<cliente> {
    try {
      const foundEntry = await this.clienteRepository.findOne(id);
      if (!foundEntry) {
        this.logger.warn(`Cliente con ID: ${id} no encontrado o inactivo.`);
        throw new NotFoundException('Cliente no encontrado.');
      }
      return foundEntry;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof EntityNotFoundException
      ) {
        throw error; // Deja pasar estas excepciones
      }
      this.logger.error(`Error al buscar el cliente ID: ${id}`, error.stack);
      throw new DatabaseConnectionException(
        'Error al conectar con la base de datos.',
      );
    }
  }

  async validateClienteId(clienteId: number) {
    const cliente = await this.clienteRepository.findOne(clienteId);
    if (!cliente)
      throw new NotFoundException('El cliente especificado no existe.');
  }

  async remove(id: number): Promise<cliente> {
    try {
      this.logger.log(`Desactivando cliente con ID: ${id}`);

      await this.findOne(id);

      const result = await this.clienteRepository.remove(id);

      this.logger.warn(`cliente con ID: ${id} marcada como inactiva.`);

      return result;
    } catch (e) {
      this.logger.error(`Error al desactivar cliente con ID: ${id}`, e.stack);

      throw e;
    }
  }
}
