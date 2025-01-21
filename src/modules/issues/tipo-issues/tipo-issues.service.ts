import { Injectable } from '@nestjs/common';
import { CreateTipoIssueDto } from './dto/create-tipo-issue.dto';
import { UpdateTipoIssueDto } from './dto/update-tipo-issue.dto';

@Injectable()
export class TipoIssuesService {
  create(createTipoIssueDto: CreateTipoIssueDto) {
    return 'This action adds a new tipoIssue';
  }

  findAll() {
    return `This action returns all tipoIssues`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoIssue`;
  }

  update(id: number, updateTipoIssueDto: UpdateTipoIssueDto) {
    return `This action updates a #${id} tipoIssue`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoIssue`;
  }
}
