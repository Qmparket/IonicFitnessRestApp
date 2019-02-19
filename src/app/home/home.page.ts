import { Component } from '@angular/core';
import { DeprecatedCurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  percent = 50;
  radius = 100;
  fullTime = '00:01:30';

  timer: any = false;
  progress = 0;
  minutes = 1;
  seconds = 30;
  elapsed: any = {
    h: '00',
    m: '00',
    s: '00'
  };

  overallTimer: any = false;

  startTime() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (!this.overallTimer) {
      this.progressTimer();
    }
    this.timer = false;
    this.percent = 0;
    this.progress = 0;

    const timeSplit = this.fullTime.split(':');
    this.minutes = +timeSplit[1];
    this.seconds = +timeSplit[2];

    const totalSeconds = Math.floor(this.minutes * 60) + (this.seconds);

    this.timer = setInterval(() => {
      if (this.percent === this.radius) {
        clearInterval(this.timer);
      }
      this.percent = Math.floor((this.progress / totalSeconds) * 100);
      this.progress ++;
      console.log(this.progress);
    }, 1000);

  }

  progressTimer() {
    const countDownDate = new Date();
    this.overallTimer = setInterval(() => {
      const now = new Date().getTime();
      const distance = now - countDownDate.getTime();

      this.elapsed.h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.elapsed.m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.elapsed.s = Math.floor((distance % (1000 * 60)) / (1000));

      this.elapsed.h = this.pad(this.elapsed.h, 2);
      this.elapsed.m = this.pad(this.elapsed.m, 2);
      this.elapsed.s = this.pad(this.elapsed.s, 2);
    }, 1000);
  }

  pad (num, size) {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }

  stopTime() {
    clearInterval(this.timer);
    clearInterval(this.overallTimer);
    this.overallTimer = false;
    this.timer = false;
    this.percent = 0;
    this.progress = 0;
    this.elapsed = {
      h: '00',
      m: '00',
      s: '00'
    };
  }

}
