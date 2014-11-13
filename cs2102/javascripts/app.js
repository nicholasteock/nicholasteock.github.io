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

        var ConfirmationView 	    = require('views/confirmation_view'),
            LoginView               = require('views/login_view'),
        	RegisterView 		    = require('views/register_view'),
        	ListingView 		    = require('views/listing_view'),
        	MovieView 			    = require('views/movie_view'),
            BookingView             = require('views/booking_view'),
            EditView                = require('views/edit_view'),
            AdminView               = require('views/admin_view'),
            BookingmanagementView   = require('views/bookingmanagement_view'),
            EditbookingView         = require('views/editbooking_view'),
            AdduserView             = require('views/adduser_view'),
            EdituserView            = require('views/edituser_view'),
            AddmovieView            = require('views/addmovie_view'),
        	EditmovieView 		    = require('views/editmovie_view'),
            Router   			    = require('lib/router');
        
        this.api                    = "http://ec2-54-69-16-201.us-west-2.compute.amazonaws.com/api/";

        this.confirmationView 	    = new ConfirmationView();
        this.loginView              = new LoginView();
        this.registerView 		    = new RegisterView();
        this.listingView 		    = new ListingView();
        this.movieView 			    = new MovieView();
        this.bookingView            = new BookingView();
        this.editView               = new EditView();
        this.adminView              = new AdminView();
        this.bookingmanagementView  = new BookingmanagementView();
        this.editbookingView        = new EditbookingView();
        this.adduserView            = new AdduserView();
        this.edituserView           = new EdituserView();
        this.addmovieView           = new AddmovieView();
        this.editmovieView 		    = new EditmovieView();
        this.router   			    = new Router();
                
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
        '' 				    : 'login',
        'login'             : 'login',
        'register' 		    : 'register',
        'listing' 		    : 'listing',
        'movie' 		    : 'movie',
        'booking' 		    : 'booking',
        'confirmation' 	    : 'confirmation',
        'edit'              : 'edit',
        'admin'             : 'admin',
        'bookingmanagement' : 'bookingmanagement',
        'editbooking'       : 'editbooking',
        'adduser'           : 'adduser',
        'edituser'          : 'edituser',
        'addmovie'          : 'addmovie',
        'editmovie'         : 'editmovie'
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

    bookingmanagement: function() {
        $('body').html(application.bookingmanagementView.render())
    },

    editbooking: function() {
        $('body').html(application.editbookingView.render())
    },

    adduser: function() {
        $('body').html(application.adduserView.render())
    },

    edituser: function() {
        $('body').html(application.edituserView.render())
    },

    addmovie: function() {
        $('body').html(application.addmovieView.render())
    },

    editmovie: function() {
        $('body').html(application.editmovieView.render())
    },
})

});

;require.register("lib/view_helper", function(exports, require, module) {
/******************************************************************************
 Navbar Helper
******************************************************************************/

Handlebars.registerHelper( 'navbar', function(options) {
	var output = 	'<nav class="navbar navbar-inverse" role="navigation">'+
					'<div class="container">';
					

		if(localStorage.userType == 0) {
			output += 	'<ul class="nav navbar-nav">'+
						'<li><a href="#/listing"><button type="button" class="btn btn-default navbar-btn"><span class="glyphicon glyphicon-home"></span></button></li>'+
						'<li><a><button type="button" class="btn btn-default navbar-btn adminpanel">Admin Panel</button></a></li>'+
						'</ul>';
		}
		else {
			output += 	'<ul class="nav navbar-nav">'+
						'<li><a href="#/listing"><button type="button" class="btn btn-default navbar-btn"><span class="glyphicon glyphicon-home"></span></button></li>'+
						'<li><a><button type="button" class="btn btn-default navbar-btn editpanel">Your Bookings</button></a></li>'+
						'</ul>';
		}
		
		output += 	'<ul class="nav navbar-nav navbar-right">'+
					'<li><a><button type="button" class="btn btn-default navbar-btn login hide">Login</button></a></li>'+
					'<li><a><button type="button" class="btn btn-default navbar-btn register hide">Register</button></a></li>'+
					'<li><a><div class="navbar-text">Hi, '+localStorage.name+'</div></a></li>'+
					'<li><a><button type="button" class="btn btn-default navbar-btn logout">Logout</button></a></li>'+
					'</ul>'+
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

	output += '<h4 class="text-right">'+listingObject.length+' results</h4>';

	for( var i=0, iLen=listingObject.length; i<iLen; i++ ) {
		var itemHtml = "";

		itemHtml += '<div class="col-sm-4 col-md-4 col-lg-4 listing-item">'+
					'<div class="col-sm-12 col-md-12 col-lg-12 listing-title">'+
					listingObject[i].TITLE+
					'</div>'+
					'<div class="col-md-5 col-lg-5 listing-left">'+
					'<img class="listing-thumbnail" src="img/thumbs/'+listingObject[i].MID+'.jpg" alt="'+listingObject[i].TITLE+'">'+
					'<div class="text-center"><strong>Rating: '+listingObject[i].RATING+' / 10</strong></div>'+
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
					'<img src="img/'+detailsObject.mid+'.jpg" alt="'+detailsObject.title+'">'+
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

/******************************************************************************
 Admin page users Helper
******************************************************************************/

Handlebars.registerHelper('users', function(userlist, options) {
	var type 	= 	"",
		user 	= 	"",
		output 	= 	'<table class="table table-hover">'+
					'<thead>'+
					'<tr>'+
					'<th>Name</th>'+
					'<th>Email</th>'+
					'<th>Password</th>'+
					'<th>Type</th>'+
					'<th>Edit</th>'+
					'<th>Remove</th>'+
					'</tr>'+
					'</thead>'+
					'<tbody>';

	for(var i=0, iLen=userlist.length; i<iLen; i++) {
		user = 	'<tr>'+
				'<td>'+userlist[i].c_name+'</td>'+
				'<td>'+userlist[i].c_email+'</td>'+
				'<td>'+userlist[i].c_pwd+'</td>';

		if(userlist[i].c_type == 0) {
			type = "Admin";
		}
		else {
			type = "Customer";
		}

		user += '<td>'+type+'</td>'+
				'<td><button id="edituser-'+userlist[i].c_id+'" type="button" class="btn btn-sm btn-warning edituser">Edit</button></td>'+
				'<td><button id="removeuser-'+userlist[i].c_id+'" type="button" class="btn btn-sm btn-danger removeuser">Remove</button></td></tr>';
		output += user;
	}
	
	output += '</tbody></table>';

	return output;
});

/******************************************************************************
 Admin page bookings Helper
******************************************************************************/

Handlebars.registerHelper('bookings', function(bookinglist, options) {
	var type 	= 	"",
		booking = 	"",
		output 	= 	'<table class="table table-hover">'+
					'<thead>'+
					'<tr>'+
					'<th>Movie</th>'+
					'<th>Venue</th>'+
					'<th>Date</th>'+
					'<th>Time</th>'+
					'<th>Seat</th>'+
					'<th>Ticket#</th>'+
					'<th>Edit</th>'+
					'<th>Remove</th>'+
					'</tr>'+
					'</thead>'+
					'<tbody>';

	for(var i=0, iLen=bookinglist.length; i<iLen; i++) {
		var tempDate 	= new Date(bookinglist[i].showdate),
			dateString 	= tempDate.toDateString(),
			day 		= dateString.substr(0,3),
			month 		= dateString.substr(4,3),
			dayNum 		= dateString.substr(8,2),
			time 		= bookinglist[i].showtime.substring(0,5);

		booking = 	'<tr>'+
					'<td>'+bookinglist[i].title+'</td>'+
					'<td>'+bookinglist[i].cinema+'</td>'+
					'<td>'+dayNum+" "+month+", "+day+'</td>'+
					'<td>'+time+'</td>'+
					'<td>'+bookinglist[i].seatnum+'</td>'+
					'<td>'+bookinglist[i].ticketnum+'</td>'+
					'<td><button id="editbooking-'+bookinglist[i].ticketnum+'" type="button" class="btn btn-sm btn-warning editbooking">Edit</button></td>'+
					'<td><button id="removebooking-'+bookinglist[i].ticketnum+'" type="button" class="btn btn-sm btn-danger removebooking">Cancel Booking</button></td></tr>';

		output += booking;
	}
	
	output += '</tbody></table>';

	return output;
});

/******************************************************************************
 Admin page movies Helper
******************************************************************************/

Handlebars.registerHelper('movies', function(movieList, options) {
	var type 	= 	"",
		movie = 	"",
		output 	= 	'<table class="table table-hover">'+
					'<thead>'+
					'<tr>'+
					'<th>Title</th>'+
					'<th>Edit</th>'+
					'<th>Remove</th>'+
					'</tr>'+
					'</thead>'+
					'<tbody>';

	for(var i=0, iLen=movieList.length; i<iLen; i++) {
		movie = 	'<tr>'+
					'<td>'+movieList[i].TITLE+'</td>'+
					'<td><button id="editmovie-'+movieList[i].MID+'" type="button" class="btn btn-sm btn-warning editmovie">Edit</button></td>'+
					'<td><button id="removemovie-'+movieList[i].MID+'" type="button" class="btn btn-sm btn-danger removemovie">Remove</button></td></tr>';

		output += movie;
	}
	
	output += '</tbody></table>';

	return output;
});

/******************************************************************************
 Edit User Helper
******************************************************************************/

Handlebars.registerHelper('edituser', function(userObject, options) {

	var output = 	'<div class="container edituser-form">'+
					'<div class="text-danger edituser-error"></div>'+
					'<br>'+
					'<div class="col-sm-6 col-sm-offset-3">'+
					'<form class="form-horizontal" role="form">'+
					'<div class="form-group">'+
					'<label for="edituser-email" class="col-sm-3 control-label">Email</label>'+
					'<div class="col-sm-9">'+
					'<input type="email" class="form-control input-lg" id="edituser-email" placeholder="Email" value="'+userObject[0].c_email+'">'+
					'</div>'+
					'</div>'+
					'<div class="form-group">'+
					'<label for="edituser-name" class="col-sm-3 control-label">Name</label>'+
					'<div class="col-sm-9">'+
					'<input type="text" class="form-control input-lg" id="edituser-name" placeholder="Name" value="'+userObject[0].c_name+'">'+
					'<span class="text-danger"></span>'+
					'</div>'+
					'</div>'+
					'<div class="form-group">'+
					'<label for="edituser-password" class="col-sm-3 control-label">Password</label>'+
					'<div class="col-sm-9">'+
					'<input type="password" class="form-control input-lg" id="edituser-password" placeholder="Password" value="'+userObject[0].c_pwd+'">'+
					'</div>'+
					'</div>'+
					'<div class="form-group">'+
					'<div class="col-sm-12"><input type="checkbox" id="edituser-isadmin"';

		if( userObject[0].c_type==0 ) {
			output += " checked";
		}

		output += 	'> Administrator'+
					'</div></div>'+
					'<div class="form-group">'+
					'<div class="col-sm-2 col-sm-offset-4">'+
					'<button type="button" class="btn btn-lg btn-danger edituser-cancel">Cancel</button>'+
					'</div><div class="col-sm-6">'+
					'<button type="button" id="'+userObject[0].c_id+'" class="btn btn-lg btn-primary edituser-submit">Update</button>'+
					'</div></div></div></form></div></div>';

	return output;

});

/******************************************************************************
 Edit Movie Helper
******************************************************************************/

Handlebars.registerHelper('editmovie', function(movieObject, options) {
	movieObject = movieObject[0];
	console.log("movieobject : ", movieObject);
	var output = 	'<div class="container editmovie-form">'+
					'<div class="text-danger editmovie-error"></div>'+
					'<br>'+
					'<div class="col-sm-6 col-sm-offset-3">'+
					'<form class="form-horizontal" role="form">'+
					'<div class="form-group">'+
					'<label for="editmovie-email" class="col-sm-3 control-label">Title</label>'+
					'<div class="col-sm-9">'+
					'<input type="text" class="form-control input-lg" id="editmovie-title" placeholder="Title" value="'+movieObject.title+'">'+
					'</div>'+
					'</div>'+
					'<div class="form-group">'+
					'<label for="editmovie-rating" class="col-sm-3 control-label">Rating</label>'+
					'<div class="col-sm-9">'+
					'<input type="number" class="form-control input-lg" id="editmovie-rating" placeholder="Rating" value="'+movieObject.rating+'">'+
					'</div>'+
					'</div>'+
					'<div class="form-group">'+
					'<label for="editmovie-director" class="col-sm-3 control-label">Director</label>'+
					'<div class="col-sm-9">'+
					'<input type="text" class="form-control input-lg" id="editmovie-director" placeholder="Director" value="'+movieObject.director+'">'+
					'</div>'+
					'</div>'+
					'<div class="form-group">'+
					'<label for="editmovie-cast" class="col-sm-3 control-label">Cast</label>'+
					'<div class="col-sm-9">'+
					'<input type="text" class="form-control input-lg" id="editmovie-cast" placeholder="Cast" value="'+movieObject.cast+'">'+
					'</div>'+
					'</div>'+
					'<div class="form-group">'+
					'<label for="editmovie-genre" class="col-sm-3 control-label">Genre</label>'+
					'<div class="col-sm-9">'+
					'<input type="text" class="form-control input-lg" id="editmovie-genre" placeholder="Genre" value="'+movieObject.genre+'">'+
					'</div>'+
					'</div>'+
					'<div class="form-group">'+
					'<label for="editmovie-runtime" class="col-sm-3 control-label">Runtime</label>'+
					'<div class="col-sm-9">'+
					'<input type="number" class="form-control input-lg" id="editmovie-runtime" placeholder="Runtime" value="'+movieObject.runtime+'">'+
					'</div>'+
					'</div>'+
					'<div class="form-group">'+
					'<label for="editmovie-mdarating" class="col-sm-3 control-label">MDA Rating</label>'+
					'<div class="col-sm-9">'+
					'<select id="editmovie-mdarating" class="form-control input-lg">';

	switch(movieObject.mdarating) {
		case 'G':
			output += 	'<option value="UR">UR</option>'+
						'<option value="G" selected="selected">G</option>'+
						'<option value="PG13">PG13</option>'+
						'<option value="NC16">NC16</option>'+
						'<option value="M18">M18</option>'+
						'<option value="R21">R21</option>';
			break;
		case 'PG13':
			output += 	'<option value="UR">UR</option>'+
						'<option value="G">G</option>'+
						'<option value="PG13" selected="selected">PG13</option>'+
						'<option value="NC16">NC16</option>'+
						'<option value="M18">M18</option>'+
						'<option value="R21">R21</option>';
			break;
		case 'NC16':
			output += 	'<option value="UR">UR</option>'+
						'<option value="G">G</option>'+
						'<option value="PG13">PG13</option>'+
						'<option value="NC16" selected="selected">NC16</option>'+
						'<option value="M18">M18</option>'+
						'<option value="R21">R21</option>';
			break;
		case 'M18':
			output += 	'<option value="UR">UR</option>'+
						'<option value="G">G</option>'+
						'<option value="PG13">PG13</option>'+
						'<option value="NC16">NC16</option>'+
						'<option value="M18" selected="selected">M18</option>'+
						'<option value="R21">R21</option>';
			break;
		case 'R21':
			output += 	'<option value="UR">UR</option>'+
						'<option value="G">G</option>'+
						'<option value="PG13">PG13</option>'+
						'<option value="NC16">NC16</option>'+
						'<option value="M18">M18</option>'+
						'<option value="R21" selected="selected">R21</option>';
			break;
		default:
			output += 	'<option value="UR" selected="selected">UR</option>'+
						'<option value="G">G</option>'+
						'<option value="PG13">PG13</option>'+
						'<option value="NC16">NC16</option>'+
						'<option value="M18">M18</option>'+
						'<option value="R21">R21</option>';
			break;

	};

	output +=	'</select>'+
				'</div>'+
				'</div>'+
				'<div class="form-group">'+
				'<label for="editmovie-languages" class="col-sm-3 control-label">Language</label>'+
				'<div class="col-sm-9">'+
				'<select id="editmovie-languages" class="form-control input-lg">';

	switch(movieObject.languages) {
		case 'English':
			output += 	'<option value="None">None</option>'+
						'<option value="English" selected="selected">English</option>'+
						'<option value="Chinese">Chinese</option>'+
						'<option value="Japanese">Japanese</option>'+
						'<option value="Spanish">Spanish</option>'+
						'<option value="Hindu">Hindu</option>';
			break;
		case 'Chinese':
			output += 	'<option value="None">None</option>'+
						'<option value="English">English</option>'+
						'<option value="Chinese" selected="selected">Chinese</option>'+
						'<option value="Japanese">Japanese</option>'+
						'<option value="Spanish">Spanish</option>'+
						'<option value="Hindu">Hindu</option>';
			break;
		case 'Japanese':
			output += 	'<option value="None">None</option>'+
						'<option value="English">English</option>'+
						'<option value="Chinese">Chinese</option>'+
						'<option value="Japanese" selected="selected">Japanese</option>'+
						'<option value="Spanish">Spanish</option>'+
						'<option value="Hindu">Hindu</option>';
			break;
		case 'Hindu':
			output += 	'<option value="None">None</option>'+
						'<option value="English">English</option>'+
						'<option value="Chinese">Chinese</option>'+
						'<option value="Japanese">Japanese</option>'+
						'<option value="Spanish">Spanish</option>'+
						'<option value="Hindu" selected="selected">Hindu</option>';
			break;
		case 'Spanish':
			output += 	'<option value="None">None</option>'+
						'<option value="English">English</option>'+
						'<option value="Chinese">Chinese</option>'+
						'<option value="Japanese">Japanese</option>'+
						'<option value="Spanish" selected="selected">Spanish</option>'+
						'<option value="Hindu">Hindu</option>';
			break;
		default:
			output += 	'<option value="None" selected="selected">None</option>'+
						'<option value="English">English</option>'+
						'<option value="Chinese">Chinese</option>'+
						'<option value="Japanese">Japanese</option>'+
						'<option value="Spanish">Spanish</option>'+
						'<option value="Hindu">Hindu</option>';
			break;
	};

	output +=	'</select>'+
				'</div>'+
				'</div>'+
				'<div class="form-group">'+
				'<label for="editmovie-subtitles" class="col-sm-3 control-label">Subtitles</label>'+
				'<div class="col-sm-9">'+
				'<select id="editmovie-subtitles" class="form-control input-lg">';


	switch(movieObject.subtitles) {
		case 'English':
			output += 	'<option value="None">None</option>'+
						'<option value="English" selected="selected">English</option>'+
						'<option value="Chinese">Chinese</option>'+
						'<option value="Japanese">Japanese</option>'+
						'<option value="Spanish">Spanish</option>'+
						'<option value="Hindu">Hindu</option>';
			break;
		case 'Chinese':
			output += 	'<option value="None">None</option>'+
						'<option value="English">English</option>'+
						'<option value="Chinese" selected="selected">Chinese</option>'+
						'<option value="Japanese">Japanese</option>'+
						'<option value="Spanish">Spanish</option>'+
						'<option value="Hindu">Hindu</option>';
			break;
		case 'Japanese':
			output += 	'<option value="None">None</option>'+
						'<option value="English">English</option>'+
						'<option value="Chinese">Chinese</option>'+
						'<option value="Japanese" selected="selected">Japanese</option>'+
						'<option value="Spanish">Spanish</option>'+
						'<option value="Hindu">Hindu</option>';
			break;
		case 'Spanish':
			output += 	'<option value="None">None</option>'+
						'<option value="English">English</option>'+
						'<option value="Chinese">Chinese</option>'+
						'<option value="Japanese">Japanese</option>'+
						'<option value="Spanish" selected="selected">Spanish</option>'+
						'<option value="Hindu">Hindu</option>';
			break;
		case 'Hindu':
			output += 	'<option value="None">None</option>'+
						'<option value="English">English</option>'+
						'<option value="Chinese">Chinese</option>'+
						'<option value="Japanese">Japanese</option>'+
						'<option value="Spanish">Spanish</option>'+
						'<option value="Hindu" selected="selected">Hindu</option>';
			break;
		default:
			output += 	'<option value="None" selected="selected">None</option>'+
						'<option value="English">English</option>'+
						'<option value="Chinese">Chinese</option>'+
						'<option value="Japanese">Japanese</option>'+
						'<option value="Spanish">Spanish</option>'+
						'<option value="Hindu">Hindu</option>';
			break;
	}

	output += 	'</select>'+
				'</div>'+
				'</div>'+
				'<div class="form-group">'+
				'<label for="editmovie-synopsis" class="col-sm-3 control-label">Synopsis</label>'+
				'<div class="col-sm-9">'+
				'<textarea class="form-control input-lg" rows="7" id="editmovie-synopsis" placeholder="Synopsis">'+movieObject.synopsis+'</textarea>'+
				'</div>'+
				'</div>'+
				'<div class="form-group">'+
				'<div class="col-sm-2 col-sm-offset-4">'+
				'<button type="button" class="btn btn-lg btn-danger editmovie-cancel">Cancel</button>'+
				'</div><div class="col-sm-6">'+
				'<button type="button" id="'+movieObject.mid+'" class="btn btn-lg btn-primary editmovie-submit">Update</button>'+
				'</div></div></div></form>'+
				'</div>'+
				'</div>';

	return output;
});

});

require.register("models/collection", function(exports, require, module) {
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
	template = require('./templates/addmovie');

var getRenderData = function() {
	if(localStorage.userId == undefined || localStorage.name == undefined) {
		alert("Please log in to continue");
		Application.router.navigate('login', {trigger: true});
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

var adminpanel = function() {
	Application.router.navigate('admin', {trigger: true});
	return false;
};

var addmovie = function(ev) {

	var title 		= $("#addmovie-title").val(),
		rating 		= $("#addmovie-rating").val(),
		director 	= $("#addmovie-director").val(),
		cast 		= $("#addmovie-cast").val(),
		genre 		= $("#addmovie-genre").val(),
		runtime 	= $("#addmovie-runtime").val(),
		mdarating 	= $("#addmovie-mdarating").val(),
		languages 	= $("#addmovie-languages").val(),
		subtitles 	= $("#addmovie-subtitles").val(),
		synopsis 	= $("#addmovie-synopsis").val(),
		params 		= {
						title 		: title,
						rating 		: rating,
						director 	: director,
						cast 		: cast,
						genre 		: genre,
						runtime 	: runtime,
						mdarating 	: mdarating,
						languages	: languages,
						subtitles 	: subtitles,
						synopsis 	: synopsis,
					};

	if(!validate(params)) return;

	$.ajax({
			url 		: Application.api+"addmovie",
			type 		: "POST",
			dataType	: 'json',
			data 		: params,
			success		: function(response) {
				alert("Movie "+params.title+" has been updated.");
				return false;
			},
			error		: function(response) {
				alert("Error in add movie "+params.title);
			}
	});
};

var validate = function(params) {

	$(".addmovie-error").html("");

	if(	params.title.length==0 ||
		params.rating.length==0 ||
		params.director.length==0 ||
		params.cast.length==0 ||
		params.runtime.length==0
	) {
		$(".addmovie-error").html("*All fields are required.");
		return false;
	}

	if(params.runtime <= 0) {
		$(".addmovie-error").html("Movie runtime cannot be 0");
		return false;
	}

	if(params.rating > 10 || params.rating < 0) {
		$(".addmovie-error").html("Rating is between 0-10");
		return false;
	}

	return true;
};

var addcancel = function() {
	Application.router.navigate('admin', {trigger: true});
};

var afterRender = function() {
	$(".loadingSpinner").addClass("hide");
	$(".addmovie-panel").removeClass("hide");
	$(".logout").click(logout);
	$(".adminpanel").click(adminpanel);
	$(".addmovie-submit").click(addmovie);
	$(".addmovie-cancel").click(addcancel);
}

module.exports = View.extend({
    id 				: 'addmovie-view',
    getRenderData 	: getRenderData,
    afterRender 	: afterRender,
    template 		: template
});

});

require.register("views/adduser_view", function(exports, require, module) {
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

var adminpanel = function() {
	Application.router.navigate('admin', {trigger: true});
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
		isAdmin 	= $('#newuser-isadmin').is(":checked") ? 0 : 1,
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

var cancel = function() {
	Application.router.navigate('listing', {trigger: true});
	return false;
};

var afterRender = function(){
	$(".logout").click(logout);
	$(".adminpanel").click(adminpanel);
	$(".newuser-submit").click(newuser);
	$(".newuser-cancel").click(cancel);
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

require.register("views/admin_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/admin');

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

	var	dfdResult = $.Deferred();

	var onSuccess = function( response ) {
		return dfdResult.resolve( response.data );
	};
	
	var onError = function( response ) {
		return dfdResult.reject( response.data );
	};

	$.ajax({
			url 		: Application.api+"admininfo",
			type 		: "POST",
			dataType	: 'json',
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

var adminpanel = function() {
	Application.router.navigate('admin', {trigger: true});
	return false;
};

var adminnav = function(ev) {
	var id = ev.target.id;
	$(".admin-nav ul li").removeClass("active");
	$("#"+id).parent().addClass("active");

	switch (id) {
		case "admin-users":
			$(".admin-management").addClass("hide");
			$(".users-management").removeClass("hide");
			break;
		case "admin-bookings":
			$(".admin-management").addClass("hide");
			$(".bookings-management").removeClass("hide");
			break;
		case "admin-movies":
			$(".admin-management").addClass("hide");
			$(".movies-management").removeClass("hide");
			break;
		case "admin-showtimes":
			$(".admin-management").addClass("hide");
			$(".showtimes-management").removeClass("hide");
			break;
		default:
			break;
	}
};

var adduser = function() {
	Application.router.navigate('adduser', {trigger: true});
	return false;
};

var addmovie = function() {
	Application.router.navigate('addmovie', {trigger: true});
	return false;
};

var edituser = function(ev) {
	var temp 	= ev.target.id;
		userId 	= temp.substring(9);

	Application.router.navigate('edituser?userId='+userId, {trigger: true});
};

var editmovie = function(ev) {
	var temp 	= ev.target.id;
		mid 	= temp.substring(10);

	Application.router.navigate('editmovie?mid='+mid, {trigger: true});
};

var removeuser = function(ev) {
	var temp 		= ev.target.id,
		userId 		= temp.substring(11);
		params 		= { userId: userId };

	$.ajax({
			url 		: Application.api+"removeuser",
			type 		: "POST",
			dataType	: 'json',
			data 		: params,
			success		: function(response) {
				$(ev.target).parent().parent().remove();
				return;
			},
			error		: function(response) {
				console.log("Error in removeuser, response :", response);
				return;
			}
	});
};

var removemovie = function(ev) {
	var temp 		= ev.target.id,
		mid 		= temp.substring(12);
		params 		= { mid: mid };

	$.ajax({
			url 		: Application.api+"removemovie",
			type 		: "POST",
			dataType	: 'json',
			data 		: params,
			success		: function(response) {
				$(ev.target).parent().parent().remove();
				return;
			},
			error		: function(response) {
				console.log("Error in removemovie, response :", response);
				return;
			}
	});
};

var editbooking = function() {
	
}

var removebooking = function(ev) {
	var temp 		= ev.target.id,
		ticketnum 	= temp.substring(14);
		params 		= { ticketnum: ticketnum };

	$.ajax({
			url 		: Application.api+"removebooking",
			type 		: "POST",
			dataType	: 'json',
			data 		: params,
			success		: function(response) {
				$(ev.target).parent().parent().remove();
				return;
			},
			error		: function(response) {
				console.log("Error in removebooking, response :", response);
				return;
			}
	});
};

var afterRender = function(){
	$(".loadingSpinner").addClass("hide");
	$(".users-management").removeClass("hide");
	$(".logout").click(logout);
	$(".adminpanel").click(adminpanel);
	$(".admin-nav li").click(adminnav);
	$(".adduser").click(adduser);
	$(".addmovie").click(addmovie);
	$(".edituser").click(edituser);
	$(".editmovie").click(editmovie);
	$(".removeuser").click(removeuser);
	$(".removemovie").click(removemovie);
	$(".editbooking").click(editbooking);
	$(".removebooking").click(removebooking);
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

require.register("views/booking_view", function(exports, require, module) {
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
  localStorage.removeItem('userType');
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

;require.register("views/bookingmanagement_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/bookingmanagement');

var getRenderData = function() {
	if(localStorage.userId == undefined || localStorage.name == undefined) {
		alert("Please log in to continue");
		Application.router.navigate('login', {trigger: true});
		return false;
	}

	var	dfdResult = $.Deferred();

	var onSuccess = function( response ) {
		return dfdResult.resolve( response.data );
	};
	
	var onError = function( response ) {
		return dfdResult.reject( response.data );
	};

	var params = { userId : localStorage.userId };

	$.ajax({
			url 		: Application.api+"userbookings",
			type 		: "POST",
			dataType	: 'json',
			data 		: params,
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

var editpanel = function() {
	Application.router.navigate('bookingmanagement', {trigger: true});
	return false;
};

var editbooking = function(ev) {
	var temp 		= ev.target.id,
		ticketnum 	= temp.substring(12);

	Application.router.navigate('editbooking?tid='+ticketnum, {trigger: true});
};

var removebooking = function(ev) {
	var temp 		= ev.target.id,
		ticketnum 	= temp.substring(14);
		params 		= { ticketnum: ticketnum };

	$.ajax({
			url 		: Application.api+"removebooking",
			type 		: "POST",
			dataType	: 'json',
			data 		: params,
			success		: function(response) {
				$(ev.target).parent().parent().remove();
				return;
			},
			error		: function(response) {
				console.log("Error in removebooking, response :", response);
				return;
			}
	});
};

var afterRender = function(){
	$(".loadingSpinner").addClass("hide");
	$(".logout").click(logout);
	$(".editbooking").click(editbooking);
	$(".removebooking").click(removebooking);
};

var events = {
};

module.exports = View.extend({
    id 				: 'bookingmanagement-view',
    events 			: events,
    getRenderData 	: getRenderData,
    afterRender 	: afterRender,
    template 		: template
});

});

require.register("views/confirmation_view", function(exports, require, module) {
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

var adminpanel = function() {
	Application.router.navigate('admin', {trigger: true});
	return false;
};

var editpanel = function() {
	Application.router.navigate('bookingmanagement', {trigger: true});
	return false;
};

var afterRender = function() {
	$(".logout").click(logout);
	$(".adminpanel").click(adminpanel);
	$(".editpanel").click(editpanel);
}

module.exports = View.extend({
    id: 'confirmation-view',
    template: template,
    getRenderData : getRenderData,
    afterRender: afterRender
});

});

require.register("views/edit_view", function(exports, require, module) {
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

var adminpanel = function() {
	Application.router.navigate('admin', {trigger: true});
	return false;
};

var afterRender = function(){
	$(".logout").click(logout);
	$(".adminpanel").click(adminpanel);
	$(".editpanel").click(editpanel);
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

require.register("views/editbooking_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/editbooking');

var events = {
  // 'click .seat'  : 'seatClicked'
  // 'click .submitbooking'  : 'submitBooking'
};

var bookedSeats;

var editingSeat;

var movieDetails;

var getRenderData = function() {
  if(localStorage.userId == undefined || localStorage.name == undefined) {
    alert("Please log in to continue");
    Application.router.navigate('login', {trigger: true});
    return false;
  }

  var hash    = window.location.hash,
      temp    = hash.indexOf('?tid='),
      tid     = hash.substring(temp+5),
      sid     = tid.substr(0,10),
      seat    = tid.substring(10),
      params  = {sid: sid};
  
  editingSeat = seat[0] + "-" + seat[1] + seat[2];

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
  localStorage.removeItem('userType');
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
   selectingSeatCss: 'selectingSeat',
   editingSeatCss: 'editingSeat'
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
                if(rowChar+"-"+seatNo == editingSeat) {
                  className += ' ' + settings.editingSeatCss;
                }
                else {
                  className += ' ' + settings.selectedSeatCss;
                }
            }
            
            str.push('<li class="' + className + '"' +
                      'style="top:' + (i * settings.seatHeight).toString() + 'px;left:' + (j * settings.seatWidth).toString() + 'px">' +
                      '<a title="' + seatNo + '">' + seatNo + '</a>' +
                      '</li>');
        }
    }
    $('#place').html(str.join(''));

    $(".seat").click(seatClicked);
    $(".editbooking-submit").click(editBooking);
    $(".editbooking-cancel").click(editcancel);
};

var seatClicked = function( ev ) {
	var $seat = $(ev.target),
		targetClasses = "",
		seatRow = "",
		seatCol = "",
		charPos,
		spacePos;

	if( $seat.hasClass("selectedSeat") ) { return; }

  if( $seat.hasClass("editingSeat") ) { return; }

  $(".editingSeat").removeClass("editingSeat");
  $(".selectingSeat").removeClass("selectingSeat");
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

var editBooking = function() {
  var that = this;

  var selectedSeats = $(".selectingSeat"),
      editingSeat   = $(".editingSeat"),
      bookedSeats   = [],
      params        = {};

  // No seats selected.
  if(selectedSeats.length === 0 && editingSeat.length === 0) {
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
      temp    = hash.indexOf('?tid='),
      tid     = hash.substring(temp+5),
      sid     = tid.substr(0,10),
      c_id    = Number(localStorage.userId);

  params = {
    sid   : sid,
    tid   : tid,
    seats : bookedSeats,
    c_id  : c_id
  };
console.log("PARAMS : ", params);
  $.ajax({
      url       : Application.api+"editBooking",
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

var editcancel = function() {
  if(localStorage.userType == undefined) {
    logout();
    return false;
  }
  else if(localStorage.userType == 0) {
    Application.router.navigate('admin', {trigger: true});
  }
  else {
    Application.router.navigate('bookingmanagement', {trigger: true});
    return false;
  }
};

module.exports = View.extend({
    id            : 'booking-view',
    events        : events,
    getRenderData : getRenderData,
    afterRender   : afterRender,
    template      : template,
    seatClicked   : seatClicked,
    editBooking   : editBooking,
    bookedSeats   : bookedSeats
})

});

;require.register("views/editmovie_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/editmovie');

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

	var data 		= {};
	var hash 		= window.location.hash;
	var filter 		= hash.substring(hash.indexOf("?")+1);
	var filterArr 	= filter.split("=");
	data[filterArr[0]] = filterArr[1];

	$.ajax({
			url 		: Application.api+"movie?mid="+filterArr[1],
			type 		: "GET",
			dataType	: 'json',
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

var adminpanel = function() {
	Application.router.navigate('admin', {trigger: true});
	return false;
};


var editmovie = function(ev) {

	var mid 		= ev.target.id,
		title 		= $("#editmovie-title").val(),
		rating 		= $("#editmovie-rating").val(),
		director 	= $("#editmovie-director").val(),
		cast 		= $("#editmovie-cast").val(),
		genre 		= $("#editmovie-genre").val(),
		runtime 	= $("#editmovie-runtime").val(),
		mdarating 	= $("#editmovie-mdarating").val(),
		languages 	= $("#editmovie-languages").val(),
		subtitles 	= $("#editmovie-subtitles").val(),
		synopsis 	= $("#editmovie-synopsis").val(),
		params 		= {
						mid 		: mid,
						title 		: title,
						rating 		: rating,
						director 	: director,
						cast 		: cast,
						genre 		: genre,
						runtime 	: runtime,
						mdarating 	: mdarating,
						languages	: languages,
						subtitles 	: subtitles,
						synopsis 	: synopsis,
					};

	if(!validate(params)) return;

	$.ajax({
			url 		: Application.api+"editmovie",
			type 		: "POST",
			dataType	: 'json',
			data 		: params,
			success		: function(response) {
				alert("Movie "+params.title+" has been updated.");
				return false;
			},
			error		: function(response) {
				alert("Error in edit movie "+params.name);
			}
	});
};

var validate = function(params) {

	$(".editmovie-error").html("");

	if(	params.title.length==0 ||
		params.rating.length==0 ||
		params.director.length==0 ||
		params.cast.length==0 ||
		params.runtime.length==0
	) {
		$(".editmovie-error").html("*All fields are required.");
		return false;
	}

	if(params.runtime <= 0) {
		$(".editmovie-error").html("Movie runtime cannot be 0");
		return false;
	}

	if(params.rating > 10 || params.rating < 0) {
		$(".editmovie-error").html("Rating is between 0-10");
		return false;
	}

	return true;
};

var editcancel = function() {
	Application.router.navigate('admin', {trigger: true});
};

var afterRender = function() {
	$(".loadingSpinner").addClass("hide");
	$(".editmovie-panel").removeClass("hide");
	$(".logout").click(logout);
	$(".adminpanel").click(adminpanel);
	$(".editpanel").click(editpanel);
	$(".editmovie-submit").click(editmovie);
	$(".editmovie-cancel").click(editcancel);
}

module.exports = View.extend({
    id 				: 'editmovie-view',
    getRenderData 	: getRenderData,
    afterRender 	: afterRender,
    template 		: template
});

});

require.register("views/edituser_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/edituser');

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

	var data 		= {};
	var hash 		= window.location.hash;
	var filter 		= hash.substring(hash.indexOf("?")+1);
	var filterArr 	= filter.split("=");
	data[filterArr[0]] = filterArr[1];

	$.ajax({
			url 		: Application.api+"userinfo",
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

var adminpanel = function() {
	Application.router.navigate('admin', {trigger: true});
	return false;
};


var edituser = function(ev) {
	var userId 		= ev.target.id,
		email 		= $("#edituser-email").val(),
		name 		= $("#edituser-name").val(),
		password 	= $("#edituser-password").val(),
		isAdmin 	= $('#edituser-isadmin').is(":checked") ? 0 : 1,
		params 		= {
						userId 		: userId,
						email 		: email,
						name 		: name,
						password 	: password,
						userType 	: isAdmin
					};

	if(!validate(params)) return;

	$.ajax({
			url 		: Application.api+"edituser",
			type 		: "POST",
			dataType	: 'json',
			data 		: params,
			success		: function(response) {
				alert("User "+params.name+" has been updated.");
				return false;
			},
			error		: function(response) {
				alert("Error in edit user "+params.name);
			}
	});
};

var validate = function(params) {
	var email 		= params.email,
		name 		= params.name,
		password 	= params.password;

	$(".edituser-error").html("");

	if(email.length==0 || name.length==0 || password.length==0) {
		$(".edituser-error").html("*All fields are required.");
		return false;
	}

	return true;
};

var editcancel = function() {
	Application.router.navigate('admin', {trigger: true});
};

var afterRender = function() {
	$(".loadingSpinner").addClass("hide");
	$(".edituser-panel").removeClass("hide");
	$(".logout").click(logout);
	$(".adminpanel").click(adminpanel);
	$(".editpanel").click(editpanel);
	$(".edituser-submit").click(edituser);
	$(".edituser-cancel").click(editcancel);
};

module.exports = View.extend({
    id 				: 'edituser-view',
    getRenderData 	: getRenderData,
    afterRender 	: afterRender,
    template 		: template
});

});

require.register("views/home_view", function(exports, require, module) {
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

var adminpanel = function() {
	Application.router.navigate('admin', {trigger: true});
	return false;
};

var editpanel = function() {
	Application.router.navigate('bookingmanagement', {trigger: true});
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

var ratingChanged = function() {
	var ratingSelected = $("#ratingDropdown").val();

	if(ratingSelected != "None") {
		$("#alphaDropdown").val("None").prop('disabled', 'disabled');
	}
	else {
		$("#alphaDropdown").prop('disabled', false);
	}
};

var alphaChanged = function() {
	var alphaSelected = $("#alphaDropdown").val();

	if(alphaSelected != "None") {
		$("#ratingDropdown").val("None").prop('disabled', 'disabled');
	}
	else {
		$("#ratingDropdown").prop('disabled', false);
	}
};

// var ratingSelected = function(ev) {
// 	$("#filterRating").html(ev.target.text);
// };

var resetFilter = function(ev) {
	$("#filterTitle").val("");
	$("#filterLanguage").html("All Languages");
	$("#filterSubtitles").html("All Subtitles");
	$("#filtermdarating").html("All MDA Ratings");
	$("#filterSubmit").click();
	return;
}

var submitFilter = function() {
	var title 		= $("#filterTitle").val();
	var language 	= $("#filterLanguage").text();
	var subtitles 	= $("#filterSubtitles").text();
	var mdarating 	= $("#filtermdarating").text();
	var ratingorder = $("#ratingDropdown").val();
	var alphaorder 	= $("#alphaDropdown").val();

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

	if(ratingorder != "None") {
		temp="ratingorder="+encodeURI(ratingorder);
		queryParams.push(temp);
	}

	if(alphaorder != "None") {
		temp="alphaorder="+encodeURI(alphaorder);
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
				$("#ratingOrder").val(temp);
				if(temp == "ASC" || temp =="DESC") {
					$("#alphaDropdown").val("None").prop("disabled", "disabled");
				}
			}
			else if(dataArray[i].indexOf("alphaorder") >= 0) {
				temp = dataArray[i];
				temp = temp.substring(temp.indexOf("=")+1);
				$("#alphaDropdown").val(temp);
				if(temp == "ASC" || temp =="DESC") {
					$("#ratingDropdown").val("None").prop("disabled", "disabled");
				}
			}
			else if(dataArray[i].indexOf("title") >= 0) {
				temp = dataArray[i];
				temp = temp.substring(temp.indexOf("=")+1);
				$("#filterTitle").val(temp);
			}
			else {}
		}
	}

	$(".loadingSpinner").addClass("hide");
	$(".filterContainer").removeClass("hide");
	$(".movielistingContainer").removeClass("hide");
	$(".logout").click(logout);
	$(".adminpanel").click(adminpanel);
	$(".editpanel").click(editpanel);
	$("#filterReset").click(resetFilter);
	$("#filterSubmit").click(submitFilter);
	$(".languageDropdown li").click(languageSelected);
	$(".subtitlesDropdown li").click(subtitlesSelected);
	$(".mdaratingDropdown li").click(mdaratingSelected);
	$("#ratingDropdown").change(ratingChanged);
	$("#alphaDropdown").change(alphaChanged);
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

require.register("views/login_view", function(exports, require, module) {
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
	$(".loginSpinner").removeClass("hide");
	$(".login-submit").addClass("hide");
	$(".login-register").addClass("hide");

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
	$(".adminpanel").click(adminpanel);
	$(".editpanel").click(editpanel);
};

var logout = function() {
	localStorage.removeItem('userId');
	localStorage.removeItem('name');
	localStorage.removeItem('userType');
	localStorage.removeItem('booking');
	Application.router.navigate('login', {trigger: true});
	return false;
};

var adminpanel = function() {
	Application.router.navigate('admin', {trigger: true});
	return false;
};

var editpanel = function() {
	Application.router.navigate('bookingmanagement', {trigger: true});
	return false;
};

module.exports = View.extend({
    id 				: 'movie-view',
    getRenderData 	: getRenderData,
    afterRender 	: afterRender,
    template 		: template
});

});

require.register("views/register_view", function(exports, require, module) {
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
		$(".loginSpinner").addClass("hide");
		$(".register-submit").removeClass("hide");
		return false;
	}

	return true;
};

var registerSubmit = function() {
	$(".loginSpinner").removeClass("hide");
	$(".register-submit").addClass("hide");

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
				$(".loginSpinner").addClass("hide");
				$(".register-submit").removeClass("hide");
			}
	});
};

var registerCancel = function() {
	Application.router.navigate('login', {trigger: true});
};

var afterRender = function() {
	console.log("In register page");
	$(".register-submit").click(registerSubmit);
	$(".register-cancel").click(registerCancel);
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
  


  return "<section class=\"container addmovie-panel\">\n	<div class=\"jumbotron text-center\">\n		<h1>Add New Movie</h1>\n		<div class=\"container addmovie-form\">\n			<h4>Please fill in movie details:</h4>\n			<br>\n			<div class=\"text-danger addmovie-error\"></div>\n			<br>\n			<div class=\"col-sm-6 col-sm-offset-3\">\n				<form class=\"form-horizontal\" role=\"form\">\n					<div class=\"form-group\">\n						<label for=\"addmovie-email\" class=\"col-sm-3 control-label\">Title</label>\n						<div class=\"col-sm-9\">\n							<input type=\"text\" class=\"form-control input-lg\" id=\"addmovie-title\" placeholder=\"Title\">\n						</div>\n					</div>\n					<div class=\"form-group\">\n						<label for=\"addmovie-rating\" class=\"col-sm-3 control-label\">Rating</label>\n						<div class=\"col-sm-9\">\n							<input type=\"number\" class=\"form-control input-lg\" id=\"addmovie-rating\" placeholder=\"Rating\">\n						</div>\n					</div>\n					<div class=\"form-group\">\n						<label for=\"addmovie-director\" class=\"col-sm-3 control-label\">Director</label>\n						<div class=\"col-sm-9\">\n							<input type=\"text\" class=\"form-control input-lg\" id=\"addmovie-director\" placeholder=\"Director\">\n						</div>\n					</div>\n					<div class=\"form-group\">\n						<label for=\"addmovie-cast\" class=\"col-sm-3 control-label\">Cast</label>\n						<div class=\"col-sm-9\">\n							<input type=\"text\" class=\"form-control input-lg\" id=\"addmovie-cast\" placeholder=\"Cast\">\n						</div>\n					</div>\n					<div class=\"form-group\">\n						<label for=\"addmovie-genre\" class=\"col-sm-3 control-label\">Genre</label>\n						<div class=\"col-sm-9\">\n							<input type=\"text\" class=\"form-control input-lg\" id=\"addmovie-genre\" placeholder=\"Genre\">\n						</div>\n					</div>\n					<div class=\"form-group\">\n						<label for=\"addmovie-runtime\" class=\"col-sm-3 control-label\">Runtime</label>\n						<div class=\"col-sm-9\">\n							<input type=\"number\" class=\"form-control input-lg\" id=\"addmovie-runtime\" placeholder=\"Runtime\">\n						</div>\n					</div>\n					<div class=\"form-group\">\n						<label for=\"addmovie-mdarating\" class=\"col-sm-3 control-label\">MDA Rating</label>\n						<div class=\"col-sm-9\">\n							<select id=\"addmovie-mdarating\" class=\"form-control input-lg\">\n								<option value=\"UR\" selected=\"selected\">UR</option>\n								<option value=\"G\">G</option>\n								<option value=\"PG13\">PG13</option>\n								<option value=\"NC16\">NC16</option>\n								<option value=\"M18\">M18</option>\n								<option value=\"R21\">R21</option>\n							</select>\n						</div>\n					</div>\n					<div class=\"form-group\">\n						<label for=\"addmovie-languages\" class=\"col-sm-3 control-label\">Language</label>\n						<div class=\"col-sm-9\">\n							<select id=\"addmovie-languages\" class=\"form-control input-lg\">\n								<option value=\"None\" selected=\"selected\">None</option>\n								<option value=\"English\">English</option>\n								<option value=\"Chinese\">Chinese</option>\n								<option value=\"Japanese\">Japanese</option>\n								<option value=\"Spanish\">Spanish</option>\n								<option value=\"Hindu\">Hindu</option>\n							</select>\n						</div>\n					</div>\n					<div class=\"form-group\">\n						<label for=\"addmovie-subtitles\" class=\"col-sm-3 control-label\">Subtitles</label>\n						<div class=\"col-sm-9\">\n							<select id=\"addmovie-subtitles\" class=\"form-control input-lg\">\n								<option value=\"None\" selected=\"selected\">None</option>\n								<option value=\"English\">English</option>\n								<option value=\"Chinese\">Chinese</option>\n								<option value=\"Japanese\">Japanese</option>\n								<option value=\"Spanish\">Spanish</option>\n								<option value=\"Hindu\">Hindu</option>\n							</select>\n						</div>\n					</div>\n					<div class=\"form-group\">\n						<label for=\"addmovie-synopsis\" class=\"col-sm-3 control-label\">Synopsis</label>\n						<div class=\"col-sm-9\">\n							<textarea class=\"form-control input-lg\" rows=\"7\" id=\"addmovie-synopsis\" placeholder=\"Synopsis\"></textarea>\n						</div>\n					</div>\n					<div class=\"form-group\">\n						<div class=\"col-sm-2 col-sm-offset-4\">\n							<button type=\"button\" class=\"btn btn-lg btn-danger addmovie-cancel\">Cancel</button>\n						</div>\n						<div class=\"col-sm-6\">\n							<button type=\"button\" class=\"btn btn-lg btn-primary addmovie-submit\">Submit</button>\n						</div>\n					</div>\n				</form>\n			</div>\n		</div>\n	</div>\n</section>				\n\n\n";
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
  


  return "<section class=\"container newuser-panel\">\n	<div class=\"jumbotron text-center\">\n		<h1>Add New User</h1>\n\n		<div class=\"container newuser-form\">\n			<h4>Please fill in the following:</h4>\n			<br>\n			<div class=\"text-danger newuser-error\"></div>\n			<br>\n			<div class=\"col-sm-6 col-sm-offset-3\">\n			<form class=\"form-horizontal\" role=\"form\">\n				<div class=\"form-group\">\n					<label for=\"newuser-email\" class=\"col-sm-2 control-label\">Email</label>\n					<div class=\"col-sm-10\">\n						<input type=\"email\" class=\"form-control input-lg\" id=\"newuser-email\" placeholder=\"Email\">\n					</div>\n				</div>\n				<div class=\"form-group\">\n					<label for=\"newuser-name\" class=\"col-sm-2 control-label\">Name</label>\n					<div class=\"col-sm-10\">\n						<input type=\"text\" class=\"form-control input-lg\" id=\"newuser-name\" placeholder=\"Name\">\n						<span class=\"text-danger\"></span>\n					</div>\n				</div>\n				<div class=\"form-group\">\n					<label for=\"newuser-password\" class=\"col-sm-2 control-label\">Password</label>\n					<div class=\"col-sm-10\">\n						<input type=\"password\" class=\"form-control input-lg\" id=\"newuser-password\" placeholder=\"Password\">\n					</div>\n				</div>\n				<div class=\"form-group\">\n					<input type=\"checkbox\" id=\"newuser-isadmin\"> This user is an administrator.\n				</div>\n				<div class=\"form-group\">\n					<div class=\"col-sm-12\">\n						<button type=\"button\" class=\"btn btn-lg btn-danger newuser-cancel\">Cancel</button>\n						<button type=\"button\" class=\"btn btn-lg btn-primary newuser-submit\">Register</button>\n					</div>\n				</div>\n			</form>\n			</div>\n		</div>\n	</div>\n<section>";
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
  buffer += "\n\n<section class=\"container admin-nav\">\n	<ul class=\"nav nav-tabs nav-justified\" role=\"tablist\">\n	  <li role=\"presentation\" class=\"active\"><a id=\"admin-users\">Users</a></li>\n	  <li role=\"presentation\"><a id=\"admin-bookings\">Bookings</a></li>\n	  <li role=\"presentation\"><a id=\"admin-movies\">Movies</a></li>\n	  <li role=\"presentation\"><a id=\"admin-showtimes\">Showtimes</a></li>\n	</ul>\n</section>\n\n<section class=\"container admin-management users-management hide\">\n	<div class=\"panel panel-default\">\n		<div class=\"panel-heading\">\n			<h3>User Management<button type=\"button\" class=\"btn btn-primary pull-right adduser\">Add User</button></h3>\n		</div>\n		<div class=\"panel-body\">\n		";
  stack1 = (helper = helpers.users || (depth0 && depth0.users),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.users), options) : helperMissing.call(depth0, "users", (depth0 && depth0.users), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n	</div>\n</section>\n\n<section class=\"container admin-management bookings-management hide\">\n	<div class=\"panel panel-default\">\n		<div class=\"panel-heading\">\n			<h3>Booking Management</h3>\n		</div>\n		<div class=\"panel-body\">\n		";
  stack1 = (helper = helpers.bookings || (depth0 && depth0.bookings),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.bookings), options) : helperMissing.call(depth0, "bookings", (depth0 && depth0.bookings), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n	</div>\n</section>\n\n<section class=\"container admin-management movies-management hide\">\n	<div class=\"panel panel-default\">\n		<div class=\"panel-heading\">\n			<h3>Movie Management<button type=\"button\" class=\"btn btn-primary pull-right addmovie\">Add Movie</button></h3>\n		</div>\n		<div class=\"panel-body\">\n		";
  stack1 = (helper = helpers.movies || (depth0 && depth0.movies),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.movies), options) : helperMissing.call(depth0, "movies", (depth0 && depth0.movies), options));
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
  buffer += "\n	</div>\n</section>\n<section class=\"container\">\n	<div class=\"panel panel-default booking-movie-seats\">\n		<div class=\"panel-body\">\n			<div class=\"booking-seats-container\">\n				<div class=\"center-block text-center booking-screen\">\n					Screen\n				</div>\n				<div class=\"booking-seats\">\n					<div id=\"seats\" class=\"center-block\">\n				        <ul id=\"place\">\n				        </ul>\n				    </div>\n				</div>\n			</div>\n		</div>\n	</div>\n</section>\n<section class=\"container\">\n	<div class=\"panel panel-default booking-movie-control\">\n	  	<div class=\"panel-body text-center\">\n		  	<span>\n		  		<img src=\"img/seat/available_seat_img.jpg\"><strong> - Seat Available</strong>&nbsp;&nbsp;&nbsp;\n		  	</span>\n		  	<span>\n		  		<img src=\"img/seat/booked_seat_img.jpg\"><strong> - Seat Booked</strong>&nbsp;&nbsp;&nbsp;\n		  	</span>\n		  	<span>\n		  		<img src=\"img/seat/selected_seat_img.jpg\"><strong> - Seat Selected</strong>&nbsp;&nbsp;&nbsp;\n		  	</span>\n		</div>\n	</div>\n</section>\n<section class=\"container\">\n	<div class=\"panel panel-default booking-movie-control\">\n	  	<div class=\"panel-body text-center\">\n		  	<a class=\"submitbooking\">\n			  	<button type=\"button\" class=\"btn btn-lg btn-danger\">Submit Booking</button>\n			</a>\n		  	<a href=\"#/listing\">\n		  		<button type=\"button\" class=\"btn btn-lg btn-info\">Back</button>\n		  	</a>\n		</div>\n	</div>\n</section>";
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

;require.register("views/templates/bookingmanagement", function(exports, require, module) {
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
  buffer += "\n\n<section class=\"container bookings-management\">\n	<div class=\"panel panel-default\">\n		<div class=\"panel-heading\">\n			<h3>Booking Management</h3>\n		</div>\n		<div class=\"panel-body\">\n		";
  stack1 = (helper = helpers.bookings || (depth0 && depth0.bookings),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.bookings), options) : helperMissing.call(depth0, "bookings", (depth0 && depth0.bookings), options));
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

;require.register("views/templates/editbooking", function(exports, require, module) {
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
  buffer += "\n	</div>\n</section>\n<section class=\"container\">\n	<div class=\"panel panel-default booking-movie-seats\">\n		<div class=\"panel-body\">\n			<div class=\"booking-seats-container\">\n				<div class=\"center-block text-center booking-screen\">\n					Screen\n				</div>\n				<div class=\"booking-seats\">\n					<div id=\"seats\" class=\"center-block\">\n				        <ul id=\"place\">\n				        </ul>\n				    </div>\n				</div>\n			</div>\n		</div>\n	</div>\n</section>\n<section class=\"container\">\n	<div class=\"panel panel-default booking-movie-control\">\n	  	<div class=\"panel-body text-center\">\n		  	<span>\n		  		<img src=\"img/seat/available_seat_img.jpg\"><strong> - Seat Available</strong>&nbsp;&nbsp;&nbsp;\n		  	</span>\n		  	<span>\n		  		<img src=\"img/seat/booked_seat_img.jpg\"><strong> - Seat Booked</strong>&nbsp;&nbsp;&nbsp;\n		  	</span>\n		  	<span>\n		  		<img src=\"img/seat/selected_seat_img.jpg\"><strong> - Seat Selected</strong>&nbsp;&nbsp;&nbsp;\n		  	</span>\n		  	<span>\n		  		<img src=\"img/seat/editing_seat_img.jpg\"><strong> - Editing Seat</strong>\n		  	</span>\n		</div>\n	</div>\n</section>\n<section class=\"container\">\n	<div class=\"panel panel-default booking-movie-control\">\n	  	<div class=\"panel-body text-center\">\n		  	<a class=\"editbooking-submit\">\n			  	<button type=\"button\" class=\"btn btn-lg btn-danger\">Update Booking</button>\n			</a>\n		  	<a class=\"editbooking-cancel\">\n		  		<button type=\"button\" class=\"btn btn-lg btn-info\">Cancel</button>\n		  	</a>\n		</div>\n	</div>\n</section>";
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

;require.register("views/templates/editmovie", function(exports, require, module) {
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
  buffer += "\n<section class=\"container editmovie-panel\">\n	<div class=\"jumbotron text-center\">\n		<h1>Edit Movie</h1>\n		";
  stack1 = (helper = helpers.editmovie || (depth0 && depth0.editmovie),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.data), options) : helperMissing.call(depth0, "editmovie", (depth0 && depth0.data), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n</section>";
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

;require.register("views/templates/edituser", function(exports, require, module) {
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
  buffer += "\n<section class=\"container edituser-panel hide\">\n	<div class=\"jumbotron text-center\">\n		<h1>Edit User</h1>\n		";
  stack1 = (helper = helpers.edituser || (depth0 && depth0.edituser),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.data), options) : helperMissing.call(depth0, "edituser", (depth0 && depth0.data), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n<section>\n";
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
  buffer += "\n<section class=\"container filterContainer hide\">\n	<div class=\"col-md-12 col-lg-12\">\n		<div class=\"panel panel-default\">\n			<div class=\"panel-heading\">\n				<h2 class=\"panel-title\">Filter By</h2>\n			</div>\n			<div class=\"panel-body\">\n				<form class=\"form-inline filters\" role=\"form\">\n					<div class=\"form-group\">\n						<label for=\"filter1\" class=\"col-sm-3\">\n							Title\n						</label>\n						<div id=\"filter1\" class=\"col-sm-9\">\n							<input type=\"text\" class=\"form-control\" id=\"filterTitle\" placeholder=\"Search Movie Title\">\n						</div>\n					</div>\n					<div class=\"form-group\">\n						<label for=\"filter2\" class=\"col-sm-5\">\n							Language\n						</label>\n						<div id=\"filter2\" class=\"col-sm-7 dropdown\">\n							<button type=\"button\" class=\"form-control dropdown-toggle\" id=\"filterLanguage\" data-toggle=\"dropdown\">All Languages</button>\n							<ul class=\"dropdown-menu languageDropdown\" role=\"menu\">\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">All Languages</a></li>\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">English</a></li>\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">Chinese</a></li>\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">Japanese</a></li>\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">Spanish</a></li>\n							</ul>\n						</div>\n					</div>\n					<div class=\"form-group\">\n						<label for=\"filter3\" class=\"col-sm-5\">\n							Subtitles\n						</label>\n						<div id=\"filter3\" class=\"col-sm-7 dropdown\">\n							<button type=\"button\" class=\"form-control dropdown-toggle\" id=\"filterSubtitles\" data-toggle=\"dropdown\">All Subtitles</button>\n							<ul class=\"dropdown-menu subtitlesDropdown\" role=\"menu\">\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">All Subtitles</a></li>\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">None</a></li>\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">English</a></li>\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">Chinese</a></li>\n							</ul>\n						</div>\n					</div>\n					<div class=\"form-group\">\n						<label for=\"filter4\" class=\"col-sm-5\">\n							MDA Rating\n						</label>\n						<div id=\"filter4\" class=\"col-sm-7\">\n							<button type=\"button\" class=\"form-control dropdown-toggle\" id=\"filtermdarating\" data-toggle=\"dropdown\">All MDA Ratings</button>\n							<ul class=\"dropdown-menu mdaratingDropdown\" role=\"menu\">\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">All MDA Ratings</a></li>\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">UR</a></li>\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">PG13</a></li>\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">NC16</a></li>\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">M18</a></li>\n								<li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\">R21</a></li>\n							</ul>\n						</div>\n					</div>\n				</form>\n			</div>\n		</div>\n	</div>\n</section>\n\n<section class=\"container sortContainer\">\n	<div class=\"col-md-12 col-lg-12\">\n		<div class=\"panel panel-default\">\n			<div class=\"panel-heading\">\n				<h2 class=\"panel-title\">Sort By</h2>\n			</div>\n			<div class=\"panel-body\">\n				<form class=\"form-inline sortForm\" role=\"form\">\n					<div class=\"form-group\">\n						<label for=\"ratingDropdown\" class=\"col-sm-4\">\n							Rating\n						</label>\n						<div class=\"col-sm-7\">\n							<select id=\"ratingDropdown\" class=\"form-control\">\n								<option role=\"presentation\" value=\"None\" selected=\"selected\">-</option>\n								<option role=\"presentation\" value=\"ASC\">Ascending</option>\n								<option role=\"presentation\" value=\"DESC\">Descending</option>\n							</select>\n						</div>\n					</div>\n					<div class=\"form-group\">\n						<label for=\"alphaDropdown\" class=\"col-sm-5\">\n							Alphabetical\n						</label>\n						<div class=\"col-sm-7\">\n							<select id=\"alphaDropdown\" class=\"form-control\">\n								<option role=\"presentation\" value=\"None\" selected=\"selected\">-</option>\n								<option role=\"presentation\" value=\"ASC\">Ascending</option>\n								<option role=\"presentation\" value=\"DESC\">Descending</option>\n							</select>\n						</div>\n					</div>\n					<div class=\"form-group pull-right\">\n						<div class=\"col-sm-12\">\n							<button type=\"button\" class=\"btn btn-primary\" id=\"filterSubmit\">Submit</button>\n						</div>\n					</div>\n					<div class=\"form-group pull-right\">\n						<div class=\"col-sm-12\">\n							<button type=\"button\" class=\"btn btn-danger\" id=\"filterReset\">Reset</button>\n						</div>\n					</div>\n				</form>\n			</div>\n		</div>\n	</div>\n</section>\n\n<section class=\"container movielistingContainer hide\">\n	<div class=\"col-sm-12\">\n		<div class=\"panel panel-default\">\n			<div class=\"panel-body\">\n			";
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
  


  return "<section class=\"container\">\n	<div class=\"jumbotron text-center\">\n		<h1>CS2102 Project</h1>\n		<h1>Movie Booking System</h1>\n\n		<div class=\"container login-form\">\n			<h4>Please login to continue</h4>\n			<form role=\"form\" class=\"col-sm-12 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4\">\n				<h4 class=\"text-danger login-error\"></h4>\n				<input type=\"email\" class=\"form-control input-lg\" id=\"login-email\" placeholder=\"Email\" value=\"nick@test.com\">\n				<input type=\"password\" class=\"form-control input-lg\" id=\"login-password\" placeholder=\"Password\" value=\"1234\">\n				<button type=\"button\" class=\"btn btn-lg btn-block btn-primary login-submit\">Login</button>\n				<button type=\"button\" class=\"btn btn-lg btn-block btn-success login-register\">Register</button>\n				<div class=\"col-sm-4 col-sm-offset-4 loginSpinner hide\">\n					<img src=\"img/spinner.gif\">\n				</div>\n			</form>\n		</div>\n	</div>\n<section>";
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
  


  return "<section class=\"container\">\n	<div class=\"jumbotron text-center\">\n		<h1>Register User</h1>\n\n		<div class=\"container register-form\">\n			<h4>Please fill in the following:</h4>\n			<br>\n			<div class=\"text-danger register-error\"></div>\n			<br>\n			<div class=\"col-sm-6 col-sm-offset-3\">\n			<form class=\"form-horizontal\" role=\"form\">\n				<div class=\"form-group\">\n					<label for=\"register-email\" class=\"col-sm-2 control-label\">Email</label>\n					<div class=\"col-sm-10\">\n						<input type=\"email\" class=\"form-control input-lg\" id=\"register-email\" placeholder=\"Email\">\n					</div>\n				</div>\n				<div class=\"form-group\">\n					<label for=\"register-name\" class=\"col-sm-2 control-label\">Name</label>\n					<div class=\"col-sm-10\">\n						<input type=\"text\" class=\"form-control input-lg\" id=\"register-name\" placeholder=\"Name\">\n						<span class=\"text-danger\"></span>\n					</div>\n				</div>\n				<div class=\"form-group\">\n					<label for=\"register-password\" class=\"col-sm-2 control-label\">Password</label>\n					<div class=\"col-sm-10\">\n						<input type=\"password\" class=\"form-control input-lg\" id=\"register-password\" placeholder=\"Password\">\n					</div>\n				</div>\n				<div class=\"form-group\">\n					<div class=\"col-sm-offset-2 col-sm-10\">\n						<button type=\"button\" class=\"btn btn-lg btn-danger register-cancel\">Cancel</button>\n						<button type=\"button\" class=\"btn btn-lg btn-success register-submit\">Register</button>\n						<div class=\"col-sm-4 col-sm-offset-4 loginSpinner hide\">\n							<img src=\"img/spinner.gif\">\n						</div>\n					</div>\n				</div>\n			</form>\n			</div>\n		</div>\n	</div>\n<section>";
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

;require.register("views/templates/untitled", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"panel-body\">\n	  		<div class=\"col-sm-12 col-md-6 col-lg-6\">\n				<div class=\"booking-movie-venue\">\n					<span class=\"col-sm-3 col-md-3 col-lg-3\">Cineplex: </span>\n					<span class=\"col-sm-9 col-md-9 col-lg-9\">AMK Hub</span>\n				</div>\n				<div class=\"booking-movie-title\">\n					<span class=\"col-sm-3 col-md-3 col-lg-3\">Movie Title: </span>\n					<span class=\"col-sm-9 col-md-9 col-lg-9\">Rurouni Kenshin The Legend Ends</span>\n				</div>\n				<div class=\"booking-movie-date\">\n					<span class=\"col-sm-3 col-md-3 col-lg-3\">Movie Date: </span>\n					<span class=\"col-sm-9 col-md-9 col-lg-9\">18/10/2014</span>\n				</div>\n				<div class=\"booking-movie-time\">\n					<span class=\"col-sm-3 col-md-3 col-lg-3\">Movie Time: </span>\n					<span class=\"col-sm-9 col-md-9 col-lg-9\">19:10</span>\n				</div>\n			</div>\n			<div class=\"col-sm-12 col-md-6 col-lg-6 booking-movie-info\">\n				<div class=\"booking-movie-duration\">\n					<span class=\"col-sm-3 col-md-3 col-lg-3\">Duration: </span>\n					<span class=\"col-sm-9 col-md-9 col-lg-9\">135 mins</span>\n				</div>\n				<div class=\"booking-movie-rating\">\n					<span class=\"col-sm-3 col-md-3 col-lg-3\">Rating: </span>\n					<span class=\"col-sm-9 col-md-9 col-lg-9\">NC16 - Violence</span>\n				</div>\n			</div>\n		</div>";
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