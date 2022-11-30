import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user.model';
const confetti = require('canvas-confetti');

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.css'],
})
export class GameScoreComponent implements OnInit {
  user: User = new User("", "", "", "", new Date, "");

  constructor() {}

  ngOnInit(): void {
    var myCanvas = document.createElement('canvas');
    myCanvas.setAttribute("style", "z-index: 100; position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;");
    document.getElementById("confetti")!.appendChild(myCanvas);

    var myConfetti = confetti.create(myCanvas, { resize: true });

    myConfetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      myConfetti.reset();
    }, 5000);
  }
}
