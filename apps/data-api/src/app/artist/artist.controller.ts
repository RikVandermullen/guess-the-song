import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { IArtist } from '../../../../../libs/data/src/lib/artist.interface'
import { ISong } from 'libs/data/src/lib/song.interface';

@Controller('artists')
export class ArtistController {
    constructor(private readonly artistService: ArtistService) {

    }

    @Get()
    async getAllArtists(): Promise<IArtist[]> {
        return this.artistService.getAllArtists();
    }

    @Get(':id')
    async getArtistById(@Param('id') id: string): Promise<IArtist | null> {
        return this.artistService.getArtistById(id);
    }

    @Get(':id/songs')
    async getArtistSongsById(@Param('id') id: string): Promise<ISong[] | null> {
        return this.artistService.getArtistSongs(id);
    }

    @Post()
    async addArtist(@Body() artist: IArtist) : Promise<IArtist> {
        let songs = artist.songs.map(song => song._id);            
        return this.artistService.addArtist(artist.name, artist.birthDate, artist.description, artist.image, songs);
    }

    @Delete(':id')
    async deleteArtist(@Param('id') id: string): Promise<boolean> {
        return this.artistService.deleteArtist(id);
    }

    @Put(':id')
    async updateArtist(@Param('id') id: string, @Body() artist: IArtist) : Promise<IArtist> {
        let songs = artist.songs.map(song => song._id);     
        return this.artistService.updateArtist(id, artist.name, artist.birthDate, artist.description, artist.image, songs);
    }

}