import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User as UserModel, UserDocument } from './user.schema';
import { User } from '../../../../../libs/data/src/lib/user.interface'

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel.name) private userModel: Model<UserDocument>) {

    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find();
    }

    async getUserById(userId: string): Promise<User | null> {
        return this.userModel.findById(userId);
    }

    async addUser(name: string, emailAddress: string, password: string, birthDate: Date, phoneNumber: string, roles: string[]) : Promise<User> {
        const user = new this.userModel({ name, emailAddress, password, birthDate, phoneNumber, roles });
        await user.save();

        return <User>user;
    }

    async deleteUser(userId: string) : Promise<boolean> {       
        await this.userModel.findById(userId).deleteOne();
        return true;
    }

    async updateUser(id: string, name: string, emailAddress: string, password: string, birthDate: Date, phoneNumber: string, roles: string[]) : Promise<User> {
       
        const result = await this.userModel.updateOne({_id: id}, {$set: {name: name, emailAddress: emailAddress, password: password, birthDate: birthDate, phoneNumber: phoneNumber, roles: roles}});
        
        if (result.modifiedCount == 0) {
            throw new Error('not accepted');
        } else {
            return <User> await this.getUserById(id);
        }
    }
}