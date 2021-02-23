import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ScrollingService {
	http:HttpClient;
	readonly ROOT_URL;
	styleTag: HTMLStyleElement;

	constructor(http:HttpClient) {
		this.http = http;
		this.ROOT_URL = 'http://localhost:3000/videos';
		this.styleTag = this.buildStyleElement();
	}

	getVideos() {
		return this.http.get(this.ROOT_URL);
	}

	uploadVideos(payload:Object) {
		return this.http.post(this.ROOT_URL, payload); 
	}

	disable() { document.body.appendChild( this.styleTag ); }

	enable() { document.body.removeChild( this.styleTag ); }

	buildStyleElement() {

		var style = document.createElement( "style" );

		style.setAttribute( "data-debug", "Injected by WindowScrolling service." );
		style.textContent = 'body { overflow: hidden !important ; }';

		return( style );

	}
}