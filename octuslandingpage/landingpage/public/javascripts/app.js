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
        	Home2View 		= require('views/home2_view'),
        	FeaturesView 	= require('views/features_view'),
        	ContactView 	= require('views/contact_view'),
        	CareersView 	= require('views/careers_view'),
        	Router   		= require('lib/router')
        
        this.homeView 		= new HomeView();
        this.home2View 		= new Home2View();
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
        '' 			: 'home2',
        'home2' 	: 'home2',
        'features'	: 'features',
        'contact'	: 'contact',
        'careers' 	: 'careers'
    },
    
    home: function() {
        $('body').html(application.homeView.render().el)
    },

    home2: function() {
    	$('body').html(application.home2View.render().el)
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

;require.register("views/home2_view", function(exports, require, module) {
var View     = require('./view')
  , template = require('./templates/home2')

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
	console.log( "Showing pitch" );

	// Show questions
	// $(".pitch-question").removeClass("hide").delay(9000).addClass("hide");
	$(".question-1").delay(1000).fadeIn(2000).delay(8000).fadeOut();
	$(".question-2").delay(4000).fadeIn(2000).delay(5000).fadeOut();
	$(".question-3").delay(7000).fadeIn(2000).delay(2000).fadeOut();
	setTimeout( function() { $(".pitch-question").fadeOut(); }, 10000 );

	// Show features
	$(".features-1").delay( 10000 ).fadeIn(2000).delay(11000).fadeOut();
	$(".features-2").delay( 13000 ).fadeIn(2000).delay(8000).fadeOut();
	$(".features-3").delay( 16000 ).fadeIn(2000).delay(5000).fadeOut();
	$(".features-4").delay( 19000 ).fadeIn(2000).delay(2000).fadeOut();
	setTimeout( function() { $(".pitch-features").fadeOut(); }, 22000 );

	// Show logo
	$(".pitch-logo").delay( 23000 ).fadeIn(2000);
}

var toggleAccessibility = function() {
	console.log('Toggling accessibility');
	$(".feature").addClass("visible-xs");
	$(".feature-accessibility").removeClass("visible-xs");

	$(".feature-nav-icon").addClass("desaturate");
	$(".nav-accessibility").removeClass("desaturate");
};

var toggleIntegration = function() {
	console.log('Toggling Integration');
	$(".feature").addClass("visible-xs");
	$(".feature-integration").removeClass("visible-xs");

	$(".feature-nav-icon").addClass("desaturate");
	$(".nav-integration").removeClass("desaturate");
};

var toggleProductivity = function() {
	console.log('Toggling Productivity');
	$(".feature").addClass("visible-xs");
	$(".feature-productivity").removeClass("visible-xs");

	$(".feature-nav-icon").addClass("desaturate");
	$(".nav-productivity").removeClass("desaturate");
};

var toggleSecurity = function() {
	console.log('Toggling Security');
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
    id 					: 'home2-view',
    template 			: template,
    events 				: events,
    toggleAccessibility	: toggleAccessibility,
    toggleIntegration 	: toggleIntegration,
    toggleProductivity 	: toggleProductivity,
    toggleSecurity 		: toggleSecurity,
    afterRender 		: afterRender
});

});

;require.register("views/home_view", function(exports, require, module) {
var View     = require('./view')
  , template = require('./templates/home')

// var afterRender = function() {
//     var s = skrollr.init();
// }

var afterRender = function() {
	$("body").removeClass("body2");
}

module.exports = View.extend({
    id: 'home-view',
    template: template,
    afterRender: afterRender
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
  var buffer = "";


  buffer += "<!-- Facebook Javascript SDK -->\n<div id=\"fb-root\"></div>\n<script>(function(d, s, id) {\n  var js, fjs = d.getElementsByTagName(s)[0];\n  if (d.getElementById(id)) return;\n  js = d.createElement(s); js.id = id;\n  js.src = \"//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=356612794468955&version=v2.0\";\n  fjs.parentNode.insertBefore(js, fjs);\n}(document, 'script', 'facebook-jssdk'));</script>\n<!-- END -->\n\n<!-- Google+ Javascript include -->\n<script src=\"https://apis.google.com/js/platform.js\" async defer></script>\n<!-- END -->\n\n<div class=\"frontpage\">\n	<div class=\"slide slidetype-1\">\n		<div class=\"layer container\">\n			<div class=\"mobile-header visible-xs visible-sm\">\n				<img src=\"img/logo.png\">\n			</div>\n			<div class=\"header hidden-sm\">\n				<div class=\"logo col-md-2\">\n					<img src=\"img/logo.png\">\n				</div>\n				<div class=\"navHolder col-md-7 col-md-offset-3\">\n					\n				</div>\n			</div>\n			<div class=\"col-md-6\">\n				<div class=\"content content-1\">\n					<div class=\"text-heavy\">\n						Make recruiting a breeze\n					</div>\n					<div class=\"content-text\">\n						 and your business more productive\n					</div>\n					<a href=\"#/features\" class=\"btn btn-success btn-lg top corner\" role=\"button\">Here's how</a>\n				</div>\n			</div>\n		</div>\n	</div>\n\n	<div class=\"slide slidetype-2\">\n		<div class=\"layer container\">\n			<div class=\"header\">\n				<div class=\"logo col-md-2\">\n					<img src=\"img/logo.png\">\n				</div>\n				<div class=\"navHolder col-md-7 col-md-offset-3\">\n					\n				</div>\n			</div>\n			<div class=\"col-md-6\">\n			</div>\n			<div class=\"col-md-6\">\n				<div class=\"content content-2\">\n					<div class=\"text-heavy\">\n						Why are recruitment systems so difficult to use?\n					</div>\n					<div class=\"content-text\">\n						 We've been there, and we're here to solve it.\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n\n	<div class=\"slide slidetype-3\">\n		<div class=\"layer container\">\n			<div class=\"text-center top text-heavy text-spaced\">\n				The Octus Solution\n			</div>\n		</div>\n	</div>\n\n	<div class=\"slide slidetype-2\">\n		<div class=\"layer container\">\n			<div class=\"header\">\n				<div class=\"logo col-md-2\">\n					<img src=\"img/logo.png\">\n				</div>\n				<div class=\"navHolder col-md-7 col-md-offset-3\">\n					\n				</div>\n			</div>\n			<div class=\"col-md-6\">\n				<div class=\"slide-video embed-responsive embed-responsive-16by9 content-video\">\n					<iframe width=\"560\" height=\"315\" src=\"//www.youtube.com/embed/BKorP55Aqvg\" frameborder=\"0\" allowfullscreen></iframe>\n				</div>\n			</div>\n			<div class=\"col-md-6\">\n				<div class=\"content content-2\">\n					<div class=\"text-heavy\">\n						Accessibility\n					</div>\n					<div class=\"content-text\">\n						<ul class=\"content-list\">\n							<li>Cloud hosted system</li>\n							<li>Intuitive browser based interface</li>\n							<li>Full functionality on all platforms</li>\n							<li>End to End recruitment process management</li>\n						</ul>\n					</div>\n					<a href=\"#/features\" class=\"btn btn-success btn-lg top corner pull-right\" role=\"button\">Learn more</a>\n				</div>\n			</div>\n		</div>\n	</div>\n\n	<div class=\"slide slidetype-2\">\n		<div class=\"layer container\">\n			<div class=\"header negative\">\n				<div class=\"logo col-md-2\">\n					<img src=\"img/logo.png\">\n				</div>\n				<div class=\"navHolder col-md-7 col-md-offset-3\">\n					\n				</div>\n			</div>\n			<div class=\"col-md-6\">\n				<div class=\"content content-2 negative\">\n					<div class=\"text-heavy text-right\">\n						Integration\n					</div>\n					<div class=\"content-text\">\n						<ul class=\"content-list text-right\">\n							<li>Email &amp; Calendar</li>\n							<li>Phone &amp; SMS</li>\n							<li>Job Boards</li>\n							<li>Searching</li>\n							<li>Partners - Daxtra, IKM, Psytech</li>\n						</ul>\n					</div>\n					<a href=\"#/features\" class=\"btn btn-success btn-lg top corner\" role=\"button\">Learn more</a>\n				</div>\n			</div>\n			<div class=\"col-md-6\">\n				<div class=\"slide-video embed-responsive embed-responsive-16by9 content-video\">\n					<iframe width=\"560\" height=\"315\" src=\"//www.youtube.com/embed/BKorP55Aqvg\" frameborder=\"0\" allowfullscreen></iframe>\n				</div>\n			</div>\n		</div>\n	</div>\n\n	<div class=\"slide slidetype-2\">\n		<div class=\"layer container\">\n			<div class=\"header\">\n				<div class=\"logo col-md-2\">\n					<img src=\"img/logo.png\">\n				</div>\n				<div class=\"navHolder col-md-7 col-md-offset-3\">\n					\n				</div>\n			</div>\n			<div class=\"col-md-6\">\n				<div class=\"slide-video embed-responsive embed-responsive-16by9 content-video\">\n					<iframe width=\"560\" height=\"315\" src=\"//www.youtube.com/embed/BKorP55Aqvg\" frameborder=\"0\" allowfullscreen></iframe>\n				</div>\n			</div>\n			<div class=\"col-md-6\">\n				<div class=\"content content-2\">\n					<div class=\"text-heavy\">\n						Productivity\n					</div>\n					<div class=\"content-text\">\n						<ul class=\"content-list\">\n							<li>Email &amp; Calendar</li>\n							<li>Phone &amp; SMS</li>\n							<li>Job Boards</li>\n							<li>Searching</li>\n							<li>Partners - Daxtra, IKM, Psytech</li>\n						</ul>\n						\n					</div>\n					<a href=\"#/features\" class=\"btn btn-success btn-lg top corner pull-right\" role=\"button\">Learn more</a>\n				</div>\n			</div>\n		</div>\n	</div>\n\n	<div class=\"slide slidetype-2\">\n		<div class=\"layer container\">\n			<div class=\"header negative\">\n				<div class=\"logo col-md-2\">\n					<img src=\"img/logo.png\">\n				</div>\n				<div class=\"navHolder col-md-7 col-md-offset-3\">\n					\n				</div>\n			</div>\n			<div class=\"col-md-6\">\n				<div class=\"content content-2 negative\">\n					<div class=\"text-heavy text-right\">\n						Security\n					</div>\n					<div class=\"content-text\">\n						<ul class=\"content-list text-right\">\n							<li>Flexible system restriction policies</li>\n							<li>Action logging for full audit trails</li>\n						</ul>\n					</div>\n					<a href=\"#/features\" class=\"btn btn-success btn-lg top corner pull-right\" role=\"button\">Learn more</a>\n				</div>\n			</div>\n			<div class=\"col-md-6\">\n				<div class=\"slide-video embed-responsive embed-responsive-16by9 content-video\">\n					<iframe width=\"560\" height=\"315\" src=\"//www.youtube.com/embed/BKorP55Aqvg\" frameborder=\"0\" allowfullscreen></iframe>\n				</div>\n			</div>\n		</div>\n	</div>\n\n	<div class=\"slide slidetype-2\">\n		<div class=\"layer container\">\n			<div class=\"header\">\n				<div class=\"logo col-md-2\">\n					<img src=\"img/logo.png\">\n				</div>\n				<div class=\"navHolder col-md-7 col-md-offset-3\">\n					\n				</div>\n			</div>\n			<div class=\"col-md-6\">\n				<div class=\"content content-2\">\n					<div class=\"text-heavy\">\n						Contact us for a free trial now!\n					</div>\n					<div class=\"content-text\">\n						Simply leave your details with us and our friendly sales representative will reach out to you\n					</div>\n				</div>\n			</div>\n			<div class=\"col-md-6\">\n				<div class=\"slide-contactform\">\n				</div>\n			</div>\n		</div>\n	</div>\n\n	<div class=\"footer container\">\n		<div class=\"col-md-2\">All rights reserved</div>\n		<div class=\"col-md-2\">&copy; 2014 Octus</div>\n		<div class=\"col-md-6 col-md-offset-2\">\n			<!-- Facebook like plugin -->\n			<div class=\"fb-like\" data-href=\"https://www.facebook.com/octusrecruitment\" data-layout=\"button_count\" data-action=\"like\" data-show-faces=\"false\" data-share=\"false\"></div>\n			<!-- Google+ follow plugin -->\n			<div class=\"g-follow\" data-annotation=\"bubble\" data-height=\"20\" data-href=\"https://plus.google.com/110131833217889792669\" data-rel=\"publisher\"></div>\n		</div>\n	</div>\n\n</div>";
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

;require.register("views/templates/home2", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<!-- Facebook Javascript SDK -->\n<div id=\"fb-root\"></div>\n<script>(function(d, s, id) {\n  var js, fjs = d.getElementsByTagName(s)[0];\n  if (d.getElementById(id)) return;\n  js = d.createElement(s); js.id = id;\n  js.src = \"//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=356612794468955&version=v2.0\";\n  fjs.parentNode.insertBefore(js, fjs);\n}(document, 'script', 'facebook-jssdk'));</script>\n<!-- END -->\n\n<!-- Google+ Javascript include -->\n<script src=\"https://apis.google.com/js/platform.js\" async defer></script>\n<!-- END -->\n\n<div class=\"home2\">\n	<!-- BEGIN TOP NAVIGATION BAR -->\n	<nav class=\"navbar navbar-default frontpage-navbar\" role=\"navigation\">\n		<div class=\"container\">\n			<!-- Brand and toggle get grouped for better mobile display -->\n			<div class=\"navbar-header\">\n				<button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n					<span class=\"sr-only\">Toggle navigation</span>\n					<span class=\"icon-bar\"></span>\n					<span class=\"icon-bar\"></span>\n					<span class=\"icon-bar\"></span>\n				</button>\n				<a class=\"navbar-brand\" href=\"#\">\n					<img src=\"data:image/png;base64,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\" />\n				</a>\n			</div>\n\n			<!-- Collect the nav links, forms, and other content for toggling -->\n			<div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n				<ul class=\"nav navbar-nav navbar-right\">\n					<li><a href=\"#/about\">About</a></li>\n					<li><a href=\"#/features\">Features</a></li>\n					<li><a href=\"#\">News</a></li>\n					<li><a href=\"#/careers\">Careers</a></li>\n					<li><a href=\"#/contact\">Contact</a></li>\n					<li>\n						<a href=\"#\">\n							<button class=\"btn btn-danger btn-lg btn-trial\">\n								Free Trial\n							</button>\n						</a>\n					</li>\n				</ul>\n			</div>\n		</div>\n	</nav>\n	<!-- END TOP NAVIGATION BAR -->\n\n	<!-- Begin first panel -->\n	<div class=\"slide-panel panel-1\">\n		<!-- Desktop version. Animation shown -->\n		<div class=\"col-md-6 pitch-question\">\n			<div class=\"text-right slide-content question-1\">\n				Ever used a recruitment system and thought:\n			</div>\n			<div class=\"text-right slide-content question-2\">\n				Why does this have to be so difficult?\n			</div>\n			<div class=\"text-right slide-content question-3\">\n				Us too.\n			</div>\n		</div>\n\n		<div class=\"col-md-6 pitch-features\">\n			<div class=\"slide-content features-1 pull-right\">\n				Accessibility\n			</div>\n			<div class=\"slide-content features-2 pull-right\">\n				Integration\n			</div>\n			<div class=\"slide-content features-3 pull-right\">\n				Productivity\n			</div>\n			<div class=\"slide-content features-4 pull-right\">\n				Security\n			</div>\n		</div>\n\n		<div class=\"col-md-12 pitch-logo\">\n			<img class=\"center-block\" src=\"img/logo.png\">\n		</div>\n		<!-- Mobile version. No video -->\n		<!-- <div class=\"slide-content\">\n\n		</div> -->\n	</div>\n	<!-- End first panel -->\n\n	<!-- Begin second panel -->\n	<div class=\"slide-panel panel-2\">\n		<div class=\"container slide-content\">\n			<div class=\"col-xs-12 col-md-6\">\n				<h1 class=\"col-xs-12 col-md-12 text-center red\">\n					Octus injects power into your recruitment process. \n				</h1>\n				<h3 class=\"col-xs-12 col-md-12 text-center gray\">\n					Recruiting has always been a painful process. Octus presents a stable, fast and flexible solution for your needs\n				</h3>\n			</div>\n			<div class=\"col-xs-12 col-md-6\">\n				<div class=\"center-block tablet\">\n\n					<div id=\"screenshot-carousel\" class=\"carousel slide\" data-ride=\"carousel\">\n\n						<!-- Wrapper for slides -->\n						<div class=\"carousel-inner\">\n							<div class=\"item active\">\n								<img src=\"img/dashboard.jpg\" alt=\"dashboard\">\n							</div>\n							<div class=\"item\">\n								<img src=\"img/country_monitor.jpg\" alt=\"country monitor\">\n							</div>\n							<div class=\"item\">\n								<img src=\"img/emails.jpg\" alt=\"email\">\n							</div>\n						</div>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n	<!-- End second panel -->\n\n	<!-- Begin third panel -->\n	<div class=\"slide-panel panel-3\">\n		<div class=\"col-xs-12 col-md-12\">\n			<h1 class=\"text-center red\">\n				Octus Solves Problems\n			</h1>\n			<h4 class=\"col-xs-12 col-md-8 col-md-offset-2 text-center navy\">\n				At Octus, we believe in stable solutions to problems. Our smart, integrated and intuitive recruitment management software armed with reliable features is the only thing you'll ever need.\n			</h4>\n		</div>\n\n		<div class=\"col-xs-12 col-md-12\">\n			<!-- Accessibility -->\n			<div class=\"feature feature-accessibility\">\n				<div class=\"col-xs-12 col-md-6\">\n					<img class=\"center-block\" src=\"img/accessibility.png\">\n				</div>\n				<div class=\"col-xs-12 col-md-6\">\n					<h3 class=\"red bold\">\n						Accessibility\n					</h3>\n					<ul class=\"gray\">\n						<li>Intuitive Web based UI</li>\n						<li>Full functionality on PC, MAC, Mobile, Tablet</li>\n						<li>End to End Recruitment Process Management</li>\n						<li>Cloud Hosted</li>\n					</ul>\n				</div>\n			</div>\n\n			<!-- Integration -->\n			<div class=\"feature feature-integration visible-xs\">\n				<div class=\"col-xs-12 col-md-6\">\n					<img class=\"center-block\" src=\"img/integration.png\">\n				</div>\n				<div class=\"col-xs-12 col-md-6\">\n					<h3 class=\"red bold\">\n						Integration\n					</h3>\n					<ul class=\"gray\">\n						<li>Email &amp; Calendar</li>\n						<li>Phone &amp; SMS</li>\n						<li>Job Boards</li>\n						<li>Searching</li>\n						<li>Partners: Daxtra, IKM, Psytech</li>\n					</ul>\n				</div>\n			</div>\n\n			<!-- Productivity -->\n			<div class=\"feature feature-productivity visible-xs\">\n				<div class=\"col-xs-12 col-md-6\">\n					<img class=\"center-block\" src=\"img/productivity.png\">\n				</div>\n				<div class=\"col-xs-12 col-md-6\">\n					<h3 class=\"red bold\">\n						Productivity\n					</h3>\n					<ul class=\"gray\">\n						<li>Revenue, Activity, Output Quality: Bespoke Analytics allow you to see everything that is going on in your business in when you want and how you want to see it.</li>\n						<li>Integration and intuitive functions reduce duplication making your use of time more efficient.</li>\n						<li>Smart Calendar - Haven’t spoke to a client in a while? Octus will remind you. Candidate coming to end of contract? Octus will alert you.</li>\n					</ul>\n				</div>\n			</div>\n\n			<!-- Security -->\n			<div class=\"feature feature-security visible-xs\">\n				<div class=\"col-xs-12 col-md-6\">\n					<img class=\"center-block\" src=\"img/security.png\">\n				</div>\n				<div class=\"col-xs-12 col-md-6\">\n					<h3 class=\"red bold\">\n						Security\n					</h3>\n					<ul class=\"col-md-8 gray\">\n						<li>Controllable Usage - Limit consultant access to the system by time of day, day of week, location, device and even by “suspicious actions”</li>\n						<li>Know what is happening with your data - Every action taken is recorded so Octus can generate a full audit trail for any user in your business.</li>\n					</ul>\n				</div>\n			</div>\n		</div>\n\n		<div class=\"col-md-4 col-md-offset-4 feature-nav hidden-xs\">\n			<div class=\"col-md-3 feature-nav-icon nav-accessibility\">\n				<img class=\"img-circle\" src=\"img/accessibility_icon.png\">\n			</div>\n			<div class=\"col-md-3 feature-nav-icon nav-integration desaturate\">\n				<img class=\"img-circle\" src=\"img/integration.png\">\n			</div>\n			<div class=\"col-md-3 feature-nav-icon nav-productivity desaturate\">\n				<img class=\"img-circle\" src=\"img/productivity.png\">\n			</div>\n			<div class=\"col-md-3 feature-nav-icon nav-security desaturate\">\n				<img class=\"img-circle\" src=\"img/security.png\">\n			</div>\n		</div>\n	</div>\n	<!-- End third panel -->\n\n	<!-- Begin fourth panel -->\n	<div class=\"slide-panel panel-4\">\n		<div class=\"col-xs-12 col-md-12\">\n			<img class=\"center-block\" src=\"img/celebrate.png\">\n		</div>\n		<div class=\"col-xs-12 col-md-12\">\n			<h1 class=\"text-center red\">\n				Recruiters, Celebrate\n			</h1>\n			<h4 class=\"col-xs-12 col-md-8 col-md-offset-2 text-center navy\">\n				Yes, Octus Is For You.\n			</h4>\n			<h4 class=\"col-xs-12 col-md-8 col-md-offset-2 text-center navy\">\n				From job posting (to job boards and social media), tracking candidates &amp; client interactions to issuing and tracking invoicing, Octus does it all.\n			</h4>\n			<h4 class=\"col-xs-12 col-md-8 col-md-offset-2 text-center navy\">\n				On top of all that, we serve detailed analytics of each process to keep you informed every step of the way.\n			</h4>\n		</div>\n	</div>\n	<!-- End fourth panel -->\n\n	<!-- Begin fifth panel -->\n	<div class=\"slide-panel panel-5\">\n		<div class=\"col-xs-12 col-md-12\">\n			<h1 class=\"text-center\">Try Us Out. You'll Like It</h1>\n			<div class=\"col-xs-12 col-md-4 col-md-offset-4\">\n				<button class=\"center-block btn btn-lg\">Start A Free Trial Now</button>\n			</div>\n		</div>\n	</div>\n	<!-- End fifth panel -->\n\n	<!-- Begin sixth panel -->\n	<div class=\"slide-panel panel-6\">\n		<div class=\"col-xs-12 col-md-7\">\n			<div class=\"col-xs-12 col-md-3 col-md-offset-1 text-center divider\">\n				<h5>Copyright 2014 Octus</h5>\n			</div>\n			<div class=\"col-xs-12 col-md-3 text-center divider\">\n				<h5>Terms of Service</h5>\n			</div>\n			<div class=\"col-xs-12 col-md-3 text-center divider\">\n				<h5>News / Blog</h5>\n			</div>\n			<div class=\"col-xs-12 col-md-2 text-center\">\n				<h5>Contact Us</h5>\n			</div>\n		</div>\n		<div class=\"col-xs-12 col-md-5 social-icons\">\n			<div class=\"col-xs-4 col-md-2 col-md-offset-4 social-facebook\">\n				<a href=\"https://www.facebook.com/octusrecruitment\" target=\"_blank\">\n					<img class=\"center-block img-circle red-hue\" src=\"img/fb_icon.png\">\n				</a>\n			</div>\n			<div class=\"col-xs-4 col-md-2 social-linkedin\">\n				<a href=\"https://www.linkedin.com/company/octus-pte-ltd\" target=\"_blank\">\n					<img class=\"center-block img-circle red-hue\" src=\"img/linkedin_icon.png\">\n				</a>\n			</div>\n			<div class=\"col-xs-4 col-md-2 social-googleplus\">\n				<a href=\"https://plus.google.com/u/0/110131833217889792669/about\" target=\"_blank\">\n					<img class=\"center-block img-circle red-hue\" src=\"img/gplus_icon.png\">\n				</a>\n			</div>\n		</div>\n	</div>\n	<!-- End sixth panel -->\n\n</div>";
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