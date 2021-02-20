import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atricle',
  templateUrl: './atricle.component.html',
  styleUrls: ['./atricle.component.css']
})
export class AtricleComponent implements OnInit {

  title = "Electronics | Article";

  constructor() { }

  ngOnInit(): void {
  }

}
