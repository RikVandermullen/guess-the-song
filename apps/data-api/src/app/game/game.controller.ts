/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from '../../../../../libs/data/src/lib/game.model';
import { ISong } from 'libs/data/src/lib/song.interface';
import { PlayerGuard } from '../auth/player.guard';

@Controller('games')
export class GameController {
    constructor(private readonly gameService: GameService) {

    }

    @Get("?")
    async getAllGames(@Query('private') isPrivate?: boolean): Promise<Game[]> {
        return this.gameService.getAllGames(isPrivate);
    }

    @Get("user/:id")
    async getAllGamesByUserId(@Param('id') userId: string): Promise<Game[]> {
        return this.gameService.getAllGamesByUserId(userId);
    }

    @Get(':id')
    @UseGuards(PlayerGuard)
    async getGameById(@Param('id') id: string): Promise<Game | null> {       
        return this.gameService.getGameById(id);
    }

    @Get(':id/songs')
    @UseGuards(PlayerGuard)
    async getGameSongsById(@Param('id') id: string): Promise<ISong[] | null> {
        return this.gameService.getGameSongs(id);
    }

    @Post()
    @UseGuards(PlayerGuard)
    async addGame(@Body() game: Game) : Promise<Game> {
        return this.gameService.addGame(game.name!, game.amountOfPlays!, game.createdOn!, game.description!, game.genres!, game.songs!, game.isPrivate!, game.madeBy!);
    }

    @Post("random?")
    @UseGuards(PlayerGuard)
    async addGameWithRandomSongs(@Body() game: Game, @Query('amount') amount: string) : Promise<Game> {
        return this.gameService.addGameWithRandomSongs(game.name!, game.amountOfPlays!, game.createdOn!, game.description!, game.genres!, <ISong[]>game.songs!, game.isPrivate!, game.madeBy!, parseInt(amount));
    }

    @Delete(':id')
    @UseGuards(PlayerGuard)
    async deleteGame(@Param('id') id: string): Promise<boolean> {
        return this.gameService.deleteGame(id);
    }

    @Put(':id')
    @UseGuards(PlayerGuard)
    async updateGame(@Param('id') id: string, @Body() game: Game) : Promise<Game> {
        return this.gameService.updateGame(id, game.name!, game.amountOfPlays!, game.createdOn!, game.description!, game.genres!, game.songs!, game.isPrivate!, game.madeBy!);
    }

    @Put(':id/plays')
    @UseGuards(PlayerGuard)
    async updatePlays(@Param('id') id: string, @Body() amountOfPlays: any) : Promise<boolean> {       
        return this.gameService.updatePlays(id, parseInt(amountOfPlays['result']));
    }

}