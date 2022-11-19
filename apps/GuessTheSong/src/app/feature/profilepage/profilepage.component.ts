import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../core/user/user.model';
import { UserService } from '../../core/user/user.service';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css'],
})
export class ProfilepageComponent implements OnInit {
  userId: string | null | undefined;

	constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
		  this.userId = params.get("id");
		});
  }
  
  deleteUser() {
    this.userService.deleteUser(this.userId!);
    this.router.navigate([`/`]);
  }
}
