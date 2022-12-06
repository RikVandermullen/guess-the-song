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
	game: Game = new Game("undefined", "undefined", 0, new Date(), "undefined", [], [], false, ""); 
	songs: Song[] | undefined;
	base64ImageSongs: ISong[] = [];
	subscription: Subscription | undefined;
	userId: string | undefined;
	base64Image: string | undefined;
	amountOfPlays: number | undefined;
	gameMode: number = 1;
	songAmount: number = 0;

	Genre = Genre;
	genreKeys : string[] = [];

	constructor(private route: ActivatedRoute, private router: Router, private gameService: GameService, private songService: SongService) {
		this.genreKeys = Object.keys(this.Genre);
	}

	ngOnInit(): void {
		const currentUser = localStorage.getItem('currentuser');
		this.userId = currentUser?.substring(currentUser.length - 27, currentUser.length-3)

		this.route.paramMap.subscribe((params) => {
		this.gameId = params.get("id");			  	  
		if (this.gameId) {
			console.log("Existing game");
			let foundSongs: Song[] = [];
			this.subscription = this.gameService.getGameById(this.gameId).subscribe((game) => {
				game.songs.forEach((song) => {	
					this.base64ImageSongs.push(song);		
					let image = this.dataURLtoFile(song.coverImage!, `${song._id}.jpg`);				
					let newSong: Song = new Song(song._id, song.title, song.publishedOn, song.songLink, song.artist, song.album, image, song.genres)
					foundSongs.push(newSong);
				});
				let foundGame: Game = new Game(game._id!, game.name!, game.amountOfPlays!, game.createdOn!, game.description!, game.genres!, foundSongs, game.isPrivate!, game.madeBy!);
				this.game = foundGame;
				this.amountOfPlays = foundGame.amountOfPlays;
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
				let image = this.dataURLtoFile(song.coverImage!, `${song._id}.jpg`);
				let newSong: Song = new Song(song._id, song.title, song.publishedOn, song.songLink, song.artist, song.album, image, song.genres);
				this.setSongUrl(newSong);
				foundSongs.push(newSong);
			});
			this.songs = foundSongs;
		});
	}

	onSubmit() {
		if (this.gameExists) {
			this.subscription = this.gameService.updateGame(this.game._id!, this.game.name!, this.game.amountOfPlays!, this.game.createdOn!, this.game.description!, this.game.genres!, this.base64ImageSongs!, this.game.isPrivate!, this.game.madeBy!).subscribe();		
		} else {
			if (this.gameMode === 2) {
				this.subscription = this.gameService.createRandomGame(this.game.name!, this.game.amountOfPlays!, this.game.createdOn!, this.game.description!, this.game.genres!, [], this.game.isPrivate!, this.game.madeBy!, this.songAmount).subscribe();
			} else if (this.gameMode === 3) {
				this.subscription = this.gameService.createGame(this.game.name!, this.game.amountOfPlays!, this.game.createdOn!, this.game.description!, this.game.genres!, this.base64ImageSongs!, this.game.isPrivate!, this.game.madeBy!).subscribe();
			}
		}		
		this.router.navigate([`/games`]);
	}

  	songIsInGame(id: string) {
		const songs = this.game.songs.filter((song: Song) => song._id === id);
		if (songs.length > 0) return true;
		return false;
	}

  	addSong(song: Song) {
		this.game.songs.push(song);
		this.imageToBase64(song);
	}

	removeSong(id: string) {
		const song = this.game.songs.filter((song: Song) => song._id === id)[0]
		const index = this.game.songs.indexOf(song);
    	this.game.songs.splice(index, 1);

		const songBase64 = this.base64ImageSongs.filter((song: ISong) => song._id === id)[0]
		const indexBase64 = this.base64ImageSongs.indexOf(songBase64);
		this.base64ImageSongs.splice(indexBase64, 1);
	}

	dataURLtoFile(dataurl: string, filename: string) {
		var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)![1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, {type:mime});
	}

	setSongUrl(song: Song) {
		var reader = new FileReader();
		reader.readAsDataURL(song.coverImage!);
		reader.onload = (event) => {
			document.getElementById(`${song._id}-cover`)!.setAttribute("src", event!.target!.result!.toString());
		}
	}

	imageToBase64(song: Song) {
		var reader = new FileReader();
		reader.readAsDataURL(song.coverImage!);
		reader.onload = (event) => {
			this.base64Image = event!.target!.result!.toString();
			let newSong = new ISong(song._id!, song.title!, song.publishedOn!, song.songLink!, song.artist!, song.album!, this.base64Image!, song.genres!);
			this.base64ImageSongs.push(newSong);
		}
	}

	setGameMode(event:any, gameMode: number) {
		this.gameMode = gameMode;
		event.target.classList.toggle("selected");
		if (gameMode === 1) {
			document.getElementById("gamemode-2")?.classList.remove("selected");
			document.getElementById("gamemode-3")?.classList.remove("selected");
			document.getElementById("song-list")?.setAttribute("style", "pointer-events: none; opacity:0.5")
		} else if (gameMode === 2) {
			document.getElementById("gamemode-1")?.classList.remove("selected");
			document.getElementById("gamemode-3")?.classList.remove("selected");
			document.getElementById("song-list")?.setAttribute("style", "pointer-events: none; opacity:0.5")
		} else {
			document.getElementById("gamemode-1")?.classList.remove("selected");
			document.getElementById("gamemode-2")?.classList.remove("selected");
			document.getElementById("song-list")?.setAttribute("style", "pointer-events: auto; opacity:1")
		}		
	}
}
