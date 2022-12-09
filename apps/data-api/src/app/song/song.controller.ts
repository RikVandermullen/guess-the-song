import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { SongService } from './song.service';
import { ISong } from '../../../../../libs/data/src/lib/song.interface'
import mongoose, { ObjectId } from 'mongoose';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { PlayerGuard } from '../auth/player.guard';

@Controller('songs')
export class SongController {
    constructor(private readonly songService: SongService) {

    }

    @Get()
    async getAllSongs(): Promise<ISong[]> {
        return this.songService.getAllSongs();
    }

    @Get(':id')
    async getSongById(@Param('id') id: string): Promise<ISong[]> {
        return this.songService.getSongById(id);
    }

    @Post()
    @UseGuards(AdminGuard)
    async addSong(@Body() song: ISong) : Promise<ISong[]> {              
        return this.songService.addSong(song.title, song.publishedOn, song.songLink, song.artist._id, song.album, song.coverImage, song.genres);
    }

    @Post('/array')
    @UseGuards(PlayerGuard)
    async getSongByIdArray(@Body() ids: string[]): Promise<ISong[]> {                              
        return this.songService.getSongsByIdArray(ids);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    async deleteSong(@Param('id') id: string): Promise<boolean> {
        return this.songService.deleteSong(id);
    }

    @Put(':id')
    @UseGuards(AdminGuard)
    async updateSong(@Param('id') id: string, @Body() song: ISong) : Promise<ISong[]> {
        return this.songService.updateSong(id, song.title, song.publishedOn, song.songLink, song.artist._id, song.album, song.coverImage, song.genres);
    }

}