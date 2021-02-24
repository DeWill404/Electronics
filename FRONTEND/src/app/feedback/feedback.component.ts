import { Component, OnInit } from '@angular/core';
import { LoginService } from '../app.service';
import { FeedbackService } from './feedback.service';

@Component({
	selector: 'app-feedback',
	templateUrl: './feedback.component.html',
	styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

	title = "Electronics | Feedback";
	inputList:any;
	errorList:any;

	constructor(private loginService:LoginService, private feedbackService:FeedbackService) { }

	ngOnInit(): void {
		this.inputList = document.getElementsByClassName('input');
		this.errorList = document.getElementsByClassName('input-wrapper');
	}


	/* Function to remove error msg on focus */
	onFocus(index:number) {
		(<HTMLDivElement>this.errorList[index]).classList.remove('alert-validate');
	}


	/* Function to verify entered feedback */ 
	verifyFeedback() {
		let isValid = true;

		if (this.loginService.isLogged()) {	// If login, then only check message
			let input = <HTMLTextAreaElement>this.inputList[2];
			if (input.value.trim() == '') {
				(<HTMLDivElement>this.errorList[2]).classList.add('alert-validate');
				isValid = false;
			}
		} else {	// If not login, then check all input
			// Loop through all feedback inputs
			for (let i = 0; i < this.inputList.length; i++) {
				const input = <HTMLInputElement>this.inputList[i];
				
				if (input.getAttribute('type') == 'email') {
					if ( input.value.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null ) {
						(<HTMLDivElement>this.errorList[i]).classList.add('alert-validate');
						isValid = false;
					}
				} else {
					if ( input.value.trim() == '' ) {
						(<HTMLDivElement>this.errorList[i]).classList.add('alert-validate');
						isValid = false;
					}
				}
			}
		}

		return isValid;
	}


	/* Function to submit enter feedback */
	submitFeedback() {
		// Get toast variable
		const toast = <HTMLDivElement>document.getElementById("toast");

		if (this.verifyFeedback()) {
			if (this.loginService.isLogged()) {
				this.feedbackService.sendFeedback( {'name':'Login', 'email':'Login', 'msg':(<HTMLTextAreaElement>this.inputList[2]).value} ).subscribe((data:any) => {
					if (data == null) {		// Error
					(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "An error occured";
					toast.classList.remove('hide');
					toast.classList.add('show');
					} else {	// Successfull
						(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Feedback submited";
						toast.classList.remove('hide');
						toast.classList.add('show');
					}
				});
			}
		}
	}

}
