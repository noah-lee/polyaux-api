/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

// uuid: https://www.postgresql.org/docs/current/functions-uuid.html
// Current date/time: https://www.postgresql.org/docs/15/functions-datetime.html#FUNCTIONS-DATETIME-CURRENT
// Trigger functions: https://www.postgresql.org/docs/15/plpgsql-trigger.html
export async function up(pgm: MigrationBuilder) {
  pgm.sql(`
    CREATE TABLE users(
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
    );

    CREATE OR REPLACE FUNCTION update_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = current_timestamp;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER trigger_update_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
  `);
}

export async function down(pgm: MigrationBuilder) {
  pgm.sql(`
    DROP TRIGGER IF EXISTS trigger_update_updated_at ON users;
    DROP FUNCTION IF EXISTS update_updated_at();
    DROP TABLE IF EXISTS users;
  `);
}
