import { TournamentRespositorie } from "../repositories/TournamentRepositorie"
import { ApiResponse } from "../interfaces/Api"
import { ErrorHandling } from "../middlewares/ErrorHandling"
import { Tournament } from "../models/Tournament"

export class TournamentController {
  private tournamentRepository: TournamentRespositorie

  constructor(tournamentRepository: TournamentRespositorie) {
    this.tournamentRepository = tournamentRepository
  }

  public createTournament = async (data: Tournament, userId: string): Promise<ApiResponse> => {
    try {
      const { quantity_participants } = data
      if (quantity_participants % 2 !== 0) {
        return {
          status: "error",
          code: 400,
          message: "The quantity of participants must be an even number",
        }
      }
      const brackets = this.generateBrackets(quantity_participants)
      const newTournament = await this.tournamentRepository.createTournament(data, brackets, userId)
      return {
        status: "success",
        code: 201,
        message: "Tournament created successfully",
        data: newTournament,
      }
    } catch (error) {
      return ErrorHandling.handleError(error)
    }
  }

  public generateBrackets(quantityParticipants: number) {
    const brackets = []
    let matchNumber = 1
    let currentRoundParticipants = quantityParticipants
    while (currentRoundParticipants > 1) {
      for (let i = 0; i < currentRoundParticipants / 2; i++) {
        brackets.push({
          match: matchNumber,
          winner: "",
          player1: "",
          player2: "",
        })
        matchNumber++
      }
      currentRoundParticipants /= 2
    }
    return brackets
  }
  public updateTournament = async (data: any) => {
    const { _id, match, winner } = data
    const tournament = await this.tournamentRepository.findTournamentById(_id)
    if (!tournament) {
      return {
        code: 404,
        status: "error",
        message: "Tournament not found",
      }
    }
    const bracket = tournament.brackets.find((b) => b.match === match)
    if (!bracket) {
      return {
        status: "error",
        message: "Bracket not found",
      }
    }
    const index = tournament.brackets.findIndex((b) => b.match === match)
    bracket.winner = winner
    tournament.brackets[index] = bracket
  }
}
