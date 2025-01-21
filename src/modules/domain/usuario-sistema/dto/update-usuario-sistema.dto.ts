import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioSistemaDto } from './create-usuario-sistema.dto';
import { Transform } from 'class-transformer';

export class UpdateUsuarioSistemaDto extends PartialType(CreateUsuarioSistemaDto) {


  @Transform(() => new Date(), { toClassOnly: true }) // Asigna la fecha actual solo al transformar
  updatedAt: Date;

}
