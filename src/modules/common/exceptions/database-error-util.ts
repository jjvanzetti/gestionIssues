// database-error.util.ts
import { EntityConflictException } from 'src/modules/common/exceptions/entityConflictException';
import { DatabaseConnectionException } from 'src/modules/common/exceptions/database-connection.exception';

export class DatabaseErrorUtil {
  static handleDatabaseError(error: any): never {
    switch (error.code) {
      case '23505': // Duplicado
        throw new EntityConflictException('Entidad ya existe.');
      case 'P2002': // Error de Prisma: Unique constraint failed
        throw new EntityConflictException('Violación de clave única.');
      default:
        throw new DatabaseConnectionException(
          'Error al conectar con la base de datos.',
        );
    }
  }
}
