import { Injectable } from '@angular/core';
import { Genre } from '../song/song.model';
import { Artist } from './artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor() { }

  artists: Artist[] = [
		{
      id: "0",
      name: "Lil Uzi Vert",
      birthDate: new Date(1995, 7, 31),
      description: "A rapper who grew up on the beats of Marilyn Manson and Kanye's 808s & Heartbreak, Lil Uzi Vert emerged from North Philadelphia with a relaxed style that connected the dots between Young Thug, Chief Keef, and the A$AP Mob.",
      image: undefined,
      songs: [
        {
          id: "4",
          title: "Final Fantasy",
          publishedOn: new Date(2022, 7, 26),
          songLink: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/a0/0e/26/a00e262a-b5ad-e8c2-1300-2dfda89b6aa3/mzaf_16490126249266029880.plus.aac.ep.m4a",
          artist: "Lil Uzi Vert",
          album: "RED & WHITE",
          coverImage: undefined,
          genres: [Genre.HipHop, Genre.Rap]
        }
      ]
    },
    {
      id: "1",
      name: "J. Cole",
      birthDate: new Date(1985, 1, 28),
      description: "J. Cole, is an American hip hop recording artist and record producer. Raised in Fayetteville, North Carolina, Cole initially gained recognition as a rapper following the release of his debut mixtape, The Come Up, in early 2007.",
      image: undefined,
      songs: []
    },
    {
      id: "2",
      name: "Future",
      birthDate: new Date(1983, 11, 20),
      description: "Known for a uniquely fluid and melodic yet mumbling vocal style, rapper Future busted out of the South at the dawn of the 2010s with a flurry of mixtapes, high-charting albums, certified platinum singles, and contributions to several other hits as a featured artist.",
      image: undefined,
      songs: [
        {
          id: "3",
          title: "Too Comfortable",
          publishedOn: new Date(2020, 5, 15),
          songLink: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/da/ca/0a/daca0a77-7d70-044f-fc28-bbe248e8ef49/mzaf_4514784333551546968.plus.aac.ep.m4a",
          artist: "Future",
          album: "High Of Life",
          coverImage: undefined,
          genres: [Genre.HipHop, Genre.Rap]
        }
      ]
    },
    {
      id: "3",
      name: "Kendrick Lamar",
      birthDate: new Date(1987, 6, 17),
      description: "Indisputably the most acclaimed rap artist of his generation, Kendrick Lamar is one of those rare MCs who has achieved critical and commercial success while earning the respect and support of those who inspired him.",
      image: undefined,
      songs: [
        {
          id: "1",
          title: "Money Trees",
          publishedOn: new Date(2012, 10, 22),
          songLink: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/ea/0c/2e/ea0c2e08-8e20-07f8-8184-c20699da5e2d/mzaf_8749001506776919871.plus.aac.ep.m4a",
          artist: "Kendrick Lamar",
          album: "good kid, m.A.A.d city",
          coverImage: undefined,
          genres: [Genre.HipHop, Genre.Rap]
        }
      ]
    },
    {
      id: "4",
      name: "21 Savage",
      birthDate: new Date(1992, 10, 22),
      description: "An Atlanta-based rapper who kicked off his career with the crew Slaughtergang, MC 21 Savage hit as a solo artist with his 2014 single 'Picky.' First single 'Picky' launched his solo career in 2014, and his debut mixtape, The Slaughter Tape, dropped in 2015.",
      image: undefined,
      songs: [
        {
          id: "0",
          title: "No Heart",
          publishedOn: new Date(2016, 7, 15),
          songLink: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/04/64/83/04648318-74e5-da16-a61d-91f40bf9a388/mzaf_17315947898076562646.plus.aac.ep.m4a",
          artist: "21 Savage",
          album: "Savage Mode",
          coverImage: undefined,
          genres: [Genre.HipHop, Genre.Rap]
        }
      ]
    }
  ]

  getAllArtists(): Artist[] {
    return this.artists;
  }

  getArtistById(id: string): Artist {
    return this.artists.filter((artist: Artist) => artist.id === id)[0];
  }

  getLength(): number {
    return this.artists.length;
  }

  createArtist(artist: Artist): void {
    this.artists.push(artist);
  }

  updateArtist(artist: Artist): void {
    const index = this.artists.indexOf(this.getArtistById(artist.id!));
    this.artists.splice(index, 1, artist);       
    console.log(this.artists);
  }

  deleteArtist(artist: Artist): void {
    const index = this.artists.indexOf(this.getArtistById(artist.id!));
    this.artists.splice(index, 1);   
  }
}
