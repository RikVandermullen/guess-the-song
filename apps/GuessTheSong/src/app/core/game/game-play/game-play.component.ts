import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IArtist } from '../../../../../../../libs/data/src/lib/artist.interface';
import { Score } from '../../score/score.model';
import { ScoreService } from '../../score/score.service';
import { Song } from '../../song/song.model';
import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';
import { Game } from '../game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css'],
})
export class GamePlayComponent implements OnInit {
	gameId: string | null | undefined;
	game: Game = new Game("undefined", "undefined", 0, new Date(), "undefined", [], [], false, "");
	timeLeft: number = 30;
	correctGuess: boolean = false;
	currentSong: Song = new Song("undefined", "undefined", new Date(), "undefined", new IArtist("", "", new Date(), "", "",[]), "undefined", new File([""], "undefined"), []);
	interval = this.updateProgressBar();
	subscription: Subscription | undefined;

	correctGuesses: number = 0;
	timePlayed: number = 0;
	timer = this.startTimer();
	userId: string | undefined;
	user: User = new User("", "", "", "", new Date(), "", []);
	finalScore: number = 0;
	score: Score = new Score("", this.user, 0, 0, new Date(), 0);

	constructor(private route: ActivatedRoute, private router: Router, private gameService: GameService, private scoreService: ScoreService, private userService: UserService) {
	}

	ngOnInit(): void {
		const currentUser = JSON.parse(localStorage.getItem('currentuser')!);
		this.userId = currentUser?.user._id;
		this.user = currentUser?.user;

		this.route.paramMap.subscribe((params) => {
		this.gameId = params.get("id");			  	  
		if (this.gameId) {
			console.log("Existing game");
			let foundSongs: Song[] = [];
			this.subscription = this.gameService.getGameById(this.gameId).subscribe((game) => {
				game.songs.forEach((song) => {			
					let image = this.dataURLtoFile(song.coverImage!, `${song._id}.jpg`);				
					let newSong: Song = new Song(song._id, song.title, song.publishedOn, song.songLink, song.artist, song.album, image, song.genres)
					foundSongs.push(newSong);
				});
				let foundGame: Game = new Game(game._id!, game.name!, game.amountOfPlays! + 1, game.createdOn!, game.description!, game.genres!, foundSongs, game.isPrivate!, game.madeBy!);
				this.game = foundGame;
				this.currentSong = this.game.songs[0];
				this.setSongUrl(this.currentSong, "cover");			
			});
			this.currentSong = this.game.songs[0];
		} else {
			this.router.navigate([`/games`]);
		}
		});
		document.getElementById("overlay")!.style.display = "none";
		document.getElementById("song-input")!.focus();

		let audioPlayer = <HTMLVideoElement>document.getElementById('song-preview');
		audioPlayer.volume = 0.25;
	}

	titleToUnderScores(title: string) {
		const newTitle = title.replace(/\s/g, "   ");
		return newTitle.replace(/[a-zA-z0-9]/g, "_ ");
	}

	@HostListener('document:keypress', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) { 
		if (event.key == "Enter") {
		this.guessSong();
		}
	}

	updateProgressBar() {
		const interval = setInterval(() => {
			if (this.timeLeft > 0) {
				this.timeLeft -= 1;		  
				document.getElementById("timer-seconds")!.textContent = this.timeLeft.toString() + "s";
				document.getElementById("cover-preview")!.style.filter = "blur("+(this.timeLeft / 3) + "px)";
			} else if (this.timeLeft == 0) {
				this.guessSong();
			}
		}, 1000);
		return interval;
	}

	getIndex(song: Song) {
		return this.game.songs.indexOf(song);
	}

	getLength() {
		return this.game.songs.length;
	}

	startTimer() {
		const timer = setInterval(() => {
			this.timePlayed++;
			}, 1000);
		return timer;
	}

	guessSong() {
		clearInterval(this.timer);
		this.setSongUrl(this.currentSong, "answer");
		const title = <HTMLInputElement>document.getElementById("song-input")!;
		document.getElementById("overlay")!.style.display = "block";
		if (title!.value.toLowerCase() == this.currentSong.title!.toLowerCase()) {
			this.correctGuess = true;
			this.correctGuesses++;
			document.getElementById("guess")!.style.display = "none";
		} else {
			this.correctGuess = false;
			document.getElementById("guess")!.style.display = "block";
			document.getElementById("guess")!.textContent = "You guessed: " + title.value;
		}
		let audioPlayer = <HTMLVideoElement>document.getElementById('song-preview');
		audioPlayer.pause();
		clearInterval(this.interval);

		if (this.getIndex(this.currentSong) == this.getLength() - 1) {
			this.createScore();
		}
	}

	nextSong() {
		this.timer = this.startTimer();
		this.currentSong = this.game.songs[this.getIndex(this.currentSong) + 1];
		const title = <HTMLInputElement>document.getElementById("song-input")!;
		title.value = "";
		this.timeLeft = 30;
		document.getElementById("timer-seconds")!.textContent = this.timeLeft.toString() + "s";
		document.getElementById("overlay")!.style.display = "none";
		document.getElementById("song-input")!.focus();
		this.setSongUrl(this.currentSong, "cover")
		this.interval = this.updateProgressBar();
	}

  	setSongUrl(song: Song, target: string) {
		var reader = new FileReader();
		reader.readAsDataURL(song.coverImage!);
		reader.onload = (event) => {
			document.getElementById(`${target}-preview`)!.setAttribute("src", event!.target!.result!.toString());
		}
	}

  	dataURLtoFile(dataurl: string, filename: string) {
		var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)![1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, {type:mime});
	}

	createScore() {
		this.finalScore = Math.floor(((this.correctGuesses * 100) + (this.getLength() / this.timePlayed)));
		let previousScore : Score | null | undefined;
		this.subscription = this.scoreService.getScoreByGameIdAndUserId(this.gameId!, this.userId!).subscribe((score) => {
			if (score) {
				previousScore = score;
			} else {
				previousScore = null;
			}
		});

		this.score = new Score(this.gameId!, this.user, this.correctGuesses, this.timePlayed, new Date() ,this.finalScore);
		if (!previousScore) {
			this.subscription = this.scoreService.createScore(this.score).subscribe();
		} 
		this.gameService.addPlayToGame(this.gameId!, this.game.amountOfPlays!);
	}

	showScore() {
		this.router.navigateByUrl(`/games/${this.gameId}/score`, {state: {data: this.score}});
	}

	ngOnDestroy() {
		clearInterval(this.interval);
		clearInterval(this.timer);
		if (this.subscription) {
            console.log("unsubscribing");
            this.subscription.unsubscribe();
        }
	}
}
