import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  themeClass = 'light';
  isSolar: any;
  solar = '';
  solarStyle = '';

  constructor() { }

  ngOnInit() {
    this.themeClass = localStorage.getItem('theme') || 'light';
    this.isSolar = localStorage.getItem('isSolar');
    if (this.isSolar) {
      this.themeClass += ' solar';
      this.solar = 'Normal';
    } else {
      this.solar = 'Solar';
    }
  }

  lightTheme() {
    this.themeClass = 'light';
    if (this.isSolar) {
      this.themeClass += ' solar';
      this.solar = 'Normal';
    }
    localStorage.setItem('theme', 'light');
  }

  darkTheme() {
    this.themeClass = 'dark';
    if (this.isSolar) {
      this.themeClass += ' solar';
      this.solar = 'Normal';
    }
    localStorage.setItem('theme', 'dark');
  }

  solarTheme() {
    if (this.themeClass.indexOf('solar') !== -1) {
      this.themeClass = this.themeClass.slice(0, 5).trim();
      this.solarStyle = 'yellow';
      this.solar = 'Solar';
      localStorage.removeItem('isSolar');
    } else {
      this.themeClass += ' solar';
        this.solarStyle = 'white';
        this.solar = 'Normal';
        localStorage.setItem('isSolar', 'true');
    }
  }

}
