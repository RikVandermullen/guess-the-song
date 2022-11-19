export class Song {
    id: string | undefined;
    title: string | undefined;
    publishedOn: Date | undefined;
    songLink: string | undefined;
    artist: string | undefined; //string for now
    album: string | undefined;
    coverImage: File | undefined;

    constructor(id: string, title: string, publishedOn: Date, songLink: string, artist: string, album: string, coverImage: File) {
        this.id = id;
        this.title = title;
        this.publishedOn = publishedOn;
        this.songLink = songLink;
        this.artist = artist;
        this.album = album;
        this.coverImage = coverImage;
    }
}