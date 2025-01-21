import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoIssueDto } from './create-tipo-issue.dto';

export class UpdateTipoIssueDto extends PartialType(CreateTipoIssueDto) {}
