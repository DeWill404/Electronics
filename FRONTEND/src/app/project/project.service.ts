import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ProjectService {
	http:HttpClient;
	readonly ROOT_URL;

	constructor(http:HttpClient) {
		this.http = http;
		this.ROOT_URL = 'http://localhost:3000/projects';
	}

	getProjects() {
		return this.http.get(this.ROOT_URL);
	}

	addProjects(payload:Object) {
		return this.http.post(this.ROOT_URL, payload); 
	}

}