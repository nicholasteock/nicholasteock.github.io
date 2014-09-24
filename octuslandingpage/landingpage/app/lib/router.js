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
