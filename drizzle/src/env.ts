import 'dotenv/config'

import { z } from 'zod'

// Define the Zod schema for the DB_FILE_NAME environment variable
let envSchema = z.object({
  DB_FILE_NAME: z.string().min(1, 'DB_FILE_NAME is required'),
})

// Validate the environment variables
let result = envSchema.safeParse(process.env)

if (!result.success) {
  console.error('❌ Invalid environment variables:', result.error.format())
  process.exit(1) // Exit the process if validation fails
}

export let env = result.data
