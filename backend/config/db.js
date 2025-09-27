import { neon } from '@neondatabase/serverless'
import dotenv from 'dotenv'

dotenv.config()

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env

// creates a SQL connection using our new env variables
export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`,
)

// this sql function we export is used as a tagged template or literal, which allow sus to write SQL queries safely

// postgresql://neondb_owner:npg_L6WUc3shaMkB@ep-withered-fire-a8bf7mbq-pooler.eastus2.azure.neon.tech/neondb?sslmode=require