import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    //Checks if element is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          } else {
            entry.target.classList.remove('show');
          }
      })
    });
    
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((e) => observer.observe(e));
  }
}
