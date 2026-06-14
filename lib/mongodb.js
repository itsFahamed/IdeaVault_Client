import { MongoClient } from 'mongodb'

const uri = process.env.MongoDB_URI

if (!uri) {
  throw new Error('MongoDB_URI is not defined in environment variables')
}

const globalForMongo = globalThis

if (!globalForMongo._mongoClient) {
  globalForMongo._mongoClient = new MongoClient(uri)
}

export const mongoClient = globalForMongo._mongoClient

export function getDb() {
  return mongoClient.db('ideavault')
}
