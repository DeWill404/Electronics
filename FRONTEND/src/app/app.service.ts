import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class LoginService{
	isLogedIn: Boolean;
	userEmail:string;
	http: HttpClient;

	readonly ROOT_URL;

	constructor(http:HttpClient) {
		// Check if user is previously login
		this.userEmail = localStorage.getItem('login') ? <string>localStorage.getItem('login') : '';
		this.isLogedIn = localStorage.getItem('login')!=null;

		this.http = http;
		this.ROOT_URL = 'http://localhost:3000/logins';
	}

	getEmail() {
		return this.userEmail;
	}

	login(email:string) {
		return this.http.get(`${this.ROOT_URL}/${email}`);
	}

	register(payload:Object) {
		return this.http.post(this.ROOT_URL, payload); 
	}

	setLogedIn(email:string) { 
		this.userEmail = email;
		localStorage.setItem('login', email);
		this.isLogedIn = true;
	}

	isLogged() { return this.isLogedIn; }

}