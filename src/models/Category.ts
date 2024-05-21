import { Document, model, Schema } from "mongoose"

export interface Category extends Document {
  _id: string
  description: string
  name: string
  user: string
  createdAt: Date
  updatedAt: Date
}
const CategorySchema = new Schema<Category>(
  {
    description: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const CategoryModel = model<Category>("Categories", CategorySchema)
