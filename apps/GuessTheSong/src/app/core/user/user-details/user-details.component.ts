import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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
	subscription: Subscription | undefined;

	constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
		  this.userId = params.get("id");			  	  
		  if (this.userId) {
			console.log("User exists");
			this.subscription = this.userService.getUserById(this.userId).subscribe((response) => {
				this.user = response;
				console.log(this.user);
			});
			this.userExists = true;
		  } else {
			console.log("New user");
			this.userExists = false;
			this.user = {
			  _id: '',
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
			this.subscription = this.userService.updateUser(this.user!).subscribe();		
		} else {
			this.subscription = this.userService.createUser(this.user!).subscribe();
		}
		this.router.navigate([`/profile/${this.userId}`]);
	}

	ngOnDestroy(): void {
        if (this.subscription) {
            console.log("unsubscribing");
            this.subscription.unsubscribe();
        }
    }
}
		  