import { Body, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private usersModel: Model<UserDocument> ){}
    
    public async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        // Check if user exists in database
        const user = await this.usersModel.findOne({username: createUserDto.username});
        if(user) {
            throw new HttpException('User already exists.', 403);
        }
        else{
            // Generate salt to hash password
            const salt = await bcrypt.genSalt(10);
            // Get password plaintext
            const password = createUserDto.password;
            // Hash password
            const password_hash = await bcrypt.hash(password, salt);
            // Set user password as hashed password
            createUserDto.password = password_hash;

            return new this.usersModel(createUserDto).save()
        }
    }

    public async findAll(): Promise<User[]> {
        return this.usersModel.find().exec();
    }
    
    public async findOne(username: string): Promise<User> {
        return this.usersModel.findOne({username: username});
    }
    
    public async update(_id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersModel.findByIdAndUpdate(_id, updateUserDto);
    }

    public async delete(_id: string): Promise<User> {
        return this.usersModel.findByIdAndDelete(_id);
    }
}