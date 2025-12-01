import { MongoClient } from 'mongodb'

const options = {}

function getMongoUri(): string {
  const uri = process.env.MONGODB_URL_DEVELOPMENT
  if (!uri) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URL_DEVELOPMENT"')
  }
  return uri
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

function getClientPromise(): Promise<MongoClient> {
  const uri = getMongoUri()
  
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options)
      globalWithMongo._mongoClientPromise = client.connect()
    }
    return globalWithMongo._mongoClientPromise
  } else {
    // In production mode, it's best to not use a global variable.
    if (!clientPromise) {
      client = new MongoClient(uri, options)
      clientPromise = client.connect()
    }
    return clientPromise
  }
}

// Export a function that returns the client promise
// This allows environment variables to be loaded before the connection is created
export default function getClient() {
  return getClientPromise()
}

