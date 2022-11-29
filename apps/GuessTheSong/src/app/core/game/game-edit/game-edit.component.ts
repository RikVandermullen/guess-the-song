import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  game: Game = new Game("undefined", "undefined", 0, new Date(), "undefined", [], [], false); 
  songs: Song[] | undefined;

  Genre = Genre;
  genreKeys : string[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private gameService: GameService, private songService: SongService) {
    this.genreKeys = Object.keys(this.Genre);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.gameId = params.get("id");			  	  
      if (this.gameId) {
        console.log("Existing game");
        this.game = {
          ...this.gameService.getGameById(this.gameId)
        };
        this.gameExists = true;
      } else {
        console.log("New game");
        this.gameExists = false;
        this.game = {
          _id: (this.gameService.getLength()).toString(),
          name: '',
          description: '',
          amountOfPlays: 0,
          createdOn: new Date,
          genres: [],
          songs: [],
          isPrivate: false
        }
      }
    });
    this.songs = this.songService.getAllSongs();
  }

  onSubmit() {
    if (this.gameExists) {
			this.gameService.updateGame(this.game);			
		} else {
			this.gameService.createGame(this.game);
		}
		this.router.navigate([`/games`]);
  }
}
