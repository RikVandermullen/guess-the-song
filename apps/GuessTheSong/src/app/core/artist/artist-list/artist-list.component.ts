import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Song } from '../../song/song.model';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
})
export class ArtistListComponent implements OnInit {
  artists: Artist[] | undefined;
  subscription: Subscription | undefined;
  isLoggedInUserAdmin: boolean = false;

  constructor(private artistService: ArtistService) {}

	ngOnInit(): void {
		const currentUser = JSON.parse(localStorage.getItem('currentuser')!);
		this.isLoggedInUserAdmin = currentUser?.user.roles.includes("ADMIN");   

		let foundArtists: Artist[] = [];
		this.subscription = this.artistService.getAllArtists().subscribe((artists) => {
			artists.forEach(artist => {        
				let image = this.dataURLtoFile(artist.image!, `${artist._id}.jpg`);
				let foundArtist: Artist = new Artist(artist._id, artist.name, artist.birthDate, artist.description, image, []);
				foundArtists.push(foundArtist);        
				this.setSongUrl(foundArtist);
			});
		});
		this.artists = foundArtists;
	}

	setSongUrl(artist: Artist) {
		var reader = new FileReader();
		reader.readAsDataURL(artist.image!);
		reader.onload = (event) => {
		document.getElementById(`${artist._id}-cover`)!.setAttribute("src", event!.target!.result!.toString());
		}
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
	}
}
