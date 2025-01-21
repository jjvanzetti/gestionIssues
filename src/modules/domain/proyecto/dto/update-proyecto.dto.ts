import { PartialType } from '@nestjs/mapped-types';
import { CreateProyectoDto } from './create-proyecto.dto';
import { Transform } from 'class-transformer';

export class UpdateProyectoDto extends PartialType(CreateProyectoDto) {

     @Transform(() => new Date(), { toClassOnly: true }) // Asigna la fecha actual solo al transformar
     updatedAt: Date;
}
