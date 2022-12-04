import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    id: string;

    @Prop({required: true, unique: true})
    emailAddress?: string;

    @Prop({required: true})
    name?: string;

    @Prop({required: true})
    password?: string;
    
    @Prop({required: true})
    phoneNumber?: string;

    @Prop({ type: Date })
    birthDate?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);