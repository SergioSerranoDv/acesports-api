import { Document, model, Schema } from "mongoose"

export interface Game extends Document {
  _id: string
  category_id: any
  description: string
  image: string
  name: string
  createdAt: Date
  updatedAt: Date
}
const GameSchema = new Schema<Game>(
  {
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

export const GameModel = model<Game>("Games", GameSchema)
