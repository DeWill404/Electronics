import { Component } from '@angular/core';
import { LoginService } from './app.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
}) 

export class AppComponent {

	btnText: String;

	constructor(service:LoginService) {
		// Set Login Btn text
		if ( service.isLogged() )
			this.btnText = service.getEmail();
		else
			this.btnText = "Log in";
	}

	/* Function to display login window */
	launch_login() {
		(<HTMLDivElement>document.getElementById('log-in')).classList.remove('visually-hidden');
	}

	/* Function to Cancel Login Window */
	cancel_login() {
		// Empty all input tags
		let inputList = document.getElementsByClassName('inputLog');
		for (let i = 0; i < inputList.length; i++) {
			const input = <HTMLInputElement>inputList[i];
			if (input.getAttribute('type') == 'checkbox')
				input.checked = false;
			else
				input.value = "";
		}

		// Reset Submit btn
		(<HTMLButtonElement>document.getElementById("register-submit")).innerHTML = '<i class="fa fa-chevron-right"></i>';
		(<HTMLButtonElement>document.getElementById("login-submit")).innerHTML = '<i class="fa fa-chevron-right"></i>';

		// Hide container again
		(<HTMLDivElement>document.getElementById('log-in')).classList.add('visually-hidden');
	}

	/* Switch visibility btn Login(0) & Register(0) option */
	switchVisibility(index: number) {
		if (index == 0) {	// Login -> Register
			(<HTMLDivElement>document.getElementById("login-wrapper")).classList.add('visually-hidden');
			(<HTMLDivElement>document.getElementById("register-wrapper")).classList.remove('visually-hidden');
			(<HTMLButtonElement>document.getElementById("register-submit")).innerHTML = '<i class="fa fa-chevron-right"></i>';
		} else {	// Register -> Login
			(<HTMLDivElement>document.getElementById("register-wrapper")).classList.add('visually-hidden');
			(<HTMLDivElement>document.getElementById("login-wrapper")).classList.remove('visually-hidden');
			(<HTMLButtonElement>document.getElementById("login-submit")).innerHTML = '<i class="fa fa-chevron-right"></i>';
		}
	}

	/* Method to submit data & take action */
	verifyInputs(inputList:HTMLCollection, index:number) {

		switch (index) {
			case 0:		// Verify for Login
				if ( (<HTMLInputElement>inputList[0]).getAttribute('type')=='email' && (<HTMLInputElement>inputList[0]).value.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/)==null )
					return false;
				else if ( (<HTMLInputElement>inputList[1]).value.trim() == '' )
					return false;
				break;
		
			case 1:		// Verify for Register
				if ( (<HTMLInputElement>inputList[3]).getAttribute('type')=='email' && (<HTMLInputElement>inputList[3]).value.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/)==null )
					return false;
				else if ( (<HTMLInputElement>inputList[4]).value.trim() == '' )
					return false;
				else if ( (<HTMLInputElement>inputList[4]).value != (<HTMLInputElement>inputList[5]).value )
					return false;
				else if ( (<HTMLInputElement>inputList[4]).checked == false )
					return false
				break;
		}

		return true;
	}
	/* Function to login & Register */
	submit(index: number) {
		// Get all input tags
		let inputList = document.getElementsByClassName('inputLog');

		switch (index) {
			case 0:		// For Login 
				// Set submit arrow to spinner
				(<HTMLButtonElement>document.getElementById("login-submit")).innerHTML = '<i class="fa fa-spinner fa-pulse"></i>';
				
				// Verify input Data
				if (this.verifyInputs(inputList, index)) {
					setTimeout(() => {
						// Set Submit spinner to success tick
						(<HTMLButtonElement>document.getElementById("login-submit")).innerHTML = '<i class="fa fa-check"></i>';

						// Show Success Toast
						(<HTMLButtonElement>document.getElementById("successToast")).classList.remove('hide');
						(<HTMLButtonElement>document.getElementById("successToast")).classList.add('show');
					}, 2000);
				} else {
					setTimeout(() => {
						// Set Submit spinner to fail cross
						(<HTMLButtonElement>document.getElementById("login-submit")).innerHTML = '<i class="fa fa-remove"></i>';

						// Show Fail Toast
						(<HTMLButtonElement>document.getElementById("failToast")).classList.remove('hide');
						(<HTMLButtonElement>document.getElementById("failToast")).classList.add('show');
					}, 2000);
				}
				break;
		
			case 1:		// For Register
				// Set submit arrow to spinner
				(<HTMLButtonElement>document.getElementById("register-submit")).innerHTML = '<i class="fa fa-spinner fa-pulse"></i>';
				
				// Verify input Data
				if (this.verifyInputs(inputList, index)) {
					setTimeout(() => {
						// Set Submit spinner to success tick
						(<HTMLButtonElement>document.getElementById("register-submit")).innerHTML = '<i class="fa fa-check"></i>';

						// Show Success Toast
						(<HTMLButtonElement>document.getElementById("successToast")).classList.remove('hide');
						(<HTMLButtonElement>document.getElementById("successToast")).classList.add('show');
					}, 2000);
				} else {
					
			setTimeout(() => {
				// Set Submit spinner to fail cross
				(<HTMLButtonElement>document.getElementById("register-submit")).innerHTML = '<i class="fa fa-remove"></i>';

				// Show Fail Toast
				(<HTMLButtonElement>document.getElementById("failToast")).classList.remove('hide');
				(<HTMLButtonElement>document.getElementById("failToast")).classList.add('show');
			}, 2000);
				}
				break;
		}
	}

}
