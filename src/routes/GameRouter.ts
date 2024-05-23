import { Request, Response, Router } from "express"
import { GameController } from "../controllers/GameController"
import { DependencyContainer } from "../dependencies/DependencyContainer"

export class GameRouter {
  private static instance: GameRouter
  private router: Router
  private gameController: GameController

  private constructor(gameController: GameController) {
    this.gameController = gameController
    this.router = Router()
    this.router.get("/all", this.getAllGames)
    this.router.post("/new", this.createGame)
    this.router.get("/:id", this.getGameById)
  }
  static getRouter(): Router {
    if (!GameRouter.instance) {
      GameRouter.instance = new GameRouter(DependencyContainer.gameController)
    }
    return GameRouter.instance.router
  }
  private getAllGames = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(403).send({
          message: "unauthorized",
        })
      }
      const response = await this.gameController.getAllGames()
      if (response.status === "error") {
        return res.status(response.code).send({
          status: "error",
          message: response.message,
        })
      }
      return res.status(response.code).send({
        status: response.status,
        data: response.data,
        message: response.message,
      })
    } catch (error: any) {
      return res.status(500).send({
        status: "error",
        message: error.message,
      })
    }
  }
  private createGame = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(403).send({
          message: "unauthorized",
        })
      }
      const userId = req.user.sub
      const response = await this.gameController.createGame(req.body, userId)
      if (response.status === "error") {
        return res.status(response.code).send({
          status: "error",
          message: response.message,
        })
      }
      return res.status(response.code).send({
        status: response.status,
        data: response.data,
        message: response.message,
      })
    } catch (error: any) {
      return res.status(500).send({
        status: "error",
        message: error.message,
      })
    }
  }
  private getGameById = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(403).send({
          message: "unauthorized",
        })
      }
      const id = req.params.id
      const response = await this.gameController.getGameById(id)
      if (response.status === "error") {
        return res.status(response.code).send({
          status: "error",
          message: response.message,
        })
      }
      return res.status(response.code).send({
        status: response.status,
        data: response.data,
        message: response.message,
      })
    } catch (error: any) {
      return res.status(500).send({
        status: "error",
        message: error.message,
      })
    }
  }
}
