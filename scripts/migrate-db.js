const path = require('path')
const envPath = path.resolve(process.cwd(), '.env.local')

console.log({ envPath })

require('dotenv').config({ path: envPath })

const mysql = require('serverless-mysql')

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
  },
})

async function query(q) {
  try {
    const results = await db.query(q)
    await db.end()
    return results
  } catch (e) {
    throw Error(e.message)
  }
}

// Create "entries" table if doesn't exist
async function migrate() {
  try {
    await query(`
    
    CREATE TABLE IF NOT EXISTS cms2 (
  id int(11) NOT NULL,
  lang enum('en','fr','ro','') NOT NULL,
  url varchar(255) NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp()
);`);


    await query(`INSERT INTO cms2 (id, lang, url, title, content, created_at) VALUES
(1, 'en', 'dsa', 'ds', 'dsa', '2021-05-19 13:24:24'),
(2, 'fr', 'dsa', 'dsa', 'dsa', '2021-05-19 13:24:24')`);
    console.log('migration ran successfully')
  } catch (e) {
    console.error('could not run migration, double check your credentials.'+e)
    process.exit(1)
  }
}

migrate().then(() => process.exit())
