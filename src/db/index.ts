import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { catsTable } from './schema';
import { Pool } from 'pg';

// const DATABASE_URL = 'postgres://postgres:mysecretpassword@localhost:5432/postgres';
// const db = drizzle(DATABASE_URL);

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'mysecretpassword',
    database: 'postgres',
});

// const db = drizzle(process.env.DATABASE_URL!);

async function main() {
    const db = drizzle(pool, { schema: { cats: catsTable } });

    const cat1: typeof catsTable.$inferInsert = {
        name: 'Fluffy',
    }

    const cat2: typeof catsTable.$inferInsert = {
        name: 'Whiskers',
    }

    console.log('Inserting cats');

    await db.insert(catsTable).values(cat1);
    await db.insert(catsTable).values(cat2);

    console.log('Querying cats');


    // test connection to database
    // const client = await pool.connect();
    // console.log('Connected to database');

    // console.log('Querying cats');
    // const usersCount = await db.$count(users);
    // console.log('Users count:', usersCount);
}

main();