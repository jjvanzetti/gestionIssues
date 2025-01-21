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
import { UsuarioSistemaService } from '../domain/usuario-sistema/usuario-sistema.service';
import { CreateUsuarioSistemaDto } from '../domain/usuario-sistema/dto/create-usuario-sistema.dto';
import { UpdateUsuarioSistemaDto } from '../domain/usuario-sistema/dto/update-usuario-sistema.dto';
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
  async create(@Body() createUsuarioSistemaDto: CreateUsuarioSistemaDto) {
    try {
      this.logger.log('Creando una nuevo usuario-sistema...');
      this.logger.log(`Dto: ${JSON.stringify(createUsuarioSistemaDto)}`);

      const createdEntry = await this.usuarioSistemaService.create(
        createUsuarioSistemaDto,
      );
      this.logger.log(
        `Usuario Sistema creada con éxito: ID ${createdEntry.id}`,
      );
      return createdEntry;
    } catch (e) {
      this.logger.error(
        `Error al crear el usuario sistema: ${e.message}`,
        e.stack,
      );
      if (e instanceof EntityConflictException) {
        throw e;
      }
      if (e instanceof DatabaseConnectionException) {
        throw e;
      }
      throw new DatabaseConnectionException(
        'Error al crear la entidad usuario sistema.',
      );
    }
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    try {
      this.logger.log(
        `Obteniendo elementos con paginación: skip=${skip}, take=${take}`,
      );
      return await this.usuarioSistemaService.findAll(skip, take);
    } catch (e) {
      this.logger.error(`Error al obtener elementos: ${e.message}`, e.stack);
      throw new InternalServerErrorException('Error al obtener elementos.');
    }
  }

  @Get('search')
  async findByDenominacionFiltered(
    @Query() paginationDto: PaginationWithDenominacionDto,
  ) {
    const { denominacion, skip, take } = paginationDto;
    try {
      console.log('Denominación:', denominacion);
      console.log('Paginación:', paginationDto);
      this.logger.log(
        `Buscando usuarios-sistemas con denominación: ${denominacion}, skip=${skip}, take=${take}`,
      );
      return await this.usuarioSistemaService.findByDenominacionFiltered(
        denominacion,
        skip,
        take,
      );
    } catch (e) {
      this.logger.error(`Error al buscar usuario sistema: ${e.message}`, e.stack);
      throw new InternalServerErrorException('Error al buscar usuario sistema.');
    }
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: number,
  ) {
    try {
      this.logger.log(`Buscando cliente con ID: ${id}`);
      const cliente = await this.usuarioSistemaService.findOne(id);
      this.logger.log(`usuario sistema encontrado: ID ${cliente.id}`);
      return cliente;
    } catch (error) {
      this.logger.error(
        `Error al buscar el usuario sistema: ${error.message}`,
        error.stack,
      );
      if (
        error instanceof NotFoundException ||
        error instanceof EntityNotFoundException
      ) {
        throw error; // Responde con 404
      }
      throw new DatabaseConnectionException('Error al buscar la entidad.');
    }
  }

  @Put(':id')
  @UsePipes(NormalizeDenominacionPipe)
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: number,
    @Body() updateClienteDto: UpdateUsuarioSistemaDto,
  ) {
    try {
      this.logger.log(`Actualizando cliente con ID: ${id}`);

      const updatedCliente = await this.usuarioSistemaService.update(
        id,
        updateClienteDto,
      );

      this.logger.log(`usuario sistema actualizada con éxito: ID ${updatedCliente.id}`);

      return updatedCliente;
    } catch (e) {
      this.logger.error(
        `Error al actualizar el usuario sistema: ${e.message}`,
        e.stack,
      );
      if (e instanceof EntityConflictException) {
        throw e;
      }
      if (e instanceof DatabaseConnectionException) {
        throw e;
      }
      throw new DatabaseConnectionException('Error al crear la entidad.');
    }
  }

  @Delete(':id')
  async remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: number,
  ) {
    try {
      this.logger.warn(`Inactivando usuario cliente con ID: ${id}`);

      const cliente = await this.usuarioSistemaService.remove(id);

      this.logger.warn(`usuario cliente inactivada con éxito: ID ${cliente.id}`);

      return cliente;
    } catch (e) {
      this.logger.error(`Error al inactivar la usuario cliente : ${e.message}`, e.stack);

      throw e instanceof Error ? e : new InternalServerErrorException();
    }
  }
}
