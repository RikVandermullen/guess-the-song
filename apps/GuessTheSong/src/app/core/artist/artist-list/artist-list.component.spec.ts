import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Directive, HostListener, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IArtist } from '../../../../../../../libs/data/src/lib/artist.interface';
import { Genre, Song } from '../../song/song.model';
import { Artist } from '../artist.model';

import { ArtistListComponent } from './artist-list.component';

@Directive({
    selector: '[routerLink]',
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick(): void {
      this.navigatedTo = this.linkParams;
  }
}

const expectedSongData: Song = {
	_id: '123456',
	title: "Song title",
	publishedOn: new Date(),
	songLink: "link",
	artist: new IArtist("", "", new Date(), "", "",[]),
	genres: [Genre.Classical],
	album: "Album",
	coverImage: "",
}

const expectedArtistDataArray: Artist[] = [
	{ 
        _id: '123456',
        name: 'Artist Name',
        birthDate: new Date(),
        description: 'Artist description',
        image: new File([""], "placeholder.jpg", {type: "image/jpg"}),
        songs: [expectedSongData] 
    },
    { 
        _id: '1234',
        name: 'Artist Name',
        birthDate: new Date(),
        description: 'Artist description',
        image: new File([""], "placeholder.jpg", {type: "image/jpg"}),
        songs: [expectedSongData] 
    }
]

describe('ArtistListComponent', () => {
    let component: ArtistListComponent;
    let fixture: ComponentFixture<ArtistListComponent>;

    let artistServiceSpy: any;
	let routerSpy: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports : [
                HttpClientTestingModule
            ],
            declarations: [
                ArtistListComponent,
                RouterLinkStubDirective
            ],
            providers: [
                { provide: 'ArtistService', useValue: artistServiceSpy },
                { provide: 'Router', useValue: routerSpy },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ArtistListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should create', (done) => {
        component.artists = expectedArtistDataArray;
        component.subscription = new Subscription();

		fixture.detectChanges();
		
		expect(component).toBeTruthy();
		expect(component.artists?.length).toEqual(2);
		done();
    });
});
