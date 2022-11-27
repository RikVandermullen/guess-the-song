import { Song } from "../song/song.model";

export class Artist {
    id: string | undefined;
    name: string | undefined;
    birthDate: Date | undefined;
    description: string | undefined;
    image: File | undefined;
    songs: Song[] = [];

    constructor(id: string, name: string, birthDate: Date, description: string, image: File, songs: Song[]) {
        this.id = id;
        this.name = name;
        this.birthDate = birthDate;
        this.description = description;
        this.image = image;
        this.songs = songs;
    }
}