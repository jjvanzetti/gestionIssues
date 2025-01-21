import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UsePipes,
  Query,
  InternalServerErrorException,
  ParseIntPipe,
  HttpStatus,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { NormalizeDenominacionPipe } from 'src/modules/common/pipes/normalize-denominacion.pipe';
import { EntityConflictException } from 'src/modules/common/exceptions/entityConflictException';
import { DatabaseConnectionException } from 'src/modules/common/exceptions/database-connection.exception';
import { PaginationDto } from 'src/modules/common/dto/pagination.dto';
import { EntityNotFoundException } from 'src/modules/common/exceptions/entityNotFoundException';
import { PaginationWithDenominacionDto } from 'src/modules/common/dto/pagination-with-denominacion.dto';

@Controller('proyecto')
export class ProyectoController {
  private readonly logger = new Logger(ProyectoController.name);
  constructor(private readonly proyectoService: ProyectoService) {}

  private readonly ENTITY_NAME = 'proyecto';

  @Post()
  @UsePipes(NormalizeDenominacionPipe)
  create(@Body() createUsuarioSistemaDto: CreateProyectoDto) {
    this.logger.log(`Creando un nuevo ${this.ENTITY_NAME}...`);
    return this.proyectoService.create(createUsuarioSistemaDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    this.logger.log(`Obteniendo elementos: skip=${skip}, take=${take}`);
    return this.proyectoService.findAll(skip, take);
  }

  @Get('search')
  findByDenominacionFiltered(
    @Query() paginationDto: PaginationWithDenominacionDto,
  ) {
    const { denominacion, skip, take } = paginationDto;
    this.logger.log(`Buscando usuarios con denominación: ${denominacion}`);
    return this.proyectoService.findByDenominacionFiltered(
      denominacion,
      skip,
      take,
    );
  }

  @Get('cliente/:clienteId')
  findByClienteWithPagination(
    @Param('clienteId', ParseIntPipe) clienteId: number,
    @Query('skip', ParseIntPipe) skip = 0,
    @Query('take', ParseIntPipe) take = 10,
  ) {
    return this.proyectoService.findByClienteWithPagination(
      clienteId,
      skip,
      take,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    this.logger.log(`Buscando  ${this.ENTITY_NAME} con ID: ${id}`);
    return this.proyectoService.findOne(id);
  }

  @Put(':id')
  @UsePipes(NormalizeDenominacionPipe)
  update(
    @Param('id') id: number,
    @Body() updateProyectoDto: UpdateProyectoDto,
  ) {
    this.logger.log(`Actualizando  ${this.ENTITY_NAME} con ID: ${id}`);
    return this.proyectoService.update(id, updateProyectoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.logger.warn(`Eliminando  ${this.ENTITY_NAME} con ID: ${id}`);
    return this.proyectoService.remove(id);
  }
}
