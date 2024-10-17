import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service'; // 导入 CatsService
import { DatabaseService } from '../db/database.service';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly databaseService: DatabaseService
  ) {}

  @Post()
  async create(@Body('name') name: string) {
    const cat = await this.catsService.create(name);
    return { message: '猫咪创建成功', cat };
  }

  @Get()
  async findAll() {
    return await this.catsService.findAll();
  }

  @Get('test-db')
  async testDatabase() {
    const isConnected = await this.databaseService.testConnection();
    return { isConnected };
  }
}
