import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { User, UserSchema } from './user/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema},
        ])
    ],
    controllers: [
        UserController,
    ],
    providers: [
        UserService
    ]
})

export class DataModule {}