// frontend/env.config.ts
import { config } from 'dotenv'
import path from 'path'

const loadEnv = () => {
  if (process.env.npm_lifecycle_event?.includes('build') || 
      process.env.npm_lifecycle_event?.includes('start')) {
    config({ path: path.resolve(process.cwd(), '.env.production') })
  } else if (process.env.npm_lifecycle_event?.includes('dev')) {
    config({ path: path.resolve(process.cwd(), '.env.local') })
  }
}

export default loadEnv