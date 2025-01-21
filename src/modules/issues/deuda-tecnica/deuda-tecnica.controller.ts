import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeudaTecnicaService } from './deuda-tecnica.service';
import { CreateDeudaTecnicaDto } from './dto/create-deuda-tecnica.dto';
import { UpdateDeudaTecnicaDto } from './dto/update-deuda-tecnica.dto';

@Controller('deuda-tecnica')
export class DeudaTecnicaController {
  constructor(private readonly deudaTecnicaService: DeudaTecnicaService) {}

  @Post()
  create(@Body() createDeudaTecnicaDto: CreateDeudaTecnicaDto) {
    return this.deudaTecnicaService.create(createDeudaTecnicaDto);
  }

  @Get()
  findAll() {
    return this.deudaTecnicaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deudaTecnicaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeudaTecnicaDto: UpdateDeudaTecnicaDto) {
    return this.deudaTecnicaService.update(+id, updateDeudaTecnicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deudaTecnicaService.remove(+id);
  }
}
