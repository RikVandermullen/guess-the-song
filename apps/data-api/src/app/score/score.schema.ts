import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';
import { User } from '../user/user.schema';

export type ScoreDocument = Score & Document;

@Schema()
export class Score {
    id?: string;

    @Prop({required: true})
    gameId: ObjectId;

    @Prop({required: true, type: User})
    user: User;

    @Prop({required: true})
    dateScored?: Date

    @Prop({required: true})
    amountOfRightAnswers?: number

    @Prop({required: true})
    amountOfTimePlayed?: number

    @Prop({required: true})
    finalScore?: number
}

export const ScoreSchema = SchemaFactory.createForClass(Score);