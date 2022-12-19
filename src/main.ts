import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3010);
  console.log(`Nest-Redis-Queue is running on: ${await app.getUrl()}`);
}
bootstrap();
