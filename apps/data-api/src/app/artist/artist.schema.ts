import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
    id?: string;

    @Prop({required: true})
    name?: string

    @Prop({required: true})
    birthDate?: Date

    @Prop({required: true})
    description?: string

    @Prop({required: true})
    image?: string

    @Prop({required: true})
    songs?: string[];
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);