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
