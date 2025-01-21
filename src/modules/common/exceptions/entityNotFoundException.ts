import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFoundException extends HttpException {
  constructor(entityName: string) {
    super(`${entityName} no encontrado`, HttpStatus.NOT_FOUND);
  }
}
