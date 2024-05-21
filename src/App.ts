import express, { Express } from "express"
import cors from "cors"
import morgan from "morgan"
import { RootRouter } from "./routes/RootRouter"

export class App {
  private static instance: Express
  static getInstance(): Express {
    if (!this.instance) {
      this.instance = express()
      this.instance.use(cors({}))
      this.instance.use(morgan("dev"))
      this.instance.use(express.json())
      this.instance.use(
        express.urlencoded({
          extended: true,
        })
      )
      this.instance.use("/", RootRouter.getRouter())
    }
    return App.instance
  }
}
