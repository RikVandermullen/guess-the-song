import { ArtistController } from './artist.controller'
import { ArtistService } from './artist.service'
import { SongController } from '../song/song.controller'
import { SongService } from '../song/song.service'
import { Test, TestingModule } from '@nestjs/testing';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Artist } from '../../../../GuessTheSong/src/app/core/artist/artist.model'
import { Song } from '../../../../GuessTheSong/src/app/core/song/song.model'
import { IArtist } from 'libs/data/src/lib/artist.interface';
import { getModelToken } from '@nestjs/mongoose';

describe('ArtistService', () => {
    let artistController: ArtistController;
    let artistService: ArtistService;
    let songController: SongController;
    let songService: SongService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [ArtistController, SongController],
            providers: [
                ArtistService, { provide: getModelToken(Artist.name), useValue: jest.fn() },
                SongService, { provide: getModelToken(Song.name), useValue: jest.fn() }
            ]
        }).compile();

        artistService = moduleRef.get<ArtistService>(ArtistService);
        artistController = moduleRef.get<ArtistController>(ArtistController);
        songService = moduleRef.get<SongService>(SongService);
        songController = moduleRef.get<SongController>(SongController);
    });

    describe('ArtistService Tests', () => {
        it('getAllArtists should return an array of artists', async () => {
            const result: IArtist[] = [new IArtist("", "", new Date(), "", "", [])]
            artistService.getAllArtists = jest.fn().mockImplementation(() => Promise.resolve(result))
            
            expect(await artistService.getAllArtists()).toBe(result);
        });

        it('getArtistById should return 1 artist', async () => {
            const result: IArtist = new IArtist("", "", new Date(), "", "", [])
            artistService.getArtistById = jest.fn().mockImplementation(() => Promise.resolve(result))
            
            expect(await artistService.getArtistById("")).toBe(result);
        });

        it('AddArtist should create and return 1 artist', async () => {
            const result: IArtist = new IArtist("", "", new Date(), "", "", [])
            const songs: string[] = [];
            artistService.addArtist = jest.fn().mockImplementation(() => Promise.resolve(result))
            
            expect(await artistService.addArtist(result.name!, result.birthDate!, result.description!, result.image!, songs)).toBe(result);
        });

        it('UpdateArtist should update and return 1 artist', async () => {
            const result: IArtist = new IArtist("", "", new Date(), "", "", [])
            const songs: string[] = [];
            artistService.updateArtist = jest.fn().mockImplementation(() => Promise.resolve(result))
            
            expect(await artistService.updateArtist(result._id!, result.name!, result.birthDate!, result.description!, result.image!, songs)).toBe(result);
        });

        it('DeleteSong should return true', async () => {
            const result: IArtist = new IArtist("", "", new Date(), "", "", [])
            artistService.deleteArtist = jest.fn().mockImplementation(() => Promise.resolve(true))
            
            expect(await artistService.deleteArtist(result._id!)).toBe(true);
        });
    })
});