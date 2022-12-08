import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IArtist } from '../../../../../../libs/data/src/lib/artist.interface';
import { Genre, Song } from '../song/song.model';
import { Artist } from './artist.model';

import { ArtistService } from './artist.service';

const expectedArtistData: Artist = {
	_id: 'mongo_id',
	name: 'Artist Name',
	birthDate: new Date(),
	description: 'Artist description',
	image: new File([""], "placeholder.jpg", {type: "image/jpg"}),
	songs: [new Song("mongo_id", "Song Title", new Date(), "Song Link", new IArtist("", "", new Date(), "", "",[]), "undefined", new File([""], "placeholder.jpg", {type: "image/jpg"}), [Genre.Classical])]
}

const expectedArtistDataArray: Artist[] = [
	new Artist("mongo_id", "Artist Name", new Date(), "Artist description", new File([""], "placeholder.jpg", {type: "image/jpg"}), [new Song("mongo_id", "Song Title", new Date(), "Song Link", new IArtist("", "", new Date(), "", "",[]), "undefined", new File([""], "placeholder.jpg", {type: "image/jpg"}), [Genre.Classical])]),
	new Artist("mongo_id2", "Artist Name", new Date(), "Artist description", new File([""], "placeholder.jpg", {type: "image/jpg"}), [new Song("mongo_id2", "Song Title", new Date(), "Song Link", new IArtist("", "", new Date(), "", "",[]), "undefined", new File([""], "placeholder.jpg", {type: "image/jpg"}), [Genre.Classical])])
]

describe('ArtistService', () => {
	let service: ArtistService;
	let httpSpy: jasmine.SpyObj<HttpClient>;

	beforeEach(() => {
		httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);

		TestBed.configureTestingModule({
			providers: [{ provide: HttpClient, useValue: httpSpy}]
		});

		service = TestBed.inject(ArtistService);
		httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should return an Artist', (done: DoneFn) => {
		httpSpy.get.and.returnValue(of(expectedArtistData));

		service.getArtistById("mongo_id").subscribe((artist) => {
			expect(artist);
			expect(artist._id).toEqual(expectedArtistData._id!);
			done();
		})
	})

	it('should return an Artist Array', (done: DoneFn) => {
		httpSpy.get.and.returnValue(of(expectedArtistDataArray));

		service.getAllArtists().subscribe((artists: IArtist[]) => {
			expect(artists);
			expect(artists.length).toBe(2);
			expect(artists[0]._id).toEqual(expectedArtistDataArray[0]._id!);
			done();
		})
	});

	it('should create an Artist and return it', (done: DoneFn) => {
		httpSpy.post.and.returnValue(of(expectedArtistData));

		service.createArtist(expectedArtistData, "base64image").subscribe((artist) => {
			expect(artist);
			expect(artist._id).toEqual(expectedArtistData._id!);
			done();
		})
	});

	it('should update an Artist and return it', (done: DoneFn) => {
		httpSpy.put.and.returnValue(of(expectedArtistData));

		service.updateArtist(expectedArtistData, "base64image").subscribe((artist) => {
			expect(artist);
			expect(artist._id).toEqual(expectedArtistData._id!);
			done();
		})
	});
});
