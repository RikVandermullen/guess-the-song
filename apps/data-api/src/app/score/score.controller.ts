import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ScoreService } from './score.service';
import {IScore } from '../../../../../libs/data/src/lib/score.interface';

@Controller('scores')
export class ScoreController {
    constructor(private readonly scoreService: ScoreService) {

    }

    @Get("games/:gameId/users/:userId")
    async getScoreByGameIdAndUserId(@Param('gameId') gameId: string, @Param('userId') userId: string) : Promise<IScore[]> {              
        return this.scoreService.getScoreByGameIdAndUserId(gameId, userId);
    }

    @Get("games/:gameId?")
    async getScoresByGameId(@Param('gameId') gameId: string, @Query('limit') limit: string) : Promise<IScore[]> {
        return this.scoreService.getScoresByGameId(gameId, parseInt(limit));
    }

    @Get("games/:gameId/leaderboard?")
    async getLeaderboardPlace(@Param('gameId') gameId: string, @Query('score') score: string) : Promise<number> {
        return this.scoreService.getLeaderboardPlace(gameId, parseInt(score));
    }

    @Get("leaderboard")
    async getTopLeaderboard() : Promise<IScore[]> {
        return this.scoreService.getTopLeaderboard();
    }

    @Post()
    async addScore(@Body() score: IScore) : Promise<IScore> {
        return this.scoreService.addScore(score.gameId, score.user, score.dateScored, score.amountOfRightAnswers, score.amountOfTimePlayed, score.finalScore);
    }
}