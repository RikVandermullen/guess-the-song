import { Component, OnInit } from '@angular/core';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
})
export class ArtistListComponent implements OnInit {
  artists: Artist[] | undefined;

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.artists = this.artistService.getAllArtists();
    this.artists.forEach(artist => {
      if(artist.image !== undefined) {
        this.setSongUrl(artist);
      }
    });
  }

  setSongUrl(artist: Artist) {
    var reader = new FileReader();
    reader.readAsDataURL(artist.image!);
    reader.onload = (event) => {
      document.getElementById(`${artist.id}-cover`)!.setAttribute("src", event!.target!.result!.toString());
    }
  }
}
