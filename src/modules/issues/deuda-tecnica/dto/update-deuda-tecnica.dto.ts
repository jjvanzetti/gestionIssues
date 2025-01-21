import { PartialType } from '@nestjs/mapped-types';
import { CreateDeudaTecnicaDto } from './create-deuda-tecnica.dto';

export class UpdateDeudaTecnicaDto extends PartialType(CreateDeudaTecnicaDto) {}
