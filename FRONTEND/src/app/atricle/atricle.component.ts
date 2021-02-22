import { Component, OnInit } from '@angular/core';
import { LoginService } from '../app.service';

@Component({
	selector: 'app-atricle',
	templateUrl: './atricle.component.html',
	styleUrls: ['./atricle.component.css']
})
export class AtricleComponent implements OnInit {

	title = "Electronics | Article";

	constructor(private loginService:LoginService) { }

	ngOnInit(): void {
	}

	/* Method to add article */
	addArticle() {
		if ( this.loginService.isLogged() ) {

		} else {
			const toast = <HTMLDivElement>document.getElementById("toast");
			(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Please logging first, to create new article.";
			toast.classList.remove('hide');
			toast.classList.add('show');
		}
	}

}
