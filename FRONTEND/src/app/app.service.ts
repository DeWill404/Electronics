import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class LoginService{
	isLogedIn: Boolean;
	http: HttpClient;
	readonly ROOT_URL;

	constructor(http:HttpClient) {
		this.isLogedIn = false;
		this.http = http;
		this.ROOT_URL = 'http://localhost:3000/logins';
	}

	login(email:string) {
		return this.http.get(`${this.ROOT_URL}/${email}`);
	}

	register(payload:Object) {
		return this.http.post(this.ROOT_URL, payload); 
	}

	setLogedIn() {this.isLogedIn = true; }

	isLogged() { return this.isLogedIn; }

}