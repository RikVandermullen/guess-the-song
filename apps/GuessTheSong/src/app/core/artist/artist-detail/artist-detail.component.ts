import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css'],
})
export class ArtistDetailComponent implements OnInit {
  artistId: string | null | undefined;
  artist: Artist = new Artist("undefined", "undefined", new Date(), "undefined", new File([""], "placeholder.jpg", {type: "image/jpg"}), []);

  constructor(private route: ActivatedRoute, private router: Router, private artistService: ArtistService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
			this.artistId = params.get("id");			  	  
			if (this.artistId) {
				console.log("Existing song");
				this.artist = {
					...this.artistService.getArtistById(this.artistId)
				};        
      }
    });

    if (this.artist.image instanceof File) {
      this.setSongUrl(this.artist);
    } else {        
      document.getElementById('artist-image')!.setAttribute("src", `../../../../../assets/images/artist${this.artist.id}.jpg`);
    }
  }

	setSongUrl(artist: Artist) {
		var reader = new FileReader();
		reader.readAsDataURL(artist.image!);
		reader.onload = (event) => {
			document.getElementById('artist-image')!.setAttribute("src", event!.target!.result!.toString());
		}
	}

	deleteArtist(artist: Artist) {
		this.artistService.deleteArtist(artist);
		this.router.navigate([`/artists`]);
	}
}
