import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    _id: string;

    @Prop({required: true, unique: true, type: String})
    emailAddress?: string;

    @Prop({required: true, type: String})
    name?: string;

    @Prop({required: true, type: String})
    password?: string;
    
    @Prop({required: true, type: String})
    phoneNumber?: string;

    @Prop({ type: Date })
    birthDate?: Date;

    @Prop({ type: [String] })
    roles?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);