// Utility file for the db connection

import pkg, { QueryResult } from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function query(text: string, params?: any[]): Promise<QueryResult> {
    return pool.query(text, params);
}