import { Injectable } from '@nestjs/common';

import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Score as ScoreModel, ScoreDocument } from './score.schema';
import { IScore } from '../../../../../libs/data/src/lib/score.interface';
import { User } from 'libs/data/src/lib/user.interface';

@Injectable()
export class ScoreService {
    
    constructor(@InjectModel(ScoreModel.name) private scoreModel: Model<ScoreDocument>) {

    }

    async getScoreByGameIdAndUserId(gameId: string, userId: string) : Promise<IScore[]> {
        const scores = this.scoreModel.aggregate(
            [{$match: { gameId: { $eq: new mongoose.Types.ObjectId(gameId) }, 'user._id': { $eq: new mongoose.Types.ObjectId(userId) } } }, { $sort : { dateScored : -1 } }, { $limit : 1 }]
        );
        
        return scores;
    }

    async getScoresByGameId(gameId: string, limit: number) : Promise<IScore[]> {
        return this.scoreModel.aggregate(
            [{$match: { gameId: { $eq: new mongoose.Types.ObjectId(gameId) } }},{ $limit : limit }, { $sort : { finalScore : -1 } }]
        );
    }

    async addScore(gameId: string, user: User, dateScored: Date, amountOfRightAnswers: number, amountOfTimePlayed: number, finalScore: number) : Promise<IScore> {
        const score = new this.scoreModel({gameId, user, dateScored, amountOfRightAnswers, amountOfTimePlayed, finalScore});
        await score.save();
        return score.toObject();
    }

    async getLeaderboardPlace(gameId: string, score: number) : Promise<number> {        
        return this.scoreModel.find({gameId: gameId, finalScore: {$gt: score}}).count();
    }
}