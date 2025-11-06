import DatabaseConstructor from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'database.sqlite');
let db = null;

export function getRawDb() {
  if (!db) db = new DatabaseConstructor(DB_PATH);
  return db;
}
