import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'], // Configura los logs
    });
  }

  // Método que se ejecuta cuando el módulo se inicializa
  async onModuleInit() {
    await this.$connect();
  }

  // Método que se ejecuta cuando el módulo se destruye
  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Método opcional: manejo de transacciones u otras utilidades
  async cleanDatabase() {
    if (process.env.NODE_ENV === 'test') {
      await this.$transaction([
        this.cliente.deleteMany(),
        // Agrega otros modelos si es necesario
      ]);
    }
 }
  
}