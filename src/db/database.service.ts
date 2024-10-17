import { Injectable } from '@nestjs/common';
import { db } from './index';
import { cats } from './schema';

@Injectable()
export class DatabaseService {
  async testConnection(): Promise<boolean> {
    try {
      const result = await db.select().from(cats).execute();
      console.log('数据库连接测试成功:', result);
      return true;
    } catch (error) {
      console.error('数据库连接测试失败:', error);
      return false;
    }
  }
}
