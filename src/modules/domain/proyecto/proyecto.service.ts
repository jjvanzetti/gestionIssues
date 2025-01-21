import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { IProyectoRepository } from './proyecto-repository.interface';
import { proyecto } from '@prisma/client';
import { ClienteService } from '../cliente/cliente.service';
import { UsuarioSistemaService } from '../usuario-sistema/usuario-sistema.service';

@Injectable()
export class ProyectoService {
  private readonly logger = new Logger(ProyectoService.name);

  private readonly ENTITY_NAME = 'proyecto';

  constructor(
    @Inject('IProyectoRepository')
    private readonly dataSource: IProyectoRepository,
  
    private readonly clienteService: ClienteService, // Servicio de clientes
    private readonly usuarioSistemaService: UsuarioSistemaService, // Servicio de usuario Sistema
   
  ) {}

  async create(dto: CreateProyectoDto) {
    this.logger.log(`Creando ${this.ENTITY_NAME}: ${dto.denominacion}`);
    
    if (dto.clienteId) await this.clienteService.validateClienteId(dto.clienteId);

    if (dto.usuariosistemaIds) await this.usuarioSistemaService.validateUsuariosistemaIds(dto.usuariosistemaIds);


    await this.checkDenominacionExists(dto.denominacion);
    
    return this.dataSource.create(dto);
  }


  async update(id: number, dto: UpdateProyectoDto) {
    this.logger.log(`Actualizando  ${this.ENTITY_NAME} ID: ${id}`);
    if (dto.clienteId) await this.clienteService.validateClienteId(dto.clienteId);


    if (dto.denominacion) await this.checkDenominacionExists(dto.denominacion);
       return this.dataSource.update(id, dto);
  }

  async findAll(skip = 0, take = 10) {
    return this.dataSource.findAll(skip, take);
  }

  async findByDenominacionFiltered(denominacion: string, skip = 0, take = 10) {
    return this.dataSource.findByDenominacionFiltered(
      denominacion,
      skip,
      take,
    );
  }

 
  async findByClienteWithPagination(
    clienteId: number,
    skip = 0,
    take = 10,
  ): Promise<proyecto[]> {
    // Verificar si el cliente existe
    const cliente = await this.clienteService.findOne(clienteId);
  
    if (!cliente) {
      throw new NotFoundException('El cliente especificado no existe.');
    }
  
    // Llamar al repositorio con los valores de paginación
    return this.dataSource.findByClienteWithPagination(clienteId, skip, take);
  }
  

  async findOne(id: number) {
    const entity = await this.dataSource.findOne(id);
    if (!entity)
      throw new NotFoundException(` ${this.ENTITY_NAME} no encontrado.`);
    return entity;
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica existencia
    return this.dataSource.remove(id);
  }

  private async checkDenominacionExists(denominacion: string) {
    const exists =
      await this.dataSource.findByDenominacion(denominacion);
    if (exists) {
      this.logger.warn(
        `Conflicto: denominación ya está en uso: ${denominacion}`,
      );
      throw new Error('Denominación ya en uso.');
    }
  }
}
