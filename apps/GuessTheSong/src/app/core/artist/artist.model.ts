import { Song } from "../song/song.model";

export class Artist {
    _id: string | undefined;
    name: string | undefined;
    birthDate: Date | undefined;
    description: string | undefined;
    image: File | undefined;
    songs: Song[] = [];

    constructor(_id: string, name: string, birthDate: Date, description: string, image: File, songs: Song[]) {
        this._id = _id;
        this.name = name;
        this.birthDate = birthDate;
        this.description = description;
        this.image = image;
        this.songs = songs;
    }
}