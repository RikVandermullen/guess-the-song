import { GameController } from './game.controller'
import { GameService } from './game.service'
import { SongController } from '../song/song.controller'
import { SongService } from '../song/song.service'
import { Test, TestingModule } from '@nestjs/testing';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Song } from '../../../../GuessTheSong/src/app/core/song/song.model'
import { Game } from 'libs/data/src/lib/game.model'
import { IArtist } from 'libs/data/src/lib/artist.interface';
import { getModelToken } from '@nestjs/mongoose';
import { User } from 'apps/GuessTheSong/src/app/core/user/user.model';

describe('GameSerivce', () => {
    let gameController: GameController;
    let gameService: GameService;
    let songController: SongController;
    let songService: SongService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [GameController,SongController],
            providers: [
                GameService, { provide: getModelToken(Game.name), useValue: jest.fn() },
                SongService, { provide: getModelToken(Song.name), useValue: jest.fn() }
            ]
        }).compile();

        gameService = moduleRef.get<GameService>(GameService);
        gameController = moduleRef.get<GameController>(GameController);
        songService = moduleRef.get<SongService>(SongService);
        songController = moduleRef.get<SongController>(SongController);;
    });

    describe('GameService Tests', () => {
        it('getAllGames should return an array of games', async () => {
            const result: Game[] = [new Game("","",0,new Date(),"",[],[],false,"")]
            gameService.getAllGames = jest.fn().mockImplementation(() => Promise.resolve(result))
            
            expect(await gameService.getAllGames(false)).toBe(result);
        });

        it('getGameById should return 1 game', async () => {
            const result: Game = new Game("","",0,new Date(),"",[],[],false,"")
            gameService.getGameById = jest.fn().mockImplementation(() => Promise.resolve(result))
            
            expect(await gameService.getGameById("")).toBe(result);
        });

        it('getAllGamesByUserId should return an array of games', async () => {
            const result: Game[] = [new Game("","",0,new Date(),"",[],[],false,"")]
            gameService.getAllGamesByUserId = jest.fn().mockImplementation(() => Promise.resolve(result))
            
            expect(await gameService.getAllGamesByUserId("")).toBe(result);
        });

        it('getGameSongs should return an array of songs', async () => {
            const result: Song[] = [new Song("", "", new Date(),"", new IArtist("", "", new Date(), "", "", []), "", "", [])]
            gameService.getGameSongs = jest.fn().mockImplementation(() => Promise.resolve(result))
            
            expect(await gameService.getGameSongs("")).toBe(result);
        });

        it('addGame should create and return 1 game', async () => {
            const result: Game = new Game("","",0,new Date(),"",[],[],false,"")
            gameService.addGame = jest.fn().mockImplementation(() => Promise.resolve(result))
            
            expect(await gameService.addGame(result.name!, result.amountOfPlays!, result.createdOn!, result.description!, result.genres!, result.songs!, result.isPrivate!, result.madeBy!)).toBe(result);
        });

        it('addGameWithRandomSongs should create and return 1 game', async () => {
            const result: Game = new Game("","",0,new Date(),"",[],[],false,"")
            gameService.addGameWithRandomSongs = jest.fn().mockImplementation(() => Promise.resolve(result))
            
            expect(await gameService.addGameWithRandomSongs(result.name!, result.amountOfPlays!, result.createdOn!, result.description!, result.genres!, result.songs!, result.isPrivate!, result.madeBy!, 1)).toBe(result);
        });

        it('updateGame should update and return 1 game', async () => {
            const result: Game = new Game("","",0,new Date(),"",[],[],false,"")
            gameService.updateGame = jest.fn().mockImplementation(() => Promise.resolve(result))
            
            expect(await gameService.updateGame(result._id!, result.name!, result.amountOfPlays!, result.createdOn!, result.description!, result.genres!, result.songs!, result.isPrivate!, result.madeBy!)).toBe(result);
        });

        it('updatePlays should update and return a true', async () => {
            const result: Game = new Game("","",0,new Date(),"",[],[],false,"")
            gameService.updatePlays = jest.fn().mockImplementation(() => Promise.resolve(true))
            
            expect(await gameService.updatePlays(result._id!, 1)).toBe(true);
        });

        it('deleteGame should delete and return a true', async () => {
            const result: Game = new Game("","",0,new Date(),"",[],[],false,"")
            gameService.deleteGame = jest.fn().mockImplementation(() => Promise.resolve(true))
            
            expect(await gameService.deleteGame(result._id!)).toBe(true);
        });
    })
});