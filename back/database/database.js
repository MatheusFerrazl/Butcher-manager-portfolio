import pkg from "pg"
import dotenv from "dotenv"

dotenv.config()

const { Pool } = pkg

const pool = new Pool({
  // Em vez de host, port, etc., usamos a URL completa
  connectionString: process.env.DATABASE_URL,
  // OBRIGATÓRIO para o Render aceitar a conexão externa
  ssl: {
    rejectUnauthorized: false
  }
})

export default pool