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
        
        var HomeView                = require('views/home_view'),
            AboutView               = require('views/about_view'),
            ProductsView            = require('views/products_view'),
            ProductsBallsView       = require('views/products_balls_view'),
            ProductsBagsView        = require('views/products_bags_view'),
            ProductsShoesView       = require('views/products_shoes_view'),
            ProductsAccessoriesView = require('views/products_accessories_view'),
        	ServicesView            = require('views/services_view'),
            PromotionsView          = require('views/promotions_view'),
            EventsView              = require('views/events_view'),
            HallOfFameView          = require('views/hall_of_fame_view'),
            GalleryView             = require('views/gallery_view'),
            ContactView             = require('views/contact_view'),
        	Router                  = require('lib/router');
        
        this.homeView               = new HomeView();
        this.aboutView              = new AboutView();
        this.productsView           = new ProductsView();
        this.productsBallsView      = new ProductsBallsView();
        this.productsBagsView       = new ProductsBagsView();
        this.productsShoesView      = new ProductsShoesView();
        this.productsAccessoriesView= new ProductsAccessoriesView();
        this.servicesView           = new ServicesView();
        this.promotionsView         = new PromotionsView();
        this.eventsView             = new EventsView();
        this.hallOfFameView         = new HallOfFameView();
        this.galleryView            = new GalleryView();
        this.contactView            = new ContactView();
        this.router                 = new Router();
        
        if (typeof Object.freeze === 'function') Object.freeze(this)
        
        $(".nav a").click( function() {
        	$(".navbar-collapse").collapse('hide');
        });

    	$(".logo").click( function() {
        	$(".navbar-collapse").collapse('hide');
    	});
    },

    updateBreadcrumb: function( param ) {
        $(window).scrollTop(0,1);
    	$breadcrumb = $(".breadcrumb");
    	$breadcrumb.find("li").addClass("hide");

    	$breadcrumb.find('.front').removeClass('hide');
    	$breadcrumb.find('.home').removeClass('hide');

    	switch(param) {
    		case 'home':
                $breadcrumb.addClass("hide");
    			break;
    		case 'about':
    			$breadcrumb.removeClass("hide");
                $breadcrumb.find('.about').removeClass('hide');
    			break;
    		case 'products':
                $breadcrumb.removeClass("hide");
    			$breadcrumb.find('.products').removeClass('hide');
    			break;
            case 'products-balls':
                $breadcrumb.removeClass("hide");
                $breadcrumb.find('.products').removeClass('hide');
                $breadcrumb.find('.products-balls').removeClass('hide');
                break;
            case 'products-bags':
                $breadcrumb.removeClass("hide");
                $breadcrumb.find('.products').removeClass('hide');
                $breadcrumb.find('.products-bags').removeClass('hide');
                break;
            case 'products-shoes':
                $breadcrumb.removeClass("hide");
                $breadcrumb.find('.products').removeClass('hide');
                $breadcrumb.find('.products-shoes').removeClass('hide');
                break;
            case 'products-accessories':
                $breadcrumb.removeClass("hide");
                $breadcrumb.find('.products').removeClass('hide');
                $breadcrumb.find('.products-accessories').removeClass('hide');
                break;
            case 'services':
                $breadcrumb.removeClass("hide");
    			$breadcrumb.find('.services').removeClass('hide');
    			break;
            case 'promotions':
                $breadcrumb.removeClass("hide");
                $breadcrumb.find('.promotions').removeClass('hide');
                break;
            case 'events':
                $breadcrumb.removeClass("hide");
                $breadcrumb.find('.events').removeClass('hide');
                break;
            case 'hall-of-fame':
                $breadcrumb.removeClass("hide");
                $breadcrumb.find('.hall-of-fame').removeClass('hide');
                break;
    		case 'gallery':
                $breadcrumb.removeClass("hide");
    			$breadcrumb.find('.gallery').removeClass('hide');
    			break;
    		case 'contact':
                $breadcrumb.removeClass("hide");
    			$breadcrumb.find('.contact').removeClass('hide');
    			break;
    	}
    },
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

module.exports = Backbone.Router.extend({
    routes: {
        '' 						: 'home',
        'about-us' 				: 'about',
        'products' 				: 'products',
        'products/balls'		: 'productsBalls',
        'products/bags'			: 'productsBags',
        'products/shoes'		: 'productsShoes',
        'products/accessories'	: 'productsAccessories',
        'services'				: 'services',
        'promotions'            : 'promotions',
        'events'                : 'events',
        'hall-of-fame' 			: 'hallOfFame',
        'gallery' 				: 'gallery',
        'contact-us' 			: 'contact'
    },
    
    home: function() {
        $('.appStage').html(application.homeView.render().el);
    },

    about: function() {
    	$('.appStage').html(application.aboutView.render().el);
    },

    products: function() {
    	$('.appStage').html(application.productsView.render().el);
    },

    productsBalls: function() {
    	$('.appStage').html(application.productsBallsView.render().el);
    },

    productsBags: function() {
    	$('.appStage').html(application.productsBagsView.render().el);
    },

    productsShoes: function() {
    	$('.appStage').html(application.productsShoesView.render().el);
    },

    productsAccessories: function() {
    	$('.appStage').html(application.productsAccessoriesView.render().el);
    },

    services: function() {
        $('.appStage').html(application.servicesView.render().el);
    },

    promotions: function() {
    	$('.appStage').html(application.promotionsView.render().el);
    },

    events: function() {
        $('.appStage').html(application.eventsView.render().el);
    },

    hallOfFame: function() {
    	$('.appStage').html(application.hallOfFameView.render().el);
    },

    gallery: function() {
    	$('.appStage').html(application.galleryView.render().el);
    },

    contact: function() {
    	$('.appStage').html(application.contactView.render().el);
    },
});

});

;require.register("lib/view_helper", function(exports, require, module) {
// HANDLEBARS HELPERS

/******************************************************************************
// Photo Gallery Helper
******************************************************************************/

Handlebars.registerHelper( 'galleryList', function(galleryObject, options) {
	var output = "";

	for( var i=0, iLen=galleryObject.length; i<iLen; i++ ) {
		var yearHtml = '<div class="yearPanel clearfix"><h1 class="text-center">' + galleryObject[i].year + '</h1><div class="panel"><div class="panel-body thumbnails">';

		for( var j=0, jLen=galleryObject[i].items.length; j<jLen; j++ ) {
			yearHtml += '<a class="galleryThumbnail col-xs-4" href="' + galleryObject[i].items[j].image + '" data-lightbox="gallery' + galleryObject[i].year + '" data-title="<h3>' + galleryObject[i].items[j].date + '</h3><hr>'+ galleryObject[i].items[j].description +'">\
							<img class="photo" src="' + galleryObject[i].items[j].image + '">\
						</a>';
		}

		yearHtml +=	'</div></div></div>';

		output += yearHtml;
	}

	return output;
});

/******************************************************************************
// Hall Of Fame Helper
******************************************************************************/

Handlebars.registerHelper( 'hallOfFameList', function(hallOfFameObject, options) {
	var output = "";

	for( var i=0, iLen=hallOfFameObject.length; i<iLen; i++ ) {
		var yearHtml = '<div class="yearPanel clearfix"><h1 class="text-center">' + hallOfFameObject[i].year + '</h1><div class="panel"><div class="panel-body thumbnails">';

		for( var j=0, jLen=hallOfFameObject[i].items.length; j<jLen; j++ ) {
			yearHtml += '<a class="galleryThumbnail col-xs-4" href="' + hallOfFameObject[i].items[j].image + '" data-lightbox="gallery' + hallOfFameObject[i].year + '" data-title="<h3>' + hallOfFameObject[i].items[j].descriptionTitle + '</h3><hr>'+ hallOfFameObject[i].items[j].description +'">\
							<img class="photo" src="' + hallOfFameObject[i].items[j].image + '">\
						</a>';
		}
									
		yearHtml +=	'</div></div></div>';

		output += yearHtml;
	}

	return output;
});

/******************************************************************************
 Services List Helper
******************************************************************************/

Handlebars.registerHelper( 'servicesList', function(servicesObject, options) {
	var output = "";

	for( var i=0, iLen=servicesObject.length; i<iLen; i++ ) {
		var dataToggleName = "collapseServices" + i;
		output += '<div class="panel panel-custom">\
					<div class="panel-heading">\
						<div class="title text-center">' + servicesObject[i].title + '</div>\
					</div>\
					<div class="panel-body">\
						<img class="photo" src="' + servicesObject[i].image + '">\
						<div class="' + dataToggleName + ' panel-collapse collapse">\
					        <hr>\
					        <a data-toggle="collapse" data-parent=".panel-custom" href=".' + dataToggleName + '">\
								<div class="text-center">\
									<span class="glyphicon glyphicon-chevron-up"></span>\
								</div>\
							</a>\
					        <h3>' + servicesObject[i].descriptionTitle + '</h3>' + servicesObject[i].description + '\
					    </div>\
					</div>\
					<a data-toggle="collapse" data-parent=".panel-custom" href=".' + dataToggleName + '">\
						<div class="panel-footer text-center">\
							<span class="glyphicon glyphicon-info-sign"></span>\
						</div>\
					</a>\
				</div>';
	}

	return output;
});

/******************************************************************************
 Promotions List Helper
******************************************************************************/

Handlebars.registerHelper( 'promotionsList', function(promotionsObject, options) {
	var output = "";

	for( var i=0, iLen=promotionsObject.length; i<iLen; i++ ) {
		var dataToggleName = "collapsePromotions" + i;
		output += '<div class="panel panel-custom">\
					<div class="panel-heading">\
						<div class="title text-center">' + promotionsObject[i].title + '</div>\
					</div>\
					<div class="panel-body">\
						<img class="photo" src="' + promotionsObject[i].image + '">\
						<div class="' + dataToggleName + ' panel-collapse collapse">\
					        <hr>\
					        <a data-toggle="collapse" data-parent=".panel-custom" href=".' + dataToggleName + '">\
								<div class="text-center">\
									<span class="glyphicon glyphicon-chevron-up"></span>\
								</div>\
							</a>\
					        <h3>' + promotionsObject[i].descriptionTitle + '</h3>' + promotionsObject[i].description + '\
					    </div>\
					</div>\
					<a data-toggle="collapse" data-parent=".panel-custom" href=".' + dataToggleName + '">\
						<div class="panel-footer text-center">\
							<span class="glyphicon glyphicon-info-sign"></span>\
						</div>\
					</a>\
				</div>';
	}

	return output;
});

/******************************************************************************
 Events List Helper
******************************************************************************/

Handlebars.registerHelper( 'eventsList', function(eventsObject, options) {
	var output = "";

	for( var i=0, iLen=eventsObject.length; i<iLen; i++ ) {
		var dataToggleName = "collapseEvents" + i;
		output += '<div class="panel panel-custom">\
					<div class="panel-heading">\
						<div class="title text-center">' + eventsObject[i].title + '</div>\
					</div>\
					<div class="panel-body">\
						<img class="photo" src="' + eventsObject[i].image + '">\
						<div class="' + dataToggleName + ' panel-collapse collapse">\
					        <hr>\
					        <a data-toggle="collapse" data-parent=".panel-custom" href=".' + dataToggleName + '">\
								<div class="text-center">\
									<span class="glyphicon glyphicon-chevron-up"></span>\
								</div>\
							</a>\
					        <h3>' + eventsObject[i].descriptionTitle + '</h3>' + eventsObject[i].description + '\
					    </div>\
					</div>\
					<a data-toggle="collapse" data-parent=".panel-custom" href=".' + dataToggleName + '">\
						<div class="panel-footer text-center">\
							<span class="glyphicon glyphicon-info-sign"></span>\
						</div>\
					</a>\
				</div>';
	}

	return output;
});

/******************************************************************************
// Contact Details Helper
******************************************************************************/

Handlebars.registerHelper( 'contactDetails', function(contactsObject, options) {
	var output 			= "",
		address 		= contactsObject.address.join("</div><div>"),
		operatingHours 	= contactsObject.operatingHours.join("</div><div>"),
		contact 		= contactsObject.contact.join("</div><div>");

	address 		= "<div>" + address + "</div>";
	operatingHours 	= "<div>" + operatingHours + "</div>";
	contact 		= "<div>" + contact + "</div>";


	var output 	= '<div class="contactDetails top col-xs-12 col-md-4 col-md-offset-1">\
						<div class="address top">\
							<div class="title">Address</div>\
							<div class="description top">' + address + '</div>\
						</div>\
						<div class="operatingHours top">\
							<div class="title">Operating Hours</div>\
							<div class="description top">' + operatingHours + '</div>\
						</div>\
						<div class="contactNumber top">\
							<div class="title">Reach Us @</div>\
							<div class="description top">' + contact + '</div>\
						</div>\
					</div>';

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

;require.register("views/about_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/about');

var afterRender = function() {
	console.log("RENDERED ABOUT VIEW");
	Application.updateBreadcrumb('about');
};

module.exports = View.extend({
    className: 'about-view',
    template: template,

    afterRender: afterRender
});

});

;require.register("views/contact_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/contact');

var afterRender = function() {
	console.log("RENDERED CONTACT VIEW");
	Application.updateBreadcrumb('contact');
};

var getRenderData = function() {
	return {
			"result" : "success",
			"data" : {
				"contactDetails": {
					"address" 			: [
						"Leisure Park Kallang",
						"5 Stadium Walk #02-23",
						"Singapore 397693"
					],
					"operatingHours"	: [
						"Mon - Sat: 1330hrs - 2200hrs",
						"Sun & PH: 1330hrs - 2100hrs"
					],
					"contact" 	: [
						"Phone : (+65) 6346-1811",
						"Mobile : (+65) 9615-6988",
						"Email&nbsp;&nbsp; : ken@kenproshop.com"
					]
				},
			}
		}.data;
};

module.exports = View.extend({
    className 		: 'contact-view',
    template 		: template,
    getRenderData 	: getRenderData,
    afterRender 	: afterRender
});

});

;require.register("views/events_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/events');

var afterRender = function() {
	console.log("RENDERED EVENTS VIEW");
	Application.updateBreadcrumb('events');
};

var getRenderData = function() {
	return {
			"result" : "success",
			"data" : {
				"events": [
					{
						"image" 			: "img/events/demoday.jpg",
						"title" 			: "Track / Columbia Ball Demo Day",
						"descriptionTitle" 	: "",
						"description" 		: "<p>Ken Pro Shop is bringing back the Demo Day where everyone can attend and try out the new balls from Track and Columbia 300. Anyone can sign up and join and there are no obligations to purchase any ball from us. There will be lucky draws during the event itself. Please come if any of you are interested to try out the new balls.</p>"
					},
				]
			}
		}.data;
};

module.exports = View.extend({
    className 		: 'events-view',
    template 		: template,
    getRenderData 	: getRenderData,
    afterRender 	: afterRender
});

});

;require.register("views/gallery_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/gallery');

var afterRender = function() {
	console.log("RENDERED GALLERY VIEW");
	Application.updateBreadcrumb('gallery');	
};

var getRenderData = function() {
	return {
			"result" : "success",
			"data" : {
				"gallery": [
					{	
						"year" 				: "2013",
						"items" 			: [
							{
								"image" : "img/gallery/bowlexpochris.gif",
								"date" : "21 July 2013",
								"description" : "Today marks the end of the National League Master Event! Congrats to all winners and participants!",
							},
							{
								"image" : "img/gallery/bowlexpobilloneil.gif",
								"date" : "21 July 2013",
								"description" : "Today marks the end of the National League Master Event! Congrats to all winners and participants!",
							}
						]
					},
					{	
						"year" 				: "2012",
						"items" 			: [
							{
								"image" : "img/gallery/bowlexpochris.gif",
								"date" : "21 July 2012",
								"description" : "Today marks the end of the National League Master Event! Congrats to all winners and participants!",
							},
							{
								"image" : "img/gallery/bowlexpobilloneil.gif",
								"date" : "21 July 2012",
								"description" : "Today marks the end of the National League Master Event! Congrats to all winners and participants!",
							}
						]
					},
				]
			}
		}.data;
};

module.exports = View.extend({
    className 		: 'gallery-view',
    template 		: template,
    getRenderData 	: getRenderData,
    afterRender 	: afterRender
});
});

;require.register("views/hall_of_fame_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/hall_of_fame');

var afterRender = function() {
	console.log("RENDERED HALL OF FAME VIEW");
	Application.updateBreadcrumb('hall-of-fame');
};

var getRenderData = function() {
	return {
			"result" : "success",
			"data" : {
				"hallOfFame": [
					{	
						"year" 				: "2013",
						"items" 			: [
							{
								"image" 			: "img/gallery/bowlexpochris.gif",
								"descriptionTitle" 	: "Ramsey Lim",
								"description" 		: "Singapore<br>28th July 2013 - PBC July Medal 2013<br>Jurong Superbowl<br>Hammer First Blood",
							},
							{
								"image" 			: "img/gallery/bowlexpobilloneil.gif",
								"descriptionTitle"	: "Ramsey Lim",
								"description" 		: "Singapore<br>28th July 2013 - PBC July Medal 2013<br>Jurong Superbowl<br>Hammer First Blood",
							}
						]
					},
					{	
						"year" 				: "2012",
						"items" 			: [
							{
								"image" 			: "img/gallery/bowlexpochris.gif",
								"descriptionTitle" 	: "Ramsey Lim",
								"description" 		: "Singapore<br>28th July 2012 - PBC July Medal 2013<br>Jurong Superbowl<br>Hammer First Blood",
							},
							{
								"image" 			: "img/gallery/bowlexpobilloneil.gif",
								"descriptionTitle"	: "Ramsey Lim",
								"description" 		: "Singapore<br>28th July 2012 - PBC July Medal 2013<br>Jurong Superbowl<br>Hammer First Blood",
							}
						]
					},
				]
			}
		}.data;
};

module.exports = View.extend({
    className 		: 'hall-of-fame-view',
    template 		: template,
    getRenderData 	: getRenderData,
    afterRender 	: afterRender
});

});

;require.register("views/home_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/home');

var afterRender = function() {
	console.log("RENDERED HOME VIEW");
	Application.updateBreadcrumb('home');
};

module.exports = View.extend({
    className: 'home-view',
    template: template,

    afterRender: afterRender
});

});

;require.register("views/products_accessories_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/products_accessories');

var afterRender = function() {
	console.log("RENDERED PRODUCTS ACCESSORIES VIEW");
	Application.updateBreadcrumb('products-accessories');
};

module.exports = View.extend({
    className: 'products-accessories-view',
    template: template,

    afterRender: afterRender
});

});

;require.register("views/products_bags_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/products_bags');

var afterRender = function() {
	console.log("RENDERED PRODUCTS BAGS VIEW");
	Application.updateBreadcrumb('products-bags');
};

module.exports = View.extend({
    className: 'products-bags-view',
    template: template,

    afterRender: afterRender
});

});

;require.register("views/products_balls_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/products_balls');

var afterRender = function() {
	console.log("RENDERED PRODUCTS BALLS VIEW");
	Application.updateBreadcrumb('products-balls');
};

module.exports = View.extend({
    className: 'products-balls-view',
    template: template,

    afterRender: afterRender
});

});

;require.register("views/products_shoes_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/products_shoes');

var afterRender = function() {
	console.log("RENDERED PRODUCTS SHOES VIEW");
	Application.updateBreadcrumb('products-shoes');
};

module.exports = View.extend({
    className: 'products-shoes-view',
    template: template,

    afterRender: afterRender
});

});

;require.register("views/products_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/products');

var afterRender = function() {
	console.log("RENDERED PRODUCTS VIEW");
	Application.updateBreadcrumb('products');
};

module.exports = View.extend({
    className: 'products-view',
    template: template,

    afterRender: afterRender
});

});

;require.register("views/promotions_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/promotions');

var afterRender = function() {
	console.log("RENDERED PROMOTIONS VIEW");
	Application.updateBreadcrumb('promotions');
};

var getRenderData = function() {
	return {
			"result" : "success",
			"data" : {
				"promotions": [
					{
						"image" 			: "img/promotions/offerset.gif",
						"title" 			: "Offer Set Promotion",
						"descriptionTitle" 	: "Offer Set promotion for beginner/advance bowlers",
						"description" 		: "<p>Columbia 300 bowling ball + bowling shoes + single ball bag + ball polisher @ S$175</p><p>Ebonite bowling ball + bowling shoes + single ball bag + ball polisher @ S$255</p>"
					},
				]
			}
		}.data;
};

module.exports = View.extend({
    className 		: 'promotions-view',
    template 		: template,
    getRenderData 	: getRenderData,
    afterRender 	: afterRender
});

});

;require.register("views/services_view", function(exports, require, module) {
var View     = require('./view'),
	template = require('./templates/services');

var afterRender = function() {
	console.log("RENDERED SERVICES VIEW");
	Application.updateBreadcrumb('services');
};

var getRenderData = function() {
	return {
			"result" : "success",
			"data" : {
				"services": [
					{
						"image": "img/services/thewave.png",
						"title": "The Wave by PowerHouse",
						"descriptionTitle": "",
						"description": "Please visit <a href='http://powerhousebowling.com/products/product_detail/the_wave'><strong>The Wave</strong></a> for more information."
					},
					{
						"image": "img/services/hookrestoration.jpg",
						"title": "Bowling Ball Hook Restoration",
						"descriptionTitle": "Ebonite PowerHouse Hook Again Treatment",
						"description": "<p>The first and ONLY proven formula to actually restore hook to 'dead' bowling balls!</p><p>Brings as much as 99.8% performance back.</p><p>Performance tested, safe for reactive and particle balls.</p><p>Quick Recovery - Works in 24 hours.</p>"
					},
					{
						"image": "img/services/resurfacing.jpg",
						"title": "Bowling Ball Resurfacing",
						"descriptionTitle": "Haus Resurfacing System",
						"description": "<p>After numerous games on wood or synthetic lanes, your ball will loose consistent cover reaction.</p><p>Regular resurfacing with the Haus Resurfacing System can:<ul><li><h6><strong>IMPROVE YOUR GAME</strong></h6>Bowling consistency requires consistent cover reaction. Regular resurfacing can help you achieve that critical consistency.</li><li><h6><strong>LENGTHEN YOUR BALL'S LIFE</strong></h6>By resurfacing your ball, minimal ball surface is removed, avoiding the need to remove deep track and drop areas, and extending the length of time your ball meets ABC specifications.</li><li><h6><strong>ASSURE YOU OF RESURFACING CONSISTENCY</strong></h6>Consistent &amp; accurate results, time after time. Unlike manually resurfaced balls, our automatic system maintains and returns your ball back to it's original manufacturers' specifications or better. Operator error is virtually eliminated. Your entire ball surface is refinished, not just the drop and track areas.</li></p>"
					},
				]
			}
		}.data;
};

module.exports = View.extend({
    className: 'services-view',
    template: template,
    getRenderData: getRenderData,
    afterRender: afterRender
});

});

;require.register("views/templates/about", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"kennethProfile row\">\n	<div class=\"col-xs-12 col-md-4\">\n		<img class=\"photo bottom center-block img-circle\" src=\"img/about/kenneth.jpg\">\n	</div>\n	<div class=\"col-xs-12 col-md-8\">\n		<div class=\"title text-center\">\n			Kenneth Chua\n		</div>\n		<ul class=\"profileList\">\n			<li>Founder</li>\n			<li>21 years in bowling business</li>\n			<li>IBPSIA Technical Certification since 1999</li>\n			<li>Singapore Special Olympic World Summer Games Bowling Coach (2007)</li>\n			<li>Catholic High School bowling coach</li>\n			<li>Catholic Primary School bowling coach</li>\n		</ul>\n	</div>\n</div>\n\n<hr>\n\n<div class=\"shopDescription\">\n	<div class=\"title text-center bottom\">\n		Founder's story\n	</div>\n	<p>Kenneth Chua, owner of Ken Pro Shop in Kallang Bowl, Singapore, is one of the first 97 bowling pro shop and instructional professionals in the world to have earned Technical Certification from the International Bowling Pro Shop & Instructors Association Inc. (IBPSIA).</p>\n\n	<p>One of some 400 candidates currently enrolled in IBPSIA's Certification Program, Kenneth completed the three-year course in less than one year.</p>\n\n	<p>To fulfill requirements of the Certification Program, Kenneth participated in a four-day, hands-on workshop during the spring of 1999; accumulated the required additional credits at the association's annual conference in Las Vegas, Nev., in July 1999; and completed written study guides and the final, written test based on the workshop and IBPSIA's 150-page \"Technical Manual.\"</p>\n\n	<p>IBPSIA's Technical Certification reflects the holder's expertise in the technology-based elements of pro shop operation - fitting and drilling techniques, product knowledge, work bench activities and customer service.</p>\n\n	<p>Kenneth specializes in retail sales of bowling equiptment, supplies, accessories and apparel; and in providing technical services such as measuring and fitting bowlers' hands to ensure the proper grip, as well as drilling, plugging and resurfacing bowling balls.</p>\n\n	<p>Founded in November 1990, IBPSIA's mission is to provide education, communication and recognition for bowling pro shop and instructional professional, in order to create a foundation for the advancement of the worldwide bowling industry. Currently, IBPSIA's membership comprises some 650 businesses throughout the world.</p>\n\n	<p>More information may be obtained by contacting IBPSIA at http://www.ibpsia.com/</p>\n\n	<p>\n		<img class=\"photo center-block\" src=\"img/about/certified.jpg\">\n	</p>\n</div>";
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
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

  buffer += "<div class=\"googleMap col-xs-12 col-md-4 col-md-offset-1\">\n	<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7899527906447!2d103.87663900000003!3d1.3009019999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da184ed7a58d11%3A0x42d0ff6024aef2b7!2sKen+Pro+Shop!5e0!3m2!1sen!2s!4v1404980560364\" width=\"100%\" height=\"260px\" frameborder=\"0\" style=\"border:0\"></iframe>\n</div>\n\n";
  stack1 = (helper = helpers.contactDetails || (depth0 && depth0.contactDetails),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.contactDetails), options) : helperMissing.call(depth0, "contactDetails", (depth0 && depth0.contactDetails), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
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

;require.register("views/templates/events", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

  stack1 = (helper = helpers.eventsList || (depth0 && depth0.eventsList),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.events), options) : helperMissing.call(depth0, "eventsList", (depth0 && depth0.events), options));
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
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

;require.register("views/templates/gallery", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

  stack1 = (helper = helpers.galleryList || (depth0 && depth0.galleryList),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.gallery), options) : helperMissing.call(depth0, "galleryList", (depth0 && depth0.gallery), options));
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
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

;require.register("views/templates/hall_of_fame", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

  stack1 = (helper = helpers.hallOfFameList || (depth0 && depth0.hallOfFameList),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.hallOfFame), options) : helperMissing.call(depth0, "hallOfFameList", (depth0 && depth0.hallOfFame), options));
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
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


  buffer += "<div class=\"main-content row\">\n        <div class=\"carousel slide main-carousel\" data-ride=\"carousel\">\n            <!-- Wrapper for slides -->\n            <div class=\"carousel-inner\">\n                <div class=\"item active\">\n                    <img class=\"photo\" src=\"img/carousel/carousel-1.jpg\">\n                </div>\n                <div class=\"item\">\n                    <img class=\"photo\" src=\"img/carousel/carousel-2.jpg\">\n                </div>\n                <div class=\"item\">\n                    <img class=\"photo\" src=\"img/carousel/carousel-3.jpg\">\n                </div>\n                <div class=\"item\">\n                    <img class=\"photo\" src=\"img/carousel/carousel-4.jpg\">\n                </div>\n                <div class=\"item\">\n                    <img class=\"photo\" src=\"img/carousel/carousel-5.jpg\">\n                </div>\n                <div class=\"item\">\n                    <img class=\"photo\" src=\"img/carousel/carousel-6.jpg\">\n                </div>\n            </div>\n\n            <a class=\"left carousel-control\" href=\".main-carousel\" role=\"button\" data-slide=\"prev\">\n                <span class=\"glyphicon glyphicon-chevron-left\"></span>\n            </a>\n            <a class=\"right carousel-control\" href=\".main-carousel\" role=\"button\" data-slide=\"next\">\n                <span class=\"glyphicon glyphicon-chevron-right\"></span>\n            </a>\n        </div>\n</div>\n\n<hr>\n\n<!-- <div class=\"panel-group mainAccordion\">\n    <div class=\"panel panel-default\">\n        <div class=\"panel-heading\">\n            <h4 class=\"panel-title\">\n                <a data-toggle=\"collapse\" data-parent=\".mainAccordion\" href=\".panel-balls\">\n                    Balls\n                    \n                    \n                </a>\n            </h4>\n        </div>\n        <div class=\"panel-collapse collapse panel-balls\">\n            <div class=\"panel-body balls\">\n                <div class=\"ball\">\n                    <img class=\"photo\" src=\"img/balls/eruptionpro.gif\">\n                    <div class=\"description\">Make: Brunswick</div>\n                    <div class=\"description\">Model: Fortera</div>\n                </div>\n                <div class=\"ball\">\n                    <img class=\"photo\" src=\"img/balls/eruptionpro.gif\">\n                    <div class=\"description\">Make: Brunswick</div>\n                    <div class=\"description\">Model: Fortera</div>\n                </div>\n                <div class=\"ball\">\n                    <img class=\"photo\" src=\"img/balls/eruptionpro.gif\">\n                    <div class=\"description\">Make: Brunswick</div>\n                    <div class=\"description\">Model: Fortera</div>\n                </div>\n                <div class=\"ball\">\n                    <img class=\"photo\" src=\"img/balls/eruptionpro.gif\">\n                    <div class=\"description\">Make: Brunswick</div>\n                    <div class=\"description\">Model: Fortera</div>\n                </div>\n                <div class=\"ball\">\n                    <img class=\"photo\" src=\"img/balls/eruptionpro.gif\">\n                    <div class=\"description\">Make: Brunswick</div>\n                    <div class=\"description\">Model: Fortera</div>\n                </div>\n                <div class=\"ball\">\n                    <img class=\"photo\" src=\"img/balls/eruptionpro.gif\">\n                    <div class=\"description\">Make: Brunswick</div>\n                    <div class=\"description\">Model: Fortera</div>\n                </div>\n                <div class=\"ball\">\n                    <img class=\"photo\" src=\"img/balls/eruptionpro.gif\">\n                    <div class=\"description\">Make: Brunswick</div>\n                    <div class=\"description\">Model: Fortera</div>\n                </div>\n                <div class=\"ball\">\n                    <img class=\"photo\" src=\"img/balls/eruptionpro.gif\">\n                    <div class=\"description\">Make: Brunswick</div>\n                    <div class=\"description\">Model: Fortera</div>\n                </div>\n            </div>\n            <div class=\"panel-footer text-right\">\n                <a href=\"\">\n                    View All Balls \n                    <span class=\"glyphicon glyphicon-chevron-right\"></span>\n                </a>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"panel panel-default\">\n        <div class=\"panel-heading\">\n            <h4 class=\"panel-title\">\n                <a data-toggle=\"collapse\" data-parent=\".mainAccordion\" href=\".panel-bags\">\n                    Bags\n                </a>\n            </h4>\n        </div>\n        <div class=\"panel-collapse collapse panel-bags\">\n            <div class=\"panel-body bags\">\n            </div>\n        </div>\n    </div>\n    <div class=\"panel panel-default\">\n        <div class=\"panel-heading\">\n            <h4 class=\"panel-title\">\n                <a data-toggle=\"collapse\" data-parent=\".mainAccordion\" href=\".panel-shoes\">\n                    Shoes\n                </a>\n            </h4>\n        </div>\n        <div class=\"panel-collapse collapse panel-shoes\">\n            <div class=\"panel-body shoes\">\n            </div>\n        </div>\n    </div>\n    <div class=\"panel panel-default\">\n        <div class=\"panel-heading\">\n            <h4 class=\"panel-title\">\n                <a data-toggle=\"collapse\" data-parent=\".mainAccordion\" href=\".panel-accessories\">\n                    Accessories\n                </a>\n            </h4>\n        </div>\n        <div class=\"panel-collapse collapse panel-accessories\">\n            <div class=\"panel-body accessories\">\n            </div>\n        </div>\n    </div>\n    <div class=\"panel panel-default\">\n        <div class=\"panel-heading\">\n            <h4 class=\"panel-title\">\n                <a data-toggle=\"collapse\" data-parent=\".mainAccordion\" href=\".panel-services\">\n                    Services\n                </a>\n            </h4>\n        </div>\n        <div class=\"panel-collapse collapse panel-services\">\n            <div class=\"panel-body services\">\n            </div>\n        </div>\n    </div>\n</div>-->";
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

;require.register("views/templates/products", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"panel panel-products\">\n	<a href=\"#products/balls\">\n		<div class=\"panel-body\">\n			<img class=\"center-block photo\" src=\"img/products-balls.png\">\n		</div>\n		<div class=\"panel-footer\">\n			<div class=\"title text-center\">\n				Balls\n			</div>\n		</div>\n	</a>\n</div>\n\n<div class=\"panel panel-products\">\n	<a href=\"#products/bags\">\n		<div class=\"panel-body\">\n			<img class=\"center-block photo\" src=\"img/products-bags.png\">\n		</div>\n		<div class=\"panel-footer\">\n			<div class=\"title text-center\">\n				Bags\n			</div>\n		</div>\n	</a>\n</div>\n\n<div class=\"panel panel-products\">\n	<a href=\"#products/shoes\">\n		<div class=\"panel-body\">\n			<img class=\"center-block photo\" src=\"img/products-shoes.jpg\">\n		</div>\n		<div class=\"panel-footer\">\n			<div class=\"title text-center\">\n				Shoes\n			</div>\n		</div>\n	</a>\n</div>\n\n<div class=\"panel panel-products\">\n	<a href=\"#products/accessories\">\n		<div class=\"panel-body\">\n			<img class=\"center-block photo\" src=\"img/products-accessories.jpg\">\n		</div>\n		<div class=\"panel-footer\">\n			<div class=\"title text-center\">\n				Accessories\n			</div>\n		</div>\n	</a>\n</div>";
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

;require.register("views/templates/products_accessories", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


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

;require.register("views/templates/products_bags", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


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

;require.register("views/templates/products_balls", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


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

;require.register("views/templates/products_shoes", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


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

;require.register("views/templates/promotions", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

  stack1 = (helper = helpers.promotionsList || (depth0 && depth0.promotionsList),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.promotions), options) : helperMissing.call(depth0, "promotionsList", (depth0 && depth0.promotions), options));
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
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

;require.register("views/templates/services", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

  stack1 = (helper = helpers.servicesList || (depth0 && depth0.servicesList),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.services), options) : helperMissing.call(depth0, "servicesList", (depth0 && depth0.services), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<div class=\"panel panel-custom\">\n 	<div class=\"panel-heading\">\n  		<div class=\"title text-center\">\n			Other Services\n		</div>\n 	</div>\n 	<div class=\"panel-content\">\n 		<div class=\"panel-group otherServices\">\n 			<div class=\"panel\">\n		    	<div class=\"panel-heading\">\n		    		<div class=\"sub-title text-center\">\n		        		<a data-toggle=\"collapse\" data-parent=\".otherServices\" href=\".collapseReplug\">\n		        			Replug\n		        		</a>\n		    		</div>\n		    	</div>\n		    	<div class=\"collapseReplug panel-collapse collapse\">\n		      		<div class=\"panel-body\">\n		        		Ball grip feeling stretched? Having blisters on your thumb or fingers? Thumb or finger pitch (angle) may not be the correct fit for your hand. Bring your bowling ball down for a no obligation inspection by the professional.\n		      		</div>\n		    	</div>\n		    </div>\n\n			<div class=\"panel\">\n		    	<div class=\"panel-heading\">\n			      	<div class=\"sub-title text-center\">\n			        	<a data-toggle=\"collapse\" data-parent=\".otherServices\" href=\".collapseInserts\">\n			          		Thumb/Rubber inserts changing\n			        	</a>\n			    	</div>\n			    </div>\n			    <div class=\"collapseInserts panel-collapse collapse\">\n			    	<div class=\"panel-body\">\n			        	Just like car tyres, rubber inserts do wear out as well. Get your grip back and produce the same ball revolution consistently.\n			    	</div>\n			    </div>\n			</div>\n\n			<div class=\"panel\">\n				<div class=\"panel-heading\">\n			    	<div class=\"sub-title text-center\">\n			        	<a data-toggle=\"collapse\" data-parent=\".otherServices\" href=\".collapseDrilling\">\n			          		Drilling\n			    		</a>\n			    	</div>\n			    </div>\n			    <div class=\"collapseDrilling panel-collapse collapse\">\n			    	<div class=\"panel-body\">\n			        	Bought a bowling ball somewhere else? Get Kenneth to advise you on the most suitable drilling pattern and drill the bowling ball professionally. After all, he is Singapore's ONLY IBPSIA certified bowling ball driller.\n			    	</div>\n			    </div>\n			</div>\n\n			<div class=\"panel\">\n				<div class=\"panel-heading\">\n			    	<div class=\"sub-title text-center\">\n			        	<a data-toggle=\"collapse\" data-parent=\".otherServices\" href=\".collapseCoaching\">\n			          		Coaching\n			        	</a>\n			      	</div>\n			    </div>\n			    <div class=\"collapseCoaching panel-collapse collapse\">\n			    	<div class=\"panel-body\">\n			        	Learn to bowl correctly from the professionals! We have classes for Beginners, intermediate and advanced bowlers for all ages, companies and school. Our team of dedicated coaches are qualified bowling coaches certified by Singapore Bowling Federation (SBF) and United States Bowling Congress (USBC). For enquiries, please call 9615 6988.\n			    	</div>\n			    </div>\n			</div>\n		</div>\n 	</div>\n</div>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n";
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
    
    afterRender: function(){}
    
})

});

;
//# sourceMappingURL=app.js.map