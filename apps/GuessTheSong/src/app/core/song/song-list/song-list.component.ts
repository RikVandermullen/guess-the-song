import { Component, OnInit } from '@angular/core';
import { Genre, Song } from '../song.model';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css'],
})
export class SongListComponent implements OnInit {
  songs: Song[] | undefined;
  page = 0;
  pageSize = 10;
  collectionSize = 0;

  Genre = Genre;
  genreKeys : string[] = [];

  constructor(private songService: SongService) {
	this.genreKeys = Object.keys(this.Genre);
  }

  ngOnInit(): void {
    this.songs = this.songService.getAllSongs();
    this.songs.forEach(song => {
      if(song.coverImage !== undefined) {
        this.setSongUrl(song);
      }
    });
    this.collectionSize = (this.songs.length * 10) / this.pageSize;    
  }

  setSongUrl(song: Song) {
    var reader = new FileReader();
    reader.readAsDataURL(song.coverImage!);
    reader.onload = (event) => {
      document.getElementById(`${song.id}-cover`)!.setAttribute("src", event!.target!.result!.toString());
    }
  }

  deleteSong(index: number) {
    this.songService.deleteSong(index);
  }
}
