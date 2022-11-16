import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
	selector: 'app-user-details',
	templateUrl: './user-details.component.html',
	styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
	componentId: string | null | undefined;
	user: User = new User("undefined", "undefined", "undefined", "undefined", new Date(), "undefined");

	constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
			this.componentId = params.get("id");
			if (this.componentId) {
				console.log("User exists");
				this.user = this.userService.getUserById(this.componentId);
			} else {
				console.log("User does not exist");
			}
		});
	}

	onSubmit(): void {	
		//this.userService.updateUser();
	}
}
		  