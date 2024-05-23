import { Tournament, TournamentModel } from "../models/Tournament"

export interface TournamentRespositorie {
  createTournament(data: Tournament, name: string, userId: string): Promise<Tournament>
  findTournamentById(id: string): Promise<Tournament | null>
  findByIdAndUpdate(id: string, data: any): Promise<Tournament | null>
}
export class TournamentMongoRepositorie implements TournamentRespositorie {
  async createTournament(data: Tournament, name: string, userId: string): Promise<Tournament> {
    const newTournament = new TournamentModel({
      ...data,
      name,
      user: userId,
    })
    return await newTournament.save()
  }
  async findTournamentById(id: string): Promise<Tournament | null> {
    return await TournamentModel.findById(id)
  }
  async findByIdAndUpdate(id: string, data: Tournament): Promise<Tournament | null> {
    return await TournamentModel.findByIdAndUpdate(id, data, {
      new: true,
    })
  }
}
