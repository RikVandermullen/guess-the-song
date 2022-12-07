import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Genre, ISong } from 'libs/data/src/lib/song.interface';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type GameDocument = Game & Document;

@Schema()
export class Game {
    id?: string;

    @Prop({required: true})
    name?: string

    @Prop({required: true})
    amountOfPlays?: number

    @Prop({required: true})
    createdOn?: Date

    @Prop({required: true})
    description?: string

    @Prop({required: true})
    genres?: Genre[]

    @Prop({required: true})
    songs?: ISong[];

    @Prop({required: true})
    isPrivate?: boolean;

    @Prop({required: true})
    madeBy?: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);