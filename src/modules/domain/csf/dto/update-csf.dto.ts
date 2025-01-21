import { PartialType } from '@nestjs/mapped-types';
import { CreateCsfDto } from './create-csf.dto';

export class UpdateCsfDto extends PartialType(CreateCsfDto) {}
