/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from '../../../../../libs/data/src/lib/game.model';
import { ISong } from 'libs/data/src/lib/song.interface';

@Controller('games')
export class GameController {
    constructor(private readonly gameService: GameService) {

    }

    @Get()
    async getAllGames(): Promise<Game[]> {
        return this.gameService.getAllGames();
    }

    @Get(':id')
    async getGameById(@Param('id') id: string): Promise<Game | null> {       
        return this.gameService.getGameById(id);
    }

    @Get(':id/songs')
    async getGameSongsById(@Param('id') id: string): Promise<ISong[] | null> {
        return this.gameService.getGameSongs(id);
    }

    @Post()
    async addGame(@Body() game: Game) : Promise<Game> {
        return this.gameService.addGame(game.name!, game.amountOfPlays!, game.createdOn!, game.description!, game.genres!, game.songs!, game.isPrivate!, game.madeBy!);
    }

    @Delete(':id')
    async deleteGame(@Param('id') id: string): Promise<boolean> {
        return this.gameService.deleteGame(id);
    }

    @Put(':id')
    async updateGame(@Param('id') id: string, @Body() game: Game) : Promise<Game> {
        return this.gameService.updateGame(id, game.name!, game.amountOfPlays!, game.createdOn!, game.description!, game.genres!, game.songs!, game.isPrivate!, game.madeBy!);
    }

    @Put(':id/plays')
    async updatePlays(@Param('id') id: string, @Body() amountOfPlays: any) : Promise<boolean> {
        return this.gameService.updatePlays(id, parseInt(amountOfPlays['result']));
    }

}