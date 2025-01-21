import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Logger,
  Query,
  InternalServerErrorException,
  ParseIntPipe,
  NotFoundException,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { EntityConflictException } from 'src/modules/common/exceptions/entityConflictException';
import { DatabaseConnectionException } from 'src/modules/common/exceptions/database-connection.exception';
import { PaginationDto } from 'src/modules/common/dto/pagination.dto';
import { EntityNotFoundException } from 'src/modules/common/exceptions/entityNotFoundException';
import { NormalizeDenominacionPipe } from 'src/modules/common/pipes/normalize-denominacion.pipe';
import { PaginationWithDenominacionDto } from 'src/modules/common/dto/pagination-with-denominacion.dto';

@Controller('cliente')
export class ClienteController {
  private readonly logger = new Logger(ClienteController.name);
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @UsePipes(NormalizeDenominacionPipe)
  async create(@Body() createClienteDto: CreateClienteDto): Promise<any> {
    try {
      this.logger.log('Creando una nueva cliente...');
      this.logger.log(`Dto: ${JSON.stringify(createClienteDto)}`);

      const cliente = await this.clienteService.create(createClienteDto);
      this.logger.log(`cliente creada con éxito: ID ${cliente.id}`);
      return cliente;
    } catch (e) {
      this.logger.error(`Error al crear la cliente: ${e.message}`, e.stack);
      if (e instanceof EntityConflictException) {
        throw e;
      }
      if (e instanceof DatabaseConnectionException) {
        throw e;
      }
      throw new DatabaseConnectionException('Error al crear la entidad.');
    }
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    try {
      this.logger.log(
        `Obteniendo elementos con paginación: skip=${skip}, take=${take}`,
      );
      return await this.clienteService.findAll(skip, take);
    } catch (e) {
      this.logger.error(`Error al obtener elementos: ${e.message}`, e.stack);
      throw new InternalServerErrorException('Error al obtener elementos.');
    }
  }


  @Get('search')
  async findByDenominacionFiltered(
    @Query() paginationDto: PaginationWithDenominacionDto,
  ) {
    const {denominacion, skip, take } = paginationDto;
    try {
      console.log('Denominación:', denominacion);
      console.log('Paginación:', paginationDto);
      this.logger.log(
        `Buscando clientes con denominación: ${denominacion}, skip=${skip}, take=${take}`,
      );
      return await this.clienteService.findByDenominacionFiltered(
        denominacion,
        skip,
        take,
      );
    } catch (e) {
      this.logger.error(`Error al buscar cliente: ${e.message}`, e.stack);
      throw new InternalServerErrorException('Error al buscar cliente.');
    }
  }
  


@Get(':id')
async findOne(
  @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })) id: number,
) {
  try {
    this.logger.log(`Buscando cliente con ID: ${id}`);
    const cliente = await this.clienteService.findOne(id);
    this.logger.log(`Cliente encontrado: ID ${cliente.id}`);
    return cliente;
  } catch (error) {
    this.logger.error(`Error al buscar el cliente: ${error.message}`, error.stack);
    if (error instanceof NotFoundException || error instanceof EntityNotFoundException) {
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
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    try {
      this.logger.log(`Actualizando cliente con ID: ${id}`);
      
      const updatedCliente = await this.clienteService.update(id, updateClienteDto);
    
      this.logger.log(`Cliente actualizada con éxito: ID ${updatedCliente.id}`);
     
      return updatedCliente;
    } catch (e) {
      this.logger.error(`Error al actualizar el Cliente: ${e.message}`, e.stack);
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
      this.logger.warn(`Inactivando cliente con ID: ${id}`);
     
      const cliente = await this.clienteService.remove(id);
     
      this.logger.warn(`Cliente inactivada con éxito: ID ${cliente.id}`);
     
      return cliente;
    } catch (e) {
      
      this.logger.error(`Error al inactivar la cliente: ${e.message}`, e.stack);
      
      throw e instanceof Error ? e : new InternalServerErrorException();
    }
  }
}
