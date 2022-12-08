import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IArtist } from '../../../../../../../libs/data/src/lib/artist.interface';
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
	song: Song = new Song("", "", new Date(), "", new IArtist("", "", new Date(), "", "",[]), "", "", []);
	subscription: Subscription | undefined;

	constructor(private route: ActivatedRoute, private router: Router, private songService: SongService) {
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
			this.songId = params.get("id");			  	  
			if (this.songId) {
				console.log("Existing song");
				this.subscription = this.songService.getSongById(this.songId).subscribe((response) => {
					this.song = response;
				});
				this.songExists = true;
			} 
		});
		let audioPlayer = <HTMLVideoElement>document.getElementById('song-preview');
		audioPlayer.volume = 0.25;		
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
