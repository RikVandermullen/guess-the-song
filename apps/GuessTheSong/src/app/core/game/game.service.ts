import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Genre, Song } from '../song/song.model';
// import { Game } from '../../../../../../libs/data/src/lib/game.model';
import { Game } from './game.model';
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

	createGame(game: Game, limit: number): Observable<Game> {  		
		const url = environment.apiUrl + "/api/games";
		
		return this.http.post<Game>(url, game).pipe(
			map((response: Game) => response),
			tap((game: Game) => {
				return game;
			})
		);
	}

	createRandomGame(game: Game, amount: number): Observable<Game> {
		const url = environment.apiUrl + "/api/games/random?amount=" + amount;
		
		return this.http.post<Game>(url, game).pipe(
			map((response: Game) => response),
			tap((game: Game) => {
				return game;
			})
		);
	}

	createRecommendedGame(game: Game, limit: number): Observable<Game> {
		const neo4jUrl = environment.neoApiUrl + `/neo4j-api/recommendations/${game.madeBy!}?limit=${limit}`;
		
		this.http.get<string[]>(neo4jUrl).subscribe((ids: string[]) => {
			console.log(ids);
			
			this.http.post<Song[]>(environment.apiUrl + "/api/songs/array", ids).subscribe((songs: Song[]) => {
				const url = environment.apiUrl + "/api/games";

				game.songs! = songs;		
				return this.http.post<Game>(url, game).subscribe()
				
			});
		})
		
		return new Observable<Game>();
	}

	updateGame(game: Game): Observable<Game> {
		const url = environment.apiUrl + "/api/games/" + game._id!;

		return this.http.put<Game>(url, game).pipe(
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
		
		this.http.put<string>(url, body).subscribe();
	}
}
