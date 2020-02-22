import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public slides = [
    {src: "assets/images/1.jpg"},
    {src: "assets/images/2.jpg"},
    {src: "assets/images/3.jpg"},
    {src: "assets/images/4.jpg"},
    {src: "assets/images/5.jpg"},
    {src: "assets/images/6.jpg"},
    {src: "assets/images/7.jpg"},
    {src: "assets/images/8.jpg"},
    {src: "assets/images/9.jpg"},
    {src: "assets/images/10.jpg"}
  ]
 
  constructor() { }

  ngOnInit(): void {
    console.log(this.slides.length)
  }
}
