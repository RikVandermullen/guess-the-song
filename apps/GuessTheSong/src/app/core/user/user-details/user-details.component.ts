import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Token } from '../../../../../../../libs/data/src/lib/auth.interface';
import { AuthService } from '../../auth/auth.service';
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
		const currentUser = localStorage.getItem('currentuser');
		this.userId = currentUser?.substring(currentUser.length - 27, currentUser.length-3)
		  	  
		if (this.userId) {
			console.log("User exists");
			this.subscription = this.userService.getUserById(this.userId).subscribe((response) => {
				this.user = response;
			});
			this.userExists = true;
		}
	}

	onSubmit(): void {	
		if (this.userExists) {
			this.subscription = this.userService.updateUser(this.user!).subscribe();		
		} 
		this.router.navigate([`/profile`]);
	}

	ngOnDestroy(): void {
        if (this.subscription) {
            console.log("unsubscribing");
            this.subscription.unsubscribe();
        }
    }
}
		  