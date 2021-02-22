import { Component, OnInit } from '@angular/core';
import { LoginService } from '../app.service';

@Component({
	selector: 'app-design',
	templateUrl: './design.component.html',
	styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {

	title = "Electronics | Design";
	INDEX = 0;
	typeList:any;

	constructor(private loginService:LoginService) { }

	ngOnInit(): void {
		this.typeList = document.getElementsByClassName('type');
	}

	/* Method to create new designs */
	newDesigns() {
		if ( this.loginService.isLogged() ) {

		} else {
			const toast = <HTMLDivElement>document.getElementById("toast");
			(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Please logging first, to create new designs.";
			toast.classList.remove('hide');
			toast.classList.add('show');
		}
	}

	/* Function to switchs between Designs */
	switchDesign(index:number) {
		// Change color pointer
		(<HTMLUListElement>this.typeList[this.INDEX]).style.color = '#60a773';
		this.INDEX = index;
		(<HTMLUListElement>this.typeList[this.INDEX]).style.color = '#000';
	}

}
