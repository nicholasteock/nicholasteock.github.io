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

        var HomeView 		= require('views/home_view'),
        	FeaturesView 	= require('views/features_view'),
        	ContactView 	= require('views/contact_view'),
        	CareersView 	= require('views/careers_view'),
        	Router   		= require('lib/router')
        
        this.homeView 		= new HomeView();
        this.featuresView 	= new FeaturesView();
        this.contactView 	= new ContactView();
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
        'features'	: 'features',
        'contact'	: 'contact',
        'careers' 	: 'careers'
    },
    
    home: function() {
        $('body').html(application.homeView.render().el)
    },

    features: function() {
    	$("body").html(application.featuresView.render().el)
    },

    contact: function() {
    	$("body").html(application.contactView.render().el)
    },

    careers: function() {
    	$("body").html(application.careersView.render().el)
    },

})

});

;require.register("lib/view_helper", function(exports, require, module) {
// Put handlebars.js helpers here

});

;require.register("models/collection", function(exports, require, module) {
// Base class for all collections
module.exports = Backbone.Collection.extend({
    
})

});

;require.register("models/model", function(exports, require, module) {
// Base class for all models
module.exports = Backbone.Model.extend({
    
})

});

;require.register("views/careers_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/careers');

var afterRender = function() {
	console.log("RENDERED CAREERS VIEW");
};

module.exports = View.extend({
    className: 'container careers-view',
    template: template,

    afterRender: afterRender
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
var View     	= require('./view'),
	header		= require('./templates/header'),
	template 	= require('./templates/features');

var afterRender = function() {
	$("body").addClass("body2");
	$(".header").html( header({}) );
	$(".main-nav-item").removeClass("active");
	$(".nav-features").addClass("active");
	console.log("RENDERED FEATURES VIEW");
};

module.exports = View.extend({
    className 		: 'container features-view',
    template 		: template,

    afterRender 	: afterRender
});

});

;require.register("views/home_view", function(exports, require, module) {
var View     = require('./view')
  , template = require('./templates/home')

var featureArr = [ 	
					'toggleAccessibility',
					'toggleIntegration',
					'toggleProductivity',
					'toggleSecurity' 
				];

var events 	= {
	    		'click .nav-accessibility' 	: 'toggleAccessibility',
	    		'click .nav-integration' 	: 'toggleIntegration',
	    		'click .nav-productivity' 	: 'toggleProductivity',
	    		'click .nav-security' 		: 'toggleSecurity'
	    	}

var afterRender = function() {
	$("body").removeClass("body2");

	setTimeout( showPitch, 100 );
	setInterval(rotateFeature, 7000);
}

function showPitch() {
	// console.log( "Showing pitch" );

	// Show questions
	// $(".pitch-question").removeClass("hide").delay(9000).addClass("hide");
	$(".question-1").delay(1000).fadeIn(1500);
	$(".question-2").delay(2500).fadeIn(1500);
	$(".question-3").delay(4000).fadeIn(1500);
	setTimeout( function() { $(".pitch-question").fadeOut(); }, 6000 );

	// Show features
	$(".features-1").delay( 7000 ).fadeIn(1500);
	$(".features-2").delay( 8500 ).fadeIn(1500);
	$(".features-3").delay( 10000 ).fadeIn(1500);
	$(".features-4").delay( 11500 ).fadeIn(1500);
	setTimeout( function() { $(".pitch-features").fadeOut(); }, 13500 );

	// Show logo
	$(".pitch-logo").delay( 14500 ).fadeIn(2000);
}

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

;require.register("views/templates/careers", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<nav class=\"navbar navbar-default navbar-fixed-top main-navbar\" role=\"navigation\">\n  <div class=\"container\">\n  	<div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\".main-navbar-collapse\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" href=\"#\">\n      	<img src=\"img/logo.png\">\n      </a>\n    </div>\n\n  	<div class=\"collapse navbar-collapse main-navbar-collapse\">\n	  	<ul class=\"nav navbar-nav pull-right\">\n	  		<li class=\"main-nav-item nav-features\"><a href=\"#/features\">Features</a></li>\n	  		<li class=\"main-nav-item nav-blog\"><a href=\"#\">Blog</a></li>\n	  		<li class=\"active main-nav-item nav-careers\"><a href=\"#/careers\">Careers</a></li>\n	  		<li class=\"main-nav-item nav-contact\"><a href=\"#/contact\">Contact Us</a></li>\n	  		<li class=\"main-nav-item nav-demo\">\n	  			<a href=\"#/contact\">\n	  				<button class=\"request-demo btn btn-danger btn-lg\">\n	  					Request Free Trial\n	  				</button>\n	  			</a>\n	  		</li>\n	  	</ul>\n  	</div>\n  </div>\n</nav>\n\n<div class=\"careers\">\n	Careers \n</div>";
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
  


  return "<div class=\"header\">\n</div>\n\n<div class=\"features\">\n	Features\n</div>";
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
  


  return "<div class=\"modal fade contact-modal\">\n	<div class=\"modal-dialog\">\n		<div class=\"modal-content\">\n			<div class=\"modal-header\">\n				<button type=\"button\" class=\"close\" data-dismiss=\"modal\">\n					<span aria-hidden=\"true\">&times;</span>\n					<span class=\"sr-only\">Close</span>\n				</button>\n				<h3 class=\"modal-title text-center bold navy\">Contact Us</h3>\n			</div>\n			<div class=\"modal-body\">\n				<form role=\"form\">\n					<div class=\"form-group\">\n						<label for=\"contact-name\">Name</label>\n						<input type=\"text\" class=\"form-control\" id=\"contact-name\">\n					</div>\n					<div class=\"form-group\">\n						<label for=\"contact-email\">Email</label>\n						<input type=\"email\" class=\"form-control\" id=\"contact-email\">\n					</div>\n					<div class=\"form-group\">\n						<label for=\"contact-phone\">Phone</label>\n						<input type=\"text\" class=\"form-control\" id=\"contact-phone\">\n					</div>\n					<div class=\"form-group\">\n						<label for=\"contact-company\">Company / Organization</label>\n						<input type=\"text\" class=\"form-control\" id=\"contact-company\">\n					</div>\n					<div class=\"radio\">\n						<label>\n							<input type=\"radio\" name=\"contact-option\" id=\"contact-option-trial\" value=\"trial\" checked>\n							Free Trial\n						</label>\n					</div>\n					<div class=\"radio\">\n						<label>\n							<input type=\"radio\" name=\"contact-option\" id=\"contact-option-demo\" value=\"demo\">\n							Demo\n						</label>\n					</div>\n				</form>\n			</div>\n			<div class=\"modal-footer\">\n				<button type=\"button\" class=\"center-block btn btn-danger btn-lg\">Submit</button>\n			</div>\n		</div>\n	</div>\n</div>\n\n<div class=\"home2\">\n	\n	<!-- BEGIN TOP NAVIGATION BAR -->\n	<nav class=\"navbar navbar-default frontpage-navbar\" role=\"navigation\">\n		<div class=\"container\">\n			<!-- Brand and toggle get grouped for better mobile display -->\n			<div class=\"navbar-header\">\n				<button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n					<span class=\"sr-only\">Toggle navigation</span>\n					<span class=\"icon-bar\"></span>\n					<span class=\"icon-bar\"></span>\n					<span class=\"icon-bar\"></span>\n				</button>\n				<a class=\"navbar-brand\" href=\"#\">\n					<img src=\"img/logo_inverse.png\">\n				</a>\n			</div>\n\n			<!-- Collect the nav links, forms, and other content for toggling -->\n			<div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n				<ul class=\"nav navbar-nav navbar-right\">\n					<li><a href=\"#/about\">About</a></li>\n					<li><a href=\"#/features\">Features</a></li>\n					<li><a href=\"#\">News</a></li>\n					<li><a href=\"#/careers\">Careers</a></li>\n					<li><a href=\"#/contact\">Contact</a></li>\n					<li>\n						<a href=\"#\">\n							<button class=\"btn btn-danger btn-lg btn-trial\" data-toggle=\"modal\" data-target=\".contact-modal\">\n								Free Trial\n							</button>\n						</a>\n					</li>\n				</ul>\n			</div>\n		</div>\n	</nav>\n	<!-- END TOP NAVIGATION BAR -->\n\n	<!-- Begin first panel -->\n	<div class=\"slide-panel panel-1\">\n		<!-- Desktop version. Animation shown -->\n		<div class=\"col-md-6 pitch-question\">\n			<div class=\"text-right slide-content question-1\">\n				Ever used a recruitment system and thought:\n			</div>\n			<div class=\"text-right slide-content question-2\">\n				Why does this have to be so difficult?\n			</div>\n			<div class=\"text-right slide-content question-3\">\n				Us too.\n			</div>\n		</div>\n\n		<div class=\"col-md-6 pitch-features\">\n			<div class=\"text-right slide-content features-1\">\n				Accessibility\n			</div>\n			<div class=\"text-right slide-content features-2\">\n				Integration\n			</div>\n			<div class=\"text-right slide-content features-3\">\n				Productivity\n			</div>\n			<div class=\"text-right slide-content features-4\">\n				Security\n			</div>\n		</div>\n\n		<div class=\"col-md-12 pitch-logo\">\n			<img class=\"center-block\" src=\"img/logo.png\">\n		</div>\n		<!-- Mobile version. No video -->\n		<!-- <div class=\"slide-content\">\n\n		</div> -->\n	</div>\n	<!-- End first panel -->\n\n	<!-- Begin second panel -->\n	<div class=\"slide-panel panel-2\">\n		<div class=\"container slide-content\">\n			<div class=\"col-xs-12 col-md-6\">\n				<h1 class=\"col-xs-12 col-md-12 text-center red\">\n					Octus injects power into your recruitment process. \n				</h1>\n				<h3 class=\"col-xs-12 col-md-12 text-center gray\">\n					Recruiting has always been a painful process. Octus presents a stable, fast and flexible solution for your needs\n				</h3>\n			</div>\n			<div class=\"col-xs-12 col-md-6\">\n				<div class=\"center-block tablet\">\n\n					<div id=\"screenshot-carousel\" class=\"carousel slide\" data-ride=\"carousel\">\n\n						<!-- Wrapper for slides -->\n						<div class=\"carousel-inner\">\n							<div class=\"item active\">\n								<img src=\"img/dashboard.jpg\" alt=\"dashboard\">\n							</div>\n							<div class=\"item\">\n								<img src=\"img/country_monitor.jpg\" alt=\"country monitor\">\n							</div>\n							<div class=\"item\">\n								<img src=\"img/emails.jpg\" alt=\"email\">\n							</div>\n						</div>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n	<!-- End second panel -->\n\n	<!-- Begin third panel -->\n	<div class=\"slide-panel panel-3\">\n		<div class=\"col-xs-12 col-md-12\">\n			<h1 class=\"text-center red\">\n				Octus Solves Problems\n			</h1>\n			<h4 class=\"col-xs-12 col-md-8 col-md-offset-2 text-center navy\">\n				At Octus, we believe in stable solutions to problems. Our smart, integrated and intuitive recruitment management software armed with reliable features is the only thing you'll ever need.\n			</h4>\n		</div>\n\n		<div class=\"col-xs-12 col-md-12\">\n			<!-- Accessibility -->\n			<div class=\"feature feature-accessibility\">\n				<div class=\"col-xs-12 col-md-6\">\n					<img class=\"center-block\" src=\"img/accessibility.png\">\n				</div>\n				<div class=\"col-xs-12 col-md-6\">\n					<h3 class=\"red bold\">\n						Accessibility\n					</h3>\n					<ul class=\"gray\">\n						<li>Intuitive Web based UI</li>\n						<li>Full functionality on PC, MAC, Mobile, Tablet</li>\n						<li>End to End Recruitment Process Management</li>\n						<li>Cloud Hosted</li>\n					</ul>\n				</div>\n			</div>\n\n			<!-- Integration -->\n			<div class=\"feature feature-integration visible-xs\">\n				<div class=\"col-xs-12 col-md-6\">\n					<img class=\"center-block\" src=\"img/integration.png\">\n				</div>\n				<div class=\"col-xs-12 col-md-6\">\n					<h3 class=\"red bold\">\n						Integration\n					</h3>\n					<ul class=\"gray\">\n						<li>Email &amp; Calendar</li>\n						<li>Phone &amp; SMS</li>\n						<li>Job Boards</li>\n						<li>Searching</li>\n						<li>Partners: Daxtra, IKM, Psytech</li>\n					</ul>\n				</div>\n			</div>\n\n			<!-- Productivity -->\n			<div class=\"feature feature-productivity visible-xs\">\n				<div class=\"col-xs-12 col-md-6\">\n					<img class=\"center-block\" src=\"img/productivity.png\">\n				</div>\n				<div class=\"col-xs-12 col-md-6\">\n					<h3 class=\"red bold\">\n						Productivity\n					</h3>\n					<ul class=\"gray\">\n						<li>Bespoke Analytics</li>\n						<li>Save Time With Reduced Effort Duplication</li>\n						<li>Smart Calender For Timely Alerts &amp; Reminders</li>\n					</ul>\n				</div>\n			</div>\n\n			<!-- Security -->\n			<div class=\"feature feature-security visible-xs\">\n				<div class=\"col-xs-12 col-md-6\">\n					<img class=\"center-block\" src=\"img/security.png\">\n				</div>\n				<div class=\"col-xs-12 col-md-6\">\n					<h3 class=\"red bold\">\n						Security\n					</h3>\n					<ul class=\"col-md-8 gray\">\n						<li>Controllable Usage</li>\n						<li>Complete Data Monitoring</li>\n					</ul>\n				</div>\n			</div>\n		</div>\n\n		<div class=\"col-md-4 col-md-offset-4 feature-nav hidden-xs\">\n			<div class=\"col-md-3 feature-nav-icon nav-accessibility\">\n				<img class=\"img-circle\" src=\"img/accessibility_icon.png\">\n			</div>\n			<div class=\"col-md-3 feature-nav-icon nav-integration desaturate\">\n				<img class=\"img-circle\" src=\"img/integration.png\">\n			</div>\n			<div class=\"col-md-3 feature-nav-icon nav-productivity desaturate\">\n				<img class=\"img-circle\" src=\"img/productivity.png\">\n			</div>\n			<div class=\"col-md-3 feature-nav-icon nav-security desaturate\">\n				<img class=\"img-circle\" src=\"img/security.png\">\n			</div>\n		</div>\n	</div>\n	<!-- End third panel -->\n\n	<!-- Begin fourth panel -->\n	<div class=\"slide-panel panel-4\">\n		<div class=\"col-xs-12 col-md-12\">\n			<img class=\"center-block\" src=\"img/celebrate.png\">\n		</div>\n		<div class=\"col-xs-12 col-md-12\">\n			<h1 class=\"text-center red\">\n				Recruiters, Celebrate\n			</h1>\n			<h4 class=\"col-xs-12 col-md-8 col-md-offset-2 text-center navy\">\n				Yes, Octus Is For You.\n			</h4>\n			<h4 class=\"col-xs-12 col-md-8 col-md-offset-2 text-center navy\">\n				From job posting (to job boards and social media), tracking candidates &amp; client interactions to issuing and tracking invoicing, Octus does it all.\n			</h4>\n			<h4 class=\"col-xs-12 col-md-8 col-md-offset-2 text-center navy\">\n				On top of all that, we serve detailed analytics of each process to keep you informed every step of the way.\n			</h4>\n		</div>\n	</div>\n	<!-- End fourth panel -->\n\n	<!-- Begin fifth panel -->\n	<div class=\"slide-panel panel-5\">\n		<div class=\"col-xs-12 col-md-12\">\n			<h1 class=\"text-center\">Try Us Out. You'll Like It</h1>\n			<div class=\"col-xs-12 col-md-4 col-md-offset-4\">\n				<button class=\"center-block btn btn-lg btn-danger\" data-toggle=\"modal\" data-target=\".contact-modal\">Start A Free Trial Now</button>\n			</div>\n		</div>\n	</div>\n	<!-- End fifth panel -->\n\n	<!-- Begin sixth panel -->\n	<div class=\"slide-panel panel-6\">\n		<div class=\"col-xs-12 col-md-7\">\n			<div class=\"col-xs-12 col-md-3 col-md-offset-1 text-center divider\">\n				<h5>Copyright 2014 Octus</h5>\n			</div>\n			<div class=\"col-xs-12 col-md-3 text-center divider\">\n				<h5>Terms of Service</h5>\n			</div>\n			<div class=\"col-xs-12 col-md-3 text-center divider\">\n				<h5>News / Blog</h5>\n			</div>\n			<div class=\"col-xs-12 col-md-2 text-center\">\n				<h5>Contact Us</h5>\n			</div>\n		</div>\n		<div class=\"col-xs-12 col-md-5 social-icons\">\n			<div class=\"col-xs-4 col-md-2 col-md-offset-4 social-facebook\">\n				<a href=\"https://www.facebook.com/octusrecruitment\" target=\"_blank\">\n					<img class=\"center-block img-circle red-hue\" src=\"img/fb_icon.png\">\n				</a>\n			</div>\n			<div class=\"col-xs-4 col-md-2 social-linkedin\">\n				<a href=\"https://www.linkedin.com/company/octus-pte-ltd\" target=\"_blank\">\n					<img class=\"center-block img-circle red-hue\" src=\"img/linkedin_icon.png\">\n				</a>\n			</div>\n			<div class=\"col-xs-4 col-md-2 social-googleplus\">\n				<a href=\"https://plus.google.com/u/0/110131833217889792669/about\" target=\"_blank\">\n					<img class=\"center-block img-circle red-hue\" src=\"img/gplus_icon.png\">\n				</a>\n			</div>\n		</div>\n	</div>\n	<!-- End sixth panel -->\n\n</div>";
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
        this.render = _.bind(this.render, this)
    },
    
    template: function(){},
    getRenderData: function(){},
    
    render: function(){
        this.$el.html(this.template(this.getRenderData()))
        this.afterRender()
        return this
    },
    
    afterRender: function(){},
})

});

;
//# sourceMappingURL=app.js.map