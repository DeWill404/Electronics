import { Component, OnInit } from '@angular/core';
import { LoginService } from '../app.service';
import { DatasheetService } from './datasheet.service';

@Component({
	selector: 'app-datasheet',
	templateUrl: './datasheet.component.html',
	styleUrls: ['./datasheet.component.css']
})
export class DatasheetComponent implements OnInit {

	DATASHEETS:any[] = [];
	title = "Electronics | Datasheet";
	INDEX = 0;
	togglerList = document.getElementsByClassName("togglers");

	constructor(private loginService:LoginService, private datasheetService:DatasheetService) {
		// Get all sheets link from DB
		this.datasheetService.getSheets().subscribe((data:any) => {
			this.DATASHEETS = data;
		});
	}

	ngOnInit(): void {}


	/* Method to add new sheets */
	addSheets() {
		if ( this.loginService.isLogged() ) {
			// Show Input option & hide this btn
			(<HTMLSpanElement>document.getElementById('badge-new')).classList.add('visually-hidden');
			(<HTMLInputElement>document.getElementById('badge-input-name')).value = '';
			(<HTMLInputElement>document.getElementById('badge-input-url')).value = '';
			(<HTMLSpanElement>document.getElementById('input-div')).classList.remove('visually-hidden');
		} else {
			const toast = <HTMLDivElement>document.getElementById("toast");
			(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Please logging first, to add new datasheets.";
			toast.classList.remove('hide');
			toast.classList.add('show');
		}
	}


	/* Method to submit URL to DB */
	submitSheets() {
		// Get toast variable
		const toast = <HTMLDivElement>document.getElementById("toast");

		if ( (<HTMLInputElement>document.getElementById('badge-input-name')).value=='' || (<HTMLInputElement>document.getElementById('badge-input-url')).value=='' ) {
			// ERROR toast
			(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Enter the name & URL";
			toast.classList.remove('hide');
			toast.classList.add('show');
		} else {
			// Upload link
			this.datasheetService.addSheets( { 'name':(<HTMLInputElement>document.getElementById('badge-input-name')).value, 'url':(<HTMLInputElement>document.getElementById('badge-input-url')).value } ).subscribe((data:any) => {
				if (data != null) {
					// Successfull
					(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Link added successfully";
					toast.classList.remove('hide');
					toast.classList.add('show');

					// TOGGLE VISIBILITY
					(<HTMLSpanElement>document.getElementById('badge-new')).classList.remove('visually-hidden');
					(<HTMLSpanElement>document.getElementById('input-div')).classList.add('visually-hidden');
				} else {
					(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "An error occured";
					toast.classList.remove('hide');
					toast.classList.add('show');
				}
			});
		}
	}


	/* Method to submit URL to DB */
	cancelSheets() {
		// TOGGLE VISIBILITY
		(<HTMLSpanElement>document.getElementById('badge-new')).classList.remove('visually-hidden');
		(<HTMLSpanElement>document.getElementById('input-div')).classList.add('visually-hidden');
	}


	/* Function to switch Datasheet */
	switchSheet(index:number) {
		// Switch Visibility
		this.togglerList[this.INDEX].classList.add('btn-success');
		this.togglerList[this.INDEX].classList.remove('btn-info');
		this.INDEX = index;
		this.togglerList[this.INDEX].classList.remove('btn-success');
		this.togglerList[this.INDEX].classList.add('btn-info');
		(<HTMLIFrameElement>document.getElementById('iframe')).src = this.DATASHEETS[this.INDEX]['url'];
	}

}
