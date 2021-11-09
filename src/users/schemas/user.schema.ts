import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    username: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ default: 'USER' })
    role: string

    @Prop({ default: Date.now() })
    registered_on: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);