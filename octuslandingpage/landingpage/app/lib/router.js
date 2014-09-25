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
