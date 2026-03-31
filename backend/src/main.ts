import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // important pour que le frontend puisse appeler l'API
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
