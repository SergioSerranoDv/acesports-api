import { Document, model, Schema } from "mongoose"
import { Bracket } from "../interfaces/Bracket"

enum Status {
  preparacion = "preparacion",
  progreso = "progreso",
  finalizado = "finalizado",
}

export interface Tournament extends Document {
  _id: string
  game_id: any
  name: string
  status: Status
  participants: string[]
  initial_date: Date
  final_date: Date
  quantity_participants: number
  brackets: Bracket[]
  user: string
  createdAt: Date
  updatedAt: Date
}
const TournamentSchema = new Schema<Tournament>(
  {
    game_id: {
      type: Schema.Types.ObjectId,
      ref: "Games",
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.preparacion,
    },
    participants: {
      type: [String],
      required: true,
    },
    initial_date: {
      type: Date,
      required: false,
    },
    final_date: {
      type: Date,
      required: false,
    },
    quantity_participants: {
      type: Number,
      required: true,
      default: 0,
    },
    brackets: {
      type: [Object],
      required: true,
    },
    user: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)
export const TournamentModel = model<Tournament>("Tournaments", TournamentSchema)
