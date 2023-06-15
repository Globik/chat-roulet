import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import { join } from 'path';
import {NestExpressApplication} from '@nestjs/platform-express';
async function bootstrap() {  
var  port;
  let httpsOptions = null;
  if (process.env.NODE_ENV == "prod") {
    const keyPath = "/root/nginx-ssl/certbot/conf/live/chat-roulet.ru/privkey.pem";
    const certPath = "/root/nginx-ssl/certbot/conf/live/chat-roulet.ru/fullchain.pem";
    httpsOptions = {
      key: readFileSync(keyPath),
      cert: readFileSync(certPath),
    };
    port = 443;
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule, { httpsOptions });
  port = Number(process.env.PORT);

  const config = new DocumentBuilder()
    .setTitle('Чат-рулетка')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/swagger', app, document);
  app.useStaticAssets( '/root/chatclient/dist');
  app.setGlobalPrefix('api');
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
console.log("PORT: ", port);
  await app.listen(port, () => console.log(`Server was started: http://localhost:${port}`));
}
bootstrap();
