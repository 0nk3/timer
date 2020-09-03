import { Component } from '@angular/core';
import { Insomnia } from '@ionic-native/insomnia/ngx';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  constructor(private insomnia: Insomnia) {}

  percent = 0; // its dynamic
  radius = 100;
  fullTime = "00:00:08"; // default rest period is 08 seconds
  timer: any = false;
  progress = 0;
  formatSubtitle: string;
  titleColor: string;
  subTitleColor: string;
  minutes = 0;
  seconds: any = 0;
  startTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    // keep phone awake while its timer is running
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
      // text displayed while timer is running and when its done
      if (this.progress < totalSeconds) {
        this.titleColor = "#0ee30e";
        this.subTitleColor = "#0ee30e";

        this.formatSubtitle = "progress...";
      }
      if (this.progress === totalSeconds) {
        // I need to delay the display by 2 seconds for accuracy reasons
        (async () => {
          await this.delay(2000);
          this.titleColor = "#ea0c0c";
          this.subTitleColor = "#ea0c0c";
          this.formatSubtitle = "time up!";
        })();
      }
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
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
