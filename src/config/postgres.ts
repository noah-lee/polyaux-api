import "dotenv/config";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, {
  transform: postgres.camel
});

export default sql;
