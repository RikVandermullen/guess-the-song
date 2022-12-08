import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Genre, Song } from '../song/song.model';
import { Game } from '../../../../../../libs/data/src/lib/game.model';
import { ISong } from '../../../../../../libs/data/src/lib/song.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  	constructor(private http: HttpClient) { }

	getAllGames(isPrivate: boolean): Observable<Game[]> {
		let url = environment.apiUrl + "/api/games?private=false";

		if (isPrivate) url += "?private=true";

		return this.http.get<Game[]>(url).pipe(
			map((response: Game[]) => response),
			tap((games: Game[]) => {
				return games;
			})
		);
	}

	getAllGamesByUserId(userId: string): Observable<Game[]> {
		const url = environment.apiUrl + "/api/games/user/" + userId;

		return this.http.get<Game[]>(url).pipe(
			map((response: Game[]) => response),
			tap((games: Game[]) => {
				return games;
			})
		);
	}

  	getGameById(id: string) : Observable<Game> {
		const url = environment.apiUrl + "/api/games/" + id;
	
		return this.http.get<Game>(url).pipe(
			map((response: Game) => response),
			tap((game: Game) => {
				return game;
			})
		);
	}

	createGame(name: string, amountOfPlays: number, createdOn: Date, description: string, genres: Genre[], songs: ISong[], isPrivate: boolean, madeBy: string, limit: number): Observable<Game> {  		
		const url = environment.apiUrl + "/api/games";

		let iSongs: ISong[] = [];
		songs.forEach(song => {
			iSongs.push(new ISong(song._id!, song.title!, song.publishedOn!, song.songLink!, song.artist!, song.album!, song.coverImage, song.genres!));
		});

		let newGame = new Game("", name, amountOfPlays, createdOn, description, genres, iSongs, isPrivate, madeBy);
		
			return this.http.post<Game>(url, newGame).pipe(
			map((response: Game) => response),
			tap((game: Game) => {
				return game;
			})
		);
	}

	createRandomGame(name: string, amountOfPlays: number, createdOn: Date, description: string, genres: Genre[], songs: ISong[], isPrivate: boolean, madeBy: string, amount: number): Observable<Game> {
		const url = environment.apiUrl + "/api/games/random?amount=" + amount;

		let newGame = new Game("", name, amountOfPlays, createdOn, description, genres, songs, isPrivate, madeBy);
		
			return this.http.post<Game>(url, newGame).pipe(
			map((response: Game) => response),
			tap((game: Game) => {
				return game;
			})
		);
	}

	createRecommendedGame(name: string, amountOfPlays: number, createdOn: Date, description: string, genres: Genre[], songs: ISong[], isPrivate: boolean, madeBy: string, limit: number): Observable<Game> {
		const neo4jUrl = environment.neoApiUrl + `/neo4j-api/recommendations/${madeBy}?limit=${limit}`;
		
		this.http.get<string[]>(neo4jUrl).subscribe((ids: string[]) => {
			console.log(ids);
			
			this.http.post<ISong[]>(environment.apiUrl + "/api/songs", ids).subscribe((songs: ISong[]) => {
				const url = environment.apiUrl + "/api/games";

				let newGame = new Game("", name, amountOfPlays, createdOn, description, genres, songs, isPrivate, madeBy);
		
				return this.http.post<Game>(url, newGame).subscribe()
				
			});
		})
		
		return new Observable<Game>();
	}

	updateGame(id: string, name: string, amountOfPlays: number, createdOn: Date, description: string, genres: Genre[], songs: ISong[], isPrivate: boolean, madeBy: string): Observable<Game> {
		const url = environment.apiUrl + "/api/games/" + id;

		let iSongs: ISong[] = [];
		songs.forEach(song => {
		iSongs.push(new ISong(song._id!, song.title!, song.publishedOn!, song.songLink!, song.artist!, song.album!, song.coverImage, song.genres!));
		});

		let updateGame = new Game(id, name, amountOfPlays, createdOn, description, genres, iSongs, isPrivate, madeBy);
		
			return this.http.put<Game>(url, updateGame).pipe(
			map((response: Game) => response),
			tap((game: Game) => {
				return game;
			})
		);
	}

	deletegame(gameId: string): void {
		const url = environment.apiUrl + "/api/games/" + gameId!;
		this.http.delete<Game>(url).subscribe();   
	}

	addPlayToGame(gameId: string, amountOfPlays: number): void {
		const url = environment.apiUrl + "/api/games/" + gameId! + "/plays";
		let body = JSON.parse(`{"result": "${amountOfPlays}"}`);
		
		this.http.put<Game>(url, body).subscribe();
	}
}
