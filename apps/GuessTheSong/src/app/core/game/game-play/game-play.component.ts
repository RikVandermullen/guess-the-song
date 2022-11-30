import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Song } from '../../song/song.model';
import { Game } from '../game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css'],
})
export class GamePlayComponent implements OnInit {
  gameId: string | null | undefined;
  game: Game = new Game("undefined", "undefined", 0, new Date(), "undefined", [], [], false);
  timeLeft: number = 30;
  correctGuess: boolean = false;
  currentSong: Song = this.game.songs[0];
  interval = this.updateProgressBar()

  constructor(private route: ActivatedRoute, private router: Router, private gameService: GameService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.gameId = params.get("id");			  	  
      if (this.gameId) {
        console.log("Existing game");
        this.game = {
          ...this.gameService.getGameById(this.gameId)
        };
        this.currentSong = this.game.songs[0];
      } else {
        this.router.navigate([`/games`]);
      }
    });
    document.getElementById("overlay")!.style.display = "none";
    document.getElementById("song-input")!.focus();

    let audioPlayer = <HTMLVideoElement>document.getElementById('song-preview');
		audioPlayer.volume = 0.25;

    if (this.currentSong.coverImage instanceof File) {
      this.setSongUrl(this.currentSong);
    } else {        
      document.getElementById('cover-preview')!.setAttribute("src", `../../../../../assets/images/song${this.currentSong.id}.webp`);
    }
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
		  document.getElementById("cover-preview")!.style.filter = "blur("+(this.timeLeft/3) + "px)";
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

  guessSong() {
    const title = <HTMLInputElement>document.getElementById("song-input")!;
	    document.getElementById("overlay")!.style.display = "block";
    if (title!.value.toLowerCase() == this.currentSong.title!.toLowerCase()) {
		  this.correctGuess = true;
    } else {
      this.correctGuess = false;
      document.getElementById("guess")!.textContent = "You guessed: " + title.value;
    }
	document.getElementById('cover-answer')!.setAttribute("src", `../../../../../assets/images/song${this.currentSong.id}.webp`);   
    let audioPlayer = <HTMLVideoElement>document.getElementById('song-preview');
    audioPlayer.pause();
    clearInterval(this.interval);
  }

  nextSong() {
    this.currentSong = this.game.songs[this.getIndex(this.currentSong) + 1];
    const title = <HTMLInputElement>document.getElementById("song-input")!;
    title.value = "";
    this.timeLeft = 30;
    document.getElementById("timer-seconds")!.textContent = this.timeLeft.toString() + "s";
    document.getElementById("overlay")!.style.display = "none";
    document.getElementById('cover-preview')!.setAttribute("src", `../../../../../assets/images/song${this.currentSong.id}.webp`);
    this.interval = this.updateProgressBar();
  }

  	setSongUrl(song: Song) {
		var reader = new FileReader();
		reader.readAsDataURL(song.coverImage!);
		reader.onload = (event) => {
			document.getElementById('cover-preview')!.setAttribute("src", event!.target!.result!.toString());
		}
	}

	ngOnDestroy() {
		clearInterval(this.interval);
	}
}
