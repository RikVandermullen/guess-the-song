import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Score } from './score.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient) { }

  getScoreByGameIdAndUserId(gameId: string, userId: string): Observable<Score> {
    const url = "/api/scores/games/" + gameId + "/users/" + userId;    

    return this.http.get<Score[]>(url).pipe(
      map((response: Score[]) => response[0]),
      tap((score: Score) => {
        return score;
      })
    );
  }

  getScoresByGameId(gameId: string, limit: number): Observable<Score[]> {
    const url = "/api/scores/games/" + gameId + "?limit=" + limit;

    return this.http.get<Score[]>(url).pipe(
      map((response: Score[]) => response),
      tap((scores: Score[]) => {
        return scores;
      })
    );
  }

  getScoresByUserId(userId: string): Observable<Score[]> {
    const url = "/api/scores/user/" + userId;

    return this.http.get<Score[]>(url).pipe(
      map((response: Score[]) => response),
      tap((scores: Score[]) => {
        return scores;
      })
    );
  }

  createScore(score: Score): Observable<Score> {
    const url = "/api/scores";

    return this.http.post<Score>(url, score).pipe(
      map((response: Score) => response),
      tap((score: Score) => {
        return score;
      })
    );
  }

  getLeaderboardPlace(gameId: string, score: number): Observable<number> {
    const url = "/api/scores/games/" + gameId + "/leaderboard?score=" + score;

    return this.http.get<number>(url).pipe(
      map((response: number) => response),
      tap((place: number) => {
        return place;
      })
    );
  }

  getTopLeaderboard(): Observable<Score[]> {
    const url = "/api/scores/leaderboard";

    return this.http.get<Score[]>(url).pipe(
      map((response: Score[]) => response),
      tap((scores: Score[]) => {
        return scores;
      })
    );
  }
  getUserStats(userId: string): Observable<Score> {
    const url = "/api/scores/" + userId + "/stats";

    return this.http.get<Score[]>(url).pipe(
      map((response: Score[]) => response[0]),
      tap((score: Score) => {
        return score;
      })
    );
  }
}
