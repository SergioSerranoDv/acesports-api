import { Request, Response, Router } from "express"
import { CategoryController } from "../controllers/CategoryController"
import { DependencyContainer } from "../dependencies/DependencyContainer"

export class CategoryRouter {
  private static instance: CategoryRouter
  private router: Router
  private categoryController: CategoryController
  private constructor(categoryController: CategoryController) {
    this.categoryController = categoryController
    this.router = Router()
    this.categoryController = categoryController
    this.router.get("/all", this.getAllCategories)
    this.router.post("/new", this.createCategory)
  }
  static getRouter(): Router {
    if (!CategoryRouter.instance) {
      CategoryRouter.instance = new CategoryRouter(DependencyContainer.categoryController)
    }
    return CategoryRouter.instance.router
  }
  private getAllCategories = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(403).send({
          message: "unauthorized",
        })
      }
      const response = await this.categoryController.getAllCategories()
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
  private createCategory = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(403).send({
          message: "unauthorized",
        })
      }
      const userId = req.user.sub

      const response = await this.categoryController.createCategory(req.body, userId)
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
