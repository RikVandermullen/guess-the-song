import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistration } from '../../../../../../../libs/data/src/lib/user-auth.model';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
user: UserRegistration = new UserRegistration("", "", "", new Date(), "", ["PLAYER"]);
  
  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {}

  onSubmit(): void {	   
		this.authService.register(this.user!).subscribe((response:any) => {
        this.userService.addUserToNeo4j(response.id);
    });
    
	}
}
