
import { Injectable,  } from '@nestjs/common';
import { IProyectoRepository } from './proyecto-repository.interface';
import { proyecto } from '@prisma/client';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { ProyectoPersistenceService } from './proyecto.adapater.persistencia';

@Injectable()
export class ProyectoRepository implements IProyectoRepository {

constructor(private readonly persistenceService:ProyectoPersistenceService ) {}

   async create(data: CreateProyectoDto ): Promise<proyecto> {
        return await this.persistenceService.create(data);
    }
  
    async update(id: number, data: Partial<proyecto>): Promise<proyecto> {
       return this.persistenceService.update( id , data );
    }
  
    async findAll(skip = 0, take = 10): Promise<proyecto[]> {
        return this.persistenceService.findAll(skip,take);
    }
  
    async findByDenominacionFiltered(
      denominacion: string,
      skip = 0,
      take = 10,
    ): Promise<proyecto[]> {
      return this.persistenceService.findByDenominacionFiltered(denominacion, skip, take);
    }
    
    
    async findByClienteWithPagination(
      clienteId: number,
      skip: number, 
      take: number
    ): Promise<proyecto[]> {
      return this.persistenceService.findByClienteWithPagination(clienteId,skip,take );
    }


    async findOne(id: number): Promise<proyecto | null> {
        const entity = await this.persistenceService.findOne(id);
        return entity;
   
    }
  
    async findByDenominacion(denominacion: string): Promise<proyecto | null> {
        const entity =  this.persistenceService.findByDenominacion(denominacion);
        return entity;
    
    }
  
    async remove(id: number): Promise<proyecto> {
      const entity =  this.persistenceService.remove(id);
      return 
    }
  
  
}
