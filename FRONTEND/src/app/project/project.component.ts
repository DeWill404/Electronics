import { Component, OnInit } from '@angular/core';
import { LoginService } from '../app.service';
import { ProjectService } from './project.service';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

	title = "Electronics | Project";
	PROJECTS:any[] = [];

	constructor(private loginService:LoginService, private projectService:ProjectService) {
		this.projectService.getProjects().subscribe((data:any) => {
			this.PROJECTS = data;
		});
	}

	ngOnInit(): void {
	}


	/* Convert ngFor string to id */
	parseID(name:string) { return `#${name}`; }


	/* Convert ngFor string to headingID */
	parseHeading(name:string) { return `heading_${name}`; }


	/* Convert ngFor string to backgroung image style */
	parseImage(url:string) { return `background:linear-gradient(0deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${url}) no-repeat center center/cover;`; }

	
	/* Method to ad new projects */
	addProjects() {
		if ( this.loginService.isLogged() ) {
			// show accordion
			let newAccordion = <HTMLDivElement>document.getElementById('add-new');
			let newAccordionBtn = <HTMLButtonElement>document.getElementById('add-new-btn');

			// Switch visibility of accordon
			if ( newAccordion.classList.contains('show') ) {
				newAccordion.classList.remove('show');
				newAccordionBtn.setAttribute('aria-expanded','false');
				newAccordionBtn.classList.add('collapsed');
			}
			else {
				newAccordion.classList.add('show');
				newAccordionBtn.setAttribute('aria-expanded','true');
				newAccordionBtn.classList.remove('collapsed');
				// Reset inputs
				(<HTMLInputElement>document.getElementsByClassName('projectInput')[0]).value = '';
				(<HTMLTextAreaElement>document.getElementsByClassName('projectInput')[1]).value = '';
				(<HTMLInputElement>document.getElementsByClassName('projectInput')[2]).value = '';
			}
		} else {
			const toast = <HTMLDivElement>document.getElementById("toast");
			(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Please logging first, to add new projects.";
			toast.classList.remove('hide');
			toast.classList.add('show');
		}
	}


	/* Method to submit Projects to DB */
	submitProjects() {
		// Get toast variable
		const toast = <HTMLDivElement>document.getElementById("toast");

		if ( (<HTMLInputElement>document.getElementsByClassName('projectInput')[0]).value=='' || (<HTMLInputElement>document.getElementsByClassName('projectInput')[1]).value=="" || (<HTMLInputElement>document.getElementsByClassName('projectInput')[2]).value=='' ) {
			// ERROR toast
			(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Enter all the data.";
			toast.classList.remove('hide');
			toast.classList.add('show');
		} else {
			// Upload Project Data
			this.projectService.addProjects( { 'name':(<HTMLInputElement>document.getElementsByClassName('projectInput')[0]).value, 'description':(<HTMLInputElement>document.getElementsByClassName('projectInput')[1]).value, 'image':(<HTMLInputElement>document.getElementsByClassName('projectInput')[2]).value }).subscribe((data:any) => {
				if (data == null) {
					(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "An error occured";
					toast.classList.remove('hide');
					toast.classList.add('show');
				} else {
					// Successfull
					(<HTMLDivElement>document.getElementById("toast-body")).innerHTML = "Project added successfully";
					toast.classList.remove('hide');
					toast.classList.add('show');
				}
			});
		}
	}

}
