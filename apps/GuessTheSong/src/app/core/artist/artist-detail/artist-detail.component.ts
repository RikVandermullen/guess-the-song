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
  artist: Artist = new Artist("", "", new Date(), "", new File([""], "placeholder.jpg", {type: "image/jpg"}), []);
  subscription: Subscription | undefined;
  songSubscription: Subscription | undefined;
  isLoggedInUserAdmin: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private artistService: ArtistService) {}

	ngOnInit(): void {
		const currentUser = JSON.parse(localStorage.getItem('currentuser')!);
		this.isLoggedInUserAdmin = currentUser?.user.roles.includes("ADMIN");	

		this.route.paramMap.subscribe((params) => {
			this.artistId = params.get("id");			  	  
			if (this.artistId) {
				console.log("Existing song");
				this.subscription = this.artistService.getArtistById(this.artistId).subscribe((artist) => {
					let image = this.dataURLtoFile(artist.image!, `${artist._id}.jpg`);
					let foundSongs: Song[] = [];
					this.songSubscription = this.artistService.getArtistSongs(this.artistId!).subscribe((songs) => {
						songs.forEach((song) => {
							foundSongs.push(song);
						});
					});
					this.artist.songs = foundSongs;
					let foundArtist: Artist = new Artist(artist._id, artist.name, artist.birthDate, artist.description, image, foundSongs);
					this.setArtistImageUrl(foundArtist.image!);
					this.artist = foundArtist;
				});       
			}
		});
	}

	setArtistImageUrl(file: File) {
		var reader = new FileReader();
		reader.readAsDataURL(file!);
		reader.onload = (event) => {
			document.getElementById('artist-image')!.setAttribute("src", event!.target!.result!.toString());
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
            this.subscription.unsubscribe();
        }
    }
}
