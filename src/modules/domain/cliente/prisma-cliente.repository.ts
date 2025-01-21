
import { Injectable} from '@nestjs/common';

import { IClienteRepository } from './cliente-repository.interface';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { cliente } from '@prisma/client';

import { ClientePersistenceService } from './cliente.adapater.persistencia';


@Injectable()
export class ClienteRepository implements IClienteRepository {
  constructor(private readonly persistenceService:ClientePersistenceService) {}

  async create(data: CreateClienteDto): Promise<cliente> {
      return await this.persistenceService.create(data);
  }

  async update(id: number, data: Partial<cliente>): Promise<cliente> {
     return this.persistenceService.update( id , data );
  }

  async findAll(skip = 0, take = 10): Promise<cliente[]> {
      return this.persistenceService.findAll(skip,take);
  }

  async findByDenominacionFiltered(
    denominacion: string,
    skip = 0,
    take = 10,
  ): Promise<cliente[]> {
    return this.persistenceService.findByDenominacionFiltered(denominacion, skip, take);
  }
  
  
  async findOne(id: number): Promise<cliente | null> {
  
      const entity = await this.persistenceService.findOne(id);
      return entity;
 
  }

  async findByDenominacion(denominacion: string): Promise<cliente | null> {
      const entity =  this.persistenceService.findByDenominacion(denominacion);
      return entity;
  
  }

  async remove(id: number): Promise<cliente> {
    const entity =  this.persistenceService.remove(id);
    return entity;
  }
    
  
}
