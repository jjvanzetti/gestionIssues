
import { cliente } from "@prisma/client";
import { CreateClienteDto } from "./dto/create-cliente.dto";

export interface IClienteRepository {
 
    create(data: CreateClienteDto): Promise<cliente>;
    findAll(skip: number, take: number): Promise<cliente[]>;
    findOne(id: number): Promise<cliente | null>;
    findByDenominacion(denominacion: string): Promise<cliente | null>;
    findByDenominacionFiltered(
        denominacion: string,
        skip: number,
        take: number,
      ): Promise<cliente[]>;
    
    
    update(id: number, data: Partial<cliente>): Promise<cliente>;
    remove(id: number): Promise<cliente>;
    
  }
  