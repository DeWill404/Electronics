import { Component, OnInit } from '@angular/core';
import { LoginService } from '../app.service';

@Component({
	selector: 'app-datasheet',
	templateUrl: './datasheet.component.html',
	styleUrls: ['./datasheet.component.css']
})
export class DatasheetComponent implements OnInit {

	title = "Electronics | Datasheet";
	INDEX = 0;
	divList = document.getElementsByClassName("tabs");

	constructor(private loginService:LoginService) { }

	ngOnInit(): void {
	}

	/* Metho to add Datasheets */
	addSheets() {
		if ( this.loginService.isLogged() ) {

		} else {
			const toast = <HTMLDivElement>document.getElementById("toast");
			(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Please logging first, to add new datasheets.";
			toast.classList.remove('hide');
			toast.classList.add('show');
		}
	}

	/* Function to switch Datasheet */
	switchSheet(index:number) {
		this.divList[this.INDEX].classList.add('visually-hidden');
		this.INDEX = index-1;
		this.divList[this.INDEX].classList.remove('visually-hidden');
	}

}
