import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const cat = await this.catsService.findOne(+id);
    if (!cat) {
      throw new NotFoundException('找不到该猫咪');
    }
    return cat;
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedCat = await this.catsService.remove(+id);
    if (!deletedCat) {
      throw new NotFoundException('找不到该猫咪');
    }
    return { message: '猫咪删除成功', cat: deletedCat };
  }

}
