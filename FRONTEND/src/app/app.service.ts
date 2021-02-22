import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class LoginService{
	isLogedIn: Boolean;
	userEmail: String;
	http: HttpClient;
	readonly ROOT_URL;

	constructor(http:HttpClient) {
		this.isLogedIn = false;
		this.userEmail = "";
		this.http = http;
		this.ROOT_URL = 'http://localhost:3000';
	}

	get(uri:string, email:string) {
		return this.http.get(`${this.ROOT_URL}/${uri}/${email}`);
	}

	post(uri:string, payload:Object) {
		return this.http.post(`${this.ROOT_URL}/${uri}`, payload); 
	}

	setLogedIn() {this.isLogedIn = true; }

	isLogged() { return this.isLogedIn; }

	getEmail() { return this.userEmail.substring(0, 10); }

}