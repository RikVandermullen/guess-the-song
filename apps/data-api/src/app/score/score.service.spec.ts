import { ScoreController } from './score.controller'
import { ScoreService } from './score.service'
import { Test, TestingModule } from '@nestjs/testing';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Score } from '../../../../GuessTheSong/src/app/core/score/score.model'
import { IScore } from 'libs/data/src/lib/score.interface';
import { getModelToken } from '@nestjs/mongoose';
import { User } from 'apps/GuessTheSong/src/app/core/user/user.model';

describe('ScoreSerivce', () => {
    let scoreController: ScoreController;
    let scoreService: ScoreService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [ScoreController],
            providers: [ScoreService, { provide: getModelToken(Score.name), useValue: jest.fn() }]
        }).compile();

        scoreService = moduleRef.get<ScoreService>(ScoreService);
        scoreController = moduleRef.get<ScoreController>(ScoreController);
    });

    describe('ScoreService Tests', () => {
        it('getScoreByGameIdAndUserId should return an array of scores', async () => {
            const result: Score[] = [new Score("", new User("","","","", new Date(),"",[]), 0, 0, new Date(), 0)]
            scoreService.getScoreByGameIdAndUserId = jest.fn().mockImplementation(() => Promise.resolve(result))
            
            expect(await scoreService.getScoreByGameIdAndUserId("", "")).toBe(result);
        });

        it('getScoresByGameId should return an array of scores', async () => {
            const result: Score[] = [new Score("", new User("","","","", new Date(),"",[]), 0, 0, new Date(), 0)]
            scoreService.getScoresByGameId = jest.fn().mockImplementation(() => Promise.resolve(result))
            
            expect(await scoreService.getScoresByGameId("", 1)).toBe(result);
        });

        it('getLeaderboardPlace should return a number', async () => {
            scoreService.getLeaderboardPlace = jest.fn().mockImplementation(() => Promise.resolve(1))
            
            expect(await scoreService.getLeaderboardPlace("", 1)).toBe(1);
        });

        it('getTopLeaderboard should return an array of scores', async () => {
            const result: Score[] = [new Score("", new User("","","","", new Date(),"",[]), 0, 0, new Date(), 0)]
            scoreService.getTopLeaderboard = jest.fn().mockImplementation(() => Promise.resolve(result))
            
            expect(await scoreService.getTopLeaderboard()).toBe(result);
        });

        it('getTopLeaderboard should return a score', async () => {
            const result: Score = new Score("", new User("","","","", new Date(),"",[]), 0, 0, new Date(), 0)
            scoreService.getUserStats = jest.fn().mockImplementation(() => Promise.resolve(result))
            
            expect(await scoreService.getUserStats("")).toBe(result);
        });
    })
});