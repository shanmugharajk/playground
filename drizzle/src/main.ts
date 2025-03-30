import { drizzle } from 'drizzle-orm/libsql'

import { env } from '~/env'

let db = drizzle(env.DB_FILE_NAME)

console.log(db)
