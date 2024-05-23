import { ErrorHandling } from "../middlewares/ErrorHandling"
import { ApiResponse } from "../interfaces/Api"
import { GameRespositorie } from "../repositories/GameRepositorie"

export class GameController {
  private gameRespositorie: GameRespositorie

  constructor(gameRespositorie: GameRespositorie) {
    this.gameRespositorie = gameRespositorie
  }
  public getAllGames = async (): Promise<ApiResponse> => {
    try {
      const categories = await this.gameRespositorie.getAllGames()
      if (!categories) {
        return {
          code: 404,
          status: "error",
          data: null,
          message: "Games not found",
        }
      }
      return {
        code: 200,
        status: "success",
        data: categories,
        message: "Games found successfully",
      }
    } catch (error: any) {
      return ErrorHandling.handleError(error)
    }
  }
  public getGameById = async (id: string): Promise<ApiResponse> => {
    try {
      const game = await this.gameRespositorie.getGameById(id)
      if (!game) {
        return {
          code: 404,
          status: "error",
          data: null,
          message: "Game not found",
        }
      }
      return {
        code: 200,
        status: "success",
        data: game,
        message: "Game found successfully",
      }
    } catch (error: any) {
      return ErrorHandling.handleError(error)
    }
  }
  public createGame = async (game: any, userId: string): Promise<ApiResponse> => {
    try {
      const newGame = await this.gameRespositorie.createGame({
        ...game,
        user: userId,
      })
      if (!newGame) {
        return {
          code: 500,
          status: "error",
          data: null,
          message: "Game not created",
        }
      }
      return {
        code: 201,
        status: "success",
        data: newGame,
        message: "Game created successfully",
      }
    } catch (error: any) {
      console.log(error)
      return ErrorHandling.handleError(error)
    }
  }
}
