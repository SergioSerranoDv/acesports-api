import { Game, GameModel } from "../models/Game"

export interface GameRespositorie {
  getAllGames(): Promise<Game[]>
  getGameById(id: string): Promise<Game | null>
  createGame(game: Game): Promise<Game>
}
export class GameMongoRepositorie implements GameRespositorie {
  public async getAllGames(): Promise<Game[]> {
    return GameModel.find()
  }
  public async getGameById(id: string): Promise<Game | null> {
    return GameModel.findById(id)
  }
  public async createGame(game: Game): Promise<Game> {
    const newGame = new GameModel(game)
    return await newGame.save()
  }
}
