import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  collapsed = true;
  loggedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {   
    if (localStorage.getItem('currentuser') !== null) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  ngOnChanges(): void {
    if (localStorage.getItem('currentuser') !== null) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

}
