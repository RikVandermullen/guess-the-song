import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';
import { User } from '../user/user.schema';

export type ScoreDocument = Score & Document;

@Schema()
export class Score {
    id?: string;

    @Prop({required: true, type: mongoose.Types.ObjectId})
    gameId: ObjectId;

    @Prop({required: true, type: User})
    user: User;

    @Prop({required: true, type: Date})
    dateScored?: Date

    @Prop({required: true, type: Number})
    amountOfRightAnswers?: number

    @Prop({required: true, type: Number})
    amountOfTimePlayed?: number

    @Prop({required: true, type: Number})
    finalScore?: number
}

export const ScoreSchema = SchemaFactory.createForClass(Score);