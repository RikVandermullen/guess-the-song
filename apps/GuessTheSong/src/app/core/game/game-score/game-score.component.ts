import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { Score } from '../../score/score.model';
import { ScoreService } from '../../score/score.service';
import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';
const confetti = require('canvas-confetti');

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.css'],
})
export class GameScoreComponent implements OnInit {
	user: User = new User("", "", "", "", new Date, "");
	userId : string | undefined;
	gameId: string | null | undefined;
	subscription: Subscription | undefined;
	scores: Score[] = [];
	score: Score = new Score("", this.user, 0, 0, new Date, 0);
	leaderboardPlace: number = 0;

	constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private scoreService: ScoreService) {
		
	}

	ngOnInit(): void {
		const currentUser = localStorage.getItem('currentuser');
		this.userId = currentUser?.substring(currentUser.length - 27, currentUser.length-3)
		this.subscription = this.userService.getUserById(this.userId!).subscribe((user) => {
			this.user = user;
			this.subscription = this.scoreService.getScoreByGameIdAndUserId(this.gameId!, this.userId!).subscribe((score) => {
				if(score) {
					this.score = score;				
					this.scoreService.getLeaderboardPlace(this.gameId!, score!.finalScore!).subscribe((place) => {
						this.leaderboardPlace = place + 1;					
					});
				}
			});

			this.subscription = this.scoreService.getScoresByGameId(this.gameId!, 5).subscribe((scores) => {
				this.scores = scores;
			});
		});

		this.route.paramMap.subscribe((params) => {
			this.gameId = params.get("id");
			if (this.gameId) {
				this.subscription = this.scoreService.getScoresByGameId(this.gameId, 5).subscribe((scores) => {
					this.scores = scores;
				});				
			}
		});

		var myCanvas = document.createElement('canvas');
		myCanvas.setAttribute("style", "z-index: 100; position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;");
		document.getElementById("confetti")!.appendChild(myCanvas);

		var myConfetti = confetti.create(myCanvas, { resize: true });

		myConfetti({
			particleCount: 150,
			spread: 70,
			origin: { y: 0.6 }
		});

		setTimeout(() => {
			myConfetti.reset();
		}, 5000);
	}

	routeToGames() {
		this.router.navigateByUrl('/games');
	}
	  
	ngOnDestroy() {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
