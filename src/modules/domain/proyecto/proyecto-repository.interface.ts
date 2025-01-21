import { proyecto } from "@prisma/client";
import { CreateProyectoDto } from "./dto/create-proyecto.dto";

export interface IProyectoRepository {

        create(data: CreateProyectoDto): Promise<proyecto>;
        findAll(skip: number, take: number): Promise<proyecto[]>;
        findOne(id: number): Promise<proyecto | null>;
        findByDenominacion(denominacion: string): Promise<proyecto | null>;
        findByDenominacionFiltered(
            denominacion: string,
            skip: number,
            take: number,
          ): Promise<proyecto[]>;
        
        findByClienteWithPagination(
              clienteId:number, 
              skip:number, 
              take:number,
        ): Promise<proyecto[]>;
        update(id: number, data: Partial<proyecto>): Promise<proyecto>;
        remove(id: number): Promise<proyecto>;

  }
  