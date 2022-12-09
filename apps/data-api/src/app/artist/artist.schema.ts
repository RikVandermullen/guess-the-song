import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
    id?: string;

    @Prop({required: true, type: String})
    name?: string

    @Prop({required: true, type: Date})
    birthDate?: Date

    @Prop({required: true, type: String})
    description?: string

    @Prop({required: true, type: String})
    image?: string

    @Prop({required: true, type: [String]})
    songs?: string[];
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);