import { Genre, ISong } from "./song.interface";

export class Game {
    _id: string | undefined;
    name: string | undefined;
    amountOfPlays: number | undefined;
    createdOn: Date | undefined;
    description: string | undefined;
    genres: Genre[] = [];
    songs: ISong[] = [];
    isPrivate: boolean | undefined;
    madeBy: string | undefined;

    constructor(_id: string, name: string, amountOfPlays: number, createdOn: Date, description: string, genres: Genre[], songs: ISong[], isPrivate: boolean, madeBy: string) {
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