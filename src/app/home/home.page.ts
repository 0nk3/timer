import { Component } from '@angular/core';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  constructor(private insomnia: Insomnia, private splash: SplashScreen) {}

  percent = 0; // its dynamic
  radius = 100;
  fullTime = "00:00:10"; // default rest period is 10 seconds
  timer: any = false;
  progress = 0;
  // complete: string;
  minutes = 1;
  seconds: any = 1;
  startTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    // keep it awake while its counting
    this.insomnia.keepAwake();
    this.timer = false; // everytime the selctor is clicked, we restart the timer
    this.percent = 0;
    this.progress = 0;

    const timeElapsed = this.fullTime.split(":");

    // tslint:disable-next-line:radix
    this.minutes = parseInt(timeElapsed[1]);
    // tslint:disable-next-line:radix
    this.seconds = parseInt(timeElapsed[2]);

    // let's get total seconds
    // tslint:disable-next-line:radix
    const totalSeconds: number = Math.floor(this.minutes * 60) + parseInt(this.seconds);
    this.timer = setInterval(() => {
      if (this.percent === this.radius) {
        clearInterval(this.timer);
      }
      this.percent = Math.floor((this.progress / totalSeconds) * 100);
      this.progress++;
    }, 1000);
  }
  // todo when the stop button is clicked
  stopTimer() {
    clearInterval(this.timer);
    this.timer = false;
    this.percent = 0;
    this.progress = 0;

    // controll sleeping: when users stops it, allow it to sleep
    this.insomnia.allowSleepAgain();
  }
}
