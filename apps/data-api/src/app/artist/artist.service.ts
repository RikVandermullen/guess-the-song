import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Artist as ArtistModel, ArtistDocument } from './artist.schema';
import { Song as SongModel, SongDocument } from '../song/song.schema';
import { IArtist } from '../../../../../libs/data/src/lib/artist.interface'
import { ISong } from 'libs/data/src/lib/song.interface';

@Injectable()
export class ArtistService {
    constructor(@InjectModel(ArtistModel.name) private artistModel: Model<ArtistDocument>, @InjectModel(SongModel.name) private songModel: Model<SongDocument>) {

    }

    async getAllArtists(): Promise<IArtist[]> {
        return this.artistModel.find();
    }

    async getArtistById(artistId: string): Promise<IArtist | null> {
        return this.artistModel.findById(artistId);
    }

    async getArtistSongs(artistId: string) : Promise<ISong[]> {
        const artist = await this.getArtistById(artistId);
        const foundSongs: ISong[] = await this.songModel.find({_id: {$in: artist!.songs}});
        return foundSongs;
    }

    async addArtist(name: string, birthDate: Date, description: string, image: string, songs: string[]) : Promise<IArtist> {
        const artist = new this.artistModel({name, birthDate, description, image, songs});
        await artist.save();

        const foundSongs: ISong[] = await this.songModel.find({_id: {$in: artist.songs}});
        const artistToReturn = new IArtist(artist._id, artist.name!, artist.birthDate!, artist.description!, artist.image!, foundSongs);
        return artistToReturn;
    }

    async deleteArtist(artistId: string) : Promise<boolean> {       
        await this.artistModel.findById(artistId).deleteOne();
        return true;
    }

    async updateArtist(id: string, name: string, birthDate: Date, description: string, image: string, songs: string[]) : Promise<IArtist> {
       
        const result = await this.artistModel.updateOne({_id: id}, {$set: {name: name, birthDate: birthDate, description: description, image: image, songs: songs}});
        
        if (result.modifiedCount == 0) {
            throw new Error('not accepted');
        } else {
            const artist = await this.getArtistById(id);
            const foundSongs: ISong[] = await this.songModel.find({_id: {$in: artist!.songs}});
            const artistToReturn = new IArtist(artist!._id, artist!.name!, artist!.birthDate!, artist!.description!, artist!.image!, foundSongs);
            return artistToReturn;
        }
    }
}