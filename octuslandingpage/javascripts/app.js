(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("application", function(exports, require, module) {
// Application bootstrapper.
Application = {
    initialize: function() {

        // var ContactModel    = require('models/contact_model');

        var HomeView 		= require('views/home_view'),
            AboutView       = require('views/about_view'),
        	FeaturesView 	= require('views/features_view'),
        	CareersView 	= require('views/careers_view'),
        	Router   		= require('lib/router');
        
        // this.contactModel   = new ContactModel();
        this.homeView 		= new HomeView();
        this.aboutView      = new AboutView();
        this.featuresView 	= new FeaturesView();
        this.careersView 	= new CareersView();
        this.router   		= new Router();

        if (typeof Object.freeze === 'function') Object.freeze(this)

    }
}

module.exports = Application

});

;require.register("initialize", function(exports, require, module) {
var application = require('application')

$(function() {
    application.initialize()
    Backbone.history.start()

    // Initialize parallax scrolling here.
    // s = skrollr.init();
})

});

;require.register("lib/router", function(exports, require, module) {
var application = require('application')

module.exports = Backbone.Router.extend({
    routes: {
        '' 			: 'home',
        'about' 	: 'about',
        'features'	: 'features',
        // 'contact'	: 'contact',
        'careers' 	: 'careers'
    },
    
    home: function() {
        $('body').html(application.homeView.render().el)
    },

    about: function() {
        $('body').html(application.aboutView.render().el)
    },

    features: function() {
    	$("body").html(application.featuresView.render().el)
    },

    // contact: function() {
    // 	$("body").html(application.contactView.render().el)
    // },

    careers: function() {
    	$("body").html(application.careersView.render().el)
    },

})

});

;require.register("lib/view_helper", function(exports, require, module) {
// Put handlebars.js helpers here

// Stuffing header modals and nav here for now.
// Can't figure out rendering multiple templates in the same view.
Handlebars.registerHelper( 'globalHeader', function(options) {
	var output = "<!-- Begin contact modal -->\
					<div class=\"modal contact-modal\">\
						<div class=\"modal-dialog\">\
							<div class=\"modal-content\">\
								<div class=\"modal-header\">\
									<button type=\"button\" class=\"close\" data-dismiss=\"modal\">\
										<span aria-hidden=\"true\">&times;</span>\
										<span class=\"sr-only\">Close</span>\
									</button>\
									<h3 class=\"modal-title text-center bold white\">Contact Us</h3>\
								</div>\
								<div class=\"modal-body\">\
									<form class=\"contact-form\" role=\"form\">\
										<div class=\"form-group\">\
											<label for=\"contact-name\">Name</label>\
											<input type=\"text\" class=\"form-control contact-name\">\
											<span class=\"pull-right contact-error contact-name-error\"></span>\
										</div>\
										<div class=\"form-group\">\
											<label for=\"contact-email\">Email</label>\
											<input type=\"email\" class=\"form-control contact-email\">\
											<span class=\"pull-right contact-error contact-email-error\"></span>\
										</div>\
										<div class=\"form-group\">\
											<label for=\"contact-phone\">Phone</label>\
											<input type=\"text\" class=\"form-control contact-phone\">\
											<span class=\"pull-right contact-error contact-phone-error\"></span>\
										</div>\
										<div class=\"form-group\">\
											<label for=\"contact-company\">Company / Organization</label>\
											<input type=\"text\" class=\"form-control contact-company\">\
											<span class=\"pull-right contact-error contact-company-error\"></span>\
										</div>\
										<div class=\"form-group\">\
											<label for=\"contact-message\">Message</label>\
											<textarea rows=\"3\" class=\"form-control contact-message\"></textarea>\
											<span class=\"pull-right contact-error contact-message-error\"></span>\
										</div>\
									</form>\
								</div>\
								<div class=\"modal-footer\">\
									<button type=\"button\" class=\"center-block btn btn-danger btn-lg contact-submit\">Submit</button>\
									<img class=\"center-block spinner contact-submit-spinner hide\" src=\"img/spinner.gif\">\
								</div>\
							</div>\
						</div>\
					</div>\
					<!-- End contact modal -->\
					<!-- Begin contact submission success modal -->\
					<div class=\"modal contact-submit-success-modal\">\
						<div class=\"modal-dialog\">\
							<div class=\"modal-content\">\
								<div class=\"modal-header\">\
									<button type=\"button\" class=\"close\" data-dismiss=\"modal\">\
										<span aria-hidden=\"true\">&times;</span>\
										<span class=\"sr-only\">Close</span>\
									</button>\
									<h3 class=\"modal-title text-center bold white\">Response Submitted</h3>\
								</div>\
								<div class=\"modal-body\">\
									<h3 class=\"text-center\">Thank You!</h3>\
									<h3 class=\"text-center\">We greatly appreciate your interest.</h3>\
									<h3 class=\"text-center\">Our team will contact you very soon.</h3>\
								</div>\
								<div class=\"modal-footer\">\
									<button type=\"button\" class=\"center-block btn btn-danger btn-lg\" data-dismiss=\"modal\">Close</button>\
								</div>\
							</div>\
						</div>\
					</div>\
					<!-- End contact submission success modal -->\
					<!-- BEGIN TOP NAVIGATION BAR -->\
					<nav class=\"navbar navbar-default frontpage-navbar\" role=\"navigation\">\
						<div class=\"container\">\
							<!-- Brand and toggle get grouped for better mobile display -->\
							<div class=\"navbar-header\">\
								<button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\
									<span class=\"sr-only\">Toggle navigation</span>\
									<span class=\"icon-bar\"></span>\
									<span class=\"icon-bar\"></span>\
									<span class=\"icon-bar\"></span>\
								</button>\
								<a class=\"navbar-brand\" href=\"#\">\
									<img src=\"img/logo_inverse.png\">\
								</a>\
							</div>\
							<!-- Collect the nav links, forms, and other content for toggling -->\
							<div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\
								<ul class=\"nav navbar-nav navbar-right\">\
									<li><a href=\"#/about\">About</a></li>\
									<li><a href=\"#/features\">Features</a></li>\
									<li><a href=\"#/careers\">Careers</a></li>\
									<li>\
										<a>\
											<button class=\"btn btn-danger btn-lg btn-trial\" data-toggle=\"modal\" data-target=\".contact-modal\">\
												Free Trial\
											</button>\
										</a>\
									</li>\
								</ul>\
							</div>\
						</div>\
					</nav>\
					<!-- END TOP NAVIGATION BAR -->";

	return output;
});
});

;require.register("models/collection", function(exports, require, module) {
// Base class for all collections
module.exports = Backbone.Collection.extend({
    
})

});

;require.register("models/contact_model", function(exports, require, module) {
var Model = require('./model');

var sendContact = function( params, callback ) {
	// console.log( "contactModel sendMessage function", params );

	$.ajax({
		url 		: "http://ec2-54-69-113-238.us-west-2.compute.amazonaws.com/php/contact.php",
		type 		: "POST",
		dataType 	: "json",
		data 		: params,
		success 	: function( response ) {
			callback(response);
		}
	});
};

module.exports = Model.extend({
	sendContact : sendContact
});
});

;require.register("models/model", function(exports, require, module) {
// Base class for all models
module.exports = Backbone.Model.extend({
    
})

});

;require.register("views/about_view", function(exports, require, module) {
var View     		= require('./view'),
	template 		= require('./templates/about'),
	contactHelper 	= require('./sendContact_helper');

var events 			= {
						'click .contact-submit'		: contactHelper.submitContact
			    	};

var afterRender = function() {
	console.log("RENDERED ABOUT VIEW");
};

module.exports = View.extend({
    className 		: 'about-view',
    template 		: template,
    events 			: events,
    afterRender 	: afterRender
});

});

;require.register("views/careers_view", function(exports, require, module) {
var View     		= require('./view'),
	template 		= require('./templates/careers'),
	contactHelper 	= require('./sendContact_helper');

var events 			= {
						'click .contact-submit'		: contactHelper.submitContact
			    	};

var afterRender = function() {
	console.log("RENDERED CAREERS VIEW");
};

var submitContact = function() {
	contactHelper.submitContact();
};

module.exports = View.extend({
    className 		: 'careers-view',
    template 		: template,
    events 			: events,
    afterRender 	: afterRender
});

});

;require.register("views/contact_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/contact');

var afterRender = function() {
	console.log("RENDERED CONTACT VIEW");
};

module.exports = View.extend({
    className: 'container contact-view',
    template: template,

    afterRender: afterRender
});

});

;require.register("views/features_view", function(exports, require, module) {
var View     		= require('./view'),
	template 		= require('./templates/features'),
	contactHelper 	= require('./sendContact_helper');

var events 			= {
						'click .contact-submit'		: contactHelper.submitContact
			    	};

var afterRender = function() {
	console.log("RENDERED FEATURES VIEW");
};

module.exports = View.extend({
    className 		: 'features-view',
    template 		: template,
    events 			: events,
    afterRender 	: afterRender
});

});

;require.register("views/home_view", function(exports, require, module) {
var View     		= require('./view'),
	template 		= require('./templates/home'),
	contactHelper 	= require('./sendContact_helper');

var events 			= {
			    		'click .nav-accessibility' 	: 'toggleAccessibility',
			    		'click .nav-integration' 	: 'toggleIntegration',
			    		'click .nav-productivity' 	: 'toggleProductivity',
			    		'click .nav-security' 		: 'toggleSecurity',
			    		'click .contact-submit'		: contactHelper.submitContact
			    	};

var afterRender = function() {
	$("body").removeClass("body2");

	setTimeout( showPitch, 100 );
	setInterval( rotateFeature, 7000 );
};

var rotateFeature = function() {

	if( $("body").width() < 768 ) {
		return;
	}

	var currentFeature = $(".feature-nav-icon:not(.desaturate)");

	if( currentFeature.hasClass( 'nav-accessibility' ) ) {
		toggleIntegration();
		return;
	}

	if( currentFeature.hasClass( 'nav-integration' ) ) {
		toggleProductivity();
		return;
	}

	if( currentFeature.hasClass( 'nav-productivity' ) ) {
		toggleSecurity();
		return;
	}

	if( currentFeature.hasClass( 'nav-security' ) ) {
		toggleAccessibility();
		return;
	}
};

function showPitch() {
	// console.log( "Showing pitch" );

	// Show questions
	$(".question-1").delay(1000).fadeIn(1000);
	$(".question-2").delay(1500).fadeIn(1000);
	$(".question-3").delay(3500).fadeIn(1000);
	setTimeout( function() { $(".pitch-question").fadeOut(); }, 5000 );

	// Show features
	$(".features-1").delay( 6000 ).fadeIn(1000);
	$(".features-2").delay( 6500 ).fadeIn(1000);
	$(".features-3").delay( 7000 ).fadeIn(1000);
	$(".features-4").delay( 7500 ).fadeIn(1000);
	setTimeout( function() { $(".pitch-features").fadeOut(); }, 9500 );

	// Show logo
	$(".pitch-logo").delay( 10000 ).fadeIn(1600);
};

var toggleAccessibility = function() {
	// console.log('Toggling accessibility');
	$(".feature").addClass("visible-xs");
	$(".feature-accessibility").removeClass("visible-xs");

	$(".feature-nav-icon").addClass("desaturate");
	$(".nav-accessibility").removeClass("desaturate");
};

var toggleIntegration = function() {
	// console.log('Toggling Integration');
	$(".feature").addClass("visible-xs");
	$(".feature-integration").removeClass("visible-xs");

	$(".feature-nav-icon").addClass("desaturate");
	$(".nav-integration").removeClass("desaturate");
};

var toggleProductivity = function() {
	// console.log('Toggling Productivity');
	$(".feature").addClass("visible-xs");
	$(".feature-productivity").removeClass("visible-xs");

	$(".feature-nav-icon").addClass("desaturate");
	$(".nav-productivity").removeClass("desaturate");
};

var toggleSecurity = function() {
	// console.log('Toggling Security');
	$(".feature").addClass("visible-xs");
	$(".feature-security").removeClass("visible-xs");

	$(".feature-nav-icon").addClass("desaturate");
	$(".nav-security").removeClass("desaturate");
};

module.exports = View.extend({
    id 					: 'home-view',
    template 			: template,
    events 				: events,
    toggleAccessibility	: toggleAccessibility,
    toggleIntegration 	: toggleIntegration,
    toggleProductivity 	: toggleProductivity,
    toggleSecurity 		: toggleSecurity,
    afterRender 		: afterRender
});

});

;require.register("views/sendContact_helper", function(exports, require, module) {
var ContactModel 	= require('models/contact_model');

function submitContact() {
	var name 	= $(".contact-name").val(),
		email 	= $(".contact-email").val(),
		phone 	= $(".contact-phone").val(),
		company = $(".contact-company").val(),
		// request = $("input[type='radio'][name='contact-option']:checked").val(),
		params 	= {};

	var contactModel = new ContactModel();

	// console.log( "Values retrieved: " );
	// console.log( "Name: ", name );
	// console.log( "Email: ", email );
	// console.log( "Phone: ", phone );
	// console.log( "Company: ", company );
	// console.log( "Request: ", request );

	if( !validateContactForm( name, email, phone, company) ) {
		return;
	}
	else {
		$(".contact-submit").addClass("hide");
		$(".contact-submit-spinner").removeClass("hide");
		params = {
			name 	: name,
			email 	: email,
			phone 	: phone,
			company : company,
			request : request
		};

		contactModel.sendContact( params, submitContactCallback );
	}
};

function submitContactCallback( response ) {
	// console.log( "in submitContactCallback. response is : ", response );

	if( response.result === "success" ) {
		$(".contact-submit").removeClass("hide");
		$(".contact-submit-spinner").addClass("hide");
		$(".contact-modal").modal("hide");
		$(".contact-submit-success-modal").modal("show");
	}
	else {
		$(".contact-submit").removeClass("hide");
		$(".contact-submit-spinner").addClass("hide");
		console.error("Contact submission failed.");
	}
};

function validateContactForm( name, email, phone, company ) {
	var $nameError 		= $(".contact-name-error").empty(),
		$emailError 	= $(".contact-email-error").empty(),
		$phoneError 	= $(".contact-phone-error").empty(),
		$companyError 	= $(".contact-company-error").empty(),
		regex 			= /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
		valid 			= true;

	// Name validation
	if( name === "" ) {
		$nameError.html("*This field is required.");
		valid = false;
	}

	// Email validation
	if( !regex.test( email ) ) {
		$emailError.html("*Invalid email.");
		valid = false;
	}

	if( email === "" ) {
		$emailError.html("*This field is required.");
		valid = false;
	}

	// Phone validation
	if( phone.length != 8 || !$.isNumeric( phone ) ) {
		$phoneError.html("*Invalid phone number.");
		valid = false;
	}

	if( phone === "" ) {
		$phoneError.html("*This field is required.");
		valid = false;
	}

	// Company validation
	if( company === "" ) {
		$companyError.html("*This field is required.");
		valid = false;
	}

	return valid;
};

module.exports = {
	submitContact: submitContact
}
});

;require.register("views/templates/about", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.globalHeader) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.globalHeader); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.globalHeader) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<div class=\"container about-container\">\n	<div class=\"col-sm-4 col-md-3 col-lg-3 hidden-xs\">\n		<ul class=\"nav nav-pills nav-stacked side-nav\">\n		  <li class=\"active\"><a>About Us</a></li>\n		  <li><a>Services &amp; Support</a></li>\n		  <li><a>Team</a></li>\n		  \n		  <li><a>Partners</a></li>\n		</ul>\n	</div>\n	<div class=\"col-xs-12 col-sm-8 col-md-9 col-lg-9\">\n		<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12 about-us-content about-section\">\n			<h1>About Us</h1>\n			<p>Octus is smart, integrated and intuitive recruitment management software optimised for small to medium sized recruitment agencies. It is designed to make your life easier and your business more productive.</p>\n			<p>It is a solution combining an applicant tracking system, job posting functionality and client relationship management tool into one platform.</p>\n		</div>\n		<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12 service-content about-section\">\n			<h1>Services &amp; Support</h1>\n			<p>All our clients will have a named account manager responsible for your first line of support.</p>\n			<p>We are dedicated to providing a magical support experience whenever you require it.</p>\n			<p>Further to this, your account manager will reach out regularly to discuss if there are any improvements or additions that can be made to your system.</p>\n		</div>\n		<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12 team-content about-section\">\n			<h1>The Team</h1>\n			<p>The team is built up of professionals with expert level knowledge in their field.</p>\n			<div class=\"team-container\">\n				<div class=\"col-xs-12 col-sm-4 col-md-4 col-lg-4\">\n					<img class=\"center-block img-circle\" src=\"img/sam.jpg\">\n					<h3 class=\"text-center\">Sam Randall</h3>\n					<h5 class=\"text-center\"><em>Director - Operations</em></h5>\n				</div>\n				\n				<div class=\"col-xs-12 col-sm-4 col-md-4 col-lg-4\">\n					<img class=\"center-block img-circle\" src=\"img/jak.jpg\">\n					<h3 class=\"text-center\">Jak Allday</h3>\n					<h5 class=\"text-center\"><em>Director - Sales</em></h5>\n				</div>\n				<div class=\"col-xs-12 col-sm-4 col-md-4 col-lg-4\">\n					<img class=\"center-block img-circle\" src=\"img/aselle.jpg\">\n					<h3 class=\"text-center\">Aselle Safiullina</h3>\n					<h5 class=\"text-center\"><em>Sales Manager</em></h5>\n				</div>\n			</div>\n			<div class=\"team-container\">\n				<div class=\"col-xs-12 col-sm-4 col-md-4 col-lg-4\">\n					<img class=\"center-block img-circle\" src=\"img/nick.jpg\">\n					<h3 class=\"text-center\">Nicholas Teo</h3>\n					<h5 class=\"text-center\"><em>Frontend Engineer</em></h5>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"partners-content about-section\">\n			<h1>Our Partners</h1>\n			<div class=\"center-block partners-container\">\n				<div class=\"col-xs-12 col-md-3\">\n					<img class=\"center-block partner-logo\" src=\"img/daxtra_logo.jpg\">\n				</div>\n				<div class=\"col-xs-12 col-md-3\">\n					<img class=\"center-block partner-logo\" src=\"img/ikm_logo.jpg\">\n				</div>\n				<div class=\"col-xs-12 col-md-3\">\n					<img class=\"center-block partner-logo\" src=\"img/psytech_logo.jpg\">\n				</div>\n				<div class=\"col-xs-12 col-md-3\">\n					<img class=\"center-block partner-logo\" src=\"img/spring_logo.jpg\">\n				</div>\n			</div>\n		</div>\n	</div>\n</div>";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/careers", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.globalHeader) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.globalHeader); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.globalHeader) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<div class=\"container careers-container\">\n	<div class=\"col-xs-12 col-sm-8 col-md-8 col-lg-8 col-sm-offset-2 col-md-offset-2 col-lg-offset-2\">\n		<h1>Join Our Team!</h1>\n		<p>\n			<h3>We are always keen to speak with exciting people.</h3>\n		</p>\n		<p>\n			<h3>If you have a background in technology or recruitment and would like to discuss opportunities, please get in touch!</h3>\n		</p>\n		<p>\n			<h3>Reach us at <a href=\"mailto:recruitment@octus.com.sg\">recruitment@octus.com.sg</a></h3>\n		</p>\n	</div>\n</div>";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/contact", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<nav class=\"navbar navbar-default navbar-fixed-top main-navbar\" role=\"navigation\">\n  <div class=\"container\">\n  	<div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\".main-navbar-collapse\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" href=\"#\">\n      	<img src=\"img/logo.png\">\n      </a>\n    </div>\n\n  	<div class=\"collapse navbar-collapse main-navbar-collapse\">\n	  	<ul class=\"nav navbar-nav pull-right\">\n	  		<li class=\"main-nav-item nav-features\"><a href=\"#/features\">Features</a></li>\n	  		<li class=\"main-nav-item nav-blog\"><a href=\"#\">Blog</a></li>\n	  		<li class=\"main-nav-item nav-careers\"><a href=\"#/careers\">Careers</a></li>\n	  		<li class=\"active main-nav-item nav-contact\"><a href=\"#/contact\">Contact Us</a></li>\n	  		<li class=\"main-nav-item nav-demo\">\n	  			<a href=\"#/contact\">\n	  				<button class=\"request-demo btn btn-danger btn-lg\">\n	  					Request Free Trial\n	  				</button>\n	  			</a>\n	  		</li>\n	  	</ul>\n  	</div>\n  </div>\n</nav>\n\n<div class=\"contact\">\n	Contact \n</div>";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/features", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.globalHeader) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.globalHeader); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.globalHeader) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<div class=\"container features-container\">\n	<div class=\"col-sm-4 col-md-3 col-lg-3 hidden-xs\">\n		<ul class=\"nav nav-pills nav-stacked side-nav\">\n		  <li class=\"active\"><a>Overview</a></li>\n		  <li><a>Accessibility</a></li>\n		  <li><a>Integration</a></li>\n		  <li><a>Productivity</a></li>\n		  <li><a>Security</a></li>\n		</ul>\n	</div>\n	<div class=\"col-xs-12 col-sm-8 col-md-9 col-lg-9\">\n		<div class=\"feature-overview-content features-section\">\n			<h1>Overview</h1>\n			<p>Octus is a next-generation recruitment system designed to manage every aspect of a recruiter's job.</p>\n			<p>Our system takes you through job posting, candidate tracking to client interactions and invoicing. We also deliver in-depth activity analyses to enlighten you on factors critical to your business success.</p>\n		</div>\n		<div class=\"accessibility-content features-section\">\n			<h1>Accessibility</h1>\n			<p>Octus is hosted in the cloud and the interface is web browser based. This means you can access your recruitment system and database from anywhere.</p>\n		</div>\n		<div class=\"integration-content features-section\">\n			<h1>Integration</h1>\n			<p>Octus is integrated with email, phone, calendar, social media and your website.</p>\n		</div>\n		<div class=\"productivity-content features-section\">\n			<h1>Productivity</h1>\n			<p>One of the joys with Octus being a fully integrated system is we can deliver unprecedented access to your information. We provide full and detailed consultant and management dashboards, with simple ways to set and monitor activity levels across your business globally.</p>\n			<p>Octus allows you to custom build reports to show you what you want to see.</p>\n			<p>We generate insights into your business and present the activity trends, efficiency and productivity of your best consultants.</p>\n		</div>\n		<div class=\"security-content features-section\">\n			<h1>Security</h1>\n			<p>We understand that your database is your competitive edge and intellectual property. As such our system is augmented with intuitive security &amp; access functions.</p>\n			<p>Super Admins (Company owners / Senior Managers) are able to limit functionality and access for each individual user based on the location of that user. There are also varying levels of access.</p>\n			<p>You possess the power &amp; convenience of a cloud based system, without losing control of your data.</p>\n		</div>\n	</div>\n</div>";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/header", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<nav class=\"navbar navbar-default navbar-fixed-top main-navbar\" role=\"navigation\">\n  <div class=\"container\">\n  	<div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\".main-navbar-collapse\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" href=\"#\">\n      	<img src=\"img/logo.png\">\n      </a>\n    </div>\n\n  	<div class=\"collapse navbar-collapse main-navbar-collapse\">\n	  	<ul class=\"nav navbar-nav pull-right\">\n	  		<li class=\"main-nav-item nav-features\"><a href=\"#/features\">Features</a></li>\n	  		<li class=\"main-nav-item nav-blog\"><a href=\"#\">Blog</a></li>\n	  		<li class=\"main-nav-item nav-careers\"><a href=\"#/careers\">Careers</a></li>\n	  		<li class=\"main-nav-item nav-contact\"><a href=\"#/contact\">Contact Us</a></li>\n	  		<li class=\"main-nav-item nav-demo\">\n	  			<a href=\"#/contact\">\n	  				<button class=\"request-demo btn btn-danger btn-lg\">\n	  					Request Free Trial\n	  				</button>\n	  			</a>\n	  		</li>\n	  	</ul>\n  	</div>\n  </div>\n</nav>";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/home", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.globalHeader) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.globalHeader); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.globalHeader) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<!-- Begin first panel -->\n<div class=\"home-slide-panel panel-1\">\n	<!-- Desktop version. Animation shown -->\n	<div class=\"col-md-6 pitch-question\">\n		<div class=\"text-right slide-content question-1\">\n			Ever used a recruitment system and thought:\n		</div>\n		<div class=\"text-right slide-content question-2\">\n			Why does this have to be so difficult?\n		</div>\n		<div class=\"text-right slide-content question-3\">\n			Us too.\n		</div>\n	</div>\n\n	<div class=\"col-md-6 pitch-features\">\n		<div class=\"text-right slide-content features-1\">\n			Accessibility\n		</div>\n		<div class=\"text-right slide-content features-2\">\n			Integration\n		</div>\n		<div class=\"text-right slide-content features-3\">\n			Productivity\n		</div>\n		<div class=\"text-right slide-content features-4\">\n			Security\n		</div>\n	</div>\n\n	<div class=\"col-md-12 pitch-logo\">\n		<img class=\"center-block\" src=\"img/logo.png\">\n	</div>\n	<!-- Mobile version. No video -->\n	<!-- <div class=\"slide-content\">\n\n	</div> -->\n</div>\n<!-- End first panel -->\n\n<!-- Begin second panel -->\n<div class=\"home-slide-panel panel-2\">\n	<div class=\"container slide-content\">\n		<div class=\"col-xs-12 col-md-6\">\n			<h1 class=\"col-xs-12 col-md-12 text-center red\">\n				Octus injects power into your recruitment process. \n			</h1>\n			<h3 class=\"col-xs-12 col-md-12 text-center gray\">\n				Recruiting has always been a painful process. Octus presents a stable, fast and flexible solution for your needs\n			</h3>\n		</div>\n		<div class=\"col-xs-12 col-md-6\">\n			<div class=\"center-block tablet\">\n\n				<div id=\"screenshot-carousel\" class=\"carousel slide\" data-ride=\"carousel\">\n\n					<!-- Wrapper for slides -->\n					<div class=\"carousel-inner\">\n						<div class=\"item active\">\n							<img src=\"img/dashboard_screen.jpg\" alt=\"dashboard\">\n						</div>\n						<div class=\"item\">\n							<img src=\"img/headofsales_screen.jpg\" alt=\"country monitor\">\n						</div>\n						<div class=\"item\">\n							<img src=\"img/kpi_screen.jpg\" alt=\"email\">\n						</div>\n						<div class=\"item\">\n							<img src=\"img/reference_screen.jpg\" alt=\"email\">\n						</div>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>\n<!-- End second panel -->\n\n<!-- Begin third panel -->\n<div class=\"home-slide-panel panel-3\">\n	<div class=\"col-xs-12 col-md-12\">\n		<h1 class=\"text-center red\">\n			Octus Solves Problems\n		</h1>\n		<h4 class=\"col-xs-12 col-md-8 col-md-offset-2 text-center navy\">\n			At Octus, we believe in stable solutions to problems. Our smart, integrated and intuitive recruitment management software armed with reliable features is the only thing you'll ever need.\n		</h4>\n	</div>\n\n	<div class=\"col-xs-12 col-md-12\">\n		<!-- Accessibility -->\n		<div class=\"feature feature-accessibility\">\n			<div class=\"col-xs-12 col-sm-12 col-md-6\">\n				<img class=\"center-block\" src=\"img/accessibility.png\">\n			</div>\n			<div class=\"col-xs-12 col-sm-12 col-md-6\">\n				<h3 class=\"red bold\">\n					Accessibility\n				</h3>\n				<ul class=\"gray\">\n					<li>Intuitive Web based UI</li>\n					<li>Full functionality on PC, MAC, Mobile, Tablet</li>\n					<li>End to End Recruitment Process Management</li>\n					<li>Cloud Hosted</li>\n				</ul>\n			</div>\n		</div>\n\n		<!-- Integration -->\n		<div class=\"feature feature-integration visible-xs\">\n			<div class=\"col-xs-12 col-sm-12 col-md-6\">\n				<img class=\"center-block\" src=\"img/integration.png\">\n			</div>\n			<div class=\"col-xs-12 col-sm-12 col-md-6\">\n				<h3 class=\"red bold\">\n					Integration\n				</h3>\n				<ul class=\"gray\">\n					<li>Email &amp; Calendar</li>\n					<li>Phone &amp; SMS</li>\n					<li>Job Boards</li>\n					<li>Searching</li>\n					<li>Partners: Daxtra, IKM, Psytech</li>\n				</ul>\n			</div>\n		</div>\n\n		<!-- Productivity -->\n		<div class=\"feature feature-productivity visible-xs\">\n			<div class=\"col-xs-12 col-sm-12 col-md-6\">\n				<img class=\"center-block\" src=\"img/productivity.png\">\n			</div>\n			<div class=\"col-xs-12 col-sm-12 col-md-6\">\n				<h3 class=\"red bold\">\n					Productivity\n				</h3>\n				<ul class=\"gray\">\n					<li>Bespoke Analytics</li>\n					<li>Save Time With Reduced Effort Duplication</li>\n					<li>Smart Calender For Timely Alerts &amp; Reminders</li>\n				</ul>\n			</div>\n		</div>\n\n		<!-- Security -->\n		<div class=\"feature feature-security visible-xs\">\n			<div class=\"col-xs-12 col-sm-12 col-md-6\">\n				<img class=\"center-block\" src=\"img/security.png\">\n			</div>\n			<div class=\"col-xs-12 col-sm-12 col-md-6\">\n				<h3 class=\"red bold\">\n					Security\n				</h3>\n				<ul class=\"col-md-8 gray\">\n					<li>Controllable Usage</li>\n					<li>Complete Data Monitoring</li>\n				</ul>\n			</div>\n		</div>\n	</div>\n\n	<div class=\"col-md-4 col-md-offset-4 feature-nav visible-md visible-lg\">\n		<div class=\"col-md-3 feature-nav-icon nav-accessibility\">\n			<img class=\"img-circle\" src=\"img/accessibility_icon.png\">\n		</div>\n		<div class=\"col-md-3 feature-nav-icon nav-integration desaturate\">\n			<img class=\"img-circle\" src=\"img/integration.png\">\n		</div>\n		<div class=\"col-md-3 feature-nav-icon nav-productivity desaturate\">\n			<img class=\"img-circle\" src=\"img/productivity.png\">\n		</div>\n		<div class=\"col-md-3 feature-nav-icon nav-security desaturate\">\n			<img class=\"img-circle\" src=\"img/security.png\">\n		</div>\n	</div>\n</div>\n<!-- End third panel -->\n\n<!-- Begin fourth panel -->\n<div class=\"home-slide-panel panel-4\">\n	<div class=\"col-xs-12 col-md-12\">\n		<img class=\"center-block\" src=\"img/celebrate.png\">\n	</div>\n	<div class=\"col-xs-12 col-md-12\">\n		<h1 class=\"text-center red\">\n			Recruiters, Celebrate\n		</h1>\n		<h4 class=\"col-xs-12 col-md-8 col-md-offset-2 text-center navy\">\n			Yes, Octus Is For You.\n		</h4>\n		<h4 class=\"col-xs-12 col-md-8 col-md-offset-2 text-center navy\">\n			From job posting (to job boards and social media), tracking candidates &amp; client interactions to issuing and tracking invoicing, Octus does it all.\n		</h4>\n		<h4 class=\"col-xs-12 col-md-8 col-md-offset-2 text-center navy\">\n			On top of all that, we serve detailed analytics of each process to keep you informed every step of the way.\n		</h4>\n	</div>\n</div>\n<!-- End fourth panel -->\n\n<!-- Begin fifth panel -->\n<div class=\"home-slide-panel panel-5\">\n	<div class=\"col-xs-12 col-md-12\">\n		<h1 class=\"text-center\">Try Us Out. You'll Like It</h1>\n		<div class=\"col-xs-12 col-md-4 col-md-offset-4\">\n			<button class=\"center-block btn btn-lg btn-danger\" data-toggle=\"modal\" data-target=\".contact-modal\">Start A Free Trial Now</button>\n		</div>\n	</div>\n</div>\n<!-- End fifth panel -->\n\n<!-- Begin sixth panel -->\n<div class=\"home-slide-panel panel-6\">\n	<div class=\"col-xs-12 col-md-7\">\n		<div class=\"col-xs-12 col-md-3 col-md-offset-1 text-center divider\">\n			<h5>Copyright 2014 Octus</h5>\n		</div>\n		<div class=\"col-xs-12 col-md-3 text-center divider\">\n			<h5>Terms of Service</h5>\n		</div>\n		<div class=\"col-xs-12 col-md-3 text-center divider\">\n			<h5>News / Blog</h5>\n		</div>\n		<div class=\"col-xs-12 col-md-2 text-center\">\n			<h5>Contact Us</h5>\n		</div>\n	</div>\n	<div class=\"col-xs-12 col-md-5 social-icons\">\n		<div class=\"col-xs-4 col-md-2 col-md-offset-4 social-facebook\">\n			<a href=\"https://www.facebook.com/octusrecruitment\" target=\"_blank\">\n				<img class=\"center-block img-circle red-hue\" src=\"img/fb_icon.png\">\n			</a>\n		</div>\n		<div class=\"col-xs-4 col-md-2 social-linkedin\">\n			<a href=\"https://www.linkedin.com/company/octus-pte-ltd\" target=\"_blank\">\n				<img class=\"center-block img-circle red-hue\" src=\"img/linkedin_icon.png\">\n			</a>\n		</div>\n		<div class=\"col-xs-4 col-md-2 social-googleplus\">\n			<a href=\"https://plus.google.com/u/0/110131833217889792669/about\" target=\"_blank\">\n				<img class=\"center-block img-circle red-hue\" src=\"img/gplus_icon.png\">\n			</a>\n		</div>\n	</div>\n</div>\n<!-- End sixth panel -->";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/view", function(exports, require, module) {
require('lib/view_helper')

// Base class for all views
module.exports = Backbone.View.extend({
    
    initialize: function(){
        this.render = _.bind(this.render, this);
    },
    
    template: function(){},
    getRenderData: function(){},
    
    render: function(){
        this.$el.html(this.template(this.getRenderData()));
        this.afterRender();
        return this;
    },
    
    afterRender: function(){},
})

});

;
//# sourceMappingURL=app.js.map