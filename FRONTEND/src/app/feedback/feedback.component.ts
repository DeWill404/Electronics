import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-feedback',
	templateUrl: './feedback.component.html',
	styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

	title = "Electronics | Feedback";
	inputList:any;
	errorList:any;

	constructor() { }

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

		return isValid;
	}
	/* Function to submit enter feedback */
	submitFeedback() {
		if (this.verifyFeedback()) {

		}
	}

}
