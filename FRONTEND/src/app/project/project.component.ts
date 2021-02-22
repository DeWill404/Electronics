import { Component, OnInit } from '@angular/core';
import { LoginService } from '../app.service';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

	title = "Electronics | Project";

	constructor(private loginService:LoginService) { }

	ngOnInit(): void {
	}

	/* Method to ad new projects */
	addProjects() {
		if ( this.loginService.isLogged() ) {
			// show accordion
			(<HTMLDivElement>document.getElementById('add-new')).classList.add('show');
		} else {
			const toast = <HTMLDivElement>document.getElementById("toast");
			(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Please logging first, to add new projects.";
			toast.classList.remove('hide');
			toast.classList.add('show');
		}
	}

}
