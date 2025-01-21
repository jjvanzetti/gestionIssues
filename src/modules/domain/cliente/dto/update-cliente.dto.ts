import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { Transform } from 'class-transformer';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {


  @Transform(() => new Date(), { toClassOnly: true }) // Asigna la fecha actual solo al transformar
  updatedAt: Date;


}
