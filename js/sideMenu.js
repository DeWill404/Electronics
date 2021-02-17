var menu = (function() {

	function init() {
		
		[].slice.call( document.querySelectorAll( '.dr-menu' ) ).forEach( function( el, i ) {

			var trigger = el.querySelector( 'div.dr-trigger' ),
				icon = trigger.querySelector( 'span.dr-icon-menu' ),
				open = false;

			trigger.addEventListener( 'click', function( event ) {
				if( !open ) {
					el.className += ' dr-menu-open';
					open = true;
				}
			}, false );

			icon.addEventListener( 'click', function( event ) {
				if( open ) {
					event.stopPropagation();
					open = false;
					el.className = el.className.replace(/\bdr-menu-open\b/,'');
					return false;
				}
			}, false );

		} );

	}

	init();

})();



function switchDesign(index) {
	switch (index) {
		case 1:
			console.log(1);
			break;
		case 2:
			console.log(2);
			break;
		case 3:
			console.log(3);
			break;
		case 4:
			console.log(4);
			break;
	}
}