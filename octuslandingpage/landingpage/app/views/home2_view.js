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
