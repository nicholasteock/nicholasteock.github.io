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
        
        var ConfirmationView 	= require('views/confirmation_view'),
        	LoginView 			= require('views/login_view'),
        	ListingView 		= require('views/listing_view'),
        	MovieView 			= require('views/movie_view'),
        	BookingView 		= require('views/booking_view')
        	Router   			= require('lib/router');
        
        this.confirmationView 	= new ConfirmationView();
        this.loginView 			= new LoginView();
        this.listingView 		= new ListingView();
        this.movieView 			= new MovieView();
        this.bookingView 		= new BookingView();
        this.router   			= new Router();
        
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
})

});

;require.register("lib/router", function(exports, require, module) {
var application = require('application')

module.exports 	= Backbone.Router.extend({
    routes: {
        '' 				: 'login',
        'login' 		: 'login',
        'listing' 		: 'listing',
        'movie' 		: 'movie',
        'booking' 		: 'booking',
        'confirmation' 	: 'confirmation',
    },
    
    login: function() {
        $('body').html(application.loginView.render().el)
    },
    
    listing: function() {
        $('body').html(application.listingView.render().el)
    },
    
    movie: function() {
        $('body').html(application.movieView.render().el)
    },
    
    booking: function() {
        $('body').html(application.bookingView.render().el)
    },
    
    confirmation: function() {
        $('body').html(application.confirmationView.render().el)
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

;require.register("views/booking_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/booking');

var events = {
  'click .seat'  : 'seatClicked'
};

var afterRender = function() {
	setTimeout( function() {
		//case I: Show from starting
		//init();

		//Case II: If already booked
		// var bookedSeats = [5, 10, 25];
		// init(bookedSeats);
		init([ "A-1", "B-10", "C-5" ]);
	}, 1000);
};

var settings = {
   rows: 11,
   cols: 20,
   rowCssPrefix: 'row-',
   colCssPrefix: 'col-',
   seatWidth: 35,
   seatHeight: 35,
   seatCss: 'seat',
   selectedSeatCss: 'selectedSeat',
   selectingSeatCss: 'selectingSeat'
};

var rowArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

var init = function (reservedSeat) {
    var str = [], seatNo, className, rowChar;

    for( var i=0, iLen=settings.rows; i<iLen; i++) {
    	rowChar = rowArr[i];

        for (var j = 0, jLen=settings.cols; j<jLen; j++) {
            // seatNo = (i + j * settings.rows + 1);
            // className = settings.seatCss + ' ' + settings.rowCssPrefix + i.toString() + ' ' + settings.colCssPrefix + j.toString();
            seatNo = j + 1;
            className = settings.seatCss + ' ' + settings.rowCssPrefix + rowChar + ' ' + settings.colCssPrefix + seatNo.toString();
            
            if( $.isArray(reservedSeat)  )
            if ($.isArray(reservedSeat) && $.inArray(rowChar + "-" + seatNo, reservedSeat) != -1) {
                className += ' ' + settings.selectedSeatCss;
            }
            
            str.push('<li class="' + className + '"' +
                      'style="top:' + (i * settings.seatHeight).toString() + 'px;left:' + (j * settings.seatWidth).toString() + 'px">' +
                      '<a title="' + seatNo + '">' + seatNo + '</a>' +
                      '</li>');
        }
    }
    $('#place').html(str.join(''));
};

var seatClicked = function( ev ) {
  console.log("HERE", ev);
	var $seat = $(ev.target),
		targetClasses = "",
		seatRow = "",
		seatCol = "",
		charPos,
		spacePos;

	if( $seat.hasClass("selectedSeat") ) { return; }

	$seat.toggleClass( "selectingSeat" );
	targetClasses = $seat.attr("class");
	
	// Get row character
	charPos = targetClasses.indexOf("row-");
	spacePos = targetClasses.indexOf(" ", charPos);
	seatRow = targetClasses.substring( charPos+4, spacePos );

	// Get column number
	charPos = targetClasses.indexOf("col-");
	spacePos = targetClasses.indexOf(" ", charPos);
	if( spacePos === -1 ) { spacePos = targetClasses.length; }
	seatCol = targetClasses.substring( charPos+4, spacePos );
};

module.exports = View.extend({
    id: 'booking-view',
    events: events,
    afterRender: afterRender,
    template: template,
    seatClicked: seatClicked
})

});

;require.register("views/confirmation_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/confirmation');

module.exports = View.extend({
    id: 'confirmation-view',
    template: template,
});

});

;require.register("views/home_view", function(exports, require, module) {
var View     = require('./view')
  , template = require('./templates/home')

module.exports = View.extend({
    id: 'home-view',
    template: template
})

});

;require.register("views/listing_view", function(exports, require, module) {
var View     = require('./view')
  , template = require('./templates/listing')

module.exports = View.extend({
    id: 'listing-view',
    template: template
})

});

;require.register("views/login_view", function(exports, require, module) {
var View     = require('./view')
  , template = require('./templates/login')

module.exports = View.extend({
    id: 'login-view',
    template: template
})

});

;require.register("views/movie_view", function(exports, require, module) {
var View     = require('./view')
  , template = require('./templates/movie')

module.exports = View.extend({
    id: 'movie-view',
    template: template
})

});

;require.register("views/templates/booking", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section class=\"container\">\n	<div class=\"panel panel-default booking-movie-info\">\n		<div class=\"panel-heading\">\n			Movie Information\n	  	</div>\n	  	<div class=\"panel-body\">\n	  		<div class=\"col-sm-12 col-md-6 col-lg-6\">\n				<div class=\"booking-movie-venue\">\n					<span class=\"col-sm-3 col-md-3 col-lg-3\">Cineplex: </span>\n					<span class=\"col-sm-9 col-md-9 col-lg-9\">AMK Hub</span>\n				</div>\n				<div class=\"booking-movie-title\">\n					<span class=\"col-sm-3 col-md-3 col-lg-3\">Movie Title: </span>\n					<span class=\"col-sm-9 col-md-9 col-lg-9\">Rurouni Kenshin The Legend Ends</span>\n				</div>\n				<div class=\"booking-movie-date\">\n					<span class=\"col-sm-3 col-md-3 col-lg-3\">Movie Date: </span>\n					<span class=\"col-sm-9 col-md-9 col-lg-9\">18/10/2014</span>\n				</div>\n				<div class=\"booking-movie-time\">\n					<span class=\"col-sm-3 col-md-3 col-lg-3\">Movie Time: </span>\n					<span class=\"col-sm-9 col-md-9 col-lg-9\">19:10</span>\n				</div>\n			</div>\n			<div class=\"col-sm-12 col-md-6 col-lg-6 booking-movie-info\">\n				<div class=\"booking-movie-duration\">\n					<span class=\"col-sm-3 col-md-3 col-lg-3\">Duration: </span>\n					<span class=\"col-sm-9 col-md-9 col-lg-9\">135 mins</span>\n				</div>\n				<div class=\"booking-movie-rating\">\n					<span class=\"col-sm-3 col-md-3 col-lg-3\">Rating: </span>\n					<span class=\"col-sm-9 col-md-9 col-lg-9\">NC16 - Violence</span>\n				</div>\n			</div>\n		</div>\n	</div>\n</section>\n<section class=\"container\">\n	<div class=\"panel panel-default booking-movie-seats\">\n		<div class=\"panel-body\">\n			<div class=\"booking-seats-container\">\n				<div class=\"center-block text-center booking-screen\">\n					Screen\n				</div>\n				<div class=\"booking-seats\">\n					<div id=\"seats\" class=\"center-block\">\n				        <ul id=\"place\">\n				        </ul>\n				    </div>\n				</div>\n			</div>\n		</div>\n	</div>\n</section>\n<section class=\"container\">\n	<div class=\"panel panel-default booking-movie-control\">\n	  	<div class=\"panel-body text-center\">\n		  	<a href=\"#/confirmation\">\n			  	<button type=\"button\" class=\"btn btn-lg btn-danger\">SUBMIT BOOKING</button>\n			</a>\n		  	<a href=\"#/listing\">\n		  		<button type=\"button\" class=\"btn btn-lg btn-info\">BACK TO MOVIE SELECTION</button>\n		  	</a>\n		</div>\n	</div>\n</section>";
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

;require.register("views/templates/confirmation", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section class=\"container\">\n	<div class=\"jumbotron\">\n		<h1 class=\"text-right\">Success!</h1>\n		<div class=\"well confirmation-summary\">\n			<h2>Booking Summary</h2>\n			<table class=\"table table-hover\">\n				<thead>\n				</thead>\n				<tbody>\n					<tr>\n						<td>Cineplex:</td>\n						<td>AMK Hub</td>\n					</tr>\n					<tr>\n						<td>Movie Title:</td>\n						<td>Rurouni Kenshin The Legend Ends</td>\n					</tr>\n					<tr>\n						<td>Movie Date:</td>\n						<td>18/10/2014</td>\n					</tr>\n					<tr>\n						<td>Movie Time:</td>\n						<td>19:10</td>\n					</tr>\n					<tr>\n						<td>Duration:</td>\n						<td>135 mins</td>\n					</tr>\n					<tr>\n						<td>Rating:</td>\n						<td>NC16 - Violence</td>\n					</tr>\n					<tr>\n						<td>Seats:</td>\n						<td>A-5, C-10, C-11</td>\n					</tr>\n				</tbody>\n			</table>\n		</div>\n		<div class=\"text-center\">\n			<a href=\"#/listing\">\n				<button type=\"button\" class=\"btn btn-lg btn-primary\">Home</button>\n			</a>\n		</div>\n	</div>\n</section>";
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
  


  return "this is the home page";
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

;require.register("views/templates/listing", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section class=\"container\">\n	<div class=\"col-sm-4 col-md-4 col-lg-4 listing-item\">\n		<div class=\"col-sm-12 col-md-12 col-lg-12 listing-title\">\n			Rurouni Kenshin The Legend Ends\n		</div>\n		<div class=\"col-md-5 col-lg-5 listing-left\">\n			<img class=\"listing-thumbnail\" src=\"img/thumbs/kenshin.jpg\">\n		</div>\n		<div class=\"col-md-7 col-lg-7 listing-right\">\n			<div class=\"listing-synopsis\">\n				To stop Makoto Shishio who aims to conquer Japan, Kenshin arrives in Kyoto and tries to face off against Shishio’s troops. However, his enemy has begun its course to start invading Tokyo with the steel-reinforced battleship. To save captured Kaoru who is thrown into the sea by Shishio’s men, Kenshin also dives in after her but is washed ashore alone, unconscious.\n				<br>\n				Kenshin recovers with the help of Seijuro Hiko, the master of Kenshin who happens to find him on the shore. He realises he is no match for Shishio unless he learns the ultimate technique of his sword style, and begs the master to teach him.\n				<br>\n				In the meantime, Shishio finds that Kenshin is still alive, and puts pressure on the government to find Kenshin and execute him in public for his sins during his days as the “Battosai the Killer”. As Kenshin faces his biggest challenge, can Kenshin really defeat his fiercest enemy Shishio, and be reunited with Kaoru?\n			</div>\n			<div class=\"listing-book\">\n				<a href=\"#/movie\"><button type=\"button\" class=\"btn btn-default btn-sm\">BOOK NOW</button></a>\n			</div>\n		</div>\n	</div>\n\n	<div class=\"col-sm-4 col-md-4 col-lg-4 listing-item\">\n		<div class=\"col-sm-12 col-md-12 col-lg-12 listing-title\">\n			Rurouni Kenshin The Legend Ends\n		</div>\n		<div class=\"col-md-5 col-lg-5 listing-left\">\n			<img class=\"listing-thumbnail\" src=\"img/thumbs/kenshin.jpg\">\n		</div>\n		<div class=\"col-md-7 col-lg-7 listing-right\">\n			<div class=\"listing-synopsis\">\n				<p>\n					To stop Makoto Shishio who aims to conquer Japan, Kenshin arrives in Kyoto and tries to face off against Shishio’s troops. However, his enemy has begun its course to start invading Tokyo with the steel-reinforced battleship. To save captured Kaoru who is thrown into the sea by Shishio’s men, Kenshin also dives in after her but is washed ashore alone, unconscious.\n				</p>\n				<p>\n					Kenshin recovers with the help of Seijuro Hiko, the master of Kenshin who happens to find him on the shore. He realises he is no match for Shishio unless he learns the ultimate technique of his sword style, and begs the master to teach him.\n				</p>\n				<p>\n					In the meantime, Shishio finds that Kenshin is still alive, and puts pressure on the government to find Kenshin and execute him in public for his sins during his days as the “Battosai the Killer”. As Kenshin faces his biggest challenge, can Kenshin really defeat his fiercest enemy Shishio, and be reunited with Kaoru?\n				</p>\n			</div>\n			<div class=\"listing-book\">\n				<a href=\"#/movie\"><button type=\"button\" class=\"btn btn-default btn-sm\">BOOK NOW</button></a>\n			</div>\n		</div>\n	</div>\n\n	<div class=\"col-sm-4 col-md-4 col-lg-4 listing-item\">\n		<div class=\"col-sm-12 col-md-12 col-lg-12 listing-title\">\n			Rurouni Kenshin The Legend Ends\n		</div>\n		<div class=\"col-md-5 col-lg-5 listing-left\">\n			<img class=\"listing-thumbnail\" src=\"img/thumbs/kenshin.jpg\">\n		</div>\n		<div class=\"col-md-7 col-lg-7 listing-right\">\n			<div class=\"listing-synopsis\">\n				<p>\n					To stop Makoto Shishio who aims to conquer Japan, Kenshin arrives in Kyoto and tries to face off against Shishio’s troops. However, his enemy has begun its course to start invading Tokyo with the steel-reinforced battleship. To save captured Kaoru who is thrown into the sea by Shishio’s men, Kenshin also dives in after her but is washed ashore alone, unconscious.\n				</p>\n				<p>\n					Kenshin recovers with the help of Seijuro Hiko, the master of Kenshin who happens to find him on the shore. He realises he is no match for Shishio unless he learns the ultimate technique of his sword style, and begs the master to teach him.\n				</p>\n				<p>\n					In the meantime, Shishio finds that Kenshin is still alive, and puts pressure on the government to find Kenshin and execute him in public for his sins during his days as the “Battosai the Killer”. As Kenshin faces his biggest challenge, can Kenshin really defeat his fiercest enemy Shishio, and be reunited with Kaoru?\n				</p>\n			</div>\n			<div class=\"listing-book\">\n				<a href=\"#/movie\"><button type=\"button\" class=\"btn btn-default btn-sm\">BOOK NOW</button></a>\n			</div>\n		</div>\n	</div>\n\n	<div class=\"col-sm-4 col-md-4 col-lg-4 listing-item\">\n		<div class=\"col-sm-12 col-md-12 col-lg-12 listing-title\">\n			Rurouni Kenshin The Legend Ends\n		</div>\n		<div class=\"col-md-5 col-lg-5 listing-left\">\n			<img class=\"listing-thumbnail\" src=\"img/thumbs/kenshin.jpg\">\n		</div>\n		<div class=\"col-md-7 col-lg-7 listing-right\">\n			<div class=\"listing-synopsis\">\n				<p>\n					To stop Makoto Shishio who aims to conquer Japan, Kenshin arrives in Kyoto and tries to face off against Shishio’s troops. However, his enemy has begun its course to start invading Tokyo with the steel-reinforced battleship. To save captured Kaoru who is thrown into the sea by Shishio’s men, Kenshin also dives in after her but is washed ashore alone, unconscious.\n				</p>\n				<p>\n					Kenshin recovers with the help of Seijuro Hiko, the master of Kenshin who happens to find him on the shore. He realises he is no match for Shishio unless he learns the ultimate technique of his sword style, and begs the master to teach him.\n				</p>\n				<p>\n					In the meantime, Shishio finds that Kenshin is still alive, and puts pressure on the government to find Kenshin and execute him in public for his sins during his days as the “Battosai the Killer”. As Kenshin faces his biggest challenge, can Kenshin really defeat his fiercest enemy Shishio, and be reunited with Kaoru?\n				</p>\n			</div>\n			<div class=\"listing-book\">\n				<a href=\"#/movie\"><button type=\"button\" class=\"btn btn-default btn-sm\">BOOK NOW</button></a>\n			</div>\n		</div>\n	</div>\n\n	<div class=\"col-sm-4 col-md-4 col-lg-4 listing-item\">\n		<div class=\"col-sm-12 col-md-12 col-lg-12 listing-title\">\n			Rurouni Kenshin The Legend Ends\n		</div>\n		<div class=\"col-md-5 col-lg-5 listing-left\">\n			<img class=\"listing-thumbnail\" src=\"img/thumbs/kenshin.jpg\">\n		</div>\n		<div class=\"col-md-7 col-lg-7 listing-right\">\n			<div class=\"listing-synopsis\">\n				<p>\n					To stop Makoto Shishio who aims to conquer Japan, Kenshin arrives in Kyoto and tries to face off against Shishio’s troops. However, his enemy has begun its course to start invading Tokyo with the steel-reinforced battleship. To save captured Kaoru who is thrown into the sea by Shishio’s men, Kenshin also dives in after her but is washed ashore alone, unconscious.\n				</p>\n				<p>\n					Kenshin recovers with the help of Seijuro Hiko, the master of Kenshin who happens to find him on the shore. He realises he is no match for Shishio unless he learns the ultimate technique of his sword style, and begs the master to teach him.\n				</p>\n				<p>\n					In the meantime, Shishio finds that Kenshin is still alive, and puts pressure on the government to find Kenshin and execute him in public for his sins during his days as the “Battosai the Killer”. As Kenshin faces his biggest challenge, can Kenshin really defeat his fiercest enemy Shishio, and be reunited with Kaoru?\n				</p>\n			</div>\n			<div class=\"listing-book\">\n				<a href=\"#/movie\"><button type=\"button\" class=\"btn btn-default btn-sm\">BOOK NOW</button></a>\n			</div>\n		</div>\n	</div>\n</section>";
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

;require.register("views/templates/login", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section class=\"container\">\n	<div class=\"jumbotron text-center\">\n		<h1>CS2102 Project</h1>\n		<h1>Movie Booking System</h1>\n\n		<div class=\"container login-form\">\n			<h4>Please login to continue</h4>\n			<form role=\"form\" class=\"col-sm-12 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4\">\n				<input type=\"email\" class=\"form-control\" id=\"login-email\" placeholder=\"Email\">\n				<input type=\"password\" class=\"form-control\" id=\"login-password\" placeholder=\"Password\">\n				<a href=\"#/listing\">\n					<button type=\"button\" class=\"btn btn-default\">Submit</button>\n				</a>\n			</form>\n		</div>\n	</div>\n<section>";
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

;require.register("views/templates/movie", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section class=\"movie-info\">\n<div class=\"container\">\n	<div class=\"col-sm-12 col-md-5 col-lg-5 movie-poster\">\n		<img src=\"img/kenshin.jpg\">\n	</div>\n	<div class=\"col-sm-12 col-md-5 col-lg-5 movie-details\">\n		<div class=\"col-sm-12 col-md-12 col-lg-12 movie-title\">\n			Rurouni Kenshin The Legend Ends ~ 浪客剑心: 传说落幕篇\n		</div>\n		<div class=\"col-sm-12 col-md-12 col-lg-12 movie-cast\">\n			<span class=\"col-sm-3 col-md-3 col-lg-3\">Cast</span>\n			<span class=\"col-sm-9 col-md-9 col-lg-9\">Takeru Satoh</span>\n		</div>\n		<div class=\"col-sm-12 col-md-12 col-lg-12 movie-director\">\n			<span class=\"col-sm-3 col-md-3 col-lg-3\">Director</span>\n			<span class=\"col-sm-9 col-md-9 col-lg-9\">Keishi Otomo</span>\n		</div>\n		<div class=\"col-sm-12 col-md-12 col-lg-12 movie-language\">\n			<span class=\"col-sm-3 col-md-3 col-lg-3\">Language</span>\n			<span class=\"col-sm-9 col-md-9 col-lg-9\">Japanese with English Subtitles</span>\n		</div>\n		<div class=\"col-sm-12 col-md-12 col-lg-12 movie-runtime\">\n			<span class=\"col-sm-3 col-md-3 col-lg-3\">Runtime</span>\n			<span class=\"col-sm-9 col-md-9 col-lg-9\">135 mins</span>\n		</div>\n		<div class=\"col-sm-12 col-md-12 col-lg-12 movie-rating\">\n			<span class=\"col-sm-3 col-md-3 col-lg-3\">Runtime</span>\n			<span class=\"col-sm-9 col-md-9 col-lg-9\">NC16 - Violence</span>\n		</div>\n		<div class=\"col-sm-12 col-md-12 col-lg-12 movie-book\">\n			<a href=\"#/booking\"><button type=\"button\" class=\"btn btn-default btn-sm\">BOOK NOW</button></a>\n		</div>\n		<div class=\"col-sm-12 col-md-12 col-lg-12 movie-synopsis\">\n			To stop Makoto Shishio who aims to conquer Japan, Kenshin arrives in Kyoto and tries to face off against Shishio’s troops. However, his enemy has begun its course to start invading Tokyo with the steel-reinforced battleship. To save captured Kaoru who is thrown into the sea by Shishio’s men, Kenshin also dives in after her but is washed ashore alone, unconscious.\n			<br><br>\n			Kenshin recovers with the help of Seijuro Hiko, the master of Kenshin who happens to find him on the shore. He realises he is no match for Shishio unless he learns the ultimate technique of his sword style, and begs the master to teach him.\n			<br><br>\n			In the meantime, Shishio finds that Kenshin is still alive, and puts pressure on the government to find Kenshin and execute him in public for his sins during his days as the “Battosai the Killer”. As Kenshin faces his biggest challenge, can Kenshin really defeat his fiercest enemy Shishio, and be reunited with Kaoru?\n		</div>\n	</div>\n</div>\n</section>\n<section class=\"movie-showtimes\">\n	<div class=\"container\">\n		<h3>Showtimes</h3>\n		<div class=\"movie-showtime-container\">\n			<div class=\"movie-showtime-venue\">\n				AMK HUB\n			</div>\n			<div>\n				<ul class=\"col-sm-12 col-md-12 col-lg-12 movie-showtime-list\">\n					<li>\n						<span class=\"col-sm-6 col-md-2 col-lg-2 movie-showtime-date\">TODAY</span>\n						<span class=\"col-sm-6 col-md-10 col-lg-10\">\n							<ul class=\"movie-showtime-timelist\">\n								<li><a href=\"#/booking\">00:45</a></li>\n								<li><a href=\"#/booking\">13:45</a></li>\n								<li><a href=\"#/booking\">16:30</a></li>\n								<li><a href=\"#/booking\">19:15</a></li>\n								<li><a href=\"#/booking\">22:00</a></li>\n							</ul>\n						</span>\n					</li>\n					<li>\n						<span class=\"col-sm-6 col-md-2 col-lg-2 movie-showtime-date\">19 OCT, SUN</span>\n						<span class=\"col-sm-6 col-md-10 col-lg-10\">\n							<ul class=\"movie-showtime-timelist\">\n								<li><a href=\"#/booking\">00:45</a></li>\n								<li><a href=\"#/booking\">13:45</a></li>\n								<li><a href=\"#/booking\">16:30</a></li>\n								<li><a href=\"#/booking\">19:15</a></li>\n								<li><a href=\"#/booking\">22:00</a></li>\n							</ul>\n						</span>\n					</li>\n					<li>\n						<span class=\"col-sm-6 col-md-2 col-lg-2 movie-showtime-date\">20 OCT, MON</span>\n						<span class=\"col-sm-6 col-md-10 col-lg-10\">\n							<ul class=\"movie-showtime-timelist\">\n								<li><a href=\"#/booking\">00:45</a></li>\n								<li><a href=\"#/booking\">13:45</a></li>\n								<li><a href=\"#/booking\">16:30</a></li>\n								<li><a href=\"#/booking\">19:15</a></li>\n								<li><a href=\"#/booking\">22:00</a></li>\n							</ul>\n						</span>\n					</li>\n					<li>\n						<span class=\"col-sm-6 col-md-2 col-lg-2 movie-showtime-date\">21 OCT, TUE</span>\n						<span class=\"col-sm-6 col-md-10 col-lg-10\">\n							<ul class=\"movie-showtime-timelist\">\n								<li><a href=\"#/booking\">00:45</a></li>\n								<li><a href=\"#/booking\">13:45</a></li>\n								<li><a href=\"#/booking\">16:30</a></li>\n								<li><a href=\"#/booking\">19:15</a></li>\n								<li><a href=\"#/booking\">22:00</a></li>\n							</ul>\n						</span>\n					</li>\n					<li>\n						<span class=\"col-sm-6 col-md-2 col-lg-2 movie-showtime-date\">22 OCT, WED</span>\n						<span class=\"col-sm-6 col-md-10 col-lg-10\">\n							<ul class=\"movie-showtime-timelist\">\n								<li><a href=\"#/booking\">00:45</a></li>\n								<li><a href=\"#/booking\">13:45</a></li>\n								<li><a href=\"#/booking\">16:30</a></li>\n								<li><a href=\"#/booking\">19:15</a></li>\n								<li><a href=\"#/booking\">22:00</a></li>\n							</ul>\n						</span>\n					</li>\n				</ul>\n			</div>\n			<div class=\"movie-showtime-venue\">\n				AMK HUB\n			</div>\n			<div>\n				<ul class=\"col-sm-12 col-md-12 col-lg-12 movie-showtime-list\">\n					<li>\n						<span class=\"col-sm-6 col-md-2 col-lg-2 movie-showtime-date\">TODAY</span>\n						<span class=\"col-sm-6 col-md-10 col-lg-10\">\n							<ul class=\"movie-showtime-timelist\">\n								<li><a href=\"#/booking\">00:45</a></li>\n								<li><a href=\"#/booking\">13:45</a></li>\n								<li><a href=\"#/booking\">16:30</a></li>\n								<li><a href=\"#/booking\">19:15</a></li>\n								<li><a href=\"#/booking\">22:00</a></li>\n							</ul>\n						</span>\n					</li>\n					<li>\n						<span class=\"col-sm-6 col-md-2 col-lg-2 movie-showtime-date\">19 OCT, SUN</span>\n						<span class=\"col-sm-6 col-md-10 col-lg-10\">\n							<ul class=\"movie-showtime-timelist\">\n								<li><a href=\"#/booking\">00:45</a></li>\n								<li><a href=\"#/booking\">13:45</a></li>\n								<li><a href=\"#/booking\">16:30</a></li>\n								<li><a href=\"#/booking\">19:15</a></li>\n								<li><a href=\"#/booking\">22:00</a></li>\n							</ul>\n						</span>\n					</li>\n					<li>\n						<span class=\"col-sm-6 col-md-2 col-lg-2 movie-showtime-date\">20 OCT, MON</span>\n						<span class=\"col-sm-6 col-md-10 col-lg-10\">\n							<ul class=\"movie-showtime-timelist\">\n								<li><a href=\"#/booking\">00:45</a></li>\n								<li><a href=\"#/booking\">13:45</a></li>\n								<li><a href=\"#/booking\">16:30</a></li>\n								<li><a href=\"#/booking\">19:15</a></li>\n								<li><a href=\"#/booking\">22:00</a></li>\n							</ul>\n						</span>\n					</li>\n					<li>\n						<span class=\"col-sm-6 col-md-2 col-lg-2 movie-showtime-date\">21 OCT, TUE</span>\n						<span class=\"col-sm-6 col-md-10 col-lg-10\">\n							<ul class=\"movie-showtime-timelist\">\n								<li><a href=\"#/booking\">00:45</a></li>\n								<li><a href=\"#/booking\">13:45</a></li>\n								<li><a href=\"#/booking\">16:30</a></li>\n								<li><a href=\"#/booking\">19:15</a></li>\n								<li><a href=\"#/booking\">22:00</a></li>\n							</ul>\n						</span>\n					</li>\n					<li>\n						<span class=\"col-sm-6 col-md-2 col-lg-2 movie-showtime-date\">22 OCT, WED</span>\n						<span class=\"col-sm-6 col-md-10 col-lg-10\">\n							<ul class=\"movie-showtime-timelist\">\n								<li><a href=\"#/booking\">00:45</a></li>\n								<li><a href=\"#/booking\">13:45</a></li>\n								<li><a href=\"#/booking\">16:30</a></li>\n								<li><a href=\"#/booking\">19:15</a></li>\n								<li><a href=\"#/booking\">22:00</a></li>\n							</ul>\n						</span>\n					</li>\n				</ul>\n			</div>\n			<div class=\"movie-showtime-venue\">\n				AMK HUB\n			</div>\n			<div>\n				<ul class=\"col-sm-12 col-md-12 col-lg-12 movie-showtime-list\">\n					<li>\n						<span class=\"col-sm-6 col-md-2 col-lg-2 movie-showtime-date\">TODAY</span>\n						<span class=\"col-sm-6 col-md-10 col-lg-10\">\n							<ul class=\"movie-showtime-timelist\">\n								<li><a href=\"#/booking\">00:45</a></li>\n								<li><a href=\"#/booking\">13:45</a></li>\n								<li><a href=\"#/booking\">16:30</a></li>\n								<li><a href=\"#/booking\">19:15</a></li>\n								<li><a href=\"#/booking\">22:00</a></li>\n							</ul>\n						</span>\n					</li>\n					<li>\n						<span class=\"col-sm-6 col-md-2 col-lg-2 movie-showtime-date\">19 OCT, SUN</span>\n						<span class=\"col-sm-6 col-md-10 col-lg-10\">\n							<ul class=\"movie-showtime-timelist\">\n								<li><a href=\"#/booking\">00:45</a></li>\n								<li><a href=\"#/booking\">13:45</a></li>\n								<li><a href=\"#/booking\">16:30</a></li>\n								<li><a href=\"#/booking\">19:15</a></li>\n								<li><a href=\"#/booking\">22:00</a></li>\n							</ul>\n						</span>\n					</li>\n					<li>\n						<span class=\"col-sm-6 col-md-2 col-lg-2 movie-showtime-date\">20 OCT, MON</span>\n						<span class=\"col-sm-6 col-md-10 col-lg-10\">\n							<ul class=\"movie-showtime-timelist\">\n								<li><a href=\"#/booking\">00:45</a></li>\n								<li><a href=\"#/booking\">13:45</a></li>\n								<li><a href=\"#/booking\">16:30</a></li>\n								<li><a href=\"#/booking\">19:15</a></li>\n								<li><a href=\"#/booking\">22:00</a></li>\n							</ul>\n						</span>\n					</li>\n					<li>\n						<span class=\"col-sm-6 col-md-2 col-lg-2 movie-showtime-date\">21 OCT, TUE</span>\n						<span class=\"col-sm-6 col-md-10 col-lg-10\">\n							<ul class=\"movie-showtime-timelist\">\n								<li><a href=\"#/booking\">00:45</a></li>\n								<li><a href=\"#/booking\">13:45</a></li>\n								<li><a href=\"#/booking\">16:30</a></li>\n								<li><a href=\"#/booking\">19:15</a></li>\n								<li><a href=\"#/booking\">22:00</a></li>\n							</ul>\n						</span>\n					</li>\n					<li>\n						<span class=\"col-sm-6 col-md-2 col-lg-2 movie-showtime-date\">22 OCT, WED</span>\n						<span class=\"col-sm-6 col-md-10 col-lg-10\">\n							<ul class=\"movie-showtime-timelist\">\n								<li><a href=\"#/booking\">00:45</a></li>\n								<li><a href=\"#/booking\">13:45</a></li>\n								<li><a href=\"#/booking\">16:30</a></li>\n								<li><a href=\"#/booking\">19:15</a></li>\n								<li><a href=\"#/booking\">22:00</a></li>\n							</ul>\n						</span>\n					</li>\n				</ul>\n			</div>\n		</div>\n	</div>\n</section>";
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
    
    afterRender: function(){}
    
})

});

;
//# sourceMappingURL=app.js.map