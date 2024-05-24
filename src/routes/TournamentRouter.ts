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
    this.router.get("/by-user", this.getTournamentsByUserId)
    this.router.get("/:id", this.getTournamentById)
    this.router.post("/new", this.createTournament)
    this.router.put("/update-quantity-players/:id", this.updateQuantityPlayersByTournamentId)
    this.router.put("/update/:id", this.updateTournament)
    this.router.put("/update-bracket/:id", this.updateTournamentBracket)
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
      console.log(userId)
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
  private updateTournament = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(403).send({
          message: "unauthorized",
        })
      }
      const tournamentId = req.params.id
      const data = req.body
      const response = await this.tournamentController.updateTournament(tournamentId, data)
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
  private updateQuantityPlayersByTournamentId = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(403).send({
          message: "unauthorized",
        })
      }
      const tournamentId = req.params.id
      const data = req.body
      const response = await this.tournamentController.updateQuantityPlayers(tournamentId, data)
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
  private getTournamentsByUserId = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(403).send({
          message: "unauthorized",
        })
      }
      const userId = req.user.sub
      const response = await this.tournamentController.getTournamentsByUserId(userId)
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
  private getTournamentById = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(403).send({
          message: "unauthorized",
        })
      }
      const id = req.params.id
      const response = await this.tournamentController.getTournamentById(id)
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
  private updateTournamentBracket = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(403).send({
          message: "unauthorized",
        })
      }
      const tournamentId = req.params.id
      const data = req.body
      const response = await this.tournamentController.updateBracket(tournamentId, data)
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
