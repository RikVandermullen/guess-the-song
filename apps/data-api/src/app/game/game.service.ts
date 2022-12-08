/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Game as GameModel, GameDocument } from './game.schema';
import { Song as SongModel, SongDocument } from '../song/song.schema';
import { Game } from '../../../../../libs/data/src/lib/game.model';
import { Genre, ISong } from 'libs/data/src/lib/song.interface';

@Injectable()
export class GameService {
    constructor(@InjectModel(GameModel.name) private gameModel: Model<GameDocument>, @InjectModel(SongModel.name) private songModel: Model<SongDocument>) {

    }

    async getAllGames(isPrivate?: boolean): Promise<Game[]> {
        if (isPrivate) {
            return this.gameModel.find({isPrivate: isPrivate})
        }
        return this.gameModel.find();
    }

    async getGameById(gameId: string): Promise<Game | null> {
        return this.gameModel.findById(gameId);
    }

    async getAllGamesByUserId(userId: string): Promise<Game[]> {
        return this.gameModel.find({madeBy: userId});
    }

    async getGameSongs(gameId: string) : Promise<ISong[]> {
        const game = await this.getGameById(gameId);
        const foundSongs: ISong[] = await this.songModel.find({_id: {$in: game?.songs}});
        return foundSongs;
    }

    async addGame(name: string, amountOfPlays: number, createdOn: Date, description: string, genres: Genre[], songs: ISong[], isPrivate: boolean, madeBy: string) : Promise<Game> {
        const game = new this.gameModel({name, amountOfPlays, createdOn, description, genres, songs, isPrivate, madeBy});
        await game.save();
        return <Game>game;
    }

    async addGameWithRandomSongs(name: string, amountOfPlays: number, createdOn: Date, description: string, genres: Genre[], songs: ISong[], isPrivate: boolean, madeBy: string, amount: number) : Promise<Game> {
        const game = new this.gameModel({name, amountOfPlays, createdOn, description, genres, songs, isPrivate, madeBy});
        await game.save();
        return this.songModel.aggregate([{ $match: { genres: {$in : genres} } } , { $sample: { size: amount } }]).then((result: ISong[]) => {
            return this.updateGame(game.id, name, amountOfPlays, createdOn, description, genres, result, isPrivate, madeBy);            
        });        
    }

    async deleteGame(gameId: string) : Promise<boolean> {       
        await this.gameModel.findById(gameId).deleteOne();
        return true;
    }

    async updateGame(id: string, name: string, amountOfPlays: number, createdOn: Date, description: string, genres: Genre[], songs: ISong[], isPrivate: boolean, madeBy: string) : Promise<Game> {
       
        const result = await this.gameModel.updateOne({_id: id}, {$set: {name, amountOfPlays, createdOn, description, genres, songs, isPrivate, madeBy}});
        
        if (result.modifiedCount == 0) {
            throw new Error('not accepted');
        } else {
            const game = await this.getGameById(id);
            return <Game>game;
        }
    }

    async updatePlays(id: string, amountOfPlays: number) : Promise<boolean> { 
             
        const result = await this.gameModel.updateOne({_id: id}, {$set: {amountOfPlays: amountOfPlays}});
        
        if (result.modifiedCount == 0) {
            throw new Error('not accepted');
        } else {
            return true;
        }
    }
}