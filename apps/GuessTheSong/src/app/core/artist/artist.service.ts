import { Injectable } from '@angular/core';
import { Genre, Song } from '../song/song.model';
import { Artist } from './artist.model';
import { ISong } from '../../../../../../libs/data/src/lib/song.interface'
import { IArtist } from '../../../../../../libs/data/src/lib/artist.interface'
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient, private router: Router) { }

	getAllArtists(): Observable<IArtist[]> {
		const url = environment.apiUrl + "/api/artists";
	
		return this.http.get<IArtist[]>(url).pipe(
			map((response: IArtist[]) => response),
			tap((artist: IArtist[]) => {
				return artist;
			})
		);
	}

	getArtistById(id: string): Observable<IArtist> {
		const url = environment.apiUrl + "/api/artists/" + id;
	
		return this.http.get<IArtist>(url).pipe(
			map((response: IArtist) => response),
			tap((artist: IArtist) => {
				return artist;
			})
		);
	}

	getArtistSongs(id: string): Observable<Song[]> {
		const url = environment.apiUrl + "/api/artists/" + id + "/songs";

		return this.http.get<Song[]>(url).pipe(
			map((response: Song[]) => response),
			tap((songs: Song[]) => {
				return songs;
			})
		);
	}

	createArtist(artist: Artist, base64image: string): Observable<Artist> {
		const url = environment.apiUrl + "/api/artists";

		const iArtist = new IArtist("", artist.name!, artist.birthDate!, artist.description!, base64image, artist.songs!);
		
		return this.http.post<Artist>(url, iArtist).pipe(
			map((response: Artist) => response),
			tap((artist: Artist) => {
				this.router.navigate([`/artists`]);
				return artist;
			})
		);
	}

	updateArtist(artist: Artist, base64image: string): Observable<Artist> {		
		const url = environment.apiUrl + "/api/artists/" + artist._id;

		const iArtist = new IArtist(artist._id!, artist.name!, artist.birthDate!, artist.description!, base64image, artist.songs!);

		return this.http.put<Artist>(url, iArtist).pipe(
			map((response: Artist) => response),
			tap((artist: Artist) => {
				this.router.navigate([`/artists`]);
				return artist;
			})
		);
	}

	deleteArtist(artist: Artist): void {
		const url = environment.apiUrl + "/api/artists/" + artist._id!;

		this.http.delete<Artist>(url).subscribe(); 
		this.router.navigate([`/artists`]);
	}
}
