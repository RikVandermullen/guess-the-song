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
	userId: string | null | undefined;
	user: User = new User("undefined", "undefined", "undefined", "undefined", new Date(), "undefined");
	userExists: boolean = false;

	constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
		  this.userId = params.get("id");
		  if (this.userId) {
			console.log("Bestaande component");
			this.user = {
			  ...this.userService.getUserById(this.userId)
			};
			this.userExists = true;
		  } else {
			console.log("Nieuwe user");
			this.userExists = false;
			this.user = {
			  id: (this.userService.getLength()).toString(),
			  name: '',
			  emailAddress: '',
			  birthDate: new Date,
			  phoneNumber: '',
			  password: ''
			}
		  }
		});
	  }

	onSubmit(): void {	
		if (this.userExists) {
			this.userService.updateUser(this.user);			
		} else {
			this.userService.createUser(this.user);
		}
		this.router.navigate([`/users/${this.userId}`]);
	}
}
		  