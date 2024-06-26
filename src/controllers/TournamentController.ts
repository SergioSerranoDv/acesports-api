import { TournamentRespositorie } from "../repositories/TournamentRepositorie"
import { GameRespositorie } from "../repositories/GameRepositorie"
import { ApiResponse } from "../interfaces/Api"
import { ErrorHandling } from "../middlewares/ErrorHandling"
import { Tournament } from "../models/Tournament"

export class TournamentController {
  private tournamentRepository: TournamentRespositorie
  private gameRepository: GameRespositorie

  constructor(tournamentRepository: TournamentRespositorie, gameRepository: GameRespositorie) {
    this.tournamentRepository = tournamentRepository
    this.gameRepository = gameRepository
  }
  public getTournamentsByUserId = async (userId: string): Promise<ApiResponse> => {
    try {
      const tournaments = await this.tournamentRepository.getTournametsBysUserId(userId)
      if (!tournaments) {
        return {
          code: 404,
          status: "error",
          message: "Tournaments not found",
          data: null,
        }
      }
      return {
        status: "success",
        code: 200,
        message: "Tournaments found",
        data: tournaments,
      }
    } catch (error) {
      return ErrorHandling.handleError(error)
    }
  }
  public getTournamentById = async (tournamentId: string): Promise<ApiResponse> => {
    try {
      const tournament = await this.tournamentRepository.findTournamentById(tournamentId)
      if (!tournament) {
        return {
          code: 404,
          status: "error",
          message: "Tournament not found",
          data: null,
        }
      }
      return {
        status: "success",
        code: 200,
        message: "Tournament found",
        data: tournament,
      }
    } catch (error) {
      return ErrorHandling.handleError(error)
    }
  }
  public createTournament = async (data: Tournament, userId: string): Promise<ApiResponse> => {
    try {
      const { game_id } = data
      const game = await this.gameRepository.getGameById(game_id)
      const name = "Torneo de " + game?.name || ""
      const newTournament = await this.tournamentRepository.createTournament(data, name, userId)
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
  public updateBracket = async (tournamentId: string, data: any): Promise<ApiResponse> => {
    const { match, winner, player1, player2 } = data
    try {
      const tournament = await this.tournamentRepository.findTournamentById(tournamentId)
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
          code: 404,
          status: "error",
          message: "Bracket not found",
        }
      }
      const index = tournament.brackets.findIndex((b) => b.match === match)
      if (player1) {
        bracket.player1 = player1
      }
      if (player2) {
        bracket.player2 = player2
      }
      tournament.brackets[index] = bracket

      if (bracket.winner !== "" && bracket.winner !== winner) {
        bracket.winner = winner
        const nextMatchIndex =
          Math.floor((match - 1) / 2) + Math.ceil(tournament.quantity_participants / 2)
        if (nextMatchIndex < tournament.brackets.length) {
          const isPlayer1 = match % 2 !== 0
          if (isPlayer1) {
            tournament.brackets[nextMatchIndex].player1 = winner
          } else {
            tournament.brackets[nextMatchIndex].player2 = winner
          }
        }
      }
      await this.tournamentRepository.findByIdAndUpdate(tournamentId, {
        brackets: tournament.brackets,
      })
      return {
        status: "success",
        code: 200,
        message: "Bracket updated successfully",
        data: tournament,
      }
    } catch (error) {
      return ErrorHandling.handleError(error)
    }
  }
  public updateQuantityPlayers = async (
    tournamentId: string,
    data: Tournament
  ): Promise<ApiResponse> => {
    try {
      const { quantity_participants } = data
      const tournament = await this.tournamentRepository.findTournamentById(tournamentId)
      if (!tournament) {
        return {
          code: 404,
          status: "error",
          message: "Tournament not found",
        }
      }
      if (tournament.brackets.length > 0) {
        await this.tournamentRepository.findByIdAndUpdate(tournamentId, {
          brackets: [],
        })
      }
      const brackets = this.generateBrackets(quantity_participants)
      tournament.brackets = brackets
      tournament.quantity_participants = quantity_participants
      const updatedTournament = await this.tournamentRepository.findByIdAndUpdate(
        tournamentId,
        tournament
      )
      return {
        status: "success",
        code: 200,
        message: "Quantity players updated successfully",
        data: updatedTournament,
      }
    } catch (error) {
      return ErrorHandling.handleError(error)
    }
  }
  public updateTournament = async (
    tournamentId: string,
    data: Tournament
  ): Promise<ApiResponse> => {
    try {
      const tournament = await this.tournamentRepository.findByIdAndUpdate(tournamentId, data)
      if (!tournament) {
        return {
          code: 404,
          status: "error",
          message: "Tournament not found",
          data: null,
        }
      }
      return {
        status: "success",
        code: 200,
        message: "Tournament updated successfully",
        data: tournament,
      }
    } catch (error) {
      return ErrorHandling.handleError(error)
    }
  }
}
