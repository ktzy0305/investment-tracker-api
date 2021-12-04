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

  findOne(id: number) {
    return this.transactionModel.findOne({ id }).exec();
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.transactionModel.updateOne({ id }, updateTransactionDto).exec();
  }

  remove(id: number) {
    return this.transactionModel.deleteOne({ id }).exec();
  }
}
