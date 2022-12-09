import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { Genre, Song } from './song.model';
import { ISong } from '../../../../../../libs/data/src/lib/song.interface'
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient, private router: Router) { }

  getAllSongs(): Observable<Song[]> {
		const url = environment.apiUrl + "/api/songs";
		
		return this.http.get<Song[]>(url).pipe(
        map((response: Song[]) => response),
        tap((songs: Song[]) => {
            return songs;
        })
    );
	}

  getSongById(id: string): Observable<Song> {
		const url = environment.apiUrl + "/api/songs/" + id;
	
		return this.http.get<Song[]>(url).pipe(
			map((response: Song[]) => response[0]),
			tap((song: Song) => {            
				return song;
			})
		);
	}

  createSong(song: Song, base64image: string): Observable<Song> {
    const url = environment.apiUrl + "/api/songs";

    const newSong = new Song("", song.title!, song.publishedOn!, song.songLink!, song.artist!, song.album!, base64image, song.genres!);
    
		return this.http.post<Song>(url, newSong).pipe(
        map((response: Song) => response),
        tap((song: Song) => {
            this.router.navigate([`/songs`]);
            return song;
        })
    );
  }

  	updateSong(song: Song, base64image: string): Observable<Song> {	
		const url = environment.apiUrl + "/api/songs/" + song._id;

    	const songToUpdate = new Song("", song.title!, song.publishedOn!, song.songLink!, song.artist!, song.album!, base64image, song.genres!);

		return this.http.put<Song>(url, songToUpdate).pipe(
			map((response: Song) => response),
			tap((song: Song) => {
				this.router.navigate([`/songs`]);
				return song;
			})
		);
	}

	deleteSong(id: string): void {
		const url = environment.apiUrl + "/api/songs/" + id;

		this.http.delete<Song>(url).subscribe();
		this.router.navigate([`/songs`]);   
	}
}
