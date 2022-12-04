import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Genre, Song } from '../song.model';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css'],
})
export class SongListComponent implements OnInit {
	songs: Song[] | undefined;
	subscription: Subscription | undefined;
	loggedIn: boolean = true;

	Genre = Genre;
	genreKeys : string[] = [];

	constructor(private route: ActivatedRoute, private router: Router, private songService: SongService, private authService: AuthService) {
		this.genreKeys = Object.keys(this.Genre);
	}

	ngOnInit(): void {
			this.subscription = this.songService.getAllSongs().subscribe((songs) => {     
			let songsToEdit: Song[] = [];
			songs.forEach((song) => {
				let image = this.dataURLtoFile(song.coverImage!, `${song._id}.jpg`);
				let newSong: Song = new Song(song._id, song.title, song.publishedOn, song.songLink, song.artist, song.album, image, song.genres)     
				songsToEdit.push(newSong);
				this.setSongUrl(newSong);
			}); 
			this.songs = songsToEdit;
			if (this.authService.currentUser$.value === undefined) {
				this.loggedIn = false;
			}		
		});   
	}

	setSongUrl(song: Song) {
		var reader = new FileReader();
		reader.readAsDataURL(song.coverImage!);
		reader.onload = (event) => {
			document.getElementById(`${song._id}-cover`)!.setAttribute("src", event!.target!.result!.toString());
		}
	}

	deleteSong(id: string) {
		this.songService.deleteSong(id);
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
