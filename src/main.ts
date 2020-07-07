import { NestFactory, NestApplication } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import path = require('path');
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

const ENV = process.env.NODE_ENV || 'development';
console.log(`NODE_ENV: ${ENV}`);

declare const module: any;

async function bootstrap() {

  const port = process.env.PORT || '5000';
  // important to have the server listening on 0.0.0.0
  const address = '0.0.0.0';

  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'hero',
      protoPath: join(__dirname, 'protos/hero/hero.proto'),
      loader: {
        includeDirs: [join(__dirname, '..', 'protos')],
      },
      url: `${address}:${port}`,
    },
  });

  await app.startAllMicroservicesAsync();
}
bootstrap();
