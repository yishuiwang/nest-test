import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;
  private db: NodePgDatabase<typeof schema>;

  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'mysecretpassword',
      database: process.env.DB_NAME || 'postgres',
    });
    this.db = drizzle(this.pool, { schema });
  }

  async onModuleInit() {
    await this.pool.connect();
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  getDB() {
    return this.db;
  }

  async query(sql: string, params?: any[]) {
    return this.pool.query(sql, params);
  }

  insert(table: any) {
    return this.db.insert(table);
  }

  select() {
    return this.db.select();
  }

  update(table: any) {
    return this.db.update(table);
  }

  delete(table: any) {
    return this.db.delete(table);
  }
}
