import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre, Song } from '../song.model';
import { SongService } from '../song.service';

@Component({
	selector: 'app-song-detail',
	templateUrl: './song-detail.component.html',
	styleUrls: ['./song-detail.component.css'],
})
export class SongDetailComponent implements OnInit {
	songExists: boolean = false;
	songId: string | null | undefined;
	song: Song = new Song("undefined", "undefined", new Date(), "undefined", "undefined", "undefined", new File([""], "placeholder.jpg", {type: "image/jpg"}), []);

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
				this.song = {
					...this.songService.getSongById(this.songId)
				};
				this.songExists = true;
			} else {
				console.log("New Song");
				this.songExists = false;
				this.song = {
					id: (this.songService.getLength()).toString(),
					title: '',
					artist: '',
					publishedOn: new Date,
					coverImage: new File([""], "placeholder.jpg", {type: "image/jpg"}),
					songLink: '',
					album: '',
					genres: []
				}
			}
			if (this.song.coverImage instanceof File) {
				this.setSongUrl(this.song);
			} else {        
				document.getElementById('cover-preview')!.setAttribute("src", `../../../../../assets/images/song${this.song.id}.webp`);
			}

			let audioPlayer = <HTMLVideoElement>document.getElementById('song-preview');
			audioPlayer.volume = 0.25;
		});
	}

	onSubmit(): void {	
		if (this.songExists) {
			this.songService.updateSong(this.song);			
		} else {
			this.songService.createSong(this.song);
		}
		this.router.navigate([`/songs`]);
	}

	parseDate(dateString: string): Date {
		if (dateString) {
				return new Date(dateString);
		}
		return new Date();
	}

	uploadFile(event: Event) {
		const element = event.currentTarget as HTMLInputElement;
		let fileList: FileList | null = element.files;
		if (fileList) {
			this.song.coverImage = fileList[0];
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

	play() {
		let audioPlayer = <HTMLVideoElement>document.getElementById('song-preview');
		audioPlayer.play();
		setTimeout(this.pause, 30000);
	}

	pause() {
		let audioPlayer = <HTMLVideoElement>document.getElementById('song-preview');
		audioPlayer.pause();
	}
}
