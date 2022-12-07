export class UserSongs {
    userId: string | undefined;
    songs: string[] | undefined;

    constructor(userId: string, songs: string[]) {
        this.userId = userId;
        this.songs = songs;
    }
}