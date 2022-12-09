import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IArtist } from '../../../../../../../libs/data/src/lib/artist.interface';
import { Artist } from '../../artist/artist.model';
import { ArtistService } from '../../artist/artist.service';
import { Genre, Song } from '../song.model';
import { SongService } from '../song.service';

@Component({
	selector: 'app-song-edit',
	templateUrl: './song-edit.component.html',
	styleUrls: ['./song-edit.component.css'],
})
export class SongEditComponent implements OnInit {
	songExists: boolean = false;
	songId: string | null | undefined;
	song: Song = new Song("", "", new Date(), "", new IArtist("", "", new Date(), "", "",[]), "", '', []);
	subscription: Subscription | undefined;
	base64Image: string = "";
	artists: IArtist[] = [];
	artist: IArtist = new IArtist("", "", new Date(), "", "",[]);

	Genre = Genre;
    genreKeys : string[] = [];

	constructor(private route: ActivatedRoute, private router: Router, private songService: SongService, private artistService: ArtistService) {
		this.genreKeys = Object.keys(this.Genre);
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
			this.songId = params.get("id");			  	  
			if (this.songId) {
				this.subscription = this.songService.getSongById(this.songId).subscribe((response) => {					
					this.song = response;
					this.base64Image = response.coverImage!;
					this.artist = response.artist!;
				});
				this.songExists = true;
			} else {
				this.songExists = false;
				this.song = {
					_id: '',
					title: '',
					artist: new IArtist("", "", new Date(), "", "",[]),
					publishedOn: new Date,
					coverImage: '',
					songLink: '',
					album: '',
					genres: []
				}
			}
			let audioPlayer = <HTMLVideoElement>document.getElementById('song-preview');
			audioPlayer.volume = 0.25;

			this.subscription = this.artistService.getAllArtists().subscribe((artists) => {
				this.artists = artists;
				if (this.song._id !== "") {
					this.song.artist = this.artists.filter((artist) => artist._id === this.song.artist!._id)[0];
				}
			});
		});
	}

	onSubmit(): void {	
		if (this.songExists) {		
			this.subscription = this.songService.updateSong(this.song, this.base64Image).subscribe();			
		} else {		
			this.subscription = this.songService.createSong(this.song!, this.base64Image).subscribe();
		}
	}

	deleteSong(id: string) {
		this.songService.deleteSong(id);
	}

	uploadFile(event: Event) {
		const element = event.currentTarget as HTMLInputElement;
		let fileList: FileList | null = element.files;
		if (fileList) {
			this.imageToBase64(fileList[0]);
			document.getElementById("cover-preview")!.setAttribute("src", URL.createObjectURL(fileList![0]));
		}
	}

	setArtist(artist: IArtist) {
		this.song.artist = artist;
	}

	imageToBase64(file: File) {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (event) => {
			this.base64Image = event!.target!.result!.toString();
		}
	}

	play() {
		let audioPlayer = <HTMLVideoElement>document.getElementById('song-preview');
		audioPlayer.play();
		setTimeout(this.pause, 30000);
	}

	pause() {
		let audioPlayer = <HTMLVideoElement>document.getElementById('song-preview');
		audioPlayer.pause();
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

