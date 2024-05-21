import { CategoryModel } from "../models/Category"
import { Category } from "../models/Category"

export interface CategoryRespositorie {
  getAllCategories(): Promise<Category[]>
  createCategory(category: Category): Promise<Category>
}
export class CategoryMongoRepositorie implements CategoryRespositorie {
  public async getAllCategories(): Promise<Category[]> {
    return CategoryModel.find()
  }
  public async createCategory(category: Category): Promise<Category> {
    const newCategory = new CategoryModel(category)
    return await newCategory.save()
  }
}
