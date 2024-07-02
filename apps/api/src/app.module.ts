import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    CatModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'web', 'dist')
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
