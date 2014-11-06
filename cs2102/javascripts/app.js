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
            LoginView           = require('views/login_view'),
        	RegisterView 		= require('views/register_view'),
        	ListingView 		= require('views/listing_view'),
        	MovieView 			= require('views/movie_view'),
            BookingView         = require('views/booking_view')
            EditView            = require('views/edit_view')
            AdminView           = require('views/admin_view')
            AdduserView         = require('views/adduser_view')
        	AddmovieView 		= require('views/addmovie_view')
            Router   			= require('lib/router');
        
        this.api                = "http://ec2-54-69-16-201.us-west-2.compute.amazonaws.com/api/";

        this.confirmationView 	= new ConfirmationView();
        this.loginView          = new LoginView();
        this.registerView 		= new RegisterView();
        this.listingView 		= new ListingView();
        this.movieView 			= new MovieView();
        this.bookingView        = new BookingView();
        this.editView           = new EditView();
        this.adminView          = new AdminView();
        this.adduserView        = new AdduserView();
        this.addMovieView 		= new AddmovieView();
        this.router   			= new Router();
                
        if (typeof Object.freeze === 'function') Object.freeze(this)
        
    }
}

module.exports = Application

});

;require.register("initialize", function(exports, require, module) {
var application = require('application')

$(function() {
    application.initialize();
    Backbone.history.start();
})

});

;require.register("lib/router", function(exports, require, module) {
var application = require('application')

module.exports 	= Backbone.Router.extend({
    routes: {
        '' 				: 'login',
        'login'         : 'login',
        'register' 		: 'register',
        'listing' 		: 'listing',
        'movie' 		: 'movie',
        'booking' 		: 'booking',
        'confirmation' 	: 'confirmation',
        'edit'          : 'edit',
        'admin'         : 'admin',
        'adduser'       : 'adduser',
        'addmovie'      : 'addmovie'
    },
    
    login: function() {
        $('body').html(application.loginView.render())
    },

    register: function() {
        $('body').html(application.registerView.render())
    },
    
    listing: function() {
        $('body').html(application.listingView.render())
    },
    
    movie: function() {
        $('body').html(application.movieView.render())
    },
    
    booking: function() {
        $('body').html(application.bookingView.render())
    },
    
    confirmation: function() {
        $('body').html(application.confirmationView.render())
    },

    edit: function() {
        $('body').html(application.editView.render())
    },

    admin: function() {
        $('body').html(application.adminView.render())
    },

    adduser: function() {
        $('body').html(application.adduserView.render())
    },

    addmovie: function() {
        $('body').html(application.addmovieView.render())
    },
})

});

;require.register("lib/view_helper", function(exports, require, module) {
/******************************************************************************
 Movie Listing Helper
******************************************************************************/

Handlebars.registerHelper( 'navbar', function(options) {
	var output = 	'<nav class="navbar navbar-inverse" role="navigation">'+
					'<div class="container">'+
					'<div class="pull-right">'+
					'<button type="button" class="btn btn-default navbar-btn login hide">Login</button>'+
					'<button type="button" class="btn btn-default navbar-btn register hide">Register</button>'+
					'<div class="navbar-text">Hi, '+localStorage.name+'</div>'+
					'<button type="button" class="btn btn-default navbar-btn logout">Logout</button>'+
					'</div>'+
					'</div>'+
					'</nav>';
	return output;
});

/******************************************************************************
 Movie Listing Helper
******************************************************************************/

Handlebars.registerHelper( 'movielisting', function(listingObject, options) {
	var output = "";

	if(listingObject.length == 0) {
		output = 	'<div class="col-sm-12"><div class="panel panel-default"><div class="panel-body">'+
					'<h3>Your search returned no results.</h3>'
  					'</div></div></div>';
		return output;
	}

	for( var i=0, iLen=listingObject.length; i<iLen; i++ ) {
		var itemHtml = "";

		itemHtml += '<div class="col-sm-4 col-md-4 col-lg-4 listing-item">'+
					'<div class="col-sm-12 col-md-12 col-lg-12 listing-title">'+
					listingObject[i].TITLE+
					'</div>'+
					'<div class="col-md-5 col-lg-5 listing-left">'+
					'<img class="listing-thumbnail" src="img/thumbs/'+listingObject[i].MID+'.jpg">'+
					'</div>'+
					'<div class="col-md-7 col-lg-7 listing-right">'+
					'<div class="listing-synopsis">'+
					listingObject[i].SYNOPSIS+
					'</div>'+
					'<div class="listing-book">'+
					'<a href="#/movie?id='+listingObject[i].MID+'">'+
					'<button type="button" class="btn btn-default btn-sm">BOOK NOW</button></a></div></div></div>';

		output += itemHtml;
	}

	return output;
});

/******************************************************************************
 Showtimes Helper
******************************************************************************/

Handlebars.registerHelper('showtimeslist', function(showtimesObject, options) {
	var output = "";
	var formedArray = [];
	var showtimesObject = _.groupBy(showtimesObject, 'p_name');

	_.each(showtimesObject, function(value, key) {
		var formedObject 	= {};
		formedObject.cinema = key;
		formedObject.shows 	= _.groupBy(value, 'SHOWDATE');
		formedArray.push(formedObject);
	});

	for( var i=0, iLen=formedArray.length; i<iLen; i++ ) {
		var itemHtml = "";

		itemHtml = 	'<div class="movie-showtime-venue">'+
					formedArray[i].cinema+
					'</div><div><ul class="col-sm-12 col-md-12 col-lg-12 movie-showtime-list">';

		_.each(formedArray[i].shows, function(value, key) {
			var listItem = "";

			var tempDate 	= new Date(key),
				dateString 	= tempDate.toDateString(),
				day 		= dateString.substr(0,3),
				month 		= dateString.substr(4,3),
				dayNum 		= dateString.substr(8,2);

			listItem = 	'<li>'+
						'<span class="col-sm-6 col-md-2 col-lg-2 movie-showtime-date">'+
						dayNum+" "+month+", "+day+
						'</span><span class="col-sm-6 col-md-10 col-lg-10">'+
						'<ul class="movie-showtime-timelist">';

			for( var j=0; j<value.length; j++ ) {
				var temp = "";
				temp = '<li><a href="#/booking?sid='+value[j].SID+'">'+value[j].TIME.substring(0,5)+'</a></li>';
				listItem += temp;
			}

			listItem += '</ul></span></li>';
			itemHtml += listItem;
		});

		itemHtml += '</ul></div>';
		output += itemHtml;
	}
	return output;
});

/******************************************************************************
 Booking screen movie details Helper
******************************************************************************/

Handlebars.registerHelper('moviebookingdetails', function(detailsObject, options) {
	var tempDate 	= new Date(detailsObject.showdate),
		dateString 	= tempDate.toDateString(),
		day 		= dateString.substr(0,3),
		month 		= dateString.substr(4,3),
		dayNum 		= dateString.substr(8,2),
		time 		= detailsObject.time.substring(0,5);

	var output = 	'<div class="panel-body">'+
					'<div class="col-sm-12 col-md-6 col-lg-6">'+
					'<div class="booking-movie-venue">'+
					'<span class="col-sm-3 col-md-3 col-lg-3">Cineplex: </span>'+
					'<span class="col-sm-9 col-md-9 col-lg-9">'+detailsObject.cineplex+'</span>'+
					'</div>'+
					'<div class="booking-movie-title">'+
					'<span class="col-sm-3 col-md-3 col-lg-3">Movie Title: </span>'+
					'<span class="col-sm-9 col-md-9 col-lg-9">'+detailsObject.title+'</span>'+
					'</div>'+
					'<div class="booking-movie-date">'+
					'<span class="col-sm-3 col-md-3 col-lg-3">Movie Date: </span>'+
					'<span class="col-sm-9 col-md-9 col-lg-9">'+dayNum+" "+month+", "+day+'</span>'+
					'</div>'+
					'<div class="booking-movie-time">'+
					'<span class="col-sm-3 col-md-3 col-lg-3">Movie Time: </span>'+
					'<span class="col-sm-9 col-md-9 col-lg-9">'+time+'</span>'+
					'</div>'+
					'</div>'+
					'<div class="col-sm-12 col-md-6 col-lg-6 booking-movie-info">'+
					'<div class="booking-movie-duration">'+
					'<span class="col-sm-3 col-md-3 col-lg-3">Duration: </span>'+
					'<span class="col-sm-9 col-md-9 col-lg-9">'+detailsObject.runtime+' mins</span>'+
					'</div>'+
					'<div class="booking-movie-rating">'+
					'<span class="col-sm-3 col-md-3 col-lg-3">Rating: </span>'+
					'<span class="col-sm-9 col-md-9 col-lg-9">'+detailsObject.mdarating+'</span>'+
					'</div>'+
					'</div>'+
					'</div>';

	return output;
});

/******************************************************************************
 Pre booking screen movie details Helper
******************************************************************************/

Handlebars.registerHelper('moviedetails', function(detailsObject, options) {
	var subtitles = detailsObject.subtitles == "None" ? "" : " with " + detailsObject.subtitles + " subtitles";

	var output 	= 	'<div class="col-sm-12 col-md-5 col-lg-5 movie-poster">'+
					'<img src="img/'+detailsObject.mid+'.jpg">'+
					// '<img src="img/'+detailsObject.mid+'.jpg">'+
					'</div>'+
					'<div class="col-sm-12 col-md-5 col-lg-5 movie-details">'+
					'<div class="col-sm-12 col-md-12 col-lg-12 movie-title">'+
					detailsObject.title+
					'</div>'+
					'<div class="col-sm-12 col-md-12 col-lg-12 movie-cast">'+
					'<span class="col-sm-3 col-md-3 col-lg-3">Cast</span>'+
					'<span class="col-sm-9 col-md-9 col-lg-9">'+
					detailsObject.cast+
					'</span>'+
					'</div>'+
					'<div class="col-sm-12 col-md-12 col-lg-12 movie-director">'+
					'<span class="col-sm-3 col-md-3 col-lg-3">Director</span>'+
					'<span class="col-sm-9 col-md-9 col-lg-9">'+
					detailsObject.director+
					'</span>'+
					'</div>'+
					'<div class="col-sm-12 col-md-12 col-lg-12 movie-language">'+
					'<span class="col-sm-3 col-md-3 col-lg-3">Language</span>'+
					'<span class="col-sm-9 col-md-9 col-lg-9">'+
					detailsObject.languages+subtitles+
					'</span>'+
					'</div>'+
					'<div class="col-sm-12 col-md-12 col-lg-12 movie-runtime">'+
					'<span class="col-sm-3 col-md-3 col-lg-3">Runtime</span>'+
					'<span class="col-sm-9 col-md-9 col-lg-9">'+
					detailsObject.runtime+' mins'+
					'</span>'+
					'</div>'+
					'<div class="col-sm-12 col-md-12 col-lg-12 movie-rating">'+
					'<span class="col-sm-3 col-md-3 col-lg-3">MDA Rating</span>'+
					'<span class="col-sm-9 col-md-9 col-lg-9">'+
					detailsObject.mdarating+
					'</span>'+
					'</div>'+
					'<div class="col-sm-12 col-md-12 col-lg-12 movie-synopsis">'+
					detailsObject.synopsis+
					'</div>'+
					'</div>';

	return output;
});

/******************************************************************************
 Confirmation Helper
******************************************************************************/

Handlebars.registerHelper('confirmation', function(options) {
	var bookingObject 	= JSON.parse(localStorage.booking);
	var movieDetails 	= bookingObject.movieDetails;
	var bookedSeats 	= bookingObject.bookedSeats.join(", ");

	var tempDate 	= new Date(movieDetails.showdate),
		dateString 	= tempDate.toDateString(),
		day 		= dateString.substr(0,3),
		month 		= dateString.substr(4,3),
		dayNum 		= dateString.substr(8,2),
		time 		= movieDetails.time.substring(0,5);

	var output = 	'<tr><td>Cineplex:</td><td>'+
					movieDetails.cineplex+
					'</td></tr>'+
					'<tr><td>Movie Title:</td><td>'+
					movieDetails.title+
					'</td></tr>'+
					'<tr><td>Movie Date:</td><td>'+
					dayNum+" "+month+", "+day+
					'</td></tr>'+
					'<tr><td>Movie Time:</td><td>'+
					time+
					'</td></tr>'+
					'<tr><td>Duration:</td><td>'+
					movieDetails.runtime+' mins'+
					'</td></tr>'+
					'<tr><td>Rating:</td><td>'+
					movieDetails.mdarating+
					'</td></tr>'+
					'<tr><td>Seats:</td><td>'+
					bookedSeats+
					'</td></tr>';
	return output;
});



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

;require.register("views/addmovie_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/addmovie')

var getRenderData = function() {
	if(localStorage.userId == undefined || localStorage.name == undefined) {
		alert("Please log in to continue");
		Application.router.navigate('login', {trigger: true});
		return false;
	}

	if(localStorage.userType == undefined || localStorage.userType != 0) {
		alert("You do not have admin privileges.");
		Application.router.navigate('listing', {trigger: true});
		return false;
	}
};

var logout = function() {
	localStorage.removeItem('userId');
	localStorage.removeItem('name');
	localStorage.removeItem('userType');
	localStorage.removeItem('booking');
	Application.router.navigate('login', {trigger: true});
	return false;
};

var afterRender = function(){
	$(".logout").click(logout);
};

var events = {
};

module.exports = View.extend({
    id 				: 'addmovie-view',
    events 			: events,
    getRenderData 	: getRenderData,
    afterRender 	: afterRender,
    template 		: template
});

});

;require.register("views/adduser_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/adduser')

var getRenderData = function() {
	if(localStorage.userId == undefined || localStorage.name == undefined) {
		alert("Please log in to continue");
		Application.router.navigate('login', {trigger: true});
		return false;
	}

	if(localStorage.userType == undefined || localStorage.userType != 0) {
		alert("You do not have admin privileges.");
		Application.router.navigate('listing', {trigger: true});
		return false;
	}
};

var logout = function() {
	localStorage.removeItem('userId');
	localStorage.removeItem('name');
	localStorage.removeItem('userType');
	localStorage.removeItem('booking');
	Application.router.navigate('login', {trigger: true});
	return false;
};

var validate = function(params) {
	var email 		= params.email,
		name 		= params.name,
		password 	= params.password;

	$(".newuser-error").html("");

	if(email.length==0 || name.length==0 || password.length==0) {
		$(".newuser-error").html("*All fields are required.");
		return false;
	}

	return true;
};

var newuser = function() {
	var email 		= $("#newuser-email").val(),
		name 		= $("#newuser-name").val(),
		password 	= $("#newuser-password").val(),
		isAdmin 	= $('#check_id').is(":checked") ? 0 : 1,
		params 		= {
						email 		: email,
						name 		: name,
						password 	: password,
						userType 	: isAdmin
					};

	if(!validate(params)) return;

	$.ajax({
			url 		: Application.api+"register",
			type 		: "POST",
			dataType	: 'json',
			data 		: params,
			success		: function(response) {
				$(".newuser-error").html("New user "+params.name+" added to system.");
				$("#newuser-email").val("");
				$("#newuser-name").val("");
				$("#newuser-password").val("");
				return false;
			},
			error		: function(response) {
				alert("Error in registering user "+params.name);
			}
	});
};

var afterRender = function(){
	$(".logout").click(logout);
	$(".newuser-submit").click(newuser);
};

var events = {
};

module.exports = View.extend({
    id 				: 'adduser-view',
    events 			: events,
    getRenderData 	: getRenderData,
    afterRender 	: afterRender,
    template 		: template,
    newuser 		: newuser
});

});

;require.register("views/admin_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/admin')

var getRenderData = function() {
	if(localStorage.userId == undefined || localStorage.name == undefined) {
		alert("Please log in to continue");
		Application.router.navigate('login', {trigger: true});
		return false;
	}

	if(localStorage.userType == undefined || localStorage.userType != 0) {
		alert("You do not have admin privileges.");
		Application.router.navigate('listing', {trigger: true});
		return false;
	}
};

var logout = function() {
	localStorage.removeItem('userId');
	localStorage.removeItem('name');
	localStorage.removeItem('userType');
	localStorage.removeItem('booking');
	Application.router.navigate('login', {trigger: true});
	return false;
};

var afterRender = function(){
	$(".logout").click(logout);
};

var events = {
};

module.exports = View.extend({
    id 				: 'admin-view',
    events 			: events,
    getRenderData 	: getRenderData,
    afterRender 	: afterRender,
    template 		: template
});

});

;require.register("views/booking_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/booking');

var events = {
  // 'click .seat'  : 'seatClicked'
  // 'click .submitbooking'  : 'submitBooking'
};

var bookedSeats;

var movieDetails;

var getRenderData = function() {
  if(localStorage.userId == undefined || localStorage.name == undefined) {
    alert("Please log in to continue");
    Application.router.navigate('login', {trigger: true});
    return false;
  }

  var hash    = window.location.hash,
      temp    = hash.indexOf('?sid='),
      sid     = hash.substring(temp+5),
      params  = {sid: sid};
  
  var dfdResult = $.Deferred();

  var onSuccess = function( response ) {
    var seats       = response.data;
    var responseObj = {};
    bookedSeats     = [];

    for(var i=0; i<seats.length; i++) {
      bookedSeats.push(seats[i].SEATNUM);
    }

    $.ajax({
        url       : Application.api+"movie?sid="+sid,
        type      : "GET",
        dataType  : 'json',
        success   : function(response) {
          var details = response.data;
          movieDetails = details[0];
          responseObj.details  = details[0];
          responseObj.seats    = seats;
          return dfdResult.resolve( responseObj );
        },
        error     : function(response) {
          console.log("Error in ajax call.");
          return dfdResult.reject( responseObj );
        }
    });
  };
  
  var onError = function( response ) {
    return dfdResult.reject( response );
  };
  
  $.ajax({
      url       : Application.api+"seats",
      type      : "GET",
      dataType  : 'json',
      data      : params,
      success   : onSuccess,
      error     : onError
  });
  
  return dfdResult;
};

var logout = function() {
  localStorage.removeItem('userId');
  localStorage.removeItem('name');
  localStorage.removeItem('booking');
  Application.router.navigate('login', {trigger: true});
  return false;
};

var afterRender = function() {
	setTimeout( function() {
		// init([ "A-1", "B-10", "C-5" ]);
    init(bookedSeats);
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
            seatNo = j + 1;
            if(seatNo < 10) {
              seatNo = "0"+seatNo.toString();
            }
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

    $(".logout").click(logout);
    $(".seat").click(seatClicked);
    $(".submitbooking").click(submitBooking);
};

var seatClicked = function( ev ) {
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

var submitBooking = function() {
  var that = this;

  var selectedSeats = $(".selectingSeat"),
      bookedSeats   = [],
      params        = {};

  if(selectedSeats.length === 0) {
    alert("Please select at least one seat.");
    return;
  }

  for( var i=0, iLen=selectedSeats.length; i<iLen; i++ ) {
    var classArray = $(selectedSeats[i]).attr('class').split(" ");
    var row = classArray[1].substring(4);
    var col = classArray[2].substring(4);
    var seat = "";

    if(Number(row) < 10) {
      row = "0" + row;
    }

    seat = row + "-" + col;
    bookedSeats.push(seat);
  }

  var hash    = window.location.hash,
      temp    = hash.indexOf('?sid='),
      sid     = hash.substring(temp+5),
      c_id    = Number(localStorage.userId);

  params = {
    sid   : sid,
    seats : bookedSeats,
    c_id  : c_id
  };

  $.ajax({
      url       : Application.api+"book",
      type      : "POST",
      dataType  : 'json',
      data      : params,
      success   : function(response) {
        var tempObj = {
          movieDetails  : movieDetails,
          bookedSeats   : params.seats
        };
        localStorage.booking = "";
        localStorage.booking = JSON.stringify(tempObj);
        Application.router.navigate('confirmation', {trigger: true});
      },
      error     : function(response) {
        console.log("in error : ", response);
      }
  });
};

module.exports = View.extend({
    id            : 'booking-view',
    events        : events,
    getRenderData : getRenderData,
    afterRender   : afterRender,
    template      : template,
    seatClicked   : seatClicked,
    submitBooking : submitBooking,
    bookedSeats   : bookedSeats
})

});

;require.register("views/confirmation_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/confirmation');

var getRenderData = function() {
	if(localStorage.userId == undefined || localStorage.name == undefined) {
		alert("Please log in to continue");
		Application.router.navigate('login', {trigger: true});
		return false;
	}
}

var logout = function() {
	localStorage.removeItem('userId');
	localStorage.removeItem('name');
	localStorage.removeItem('userType');
	localStorage.removeItem('booking');
	Application.router.navigate('login', {trigger: true});
	return false;
};

var afterRender = function() {
	$(".logout").click(logout);
}

module.exports = View.extend({
    id: 'confirmation-view',
    template: template,
    getRenderData : getRenderData,
    afterRender: afterRender
});

});

;require.register("views/edit_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/edit')

var getRenderData = function() {
	if(localStorage.userId == undefined || localStorage.name == undefined) {
		alert("Please log in to continue");
		Application.router.navigate('login', {trigger: true});
		return false;
	}

	var	dfdResult = $.Deferred();

	var onSuccess = function( response ) {
		return dfdResult.resolve( response );
	};
	
	var onError = function( response ) {
		return dfdResult.reject( response );
	};

	var data = {
		userId: localStorage.userId
	};

	$.ajax({
			url 		: Application.api+"bookings",
			type 		: "POST",
			dataType	: 'json',
			data 		: data,
			success		: onSuccess,
			error		: onError
	});
	
	return dfdResult;
};

var logout = function() {
	localStorage.removeItem('userId');
	localStorage.removeItem('name');
	localStorage.removeItem('userType');
	localStorage.removeItem('booking');
	Application.router.navigate('login', {trigger: true});
	return false;
};

var afterRender = function(){
	$(".logout").click(logout);
};

var events = {
};

module.exports = View.extend({
    id 				: 'edit-view',
    events 			: events,
    getRenderData 	: getRenderData,
    afterRender 	: afterRender,
    template 		: template
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
var View     = require('./view'),
	template = require('./templates/listing')

var getRenderData = function() {
	if(localStorage.userId == undefined || localStorage.name == undefined) {
		alert("Please log in to continue");
		Application.router.navigate('login', {trigger: true});
		return false;
	}

	var	dfdResult = $.Deferred();

	var onSuccess = function( response ) {
		return dfdResult.resolve( response );
	};
	
	var onError = function( response ) {
		return dfdResult.reject( response );
	};

	var data = {};
	var hash = window.location.hash;
	if(hash.indexOf("?") != -1) {
		var filters = hash.substring(hash.indexOf("?")+1);
		var filterArr = filters.split("&");
		for(var i=0, iLen=filterArr.length; i<iLen; i++) {
			var temp = filterArr[i].split("=");
			data[temp[0]] = temp[1];
		}
	}

	$.ajax({
			url 		: Application.api+"movielisting",
			type 		: "POST",
			dataType	: 'json',
			data 		: data,
			success		: onSuccess,
			error		: onError
	});
	
	return dfdResult;
};

var logout = function() {
	localStorage.removeItem('userId');
	localStorage.removeItem('name');
	localStorage.removeItem('userType');
	localStorage.removeItem('booking');
	Application.router.navigate('login', {trigger: true});
	return false;
};

var languageSelected = function(ev) {
	$("#filterLanguage").html(ev.target.text);
};

var subtitlesSelected = function(ev) {
	$("#filterSubtitles").html(ev.target.text);
};

var mdaratingSelected = function(ev) {
	$("#filtermdarating").html(ev.target.text);
};

var ratingSelected = function(ev) {
	$("#filterRating").html(ev.target.text);
};

var resetFilter = function(ev) {
	$("#filterTitle").val("");
	$("#filterLanguage").html("All Languages");
	$("#filterSubtitles").html("All Subtitles");
	$("#filtermdarating").html("All MDA Ratings");
	$("#filterRating").html("Sort by Rating");
	return;
}

var submitFilter = function() {
	var title 		= $("#filterTitle").val();
	var language 	= $("#filterLanguage").text();
	var subtitles 	= $("#filterSubtitles").text();
	var mdarating 	= $("#filtermdarating").text();
	var ratingorder = $("#filterRating").text();

	var temp = "";
	var queryParams = [];
	var queryString = "?";

	if(title.length > 0) {
		temp="title="+encodeURI(title);
		queryParams.push(temp);
	}

	if(language != "All Languages") {
		temp="languages="+encodeURI(language);
		queryParams.push(temp);
	}

	if(subtitles != "All Subtitles") {
		temp="subtitles="+encodeURI(subtitles);
		queryParams.push(temp);
	}

	if(mdarating != "All MDA Ratings") {
		temp="mdarating="+encodeURI(mdarating);
		queryParams.push(temp);
	}

	if(ratingorder != "Sort by Rating") {
		temp="ratingorder="+encodeURI(ratingorder);
		queryParams.push(temp);
	}

	queryString = "?"+queryParams.join("&");

	window.location.hash = "#/listing"+queryString;
	window.location.hash = "#/listing"+queryString;
	return false;
};

var afterRender = function(){
	var hash = window.location.hash;
	var data = hash.substring(hash.indexOf("?"));
	var dataArray = data.split("&");
	var temp = "";

	if(dataArray.length != 0) {
		for( var i=0, iLen=dataArray.length; i<iLen; i++ ) {
			temp = "";

			if(dataArray[i].indexOf("languages") >= 0) {
				temp = dataArray[i];
				temp = temp.substring(temp.indexOf("=")+1);
				$("#filterLanguage").html(temp);
			}
			else if(dataArray[i].indexOf("subtitles") >= 0) {
				temp = dataArray[i];
				temp = temp.substring(temp.indexOf("=")+1);
				$("#filterSubtitles").html(temp);
			}
			else if(dataArray[i].indexOf("mdarating") >= 0) {
				temp = dataArray[i];
				temp = temp.substring(temp.indexOf("=")+1);
				$("#filtermdarating").html(temp);
			}
			else if(dataArray[i].indexOf("ratingorder") >= 0) {
				temp = dataArray[i];
				temp = temp.substring(temp.indexOf("=")+1);
				$("#filterRating").html(temp);
			}
			else if(dataArray[i].indexOf("title") >= 0) {
				temp = dataArray[i];
				temp = temp.substring(temp.indexOf("=")+1);
				$("#filterTitle").val(temp);
			}
			else {}
		}
	}

	$(".logout").click(logout);
	$("#filterReset").click(resetFilter);
	$("#filterSubmit").click(submitFilter);
	$(".languageDropdown li").click(languageSelected);
	$(".subtitlesDropdown li").click(subtitlesSelected);
	$(".mdaratingDropdown li").click(mdaratingSelected);
	$(".ratingDropdown li").click(ratingSelected);
};

var events = {
};

module.exports = View.extend({
    id 				: 'listing-view',
    events 			: events,
    getRenderData 	: getRenderData,
    afterRender 	: afterRender,
    template 		: template
});

});

;require.register("views/login_view", function(exports, require, module) {
var View     = require('./view')
  , template = require('./templates/login')

var events = {
	// 'click .login-submit': 'login'
};

var afterRender = function() {
	console.log("In login page");
	localStorage.removeItem("booking");

	if(localStorage.userId != undefined && localStorage.name != undefined) {
		Application.router.navigate('listing', {trigger: true});
		return false;
	}

	$(".login-submit").click(login);
	$(".login-register").click(register);
};

var login = function() {
	var email 		= $("#login-email").val(),
		password 	= $("#login-password").val(),
		params 		= {
						email 		: email,
						password 	: password
					};

	$(".login-error").html("");

	if(email.length === 0) {
		$(".login-error").html("*All fields are required.");
		return;
	}

	if(password.length === 0) {
		$(".login-error").html("*All fields are required.");
		return;
	}

	$.ajax({
			url 		: Application.api+"login",
			type 		: "POST",
			dataType	: 'json',
			data 		: params,
			success		: function(response) {
				if(response.data == undefined || response.data.length === 0) {
					$(".login-error").html("Invalid credentials. Please try again.");
				}
				else {
					$(".login-error").html("");
					localStorage.userId 	= response.data[0].userId;
					localStorage.name 		= response.data[0].name;
					localStorage.userType 	= response.data[0].userType;
					// window.location.hash 	= "#listing";
					// window.location.hash 	= "#listing";
					Application.router.navigate('listing', {trigger: true});
				}
				return false;
			},
			error		: function(response) {
				alert("Error in login user.");
			}
	});

	// Application.router.navigate('listing', {trigger: true});
	return;
};

var register = function() {
	window.location.hash = "#register";
};

module.exports = View.extend({
    id: 'login-view',
    events: events,
    afterRender: afterRender,
    template: template,
    login: login
})

});

;require.register("views/movie_view", function(exports, require, module) {
var View     = require('./view')
  , template = require('./templates/movie')

var getRenderData = function() {
	if(localStorage.userId == undefined || localStorage.name == undefined) {
		alert("Please log in to continue");
		Application.router.navigate('login', {trigger: true});
		return false;
	}

	var hash 		= window.location.hash,
		temp 		= hash.indexOf('?id='),
		mid 		= hash.substring(temp+4),
		params 		= {id: mid},
		responseObj = {};
	
	var	dfdResult = $.Deferred();

	var onSuccess = function( response ) {
		var showtimes = response.data;

		$.ajax({
	        url       : Application.api+"movie?mid="+mid,
	        type      : "GET",
	        dataType  : 'json',
	        success   : function(response) {
				var details = response.data;
				responseObj.details  	= details[0];
				responseObj.showtimes = showtimes;
				console.log("responseObj", responseObj);
				return dfdResult.resolve( responseObj );
	        },
	        error     : function(response) {
	          console.log("Error in ajax call.");
	          return dfdResult.reject( responseObj );
	        }
	    });
	};
	
	var onError = function( response ) {
		return dfdResult.reject( response );
	};
	
	$.ajax({
			url 		: Application.api+"showtimes?id="+mid,
			type 		: "GET",
			dataType	: 'json',
			success		: onSuccess,
			error		: onError
	});
	
	return dfdResult;
};

var afterRender = function() {
	$(".logout").click(logout);
};

var logout = function() {
	localStorage.removeItem('userId');
	localStorage.removeItem('name');
	localStorage.removeItem('userType');
	localStorage.removeItem('booking');
	Application.router.navigate('login', {trigger: true});
	return false;
};

module.exports = View.extend({
    id 				: 'movie-view',
    getRenderData 	: getRenderData,
    afterRender 	: afterRender,
    template 		: template
});

});

;require.register("views/register_view", function(exports, require, module) {
var View     = require('./view')
  , template = require('./templates/register')

var events = {
};

var getRenderData

var validate = function(params) {
	var email 		= params.email,
		name 		= params.name,
		password 	= params.password;

	$(".register-error").html("");

	if(email.length==0 || name.length==0 || password.length==0) {
		$(".register-error").html("*All fields are required.");
		return false;
	}

	return true;
};

var registerSubmit = function() {
	var email 		= $("#register-email").val(),
		name 		= $("#register-name").val(),
		password 	= $("#register-password").val(),
		params 		= {
						email 		: email,
						name 		: name,
						password 	: password,
						userType 	: "1"
					};

	if(!validate(params)) return;

	$.ajax({
			url 		: Application.api+"register",
			type 		: "POST",
			dataType	: 'json',
			data 		: params,
			success		: function(response) {
				localStorage.userId = response.data[0].userId;
				localStorage.name 	= response.data[0].name;
				Application.router.navigate('listing', {trigger: true});
				return false;
			},
			error		: function(response) {
				alert("Error in registering user.");
			}
	});
};

var afterRender = function() {
	console.log("In register page");
	$(".register-submit").click(registerSubmit);
};


module.exports = View.extend({
    id: 'register-view',
    events: events,
    afterRender: afterRender,
    template: template,
})

});

;require.register("views/templates/addmovie", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section class=\"container newuser-panel\">\n	<div class=\"jumbotron text-center\">\n		<h1>Add New User</h1>\n\n		<div class=\"container newuser-form\">\n			<h4>Please fill in the following:</h4>\n			<br>\n			<div class=\"text-danger newuser-error\"></div>\n			<br>\n			<div class=\"col-sm-6 col-sm-offset-3\">\n			<form class=\"form-horizontal\" role=\"form\">\n				<div class=\"form-group\">\n					<label for=\"newuser-email\" class=\"col-sm-2 control-label\">Email</label>\n					<div class=\"col-sm-10\">\n						<input type=\"email\" class=\"form-control input-lg\" id=\"newuser-email\" placeholder=\"Email\">\n					</div>\n				</div>\n				<div class=\"form-group\">\n					<label for=\"newuser-name\" class=\"col-sm-2 control-label\">Name</label>\n					<div class=\"col-sm-10\">\n						<input type=\"text\" class=\"form-control input-lg\" id=\"newuser-name\" placeholder=\"Name\">\n						<span class=\"text-danger\"></span>\n					</div>\n				</div>\n				<div class=\"form-group\">\n					<label for=\"newuser-password\" class=\"col-sm-2 control-label\">Password</label>\n					<div class=\"col-sm-10\">\n						<input type=\"password\" class=\"form-control input-lg\" id=\"newuser-password\" placeholder=\"Password\">\n					</div>\n				</div>\n				<div class=\"form-group\">\n					<label for=\"newuser-isadmin\" class=\"col-sm-2 control-label\">This user is an admin.</label>\n					<div class=\"col-sm-10\">\n						<input type=\"checkbox\" class=\"form-control input-lg\" id=\"newuser-password\">\n					</div>\n				</div>\n				<div class=\"form-group\">\n					<div class=\"col-sm-offset-2 col-sm-10\">\n						<button type=\"button\" class=\"btn btn-lg btn-success newuser-submit\">Register</button>\n					</div>\n				</div>\n			</form>\n			</div>\n		</div>\n	</div>\n<section>";
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

;require.register("views/templates/adduser", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section class=\"container newuser-panel\">\n	<div class=\"jumbotron text-center\">\n		<h1>Add New User</h1>\n\n		<div class=\"container newuser-form\">\n			<h4>Please fill in the following:</h4>\n			<br>\n			<div class=\"text-danger newuser-error\"></div>\n			<br>\n			<div class=\"col-sm-6 col-sm-offset-3\">\n			<form class=\"form-horizontal\" role=\"form\">\n				<div class=\"form-group\">\n					<label for=\"newuser-email\" class=\"col-sm-2 control-label\">Email</label>\n					<div class=\"col-sm-10\">\n						<input type=\"email\" class=\"form-control input-lg\" id=\"newuser-email\" placeholder=\"Email\">\n					</div>\n				</div>\n				<div class=\"form-group\">\n					<label for=\"newuser-name\" class=\"col-sm-2 control-label\">Name</label>\n					<div class=\"col-sm-10\">\n						<input type=\"text\" class=\"form-control input-lg\" id=\"newuser-name\" placeholder=\"Name\">\n						<span class=\"text-danger\"></span>\n					</div>\n				</div>\n				<div class=\"form-group\">\n					<label for=\"newuser-password\" class=\"col-sm-2 control-label\">Password</label>\n					<div class=\"col-sm-10\">\n						<input type=\"password\" class=\"form-control input-lg\" id=\"newuser-password\" placeholder=\"Password\">\n					</div>\n				</div>\n				<div class=\"form-group\">\n					<input type=\"checkbox\" id=\"newuser-isadmin\"> This user is an administrator.\n				</div>\n				<div class=\"form-group\">\n					<div class=\"col-sm-offset-2 col-sm-10\">\n						<button type=\"button\" class=\"btn btn-lg btn-success newuser-submit\">Register</button>\n					</div>\n				</div>\n			</form>\n			</div>\n		</div>\n	</div>\n<section>";
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

;require.register("views/templates/admin", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section class=\"container users-management\">\n	<div class=\"panel panel-default\">\n		<div class=\"panel-heading\">\n			<h3>User Management<button type=\"button\" class=\"btn btn-primary pull-right\">Add User</button></h3>\n		</div>\n		<div class=\"panel-body\">\n			Panel content\n		</div>\n	</div>\n</section>\n\n<section class=\"container movie-management\">\n	<div class=\"panel panel-default\">\n		<div class=\"panel-heading\">\n			<h3>Movie Management<button type=\"button\" class=\"btn btn-primary pull-right\">Add Movie</button></h3>\n		</div>\n		<div class=\"panel-body\">\n			Panel content\n		</div>\n	</div>\n</section>";
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

;require.register("views/templates/booking", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

  buffer += "<section class=\"container\">\n	<div class=\"panel panel-default booking-movie-info\">\n		<div class=\"panel-heading\">\n			Movie Information\n	  	</div>\n	  	";
  stack1 = (helper = helpers.moviebookingdetails || (depth0 && depth0.moviebookingdetails),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.details), options) : helperMissing.call(depth0, "moviebookingdetails", (depth0 && depth0.details), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n</section>\n<section class=\"container\">\n	<div class=\"panel panel-default booking-movie-seats\">\n		<div class=\"panel-body\">\n			<div class=\"booking-seats-container\">\n				<div class=\"center-block text-center booking-screen\">\n					Screen\n				</div>\n				<div class=\"booking-seats\">\n					<div id=\"seats\" class=\"center-block\">\n				        <ul id=\"place\">\n				        </ul>\n				    </div>\n				</div>\n			</div>\n		</div>\n	</div>\n</section>\n<section class=\"container\">\n	<div class=\"panel panel-default booking-movie-control\">\n	  	<div class=\"panel-body text-center\">\n		  	<a class=\"submitbooking\">\n			  	<button type=\"button\" class=\"btn btn-lg btn-danger\">SUBMIT BOOKING</button>\n			</a>\n		  	<a href=\"#/listing\">\n		  		<button type=\"button\" class=\"btn btn-lg btn-info\">BACK TO MOVIE SELECTION</button>\n		  	</a>\n		</div>\n	</div>\n</section>";
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

;require.register("views/templates/confirmation", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

  buffer += "<section class=\"container\">\n	<div class=\"jumbotron\">\n		<h1 class=\"text-right\">Success!</h1>\n		<div class=\"well confirmation-summary\">\n			<h2>Booking Summary</h2>\n			<table class=\"table table-hover\">\n				<thead>\n				</thead>\n				<tbody>\n					";
  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.confirmation) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.confirmation); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.confirmation) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</tbody>\n			</table>\n		</div>\n		<div class=\"text-center\">\n			<a href=\"#/listing\">\n				<button type=\"button\" class=\"btn btn-lg btn-primary\">Home</button>\n			</a>\n		</div>\n	</div>\n</section>";
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

;require.register("views/templates/edit", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  buffer += "<section class=\"container\">\n	<div class=\"jumbotron\">\n		<h1 class=\"text-right\">Success!</h1>\n		<div class=\"well userbooking-summary\">\n			<h2>Your Bookings</h2>\n			<table class=\"table table-hover\">\n				<thead>\n				</thead>\n				<tbody>\n					\n					\n				</tbody>\n			</table>\n		</div>\n		<div class=\"text-center\">\n			<a href=\"#/listing\">\n				<button type=\"button\" class=\"btn btn-lg btn-primary\">Home</button>\n			</a>\n		</div>\n	</div>\n</section>";
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
  var buffer = "", stack1, helper, options, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.navbar) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.navbar); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.navbar) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<section class=\"container filterContainer\">\n	<div class=\"col-md-12 col-lg-12\">\n		<div class=\"panel panel-default\">\n			<div class=\"panel-heading\">\n				<h2 class=\"panel-title\">Filters / Sorting</h2>\n			</div>\n			<div class=\"panel-body\">\n				<form class=\"form-inline filters\" role=\"form\">\n					<div class=\"form-group\">\n						<div class=\"col-sm-12\">\n							<input type=\"text\" class=\"form-control\" id=\"filterTitle\" placeholder=\"Search Movie Title\">\n						</div>\n					</div>\n					<div class=\"form-group\">\n						<div class=\"col-sm-12 dropdown\">\n							<button type=\"button\" class=\"form-control dropdown-toggle\" id=\"filterLanguage\" data-toggle=\"dropdown\">All Languages</button>\n							<ul class=\"dropdown-menu languageDropdown\" role=\"menu\">\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">All Languages</a></li>\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">English</a></li>\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">Chinese</a></li>\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">Japanese</a></li>\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">Spanish</a></li>\n							</ul>\n						</div>\n					</div>\n					<div class=\"form-group\">\n						<div class=\"col-sm-12 dropdown\">\n							<button type=\"button\" class=\"form-control dropdown-toggle\" id=\"filterSubtitles\" data-toggle=\"dropdown\">All Subtitles</button>\n						<ul class=\"dropdown-menu subtitlesDropdown\" role=\"menu\">\n							<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">All Subtitles</a></li>\n							<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">None</a></li>\n							<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">English</a></li>\n							<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">Chinese</a></li>\n						</ul>\n						</div>\n					</div>\n					<div class=\"form-group\">\n						<div class=\"col-sm-12\">\n							<button type=\"button\" class=\"form-control dropdown-toggle\" id=\"filtermdarating\" data-toggle=\"dropdown\">All MDA Ratings</button>\n							<ul class=\"dropdown-menu mdaratingDropdown\" role=\"menu\">\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">All MDA Ratings</a></li>\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">UR</a></li>\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">PG13</a></li>\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">NC16</a></li>\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">M18</a></li>\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">R21</a></li>\n							</ul>\n						</div>\n					</div>\n					<div class=\"form-group\">\n						<div class=\"col-sm-12\">\n							<button type=\"button\" class=\"form-control dropdown-toggle\" id=\"filterRating\" data-toggle=\"dropdown\">Sort by Rating</button>\n							<ul class=\"dropdown-menu ratingDropdown\" role=\"menu\">\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">Ascending</a></li>\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">Descending</a></li>\n							</ul>\n						</div>\n					</div>\n					<div class=\"form-group\">\n						<div class=\"col-sm-12\">\n							<button type=\"button\" class=\"btn btn-danger\" id=\"filterReset\">Reset</button>\n						</div>\n					</div>\n					<div class=\"form-group\">\n						<div class=\"col-sm-12\">\n							<button type=\"button\" class=\"btn btn-primary\" id=\"filterSubmit\">Filter</button>\n						</div>\n					</div>\n				</form>\n			</div>\n		</div>\n	</div>\n</section>\n<section class=\"container\">\n	<div class=\"col-sm-12\">\n		<div class=\"panel panel-default\">\n			<div class=\"panel-body\">\n			";
  stack1 = (helper = helpers.movielisting || (depth0 && depth0.movielisting),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.data), options) : helperMissing.call(depth0, "movielisting", (depth0 && depth0.data), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n		</div>\n	</div>\n</section>";
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

;require.register("views/templates/login", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section class=\"container\">\n	<div class=\"jumbotron text-center\">\n		<h1>CS2102 Project</h1>\n		<h1>Movie Booking System</h1>\n\n		<div class=\"container login-form\">\n			<h4>Please login to continue</h4>\n			<form role=\"form\" class=\"col-sm-12 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4\">\n				<h4 class=\"text-danger login-error\"></h4>\n				<input type=\"email\" class=\"form-control input-lg\" id=\"login-email\" placeholder=\"Email\" value=\"nick@test.com\">\n				<input type=\"password\" class=\"form-control input-lg\" id=\"login-password\" placeholder=\"Password\" value=\"1234\">\n				<button type=\"button\" class=\"btn btn-lg btn-block btn-primary login-submit\">Login</button>\n				<button type=\"button\" class=\"btn btn-lg btn-block btn-success login-register\">Register</button>\n			</form>\n		</div>\n	</div>\n<section>";
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
  var buffer = "", stack1, helper, options, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.navbar) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.navbar); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.navbar) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<section class=\"movie-info\">\n<div class=\"container\">\n	";
  stack1 = (helper = helpers.moviedetails || (depth0 && depth0.moviedetails),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.details), options) : helperMissing.call(depth0, "moviedetails", (depth0 && depth0.details), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n</section>\n<section class=\"movie-showtimes\">\n	<div class=\"container\">\n		<h3>Showtimes</h3>\n		<div class=\"movie-showtime-container\">\n		";
  stack1 = (helper = helpers.showtimeslist || (depth0 && depth0.showtimeslist),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.showtimes), options) : helperMissing.call(depth0, "showtimeslist", (depth0 && depth0.showtimes), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n	</div>\n</section>";
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

;require.register("views/templates/register", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section class=\"container\">\n	<div class=\"jumbotron text-center\">\n		<h1>Register User</h1>\n\n		<div class=\"container register-form\">\n			<h4>Please fill in the following:</h4>\n			<br>\n			<div class=\"text-danger register-error\"></div>\n			<br>\n			<div class=\"col-sm-6 col-sm-offset-3\">\n			<form class=\"form-horizontal\" role=\"form\">\n				<div class=\"form-group\">\n					<label for=\"register-email\" class=\"col-sm-2 control-label\">Email</label>\n					<div class=\"col-sm-10\">\n						<input type=\"email\" class=\"form-control input-lg\" id=\"register-email\" placeholder=\"Email\">\n					</div>\n				</div>\n				<div class=\"form-group\">\n					<label for=\"register-name\" class=\"col-sm-2 control-label\">Name</label>\n					<div class=\"col-sm-10\">\n						<input type=\"text\" class=\"form-control input-lg\" id=\"register-name\" placeholder=\"Name\">\n						<span class=\"text-danger\"></span>\n					</div>\n				</div>\n				<div class=\"form-group\">\n					<label for=\"register-password\" class=\"col-sm-2 control-label\">Password</label>\n					<div class=\"col-sm-10\">\n						<input type=\"password\" class=\"form-control input-lg\" id=\"register-password\" placeholder=\"Password\">\n					</div>\n				</div>\n				<div class=\"form-group\">\n					<div class=\"col-sm-offset-2 col-sm-10\">\n						<button type=\"button\" class=\"btn btn-lg btn-success register-submit\">Register</button>\n					</div>\n				</div>\n			</form>\n			</div>\n		</div>\n	</div>\n<section>";
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
        var that = this;

        $.when(this.getRenderData()).done(
            function(data){
                $("body").html(that.template(data));
                that.afterRender();
                return that;
        }).fail(
            function(data){
                $("body").html(this.template(data));
                that.afterRender();
                return that;
        });


        // this.$el.html(this.template(this.getRenderData()));
        // this.afterRender();
        // return this;
    },
    
    afterRender: function(){}
    
})

});

;
//# sourceMappingURL=app.js.map