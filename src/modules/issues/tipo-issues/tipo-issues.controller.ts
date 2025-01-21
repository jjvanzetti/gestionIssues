import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoIssuesService } from './tipo-issues.service';
import { CreateTipoIssueDto } from './dto/create-tipo-issue.dto';
import { UpdateTipoIssueDto } from './dto/update-tipo-issue.dto';

@Controller('tipo-issues')
export class TipoIssuesController {
  constructor(private readonly tipoIssuesService: TipoIssuesService) {}

  @Post()
  create(@Body() createTipoIssueDto: CreateTipoIssueDto) {
    return this.tipoIssuesService.create(createTipoIssueDto);
  }

  @Get()
  findAll() {
    return this.tipoIssuesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoIssuesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoIssueDto: UpdateTipoIssueDto) {
    return this.tipoIssuesService.update(+id, updateTipoIssueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoIssuesService.remove(+id);
  }
}
