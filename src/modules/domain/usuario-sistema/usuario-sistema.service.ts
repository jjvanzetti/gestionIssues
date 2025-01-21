import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioSistemaDto } from './dto/create-usuario-sistema.dto';
import { UpdateUsuarioSistemaDto } from './dto/update-usuario-sistema.dto';
import { IUsuarioSistemaRepository } from './usuario-sistema-repository.interface';


@Injectable()
export class UsuarioSistemaService {
  private readonly logger = new Logger(UsuarioSistemaService.name);

  constructor(
    @Inject('IUsuarioSistemaRepository')
    private readonly usuarioSistemaRepository: IUsuarioSistemaRepository,
  ) {}

  
  async create(dto: CreateUsuarioSistemaDto) {
    this.logger.log(`Creando usuario-sistema: ${dto.denominacion}`);
    await this.checkDenominacionExists(dto.denominacion);
    return this.usuarioSistemaRepository.create(dto);
  }

  async update(id: number, dto: UpdateUsuarioSistemaDto) {
    this.logger.log(`Actualizando usuario-sistema ID: ${id}`);
    await this.findOne(id); // Verifica existencia
    if (dto.denominacion) await this.checkDenominacionExists(dto.denominacion);
    return this.usuarioSistemaRepository.update(id, dto);
  }

  async findAll(skip = 0, take = 10) {
    return this.usuarioSistemaRepository.findAll(skip, take);
  }

  async findByDenominacionFiltered(denominacion: string, skip = 0, take = 10) {
    return this.usuarioSistemaRepository.findByDenominacionFiltered(
      denominacion,
      skip,
      take,
    );
  }

  async findOne(id: number) {
    const usuario = await this.usuarioSistemaRepository.findOne(id);
    if (!usuario) throw new NotFoundException('Usuario-Sistema no encontrado.');
    return usuario;
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica existencia
    return this.usuarioSistemaRepository.remove(id);
  }

  private async checkDenominacionExists(denominacion: string) {
    const exists = await this.usuarioSistemaRepository.findByDenominacion(denominacion);
    if (exists) {
      this.logger.warn(`Conflicto: denominación ya está en uso: ${denominacion}`);
      throw new Error('Denominación ya en uso.');
    }
  }

  async validateUsuariosistemaIds(ids: number[]) {
   /* for (const id of ids) {
      const usuario = await this.findUsuarioSistemaById(id);
      if (!usuario) throw new NotFoundException(`Usuario sistema con ID ${id} no encontrado.`);
    }*/
      return  this.usuarioSistemaRepository.validateUsuariosistemaIds(ids);
  }


  async findUsuarioSistemaById(id: number): Promise<any> {
    return this.findOne(id);
  }
  
}
