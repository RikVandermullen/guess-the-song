import { Injectable } from '@nestjs/common';

import { JwtPayload, verify, sign } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Identity, IdentityDocument } from './identity.schema';
import { User, UserDocument } from '../user/user.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Identity.name) private identityModel: Model<IdentityDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async verifyToken(token: string): Promise<string | JwtPayload> {
        return new Promise((resolve, reject) => {
            verify(token, "Secret", (err, payload:any) => {
                if (err) reject(err);
                else resolve(payload);
            })
        })
    }

    async createUser(name: string, emailAddress: string, password: string, birthDate: Date, phoneNumber: string) : Promise<string> {
        const user = new this.userModel({ name: name, emailAddress: emailAddress, password: password, birthDate: birthDate, phoneNumber: phoneNumber });
        console.log(user);
        
        await user.save();
        return user.id;
    }

    async getUserIdByEmailAddress(emailAddress: string) : Promise<string | null> {
        return this.userModel.findOne({emailAddress: emailAddress}, {_id: 1});
    }

    async registerUser(emailAddress: string, password: string) {
        const generatedHash = await hash(password, parseInt("5", 10));        
        const identity = new this.identityModel({emailAddress:emailAddress, hash: generatedHash}); 
        console.log(identity);
               
        await identity.save();
    }

    async generateToken(emailAddress: string, password: string): Promise<string> {
        const identity = await this.identityModel.findOne({emailAddress: emailAddress});

        if (!identity || !(await compare(password, identity.hash))) throw new Error("user not authorized");

        const user = await this.userModel.findOne({emailAddress: emailAddress});
        
        return new Promise((resolve, reject) => {
            sign({emailAddress, id: user!.id}, "Secret", (err: any, token: any) => {
                if (err) reject(err);
                else resolve(token);
            });
        })
    }
}