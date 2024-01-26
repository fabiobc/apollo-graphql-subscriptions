import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const port = process.env.PORT ?? 4356;

  await app.listen(port, '0.0.0.0');
  console.log(`Listening on port: ${port}...`);
}

void bootstrap();