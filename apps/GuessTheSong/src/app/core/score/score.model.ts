import { User } from "../user/user.model";

export class Score {
    gameId: string | undefined;
    user: User | undefined;
    amountOfRightAnswers: number | undefined;
    amountOfTimePlayed: number | undefined;
    dateScored: Date | undefined;
    finalScore: number | undefined;

    constructor(gameId: string, user: User ,amountOfRightAnswers: number, amountOfTime: number, dateScored: Date, finalScore: number) {
        this.gameId = gameId;
        this.user = user;
        this.amountOfRightAnswers = amountOfRightAnswers;
        this.amountOfTimePlayed = amountOfTime;
        this.dateScored = dateScored;
        this.finalScore = finalScore;
    }
}