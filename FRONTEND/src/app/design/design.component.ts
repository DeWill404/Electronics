import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-design',
	templateUrl: './design.component.html',
	styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {

	title = "Electronics | Design";
	INDEX = 0;
	typeList:any;

	constructor() { }

	ngOnInit(): void {
		this.typeList = document.getElementsByClassName('type');
	}

	/* Function to switchs between Designs */
	switchDesign(index:number) {
		// Change color pointer
		(<HTMLUListElement>this.typeList[this.INDEX]).style.color = '#60a773';
		this.INDEX = index;
		(<HTMLUListElement>this.typeList[this.INDEX]).style.color = '#000';
	}

}
