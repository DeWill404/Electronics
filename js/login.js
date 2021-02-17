(function ($) {
	"use strict";

	// Options for Message
	//----------------------------------------------
	var options = {
		'btn-loading': '<i class="fa fa-spinner fa-pulse"></i>',
		'btn-success': '<i class="fa fa-check"></i>',
		'btn-error': '<i class="fa fa-remove"></i>',
		'msg-success': 'All Good...',
		'msg-error': 'Wrong login credentials!',
		'useAJAX': true,
	};

	// Login Form
	//----------------------------------------------
	// Validation
	$("#login-form").validate({
		rules: {
			lg_username: "required",
			lg_password: "required",
		},
		errorClass: "form-invalid"
	});

	// Form Submission
	$("#login-form").submit(function () {
		remove_loading($(this));

		if (options['useAJAX'] == true) {
			// Dummy AJAX request (Replace this with your AJAX code)
			// If you don't want to use AJAX, remove this
			dummy_submit_form($(this));

			// Cancel the normal submission.
			// If you don't want to use AJAX, remove this
			return false;
		}
	});

	// Register Form
	//----------------------------------------------
	// Validation
	$("#register-form").validate({
		rules: {
			reg_username: {
				required: true,
				email: true
			},
			reg_password: {
				required: true,
				minlength: 5
			},
			reg_password_confirm: {
				required: true,
				minlength: 5,
				equalTo: "#register-form [name=reg_password]"
			},
			reg_agree: "required",
		},
		errorClass: "form-invalid",
		errorPlacement: function (label, element) {
			if (element.attr("type") === "checkbox" || element.attr("type") === "radio") {
				element.parent().append(label); // this would append the label after all your checkboxes/labels (so the error-label will be the last element in <div class="controls"> )
			} else {
				label.insertAfter(element); // standard behaviour
			}
		}
	});

	// Form Submission
	$("#register-form").submit(function () {
		remove_loading($(this));

		if (options['useAJAX'] == true) {
			// Dummy AJAX request (Replace this with your AJAX code)
			// If you don't want to use AJAX, remove this
			dummy_submit_form($(this));

			// Cancel the normal submission.
			// If you don't want to use AJAX, remove this
			return false;
		}
	});


	// Loading
	//----------------------------------------------
	function remove_loading($form) {
		$form.find('[type=submit]').removeClass('error success');
		$form.find('.login-status').removeClass('show error success').html('');
	}

	function form_loading($form) {
		$form.find('[type=submit]').addClass('clicked').html(options['btn-loading']);
	}

	function form_success($form) {
		$form.find('[type=submit]').addClass('success').html(options['btn-success']);
		$form.find('.login-status').addClass('show success').html(options['msg-success']);
	}

	function form_failed($form) {
		$form.find('[type=submit]').addClass('error').html(options['btn-error']);
		$form.find('.login-status').addClass('show error').html(options['msg-error']);
	}

	// Dummy Submit Form (Remove this)
	//----------------------------------------------
	// This is just a dummy form submission. You should use your AJAX function or remove this function if you are not using AJAX.
	function dummy_submit_form($form) {
		if ($form.valid()) {
			form_loading($form);

			setTimeout(function () {
				form_success($form);
				console.log("Pass method");
			}, 2000);
		} else {
			console.log("Fail method");
		}
	}

})(jQuery);


// Method to open login window
function launch_login() {
	document.getElementById('log-in').classList.remove('visually-hidden');
	switchVisibility(1);
	disableScroll();
}

// Method to cancel log in screen
function cancel_login() {
	document.getElementById('log-in').classList.add('visually-hidden');
	enableScroll();

	var inputList = document.getElementsByClassName('inputLog');
	for (let i = 0; i < inputList.length; i++) {
		const input = inputList[i];

		if (input.getAttribute('type') == 'checkbox') {
			input.checked = false;
		} else {
			input.value = "";
		}

	}
}

// Method to switch visibility of Login & Register display
function switchVisibility(index) {
	if (index == 0) {
		document.getElementById('login-wrapper').classList.add('visually-hidden');
		document.getElementById('register-wrapper').classList.remove('visually-hidden');
	} else {
		document.getElementById('login-wrapper').classList.remove('visually-hidden');
		document.getElementById('register-wrapper').classList.add('visually-hidden');
	}
}