import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { User, UserSchema } from './user/user.schema';

import { SongService } from './song/song.service';
import { SongController } from './song/song.controller';
import { Song, SongSchema } from './song/song.schema';

import { ArtistService } from './artist/artist.service';
import { ArtistController } from './artist/artist.controller';
import { Artist, ArtistSchema } from './artist/artist.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema},
            { name: Song.name, schema: SongSchema},
            { name: Artist.name, schema: ArtistSchema},
        ])
    ],
    controllers: [
        UserController,
        SongController,
        ArtistController,
    ],
    providers: [
        UserService,
        SongService,
        ArtistService,
    ]
})

export class DataModule {}