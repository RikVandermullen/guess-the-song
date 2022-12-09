import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Genre, ISong } from 'libs/data/src/lib/song.interface';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type GameDocument = Game & Document;

@Schema()
export class Game {
    id?: string;

    @Prop({required: true, type: String})
    name?: string

    @Prop({required: true, type: Number})
    amountOfPlays?: number

    @Prop({required: true, type: Date})
    createdOn?: Date

    @Prop({required: true, type: String})
    description?: string

    @Prop({required: true, type: Array})
    genres?: Genre[]

    @Prop({required: true, type: Array})
    songs?: ISong[];

    @Prop({required: true, type: Boolean})
    isPrivate?: boolean;

    @Prop({required: true, type: String})
    madeBy?: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);