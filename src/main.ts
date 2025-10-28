import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación global (usará class-validator en los DTOs)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina campos no esperados
      forbidNonWhitelisted: true, // lanza error si hay campos desconocidos
      transform: true, // transforma tipos (por ejemplo, strings a numbers)
    }),
  );

  // Configuración de Swagger para documentación
  const config = new DocumentBuilder()
    .setTitle('Vehicle Management API')
    .setDescription('API para gestión de vehículos y propietarios')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(`📘 Documentación Swagger: http://localhost:${port}/api/docs`);
}

bootstrap();
