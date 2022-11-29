import { Component, OnInit } from '@angular/core';
import { Genre } from '../../song/song.model';
import { Game } from '../game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
})
export class GameListComponent implements OnInit {
  games: Game[] | undefined;
  disabled = true;

  Genre = Genre;
  genreKeys : string[] = [];

  constructor(private gameService: GameService) {
    this.genreKeys = Object.keys(this.Genre);
  }

  ngOnInit(): void {
    this.games = this.gameService.getAllGames();
  }

  getLength(game: Game): number {
    return game.songs.length;
  }
}
