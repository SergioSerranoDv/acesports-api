import { App } from "./App"
import { MongoDb } from "../db/Mongo"
import dotenv from "dotenv"

dotenv.config({
  path: ".env.development",
})

export class Server {
  private static instance: Server

  private constructor() {
    this.start()
  }
  static getInstance(): Server {
    if (!Server.instance) {
      Server.instance = new Server()
    }
    return Server.instance
  }

  private async start() {
    try {
      const mongoDb = MongoDb.getInstance()
      const connetionResult = await mongoDb.connectToDatabase()
      if (connetionResult.status === "connected") {
        console.log("Connected to database", connetionResult.db)
        const app = App.getInstance()
        app.listen(`${process.env.PORT}`, () => {
          console.log("Server running on port", process.env.PORT)
        })
      } else {
        console.error("Failed to connect to database")
        process.exit(1)
      }
    } catch (error) {
      console.error("Failed to start server", error)
      process.exit(1)
    }
  }
}
