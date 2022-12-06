import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Score } from '../../core/score/score.model';
import { ScoreService } from '../../core/score/score.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
	subscription: Subscription | undefined;
	scores: any[] = [];

	constructor(private scoreService: ScoreService) {}

	ngOnInit(): void {
		this.subscription = this.scoreService.getTopLeaderboard().subscribe((scores) => {
			this.scores = scores;		
		});
	}

	ngAfterViewInit() {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('show');
				} else {
					entry.target.classList.remove('show');
				}
			})
		});
		
		const hiddenElements = document.querySelectorAll('.hidden');
		hiddenElements.forEach((e) => observer.observe(e));
	}
}
