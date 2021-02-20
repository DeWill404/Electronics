export class LoginService{
	isLogedIn: Boolean;
	userEmail: String;

	constructor() {
		this.isLogedIn = false;
		this.userEmail = "";
	}

	isLogged() { return this.isLogedIn; }

	getEmail() { return this.userEmail.substring(0, 10); }

}