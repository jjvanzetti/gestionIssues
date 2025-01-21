import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from "class-validator";

export class CreateUsuarioSistemaDto {
  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString({ message: 'La denominación debe ser una cadena de texto.' }) // Valida que sea string
  @IsNotEmpty({ message: 'La denominación no puede estar vacía.' }) // Valida que no esté vacía
  @MaxLength(255,{ message: 'La denominación no puede estar vacía.' })
  @Matches(/^[a-zA-Z0-9 ]+$/, {
    message: 'La denominación solo puede contener letras, números y espacios.',
  })
  denominacion: string;

  
  @IsOptional()
  @IsString()
  observacion?: string;

  @Transform(() => new Date(), { toClassOnly: true }) // Asigna la fecha actual solo al transformar
  createdAt: Date;



}
