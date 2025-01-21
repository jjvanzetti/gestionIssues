
import { usuariosistema } from "@prisma/client";
import { CreateUsuarioSistemaDto } from "./dto/create-usuario-sistema.dto";

export interface IUsuarioSistemaRepository {
 
    create(data: CreateUsuarioSistemaDto): Promise<usuariosistema>;
    findAll(skip: number, take: number): Promise<usuariosistema[]>;
    findOne(id: number): Promise<usuariosistema | null>;
    findByDenominacion(denominacion: string): Promise<usuariosistema | null>;
    findByDenominacionFiltered(
        denominacion: string,
        skip: number,
        take: number,
      ): Promise<usuariosistema[]>;
    
    
    update(id: number, data: Partial<usuariosistema>): Promise<usuariosistema>;
    remove(id: number): Promise<usuariosistema>;
    validateUsuariosistemaIds(ids: number[]);
  }
  