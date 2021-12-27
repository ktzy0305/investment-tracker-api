import { Model } from 'mongoose';
import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this.transactionModel.create(createTransactionDto);
  }

  findAll() {
    return this.transactionModel.find().exec();
  }

  findOne(_id: string) {
    return this.transactionModel.findOne({ _id }).exec();
  }

  update(_id: string, updateTransactionDto: UpdateTransactionDto) {
    return this.transactionModel.updateOne({ _id }, updateTransactionDto).exec();
  }

  remove(_id: string) {
    return this.transactionModel.deleteOne({ _id }).exec();
  }
}
