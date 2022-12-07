import { Genre, Song } from "../song/song.model";

export class Game {
    _id: string | undefined;
    name: string | undefined;
    amountOfPlays: number | undefined;
    createdOn: Date | undefined;
    description: string | undefined;
    genres: Genre[] = [];
    songs: Song[] = [];
    isPrivate: boolean | undefined;
    madeBy: string | undefined;

    constructor(_id: string, name: string, amountOfPlays: number, createdOn: Date, description: string, genres: Genre[], songs: Song[], isPrivate: boolean, madeBy: string) {
        this._id = _id;
        this.name = name;
        this.amountOfPlays = amountOfPlays;
        this.createdOn = createdOn;
        this.description = description;
        this.genres = genres;
        this.songs = songs;
        this.isPrivate = isPrivate;
        this.madeBy = madeBy;
    }
}