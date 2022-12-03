import { Injectable } from '@angular/core';
import { Genre } from '../song/song.model';
import { Artist } from './artist.model';
import { ISong } from '../../../../../../libs/data/src/lib/song.interface'
import { IArtist } from '../../../../../../libs/data/src/lib/artist.interface'
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) { }

  getAllArtists(): Observable<IArtist[]> {
		const url = "/api/artists";
		console.log("get: " + url);
	
		return this.http.get<IArtist[]>(url).pipe(
        map((response: IArtist[]) => response),
        tap((artist: IArtist[]) => {
            return artist;
        })
    );
	}

  getArtistById(id: string): Observable<IArtist> {
    const url = "/api/artists/" + id;
		console.log("get: " + url);
  
    return this.http.get<IArtist>(url).pipe(
      map((response: IArtist) => response),
      tap((artist: IArtist) => {
          return artist;
      })
    );
  }

  getArtistSongs(id: string): Observable<ISong[]> {
    const url = "/api/artists/" + id + "/songs";
		console.log("get: " + url);

    return this.http.get<ISong[]>(url).pipe(
      map((response: ISong[]) => response),
      tap((songs: ISong[]) => {
          return songs;
      })
    );
  }

  createArtist(artist: Artist, base64image: string): Observable<Artist> {
    const url = "/api/artists";
		console.log("get: " + url);

    let iSongs: ISong[] = [];
    artist.songs.forEach(song => {
      iSongs.push(new ISong(song._id!, song.title!, song.publishedOn!, song.songLink!, song.artist!, song.album!, "", song.genres!));
    });

    const iArtist = new IArtist("", artist.name!, artist.birthDate!, artist.description!, base64image, iSongs);
    
		return this.http.post<Artist>(url, iArtist).pipe(
        map((response: Artist) => response),
        tap((artist: Artist) => {
            return artist;
        })
    );
  }

  updateArtist(artist: Artist, base64image: string): Observable<Artist> {
		console.log(artist);
		
		const url = "/api/artists/" + artist._id;
		console.log("put: " + url);

    let iSongs: ISong[] = [];
    artist.songs.forEach(song => {
      iSongs.push(new ISong(song._id!, song.title!, song.publishedOn!, song.songLink!, song.artist!, song.album!, "", song.genres!));
    });

    const iArtist = new IArtist(artist._id!, artist.name!, artist.birthDate!, artist.description!, base64image, iSongs!);

		return this.http.put<Artist>(url, iArtist).pipe(
        map((response: Artist) => response),
        tap((artist: Artist) => {
            return artist;
        })
    );
	}

  deleteArtist(artist: Artist): void {
    const url = "/api/artists/" + artist._id!;
		console.log("delete: " + url);

		this.http.delete<Artist>(url).subscribe();   
  }
}
