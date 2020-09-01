import { Component } from '@angular/core';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  constructor() {}
  percent = 0; // its dynamic
  radius = 100;
  fullTime = "00:05:00";
  timer: any = false;
  progress = 0;

  minutes = 1;
  seconds: any = 1;

  startTimer() {
    this.timer = false; // everytime the selctor is clicked, we restart
    this.percent = 0;
    this.progress = 0;

    const timeElapsed = this.fullTime.split(":");

    // tslint:disable-next-line:radix
    this.minutes = parseInt(timeElapsed[1]);
    // tslint:disable-next-line:radix
    this.seconds = parseInt(timeElapsed[2]);

    // let get total seconds
    // tslint:disable-next-line:radix
    const totalSeconds: number = Math.floor(this.minutes * 60) + parseInt(this.seconds);
    this.timer = setInterval(() => {
      this.percent = Math.floor((this.progress / totalSeconds) * 100);
    });
  }
}
