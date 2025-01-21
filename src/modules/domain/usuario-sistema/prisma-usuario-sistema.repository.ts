
import { Injectable} from '@nestjs/common';

import { IUsuarioSistemaRepository } from './usuario-sistema-repository.interface';
import { UsuarioSistemaPersistenceService } from './usuario-sistema.adapater.persistencia';
import { CreateUsuarioSistemaDto } from './dto/create-usuario-sistema.dto';
import { usuariosistema } from '@prisma/client';



@Injectable()
export class UsuarioSisteamaRepository implements IUsuarioSistemaRepository {
  constructor(private readonly persistenceService:UsuarioSistemaPersistenceService ) {}

  async create(data: CreateUsuarioSistemaDto ): Promise<usuariosistema> {
      return await this.persistenceService.create(data);
  }

  async update(id: number, data: Partial<usuariosistema>): Promise<usuariosistema> {
     return this.persistenceService.update( id , data );
  }

  async findAll(skip = 0, take = 10): Promise<usuariosistema[]> {
      return this.persistenceService.findAll(skip,take);
  }

  async findByDenominacionFiltered(
    denominacion: string,
    skip = 0,
    take = 10,
  ): Promise<usuariosistema[]> {
    return this.persistenceService.findByDenominacionFiltered(denominacion, skip, take);
  }
  
  
  async findOne(id: number): Promise<usuariosistema | null> {
      const entity = await this.persistenceService.findOne(id);
      return entity;
 
  }

  async findByDenominacion(denominacion: string): Promise<usuariosistema | null> {
      const entity =  this.persistenceService.findByDenominacion(denominacion);
      return entity;
  
  }

  async remove(id: number): Promise<usuariosistema> {
    const entity =  this.persistenceService.remove(id);
    return entity;
  }
    
  async validateUsuariosistemaIds(ids: number[]) {
    return  this.persistenceService.validateUsuariosistemaIds(ids);
  }

}
