import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Song } from '../../song/song.model';
import { SongService } from '../../song/song.service';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';

@Component({
	selector: 'app-artist-edit',
	templateUrl: './artist-edit.component.html',
	styleUrls: ['./artist-edit.component.css'],
})
export class ArtistEditComponent implements OnInit {
	artistExists: boolean = false;
	artistId: string | null | undefined;
	artistSongs: string[] | undefined;
	artist: Artist = new Artist("", "", new Date(), "", new File([""], "placeholder.jpg", {type: "image/jpg"}), []);
	songs: Song[] | undefined;
	base64Image: string = "";
	subscription: Subscription | undefined;

	constructor(private route: ActivatedRoute, private router: Router, private artistService: ArtistService, private songService: SongService) {
		
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
				this.artistId = params.get("id");			  	  
				if (this.artistId) {
					console.log("Existing song");
					this.subscription = this.artistService.getArtistById(this.artistId).subscribe((artist) => {
						let image = this.dataURLtoFile(artist.image!, `${artist._id}.jpg`);
						let foundSongs: Song[] = [];
						this.subscription = this.artistService.getArtistSongs(this.artistId!).subscribe((songs) => {
							songs.forEach((song) => {
								foundSongs.push(song);
								this.artistSongs?.push(song._id!);
							});
							this.artist.songs = foundSongs;													
						});
						let foundArtist: Artist = new Artist(artist._id, artist.name, artist.birthDate, artist.description, image, foundSongs);						
						this.artist = foundArtist;
						this.base64Image = artist.image!;
					});
					this.artistExists = true;
				} else {
					console.log("New Song");
					this.artistExists = false;
					this.artist = {
						_id: '',
						name: '',
						birthDate: new Date,
						image: new File([""], "placeholder.jpg", {type: "image/jpg"}),
						description: '',
						songs: []
					}
				}
		});
		this.subscription = this.songService.getAllSongs().subscribe((songs) => {
			let foundSongs: Song[] = [];
			songs.forEach((song) => {
				foundSongs.push(song);
			});
			this.songs = foundSongs;
		});
	}

	onSubmit() {	
		if (this.artistExists) {
			this.subscription = this.artistService.updateArtist(this.artist, this.base64Image).subscribe();			
		} else {
			this.artistService.createArtist(this.artist, this.base64Image).subscribe();
		}
	}

	uploadFile(event: Event) {
		const element = event.currentTarget as HTMLInputElement;
		let fileList: FileList | null = element.files;
		if (fileList) {
			this.imageToBase64(fileList[0]);
			this.artist.image = fileList[0];
		}
	}

	imageToBase64(file: File) {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (event) => {
			this.base64Image = event!.target!.result!.toString();
		}
	}

	songIsFromArtist(id: string) {
		const songs = this.artist.songs.filter((song: Song) => song._id === id);
		if (songs.length > 0) return true;
		return false;
	}

	addSong(song: Song) {
		this.artist.songs.push(song);
	}

	removeSong(id: string) {
		const song = this.artist.songs.filter((song: Song) => song._id === id)[0]
		const index = this.artist.songs.indexOf(song);
    	this.artist.songs.splice(index, 1);
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
