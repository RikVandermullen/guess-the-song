import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Score } from '../../core/score/score.model';
import { ScoreService } from '../../core/score/score.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
	scores: Score[] = [];
	gameId: string | null | undefined;
	subscription: Subscription | undefined;

	constructor(private route: ActivatedRoute, private router: Router ,private scoreService: ScoreService) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
			this.gameId = params.get("id");
			if (this.gameId) {
				this.subscription = this.scoreService.getScoresByGameId(this.gameId, 50).subscribe((scores) => {
					this.scores = scores;
					console.log(this.scores);
					
				});				
			}
		});
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
