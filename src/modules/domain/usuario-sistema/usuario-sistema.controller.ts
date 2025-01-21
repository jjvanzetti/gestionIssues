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
  HttpStatus,
  NotFoundException,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UsuarioSistemaService } from './usuario-sistema.service';
import { CreateUsuarioSistemaDto } from './dto/create-usuario-sistema.dto';
import { UpdateUsuarioSistemaDto } from './dto/update-usuario-sistema.dto';
import { NormalizeDenominacionPipe } from 'src/modules/common/pipes/normalize-denominacion.pipe';
import { DatabaseConnectionException } from 'src/modules/common/exceptions/database-connection.exception';
import { EntityConflictException } from 'src/modules/common/exceptions/entityConflictException';
import { PaginationDto } from 'src/modules/common/dto/pagination.dto';
import { PaginationWithDenominacionDto } from 'src/modules/common/dto/pagination-with-denominacion.dto';
import { EntityNotFoundException } from 'src/modules/common/exceptions/entityNotFoundException';


@Controller('usuario-sistema')
export class UsuarioSistemaController {
  private readonly logger = new Logger(UsuarioSistemaController.name);
  constructor(private readonly usuarioSistemaService: UsuarioSistemaService) {}

  @Post()
  @UsePipes(NormalizeDenominacionPipe)
  create(@Body() createUsuarioSistemaDto: CreateUsuarioSistemaDto) {
    this.logger.log('Creando una nuevo usuario-sistema...');
    return this.usuarioSistemaService.create(createUsuarioSistemaDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    this.logger.log(`Obteniendo elementos: skip=${skip}, take=${take}`);
    return this.usuarioSistemaService.findAll(skip, take);
  }

  @Get('search')
  findByDenominacionFiltered(
    @Query() paginationDto: PaginationWithDenominacionDto,
  ) {
    const { denominacion, skip, take } = paginationDto;
    this.logger.log(`Buscando usuarios con denominación: ${denominacion}`);
    return this.usuarioSistemaService.findByDenominacionFiltered(
      denominacion,
      skip,
      take,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    this.logger.log(`Buscando usuario con ID: ${id}`);
    return this.usuarioSistemaService.findOne(id);
  }

  @Put(':id')
  @UsePipes(NormalizeDenominacionPipe)
  update(
    @Param('id') id: number,
    @Body() updateUsuarioSistemaDto: UpdateUsuarioSistemaDto,
  ) {
    this.logger.log(`Actualizando usuario con ID: ${id}`);
    return this.usuarioSistemaService.update(id, updateUsuarioSistemaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.logger.warn(`Eliminando usuario con ID: ${id}`);
    return this.usuarioSistemaService.remove(id);
  }
}
