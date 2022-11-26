import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
	artist: Artist = new Artist("undefined", "undefined", new Date(), "undefined", new File([""], "placeholder.jpg", {type: "image/jpg"}), []);
	songs: Song[] | undefined;

	constructor(private route: ActivatedRoute, private router: Router, private artistService: ArtistService, private songService: SongService) {
		
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
				this.artistId = params.get("id");			  	  
				if (this.artistId) {
					console.log("Existing song");
					this.artist = {
						...this.artistService.getArtistById(this.artistId)
					};
					this.artistExists = true;
				} else {
					console.log("New Song");
					this.artistExists = false;
					this.artist = {
						id: (this.artistService.getLength()).toString(),
						name: '',
						birthDate: new Date,
						image: new File([""], "placeholder.jpg", {type: "image/jpg"}),
						description: '',
						songs: []
					}
				}
		});
		this.songs = this.songService.getAllSongs();
	}

	onSubmit(): void {	
			if (this.artistExists) {
				this.artistService.updateArtist(this.artist);			
			} else {
				this.artistService.createArtist(this.artist);
			}
			this.router.navigate([`/artists`]);
		}

	uploadFile(event: Event) {
		const element = event.currentTarget as HTMLInputElement;
		let fileList: FileList | null = element.files;
		if (fileList) {
			this.artist.image = fileList[0];
		}
	}

	songIsFromArtist(id: string) {
		const songs = this.artist.songs.filter((song: Song) => song.id === id);
		if (songs.length > 0) return true;
		return false;
	}

	addSong(song: Song) {
		this.artist.songs.push(song);
	}

	removeSong(id: string) {
		const song = this.artist.songs.filter((song: Song) => song.id === id)[0]
		const index = this.artist.songs.indexOf(song);
    	this.artist.songs.splice(index, 1);
	}
}
