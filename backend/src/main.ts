import { NestFactory, PartialGraphHost } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
  });

  await app.listen(8088);
}
bootstrap().catch((err) => {
  fs.writeFileSync('graph.json', PartialGraphHost.toString() ?? '');
  process.exit(1);
});
