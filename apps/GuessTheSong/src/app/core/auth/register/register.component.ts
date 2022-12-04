import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistration } from '../../../../../../../libs/data/src/lib/user-auth.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: UserRegistration = new UserRegistration("", "", "", new Date(), "");
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(): void {	   
		this.authService.register(this.user!).subscribe();
	}
}
