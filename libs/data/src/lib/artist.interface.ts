// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Song } from "../../../../apps/GuessTheSong/src/app/core/song/song.model";

export class IArtist {
    _id: string;
    name: string;
    birthDate: Date;
    description: string;
    image: string;
    songs: Song[];

    constructor(_id: string, name: string, birthDate: Date, description: string, image: string, songs: Song[]) {
        this._id = _id;
        this.name = name;
        this.birthDate = birthDate;
        this.description = description;
        this.image = image;
        this.songs = songs;
    }
}