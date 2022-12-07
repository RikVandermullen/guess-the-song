import { Component, OnInit } from '@angular/core';
import { UserCredentials } from '../../../../../../../libs/data/src/lib/user-auth.model'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: UserCredentials = new UserCredentials("", "");

  constructor(private authService: AuthService) {
    
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    this.authService.login(this.user).subscribe();
  }
}
