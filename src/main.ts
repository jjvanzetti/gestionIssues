import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './modules/common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Convierte el cuerpo a la clase del DTO
      whitelist: true, // Elimina propiedades no declaradas en el DTO
      forbidNonWhitelisted: true, // Lanza error si se reciben propiedades no permitidas
    }),

  );

    // Configurar prefijo para endpoints
   app.setGlobalPrefix('api');


    // Configurar filtro global de excepciones
  app.useGlobalFilters(new GlobalExceptionFilter());
  
  await app.listen(process.env.PORT ?? 3000);
 // inspeccion de rutas
 // const server = app.getHttpAdapter();
 //console.log(server.getHttpServer()._events.request._router.stack);

}


bootstrap();
