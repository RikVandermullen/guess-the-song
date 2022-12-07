import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Token } from '../../../../../../libs/data/src/lib/auth.interface';
import { Score } from '../../core/score/score.model';
import { ScoreService } from '../../core/score/score.service';
import { User } from '../../core/user/user.model';
import { UserService } from '../../core/user/user.service';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css'],
})
export class ProfilepageComponent implements OnInit {
  userId: string | null | undefined;
  stats: any | null;
  subscription: Subscription | undefined;

	constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private scoreService: ScoreService) {}


  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentuser')!);
		this.userId = currentUser?.user._id;   

    this.subscription = this.scoreService.getUserStats(this.userId!).subscribe((stats) => {
      if (stats) {
        this.stats = stats;
      }
    });
  }
  
  deleteUser() {
    this.userService.deleteUser(this.userId!);
    this.router.navigate([`/`]);
  }
}
