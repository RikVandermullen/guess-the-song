import { Component, OnInit } from '@angular/core';
import { Song } from '../song.model';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css'],
})
export class SongListComponent implements OnInit {
  songs: Song[] | undefined;

  constructor(private songService: SongService) {}

  ngOnInit(): void {
    this.songs = this.songService.getAllSongs();
    this.songs.forEach(song => {
      if(song.coverImage !== undefined) {
        this.setSongUrl(song);
      }
    });
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
