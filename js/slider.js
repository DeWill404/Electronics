// Keymap for arrow keys
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

// Function to prevent default action
function preventDefault(e) { e.preventDefault(); }

// Function to stop arrow key action
function preventDefaultForScrollKeys(e) {
	if (keys[e.keyCode]) { preventDefault(e); return false; }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
	window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
		get: function () { supportsPassive = true; } 
	}));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
	window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
	window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
	window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
	window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
	window.removeEventListener('DOMMouseScroll', preventDefault, false);
	window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
	window.removeEventListener('touchmove', preventDefault, wheelOpt);
	window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

// Method to change article position in navbar
function getNavbar(index) {
	var tag_list = [ '<a class="p-2 link-secondary nav-links" href="./video.html">Vedios</a>',
	'<a class="p-2 link-secondary nav-links" href="./design.html">Designs</a>',
	'<a class="p-2 link-secondary nav-links" href="./datasheet.html">Datasheets</a>',
	'<a class="p-2 link-secondary nav-links" href="./projects.html">Projects</a>',
	'<a class="p-2 link-secondary nav-links" href="./feedback.html">Feedback</a>' ];

	tag_list[index] = '<a class="p-2 link-secondary nav-links" href="./index.html">Articles</a>';

	document.getElementById('navbar').innerHTML = tag_list.join("\n");
}