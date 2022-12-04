import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Genre, Song } from '../../song/song.model';
import { Game } from '../game.model';
import { GameService } from '../game.service';

@Component({
	selector: 'app-game-list',
	templateUrl: './game-list.component.html',
	styleUrls: ['./game-list.component.css'],
})
export class GameListComponent implements OnInit {
	games: Game[] | undefined;
	subscription: Subscription | undefined;

	Genre = Genre;
	genreKeys : string[] = [];

	constructor(private gameService: GameService) {
		this.genreKeys = Object.keys(this.Genre);
	}

	ngOnInit(): void {
		let foundGames: Game[] = [];
		this.subscription = this.gameService.getAllGames().subscribe((games) => {
			games.forEach((game) => {
				let foundSongs: Song[] = [];
				game.songs.forEach((song) => {			
					let image = this.dataURLtoFile(song.coverImage!, `${song._id}.jpg`);				
					let newSong: Song = new Song(song._id, song.title, song.publishedOn, song.songLink, song.artist, song.album, image, song.genres)
					foundSongs.push(newSong);
				});
				let foundGame: Game = new Game(game._id!, game.name!, game.amountOfPlays!, game.createdOn!, game.description!, game.genres!, foundSongs, game.isPrivate!, game.madeBy!);
				foundGames.push(foundGame);
			});
			this.games = foundGames;
		});
	}

	getLength(game: Game): number {
		return game.songs.length;
	}

	dataURLtoFile(dataurl: string, filename: string) {
		var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)![1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, {type:mime});
	}
}
