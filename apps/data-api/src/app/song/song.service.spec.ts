import { SongController } from './song.controller'
import { SongService } from './song.service'
import { Test, TestingModule } from '@nestjs/testing';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Song } from '../../../../GuessTheSong/src/app/core/song/song.model'
import { IArtist } from 'libs/data/src/lib/artist.interface';
import { getModelToken } from '@nestjs/mongoose';

describe('SongSerivce', () => {
    let songController: SongController;
    let songService: SongService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [SongController],
            providers: [SongService, { provide: getModelToken(Song.name), useValue: jest.fn() }]
        }).compile();

        songService = moduleRef.get<SongService>(SongService);
        songController = moduleRef.get<SongController>(SongController);
    });

    describe('SongService Tests', () => {
        it('getAllSongs should return an array of songs', async () => {
            const result: Song[] = [new Song("", "", new Date(),"", new IArtist("", "", new Date(), "", "", []), "", "", [])]
            songService.getAllSongs = jest.fn().mockImplementation(() => Promise.resolve(result))
            
            expect(await songService.getAllSongs()).toBe(result);
        });

        it('getSongById should return 1 song', async () => {
            const result: Song = new Song("", "", new Date(),"", new IArtist("", "", new Date(), "", "", []), "", "", [])
            songService.getSongById = jest.fn().mockImplementation(() => Promise.resolve(result))
            
            expect(await songService.getSongById("")).toBe(result);
        });

        it('getSongByIdArray should return an array of songs', async () => {
            const result: Song[] = [new Song("", "", new Date(),"", new IArtist("", "", new Date(), "", "", []), "", "", []), new Song("", "", new Date(),"", new IArtist("", "", new Date(), "", "", []), "", "", [])]
            songService.getSongsByIdArray = jest.fn().mockImplementation(() => Promise.resolve(result))
            
            expect(await songService.getSongsByIdArray(["",""])).toBe(result);
        });

        it('AddSong should create and return 1 song', async () => {
            const result: Song = new Song("", "", new Date(),"", new IArtist("", "", new Date(), "", "", []), "", "", [])
            songService.addSong = jest.fn().mockImplementation(() => Promise.resolve(result))
            
            expect(await songService.addSong(result.title!, result.publishedOn!, result.songLink!, result.artist!._id, result.album!, result.coverImage!, result.genres)).toBe(result);
        });

        it('UpdateSong should update and return 1 song', async () => {
            const result: Song = new Song("", "", new Date(),"", new IArtist("", "", new Date(), "", "", []), "", "", [])
            songService.updateSong = jest.fn().mockImplementation(() => Promise.resolve(result))
            
            expect(await songService.updateSong(result._id!, result.title!, result.publishedOn!, result.songLink!, result.artist!._id!, result.album!, result.coverImage!, result.genres)).toBe(result);
        });

        it('DeleteSong should return true', async () => {
            const result: Song = new Song("", "", new Date(),"", new IArtist("", "", new Date(), "", "", []), "", "", [])
            songService.deleteSong = jest.fn().mockImplementation(() => Promise.resolve(true))
            
            expect(await songService.deleteSong(result._id!)).toBe(true);
        });
    })
});