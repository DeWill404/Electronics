export class ScrollingService {
	styleTag: HTMLStyleElement;

	constructor() {
		this.styleTag = this.buildStyleElement();
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