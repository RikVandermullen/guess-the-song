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

import { GameService } from './game/game.service';
import { GameController } from './game/game.controller';
import { Game, GameSchema } from './game/game.schema';

import { ScoreService } from './score/score.service';
import { ScoreController } from './score/score.controller';
import { Score, ScoreSchema } from './score/score.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema},
            { name: Song.name, schema: SongSchema},
            { name: Artist.name, schema: ArtistSchema},
            { name: Game.name, schema: GameSchema},
            { name: Score.name, schema: ScoreSchema},
        ])
    ],
    controllers: [
        UserController,
        SongController,
        ArtistController,
        GameController,
        ScoreController
    ],
    providers: [
        UserService,
        SongService,
        ArtistService,
        GameService,
        ScoreService
    ]
})

export class DataModule {}