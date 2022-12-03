import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Song as SongModel, SongDocument } from './song.schema';
import { Genre, ISong } from '../../../../../libs/data/src/lib/song.interface'

@Injectable()
export class SongService {
    constructor(@InjectModel(SongModel.name) private songModel: Model<SongDocument>) {

    }

    async getAllSongs(): Promise<ISong[]> {
        return this.songModel.find();
    }

    async getSongById(songId: string): Promise<ISong | null> {
        return this.songModel.findById(songId);
    }

    async addSong(title: string, publishedOn: Date, songLink: string, artist: string, album: string, coverImage: string, genres: Genre[]) : Promise<ISong> {
        const song = new this.songModel({ title, publishedOn, songLink, artist, album, coverImage, genres });
        
        await song.save();
        
        return <ISong>song;
    }

    async deleteSong(songId: string) : Promise<boolean> {       
        await this.songModel.findById(songId).deleteOne();
        return true;
    }

    async updateSong(id: string, title: string, publishedOn: Date, songLink: string, artist: string, album: string, coverImage: string, genres: Genre[]) : Promise<ISong> {
       
        const result = await this.songModel.updateOne({_id: id}, {$set: {title: title, publishedOn: publishedOn, songLink: songLink, artist: artist, album: album, coverImage: coverImage, genres: genres}});
        
        if (result.modifiedCount == 0) {
            throw new Error('not accepted');
        } else {
            return <ISong> await this.getSongById(id);
        }
    }
}