import { ISong } from "./song.interface";

export class IArtist {
    _id: string;
    name: string;
    birthDate: Date;
    description: string;
    image: string;
    songs: ISong[];

    constructor(_id: string, name: string, birthDate: Date, description: string, image: string, songs: ISong[]) {
        this._id = _id;
        this.name = name;
        this.birthDate = birthDate;
        this.description = description;
        this.image = image;
        this.songs = songs;
    }
}