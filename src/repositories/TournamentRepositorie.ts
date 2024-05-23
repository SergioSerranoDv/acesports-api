import { Tournament, TournamentModel } from "../models/Tournament"

export interface TournamentRespositorie {
  createTournament(data: Tournament, userId: string): Promise<Tournament>
  findTournamentById(id: string): Promise<Tournament | null>
}
export class TournamentMongoRepositorie implements TournamentRespositorie {
  async createTournament(data: Tournament, userId: string): Promise<Tournament> {
    const newTournament = new TournamentModel({
      ...data,
      user: userId,
    })
    return await newTournament.save()
  }
  async findTournamentById(id: string): Promise<Tournament | null> {
    return await TournamentModel.findById(id)
  }
}
