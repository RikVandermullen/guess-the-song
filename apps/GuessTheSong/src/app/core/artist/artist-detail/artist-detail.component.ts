import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Song } from '../../song/song.model';
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
  subscription: Subscription | undefined;
  songSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private artistService: ArtistService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
		this.artistId = params.get("id");			  	  
		if (this.artistId) {
			console.log("Existing song");
			this.subscription = this.artistService.getArtistById(this.artistId).subscribe((artist) => {
				let image = this.dataURLtoFile(artist.image!, `${artist._id}.jpg`);
				let foundSongs: Song[] = [];
				this.songSubscription = this.artistService.getArtistSongs(this.artistId!).subscribe((songs) => {
					songs.forEach((song) => {
						let image = this.dataURLtoFile(song.coverImage!, `${song._id}.jpg`);
						let newSong: Song = new Song(song._id, song.title, song.publishedOn, song.songLink, song.artist, song.album, image, song.genres)
						this.setSongUrlSongs(newSong);    
						foundSongs.push(newSong);
					});
				});
				let foundArtist: Artist = new Artist(artist._id, artist.name, artist.birthDate, artist.description, image, foundSongs);
				this.setSongUrl(foundArtist.image!);
				this.artist = foundArtist;
			});       
      	}
    });
  }

	setSongUrl(file: File) {
		var reader = new FileReader();
		reader.readAsDataURL(file!);
		reader.onload = (event) => {
			document.getElementById('artist-image')!.setAttribute("src", event!.target!.result!.toString());
		}
	}

	setSongUrlSongs(song: Song) {
		var reader = new FileReader();
		reader.readAsDataURL(song.coverImage!);
		reader.onload = (event) => {
			document.getElementById(`${song._id}-cover`)!.setAttribute("src", event!.target!.result!.toString());
		}
	}

	deleteArtist(artist: Artist) {
		this.artistService.deleteArtist(artist);
		this.router.navigate([`/artists`]);
	}

	dataURLtoFile(dataurl: string, filename: string) {
		var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)![1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, {type:mime});
	}

	ngOnDestroy(): void {
        if (this.subscription) {
            console.log("unsubscribing");
            this.subscription.unsubscribe();
        }

		if (this.songSubscription) {
			console.log("unsubscribing");
			this.songSubscription.unsubscribe();
		}
    }
}
