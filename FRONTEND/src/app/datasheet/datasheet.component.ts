import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-datasheet',
	templateUrl: './datasheet.component.html',
	styleUrls: ['./datasheet.component.css']
})
export class DatasheetComponent implements OnInit {

	title = "Electronics | Datasheet";
	INDEX = 0;
	divList = document.getElementsByClassName("tabs");

	constructor() { }

	ngOnInit(): void {
	}

	/* Function to switch Datasheet */
	switchSheet(index:number) {
		this.divList[this.INDEX].classList.add('visually-hidden');
		this.INDEX = index-1;
		this.divList[this.INDEX].classList.remove('visually-hidden');
	}

}
