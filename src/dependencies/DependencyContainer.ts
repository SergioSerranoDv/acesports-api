// Interfaces
import { CategoryRespositorie } from "../repositories/CategorieRepository"
import { GameRespositorie } from "../repositories/GameRepositorie"
// Controllers
import { CategoryController } from "../controllers/CategoryController"
import { GameController } from "../controllers/GameController"
// Repositories
import { CategoryMongoRepositorie } from "../repositories/CategorieRepository"
import { GameMongoRepositorie } from "../repositories/GameRepositorie"

// 2. Config a container to manage dependencies
export class DependencyContainer {
  static categoryRepository: CategoryRespositorie = new CategoryMongoRepositorie()
  static gameRepository: GameRespositorie = new GameMongoRepositorie()

  static categoryController: CategoryController = new CategoryController(
    DependencyContainer.categoryRepository
  )
  static gameController: GameController = new GameController(DependencyContainer.gameRepository)
}
