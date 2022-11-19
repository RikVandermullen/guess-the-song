import { Injectable } from '@angular/core';
import { Song } from './song.model';

@Injectable({
  providedIn: 'root'
})
export class SongService {  
  songs: Song[] = [
		{
      id: "0",
      title: "No Heart",
      publishedOn: new Date(2016, 7, 15),
      songLink: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/04/64/83/04648318-74e5-da16-a61d-91f40bf9a388/mzaf_17315947898076562646.plus.aac.ep.m4a",
      artist: "21 Savage",
      album: "Savage Mode",
      coverImage: undefined
    },
    {
      id: "1",
      title: "Money Trees",
      publishedOn: new Date(2012, 10, 22),
      songLink: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/ea/0c/2e/ea0c2e08-8e20-07f8-8184-c20699da5e2d/mzaf_8749001506776919871.plus.aac.ep.m4a",
      artist: "Kendrick Lamar",
      album: "good kid, m.A.A.d city",
      coverImage: undefined
    },
    {
      id: "2",
      title: "Twin",
      publishedOn: new Date(2022, 11, 18),
      songLink: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/41/17/89/4117891d-fa0c-f2ce-7ed1-4202a6883c77/mzaf_6723149988976936809.plus.aac.p.m4a",
      artist: "Roddy Ricch",
      album: "Feed Tha Streets III",
      coverImage: undefined
    }
	];

  constructor() { }

  getAllSongs(): Song[] {
    return this.songs;
  }

  getSongById(id: string): Song {
    return this.songs.filter((song: Song) => song.id === id)[0];
  }

  getLength(): number {
    return this.songs.length;
  }

  createSong(song: Song): void {
    this.songs.push(song);
  }

  updateSong(song: Song): void {
    const index = this.songs.indexOf(this.getSongById(song.id!));
    this.songs.splice(index, 1, song);       
    console.log(this.songs);
  }

  deleteSong(index: number): void {
    this.songs.splice(index, 1);    
  }
}
