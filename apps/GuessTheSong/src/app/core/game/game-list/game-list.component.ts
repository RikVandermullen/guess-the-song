import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Genre, Song } from '../../song/song.model';
import { UserService } from '../../user/user.service';
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
	userId: string | null | undefined;
	isPrivate: boolean = false;

	Genre = Genre;
	genreKeys : string[] = [];

	constructor(private route: ActivatedRoute, private router: Router, private gameService: GameService, private userService: UserService) {
		this.genreKeys = Object.keys(this.Genre);
	}

	ngOnInit(): void {
		const currentUser = JSON.parse(localStorage.getItem('currentuser')!);
		this.userId = currentUser?.user._id;

		this.route.paramMap.subscribe((params) => {
			if (params.get("me")) {
				this.isPrivate = true;
			}			  	  
		});

		if (this.isPrivate) {
			this.subscription = this.gameService.getAllGamesByUserId(this.userId!).subscribe((games) => {
				this.games = games;
			});
		} else {
			this.subscription = this.gameService.getAllGames(false).subscribe((games) => {
				this.games = games;
			});
		}
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

	playGame(gameId: string) {
		this.router.navigateByUrl(`/games/${gameId}/play`);
	}

	showLeaderBoard(gameId: string) {
		this.router.navigateByUrl(`/games/${gameId}/leaderboard`);
	}
}
