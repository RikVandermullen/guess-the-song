import { IArtist } from "./artist.interface";

export enum Genre {
    Pop = 'Pop',
    Rock = 'Rock',
    HipHop = 'HipHop',
    RnB = 'RnB',
    Jazz = 'Jazz',
    Blues = 'Blues',
    Country = 'Country',
    Metal = 'Metal',
    Electronic = 'Electronic',
    Classical = 'Classical',
    Rap = 'Rap',
    Reggae = 'Reggae',
    Soul = 'Soul',
    Punk = 'Punk',
}

export class ISong {
    _id: string;
    title: string;
    publishedOn: Date;
    songLink: string;
    artist: IArtist;
    album: string;
    coverImage: string;
    genres: Genre[];

    constructor(_id: string, title: string, publishedOn: Date, songLink: string, artist: IArtist, album: string, coverImage: string, genres: Genre[]) {
        this._id = _id;
        this.title = title;
        this.publishedOn = publishedOn;
        this.songLink = songLink;
        this.artist = artist;
        this.album = album;
        this.coverImage = coverImage;
        this.genres = genres;
    }
}