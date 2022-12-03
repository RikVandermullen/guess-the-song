import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
	song: Song = new Song("undefined", "undefined", new Date(), "undefined", "undefined", "undefined", new File([""], "placeholder.jpg", {type: "image/jpg"}), []);
	subscription: Subscription | undefined;
	base64Image: string = "";

	Genre = Genre;
    genreKeys : string[] = [];

	constructor(private route: ActivatedRoute, private router: Router, private songService: SongService) {
		this.genreKeys = Object.keys(this.Genre);
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
			this.songId = params.get("id");			  	  
			if (this.songId) {
				console.log("Existing song");
				this.subscription = this.songService.getSongById(this.songId).subscribe((response) => {
					let image = this.dataURLtoFile(response.coverImage!, `${response._id}.jpg`);
					let newSong: Song = new Song(response._id, response.title, response.publishedOn, response.songLink, response.artist, response.album, image, response.genres)
					this.setSongUrl(newSong);
					this.song = newSong;
					this.base64Image = response.coverImage!;
				});
				this.songExists = true;
			} else {
				console.log("New Song");
				this.songExists = false;
				this.song = {
					_id: '',
					title: '',
					artist: '',
					publishedOn: new Date,
					coverImage: new File([""], "placeholder.jpg", {type: "image/jpg"}),
					songLink: '',
					album: '',
					genres: []
				}
			}
			let audioPlayer = <HTMLVideoElement>document.getElementById('song-preview');
			audioPlayer.volume = 0.25;
		});
	}

	onSubmit(): void {	
		if (this.songExists) {		
			this.subscription = this.songService.updateSong(this.song, this.base64Image).subscribe();			
		} else {		
			this.subscription = this.songService.createSong(this.song!, this.base64Image).subscribe();
		}
		this.router.navigate([`/songs`]);
	}

	uploadFile(event: Event) {
		const element = event.currentTarget as HTMLInputElement;
		let fileList: FileList | null = element.files;
		if (fileList) {
			this.song.coverImage = fileList[0];
			this.imageToBase64(fileList[0]);
			document.getElementById("cover-preview")!.setAttribute("src", URL.createObjectURL(fileList![0]));
		}
	}

	setSongUrl(song: Song) {
		var reader = new FileReader();
		reader.readAsDataURL(song.coverImage!);
		reader.onload = (event) => {
			document.getElementById('cover-preview')!.setAttribute("src", event!.target!.result!.toString());
		}
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
            console.log("unsubscribing");
            this.subscription.unsubscribe();
        }
    }
}

