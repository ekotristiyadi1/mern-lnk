import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupGraphDependencies } from './graph';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');
  setupSwagger(app);
  setupGraphDependencies(app);
  await app.listen(process.env.PORT);
}
bootstrap();
