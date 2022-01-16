import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
    @Prop()
    action: string;

    @Prop()
    asset: string;

    @Prop()
    quantity: number;

    @Prop()
    price_per_unit: number;

    @Prop()
    fees: number;

    @Prop({ default: Date.now() })
    transaction_date: Date;

    @Prop()
    notes: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    created_by: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);