import { Model } from 'mongoose';
import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './schemas/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  public async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return new this.catModel(createCatDto).save();
  }

  public async findAll() {
    return this.catModel.find().exec();
  }

  public async findOne(id: string) {
    return this.catModel.findOne({ _id: id }).exec();
  }

  public async update(id: string, updateCatDto: UpdateCatDto) {
    return this.catModel.updateOne({ _id: id }, updateCatDto);
  }

  public async remove(id: string) {
    return this.catModel.deleteOne({ _id: id });
  }
}
