import { Request, Response, Router } from "express"
import { TournamentController } from "../controllers/TournamentController"
import { DependencyContainer } from "../dependencies/DependencyContainer"

export class TournamentRouter {
  private static instance: TournamentRouter
  private router: Router
  private tournamentController: TournamentController

  private constructor(tournamentController: TournamentController) {
    this.tournamentController = tournamentController
    this.router = Router()
    this.router.post("/new", this.createTournament)
  }
  static getRouter(): Router {
    if (!TournamentRouter.instance) {
      TournamentRouter.instance = new TournamentRouter(DependencyContainer.tournamentController)
    }
    return TournamentRouter.instance.router
  }
  private createTournament = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(403).send({
          message: "unauthorized",
        })
      }
      const data = req.body
      const userId = req.user.sub
      const response = await this.tournamentController.createTournament(data, userId)
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
