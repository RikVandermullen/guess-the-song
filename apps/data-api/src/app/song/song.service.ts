import { Injectable } from '@nestjs/common';

import mongoose, { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Song as SongModel, SongDocument } from './song.schema';
import { Genre, ISong } from '../../../../../libs/data/src/lib/song.interface'
import { IArtist } from 'libs/data/src/lib/artist.interface';

@Injectable()
export class SongService {
    constructor(@InjectModel(SongModel.name) private songModel: Model<SongDocument>) {

    }

    async getAllSongs(): Promise<ISong[]> {
        return this.songModel.aggregate([
            { $lookup: { from: 'artists', localField: 'artist', foreignField: '_id', as: 'artist' } }, { $unwind: { path: '$artist', preserveNullAndEmptyArrays: true } }
        ])
    }

    async getSongById(songId: string): Promise<ISong[]> {
        return this.songModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(songId) } }, { $lookup: { from: 'artists', localField: 'artist', foreignField: '_id', as: 'artist' } }, { $unwind: { path: '$artist', preserveNullAndEmptyArrays: true } }
        ])
    }

    async getSongsByIdArray(songIds: string[]): Promise<ISong[]> {
        const songObjectIds = songIds.map(id => new mongoose.Types.ObjectId(id));

        return this.songModel.aggregate([
            { $match: { _id: { $in: songObjectIds } } }, { $lookup: { from: 'artists', localField: 'artist', foreignField: '_id', as: 'artist' } }, { $unwind: { path: '$artist', preserveNullAndEmptyArrays: true } }
        ])
    }

    async addSong(title: string, publishedOn: Date, songLink: string, artist: string, album: string, coverImage: string, genres: Genre[]) : Promise<ISong[]> {
        const artistId =  new mongoose.Types.ObjectId(artist);
        const song = new this.songModel({ title, publishedOn, songLink, artistId, album, coverImage, genres });
        
        await song.save();
        
        return await this.getSongById(song._id);
    }

    async deleteSong(songId: string) : Promise<boolean> {       
        await this.songModel.findById(songId).deleteOne();
        return true;
    }

    async updateSong(id: string, title: string, publishedOn: Date, songLink: string, artist: string, album: string, coverImage: string, genres: Genre[]) : Promise<ISong[]> {
        const artistId =  new mongoose.Types.ObjectId(artist);
        const result = await this.songModel.updateOne({_id: id}, {$set: {title: title, publishedOn: publishedOn, songLink: songLink, artist: artistId, album: album, coverImage: coverImage, genres: genres}});
        
        if (result.modifiedCount == 0) {
            throw new Error('not accepted');
        } else {
            return await this.getSongById(id);
        }
    }
}