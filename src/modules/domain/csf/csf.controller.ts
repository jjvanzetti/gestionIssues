import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CsfService } from './csf.service';
import { CreateCsfDto } from './dto/create-csf.dto';
import { UpdateCsfDto } from './dto/update-csf.dto';

@Controller('csf')
export class CsfController {
  constructor(private readonly csfService: CsfService) {}

  @Post()
  create(@Body() createCsfDto: CreateCsfDto) {
    return this.csfService.create(createCsfDto);
  }

  @Get()
  findAll() {
    return this.csfService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.csfService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCsfDto: UpdateCsfDto) {
    return this.csfService.update(+id, updateCsfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.csfService.remove(+id);
  }
}
