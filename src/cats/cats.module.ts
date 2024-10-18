import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { DatabaseService } from 'src/db/database.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService, DatabaseService],
  exports: [CatsService],
})
export class CatsModule {}
