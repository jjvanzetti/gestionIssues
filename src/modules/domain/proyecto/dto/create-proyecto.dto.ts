import { Transform } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from "class-validator";

export class CreateProyectoDto {
  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString({ message: 'La denominación debe ser una cadena de texto.' }) // Valida que sea string
  @IsNotEmpty({ message: 'La denominación no puede estar vacía.' }) // Valida que no esté vacía
  @MaxLength(255, { message: 'La denominación no puede estar vacía.' })
  @Matches(/^[a-zA-Z0-9 ]+$/, {
    message: 'La denominación solo puede contener letras, números y espacios.',
  })
  denominacion: string;

  @IsOptional()
  @IsInt()
  clienteId: number; // Relación con la cliente.


  @IsOptional()
  @IsString()
  observacion?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true, message: 'Cada ID de usuario debe ser un número entero.' })
  usuariosistemaIds?: number[];


  @IsOptional()
  @IsArray()
  @IsInt({ each: true, message: 'Cada ID de CSF debe ser un número entero.' })
  csfIds?: number[];

  @Transform(() => new Date(), { toClassOnly: true }) // Asigna la fecha actual solo al transformar
  createdAt: Date;

}
