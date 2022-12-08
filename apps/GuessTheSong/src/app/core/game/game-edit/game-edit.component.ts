import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ISong } from '../../../../../../../libs/data/src/lib/song.interface';
import { Genre, Song } from '../../song/song.model';
import { SongService } from '../../song/song.service';
import { Game } from '../game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css'],
})
export class GameEditComponent implements OnInit {
	gameExists: boolean = false;
	gameId: string | null | undefined;
	game: Game = new Game("", "", 0, new Date(), "", [], [], false, ""); 
	songs: Song[] | undefined;
	subscription: Subscription | undefined;
	userId: string | undefined;
	base64Image: string | undefined;
	amountOfPlays: number | undefined;
	gameMode: number = 3;
	songAmount: number = 0;

	Genre = Genre;
	genreKeys : string[] = [];

	constructor(private route: ActivatedRoute, private router: Router, private gameService: GameService, private songService: SongService) {
		this.genreKeys = Object.keys(this.Genre);
	}

	ngOnInit(): void {
		const currentUser = JSON.parse(localStorage.getItem('currentuser')!);
		this.userId = currentUser?.user._id;

		this.route.paramMap.subscribe((params) => {
		this.gameId = params.get("id");			  	  
		if (this.gameId) {
			console.log("Existing game");
			this.subscription = this.gameService.getGameById(this.gameId).subscribe((game) => {
				this.game = game;
				this.amountOfPlays = this.game.amountOfPlays;
			});
			this.amountOfPlays = this.game.amountOfPlays;			
			this.gameExists = true;
		} else {
			console.log("New game");
			this.gameExists = false;
			this.game = {
				_id: '',
				name: '',
				description: '',
				amountOfPlays: 0,
				createdOn: new Date,
				genres: [],
				songs: [],
				isPrivate: false,
				madeBy: this.userId
			}
		}
		});
		this.subscription = this.songService.getAllSongs().subscribe((songs) => {
			let foundSongs: Song[] = [];
			songs.forEach((song) => {
				foundSongs.push(song);
			});
			this.songs = foundSongs;
		});
	}

	onSubmit() {
		if (this.gameExists) {
			this.subscription = this.gameService.updateGame(this.game!).subscribe();		
		} else {
			if (this.gameMode === 2) {
				this.subscription = this.gameService.createRandomGame(this.game!, this.songAmount).subscribe();
			} else if (this.gameMode === 3) {
				this.subscription = this.gameService.createGame(this.game!, this.songAmount).subscribe();
			} else if (this.gameMode === 1) {
				this.subscription = this.gameService.createRecommendedGame(this.game!, this.songAmount).subscribe();
			}
		}
		this.router.navigateByUrl(`/games/me`);
	}

	deleteGame() {
		this.gameService.deletegame(this.gameId!);
		this.router.navigateByUrl(`/games/me`);
	}

  	songIsInGame(id: string) {
		const songs = this.game.songs.filter((song: Song) => song._id === id);
		if (songs.length > 0) return true;
		return false;
	}

  	addSong(song: Song) {
		this.game.songs.push(song);
	}

	removeSong(id: string) {
		const song = this.game.songs.filter((song: Song) => song._id === id)[0]
		const index = this.game.songs.indexOf(song);
    	this.game.songs.splice(index, 1);
	}

	dataURLtoFile(dataurl: string, filename: string) {
		var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)![1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, {type:mime});
	}

	setGameMode(event:any, gameMode: number) {
		this.gameMode = gameMode;
		event.target.classList.toggle("selected");
		if (gameMode === 1) {
			document.getElementById("gamemode-2")?.classList.remove("selected");
			document.getElementById("gamemode-3")?.classList.remove("selected");
			document.getElementById("song-list")?.setAttribute("style", "pointer-events: none; opacity:0.5");
		} else if (gameMode === 2) {
			document.getElementById("gamemode-1")?.classList.remove("selected");
			document.getElementById("gamemode-3")?.classList.remove("selected");
			document.getElementById("song-list")?.setAttribute("style", "pointer-events: none; opacity:0.5");
		} else {
			document.getElementById("gamemode-1")?.classList.remove("selected");
			document.getElementById("gamemode-2")?.classList.remove("selected");
			document.getElementById("song-list")?.setAttribute("style", "pointer-events: auto; opacity:1");
		}		
	}
}
