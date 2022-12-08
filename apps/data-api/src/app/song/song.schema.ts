import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';
import { Genre } from '../../../../../libs/data/src/lib/song.interface'
import { Artist } from '../artist/artist.schema';

export type SongDocument = Song & Document;

@Schema()
export class Song {
    id?: string;

    @Prop({required: true, type: String})
    title?: string;

    @Prop({required: true, type: String})
    publishedOn?: Date;

    @Prop({required: true, type: String})
    songLink?: string;

    @Prop({required: true})
    artist?: ObjectId;

    @Prop({required: true, type: String})
    album?: string;

    @Prop({required: true, type: String})
    coverImage?: string;

    @Prop({required: true, type: [String]})
    genres?: Genre[];
}

export const SongSchema = SchemaFactory.createForClass(Song);