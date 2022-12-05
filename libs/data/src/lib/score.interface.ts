import { User } from "./user.interface";

export interface IScore {
    _id: string;
    gameId: string;
    user: User;
    amountOfRightAnswers: number;
    amountOfTimePlayed: number;
    dateScored: Date;
    finalScore: number;
}