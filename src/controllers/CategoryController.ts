import { ErrorHandling } from "../middlewares/ErrorHandling"
import { ApiResponse } from "../interfaces/Api"
import { CategoryRespositorie } from "../repositories/CategorieRepository"

export class CategoryController {
  private categoryRespositorie: CategoryRespositorie

  constructor(categoryRespositorie: CategoryRespositorie) {
    this.categoryRespositorie = categoryRespositorie
  }
  public getAllCategories = async (): Promise<ApiResponse> => {
    try {
      const categories = await this.categoryRespositorie.getAllCategories()
      if (!categories) {
        return {
          code: 404,
          status: "error",
          data: null,
          message: "Categories not found",
        }
      }
      return {
        code: 200,
        status: "success",
        data: categories,
        message: "Categories found successfully",
      }
    } catch (error: any) {
      return ErrorHandling.handleError(error)
    }
  }
  public createCategory = async (category: any, userId: string): Promise<ApiResponse> => {
    try {
      const newCategory = await this.categoryRespositorie.createCategory({
        ...category,
        user: userId,
      })
      if (!newCategory) {
        return {
          code: 500,
          status: "error",
          data: null,
          message: "Category not created",
        }
      }
      return {
        code: 201,
        status: "success",
        data: newCategory,
        message: "Category created successfully",
      }
    } catch (error: any) {
      console.log(error)
      return ErrorHandling.handleError(error)
    }
  }
}
