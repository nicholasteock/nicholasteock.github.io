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
