import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Song } from '../song.model';
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

	constructor(private route: ActivatedRoute, private router: Router, private songService: SongService) {
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
			} 
		});
		if (this.song.coverImage instanceof File) {
			this.setSongUrl(this.song);
		} else {        
			document.getElementById('cover-preview')!.setAttribute("src", `../../../../../assets/images/song${this.song.id}.webp`);
		}

		let audioPlayer = <HTMLVideoElement>document.getElementById('song-preview');
		audioPlayer.volume = 0.25;
		
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
