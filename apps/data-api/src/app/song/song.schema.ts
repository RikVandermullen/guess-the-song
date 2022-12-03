import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Genre } from '../../../../../libs/data/src/lib/song.interface'

export type SongDocument = Song & Document;

@Schema()
export class Song {
    id?: string;

    @Prop({required: true})
    title?: string;

    @Prop({required: true})
    publishedOn?: Date;

    @Prop({required: true})
    songLink?: string;

    @Prop({required: true})
    artist?: string;

    @Prop({required: true})
    album?: string;

    @Prop({required: true})
    coverImage?: string;

    @Prop({required: true})
    genres?: Genre[];
}

export const SongSchema = SchemaFactory.createForClass(Song);