import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { Genre, Song } from './song.model';
import { ISong } from '../../../../../../libs/data/src/lib/song.interface'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }

  getAllSongs(): Observable<ISong[]> {
		const url = environment.apiUrl + "/api/songs";
		
		return this.http.get<ISong[]>(url).pipe(
        map((response: ISong[]) => response),
        tap((songs: ISong[]) => {
            return songs;
        })
    );
	}

  getSongById(id: string): Observable<ISong> {
		const url = environment.apiUrl + "/api/songs/" + id;
	
		return this.http.get<ISong[]>(url).pipe(
        map((response: ISong[]) => response[0]),
        tap((song: ISong) => {            
            return song;
        })
    );
	}

  createSong(song: Song, base64image: string): Observable<Song> {
    const url = environment.apiUrl + "/api/songs";

    const iSong = new ISong("", song.title!, song.publishedOn!, song.songLink!, song.artist!, song.album!, base64image, song.genres!);
    
		return this.http.post<Song>(url, iSong).pipe(
        map((response: Song) => response),
        tap((song: Song) => {
            return song;
        })
    );
  }

  updateSong(song: Song, base64image: string): Observable<Song> {
		console.log(song);
		
		const url = environment.apiUrl + "/api/songs/" + song._id;

    const iSong = new ISong("", song.title!, song.publishedOn!, song.songLink!, song.artist!, song.album!, base64image, song.genres!);

		return this.http.put<Song>(url, iSong).pipe(
        map((response: Song) => response),
        tap((song: Song) => {
            return song;
        })
    );
	}

  deleteSong(id: string): void {
    const url = environment.apiUrl + "/api/songs/" + id;

		this.http.delete<Song>(url).subscribe();   
  }
}
