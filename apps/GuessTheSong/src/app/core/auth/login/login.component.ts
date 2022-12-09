import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserCredentials } from '../../../../../../../libs/data/src/lib/user-auth.model'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	user: UserCredentials = new UserCredentials("", "");
	subscription: Subscription | undefined;
	loginFailed: boolean = false;

	constructor(private authService: AuthService) {
		
	}

	ngOnInit(): void {
		
	}

	onSubmit(): void {
		this.subscription = this.authService.login(this.user).subscribe((token) => {
			if (token === undefined) {
				this.loginFailed = true;
			}
		});
	}
}
