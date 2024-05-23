// Interfaces
import { CategoryRespositorie } from "../repositories/CategorieRepository"
import { GameRespositorie } from "../repositories/GameRepositorie"
import { TournamentRespositorie } from "../repositories/TournamentRepositorie"
// Controllers
import { CategoryController } from "../controllers/CategoryController"
import { GameController } from "../controllers/GameController"
import { TournamentController } from "../controllers/TournamentController"
// Repositories
import { CategoryMongoRepositorie } from "../repositories/CategorieRepository"
import { GameMongoRepositorie } from "../repositories/GameRepositorie"
import { TournamentMongoRepositorie } from "../repositories/TournamentRepositorie"
// 2. Config a container to manage dependencies
export class DependencyContainer {
  static categoryRepository: CategoryRespositorie = new CategoryMongoRepositorie()
  static gameRepository: GameRespositorie = new GameMongoRepositorie()
  static tournamentRepository: TournamentRespositorie = new TournamentMongoRepositorie()

  static categoryController: CategoryController = new CategoryController(
    DependencyContainer.categoryRepository
  )
  static gameController: GameController = new GameController(DependencyContainer.gameRepository)
  static tournamentController: TournamentController = new TournamentController(
    DependencyContainer.tournamentRepository,
    DependencyContainer.gameRepository
  )
}
