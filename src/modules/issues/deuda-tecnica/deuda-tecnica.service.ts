import { Injectable } from '@nestjs/common';
import { CreateDeudaTecnicaDto } from './dto/create-deuda-tecnica.dto';
import { UpdateDeudaTecnicaDto } from './dto/update-deuda-tecnica.dto';

@Injectable()
export class DeudaTecnicaService {
  create(createDeudaTecnicaDto: CreateDeudaTecnicaDto) {
    return 'This action adds a new deudaTecnica';
  }

  findAll() {
    return `This action returns all deudaTecnica`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deudaTecnica`;
  }

  update(id: number, updateDeudaTecnicaDto: UpdateDeudaTecnicaDto) {
    return `This action updates a #${id} deudaTecnica`;
  }

  remove(id: number) {
    return `This action removes a #${id} deudaTecnica`;
  }
}
