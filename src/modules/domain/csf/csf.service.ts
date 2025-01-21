import { Injectable } from '@nestjs/common';
import { CreateCsfDto } from './dto/create-csf.dto';
import { UpdateCsfDto } from './dto/update-csf.dto';

@Injectable()
export class CsfService {
  create(createCsfDto: CreateCsfDto) {
    return 'This action adds a new csf';
  }

  findAll() {
    return `This action returns all csf`;
  }

  findOne(id: number) {
    return `This action returns a #${id} csf`;
  }

  update(id: number, updateCsfDto: UpdateCsfDto) {
    return `This action updates a #${id} csf`;
  }

  remove(id: number) {
    return `This action removes a #${id} csf`;
  }
}
