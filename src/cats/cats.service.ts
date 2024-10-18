import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/database.service';
import { catsTable } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class CatsService {

  constructor(private readonly db: DatabaseService) {}

  async create(cat: string) {
    const newCat = await this.db.insert(catsTable).values({ name: cat }).returning();
    return newCat[0];
  }

  async findAll() {
    return await this.db.select().from(catsTable);
  }

  async findOne(id: number) {
    const cat = await this.db.select().from(catsTable).where(eq(catsTable.id, id));
    return cat[0];
  }

  async remove(id: number) {
    const deletedCat = await this.db.delete(catsTable).where(eq(catsTable.id, id)).returning();
    return deletedCat[0];
  }

}
