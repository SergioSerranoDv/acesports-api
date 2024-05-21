import mongoose from "mongoose"
export class MongoDb {
  private static instance: MongoDb
  private constructor() {}

  static getInstance(): MongoDb {
    if (!MongoDb.instance) {
      MongoDb.instance = new MongoDb()
    }
    return MongoDb.instance
  }
  async connectToDatabase() {
    try {
      const connection = await mongoose.connect(`${process.env.MONGO_URI}` as string)
      return {
        status: "connected",
        connection,
        db: `${connection.connection.host}:${connection.connection.db.namespace}:${connection.connection.port}`,
      }
    } catch (error) {
      return {
        status: "error",
        error,
      }
    }
  }
}
