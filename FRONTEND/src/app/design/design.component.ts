import { Component, OnInit } from '@angular/core';
import { LoginService } from '../app.service';
import { DesignService } from './design.service';

@Component({
	selector: 'app-design',
	templateUrl: './design.component.html',
	styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {

	DESIGNS:any[] = [];
	title = "Electronics | Design";
	INDEX = 0;
	typeList:any;
	newDivCode = `<style>
					#editor {border:2px solid #AAA; background:url(../../assets/images/type.png) no-repeat center center/cover; resize:none; width:100%; height:170px; padding:5px;}
					#preview-overlay {position:fixed; z-index:5; background-color:#000; width:100%; height:100%; top:0; left:0;}
					#preview { width:900px; height:500px; max-width:90%; max-height:90%; overflow:scroll; background:#fff; position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);}
					#cancel-overlay { position:absolute; right:0;}
				</style>
				<div id="newDesign">
					<button class="btn btn-secondary d-block w-75 mx-auto my-2" onclick="document.getElementById('preview-overlay').classList.remove('visually-hidden'); document.getElementById('preview').innerHTML=document.getElementById('editor').value">Preview</button>
					<textarea id="editor" class="rounded" maxlength="10000"></textarea>
					<div id="preview-overlay" class="visually-hidden">
						<i id="cancel-overlay" class="bi bi-x-octagon btn btn-secondary rounded-3 m-3" onclick="document.getElementById('preview-overlay').classList.add('visually-hidden')"></i>
						<div id="preview"></div>
					</div>
					<input id="designName" type="text" placeholder="Design Name" />
				</div>`;


	constructor(private loginService:LoginService, private designService:DesignService) { }


	ngOnInit(): void {
		this.typeList = document.getElementsByClassName('type');

		// get All designs
		this.designService.getDesigns().subscribe((data:any) => {
			if (data != null) {	// If no error occured
				this.DESIGNS = data;
			}
		});
	}


	/* Method to create new designs */
	newDesigns() {
		if ( this.loginService.isLogged() ) {
			// Show editor
			(<HTMLDivElement>document.getElementById('designContainer')).innerHTML = this.newDivCode;

			// Hide itself & show other btns
			(<HTMLButtonElement>document.getElementById('newBtn')).classList.add('visually-hidden');
			(<HTMLButtonElement>document.getElementById('saveBtn')).classList.remove('visually-hidden');
			(<HTMLButtonElement>document.getElementById('cancelBtn')).classList.remove('visually-hidden');
		} else {
			const toast = <HTMLDivElement>document.getElementById("toast");
			(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Please logging first, to create new designs.";
			toast.classList.remove('hide');
			toast.classList.add('show');
		}
	}


	/* Method to save enter html code to new design */
	saveDesigns() {

		// Get designs details
		let designName = (<HTMLInputElement>document.getElementById('designName')).value;
		let designCode = (<HTMLInputElement>document.getElementById('editor')).value;

		// Toast variable
		const toast = <HTMLDivElement>document.getElementById("toast");

		// Verify input values
		if (designName=='') {
			(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Enter the name of design";
			toast.classList.remove('hide');
			toast.classList.add('show');
		} else {
			// On Complete Input
			this.designService.saveDesigns( {'name':designName, 'html':designCode} ).subscribe((data:any) => {
				if (data == null) {
					(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "An error occured try again";
					toast.classList.remove('hide');
					toast.classList.add('show');
				} else {
					this.DESIGNS.push( {'name':designName, 'html':designCode} );

					// Successful
					(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Design added successfully";
					toast.classList.remove('hide');
					toast.classList.add('show');
		
					// Switch visibility of btns
					(<HTMLDivElement>document.getElementById('designContainer')).innerHTML = '';
					(<HTMLButtonElement>document.getElementById('newBtn')).classList.remove('visually-hidden');
					(<HTMLButtonElement>document.getElementById('saveBtn')).classList.add('visually-hidden');
					(<HTMLButtonElement>document.getElementById('cancelBtn')).classList.add('visually-hidden');
				}
			});
		}
	}


	/* Mehod to cancel current designing */
	cancelDesigns() {
		// Switch visibility of btns
		(<HTMLDivElement>document.getElementById('designContainer')).innerHTML = '';
		(<HTMLButtonElement>document.getElementById('newBtn')).classList.remove('visually-hidden');
		(<HTMLButtonElement>document.getElementById('saveBtn')).classList.add('visually-hidden');
		(<HTMLButtonElement>document.getElementById('cancelBtn')).classList.add('visually-hidden');
	}


	/* Function to switchs between Designs */
	switchDesign(index:any) {
		// Change color pointer
		(<HTMLUListElement>this.typeList[this.INDEX]).style.color = '#60a773';
		this.INDEX = index;
		(<HTMLUListElement>this.typeList[this.INDEX]).style.color = '#000';

		// Change Accordon Opener text
		(<HTMLButtonElement>document.getElementById('accodion-opener')).innerHTML = (<HTMLUListElement>this.typeList[this.INDEX]).innerHTML;
		(<HTMLDivElement>document.getElementById('designContainer')).innerHTML = this.DESIGNS[this.INDEX]['html'];

		// Close Accordon
		(<HTMLDivElement>document.getElementById('type-container')).classList.remove('show');
	}

}
