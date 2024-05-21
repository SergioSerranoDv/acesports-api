import { Request, Response, Router } from "express"
import { MiddlewareController } from "../middlewares/Authentication"
import { CategoryRouter } from "./CategoryRouter"
import { GameRouter } from "./GameRouter"

export class RootRouter {
  private static instance: RootRouter
  private router: Router
  private constructor() {
    this.router = Router()
    this.router.use(MiddlewareController.verifyToken)
    this.router.get("/", (req: Request, res: Response) => {
      res.send("Hello World")
    })
    this.router.use("/v1/categories", CategoryRouter.getRouter())
    this.router.use("/v1/games", GameRouter.getRouter())
  }
  static getRouter(): Router {
    if (!RootRouter.instance) {
      RootRouter.instance = new RootRouter()
    }
    return RootRouter.instance.router
  }
}
