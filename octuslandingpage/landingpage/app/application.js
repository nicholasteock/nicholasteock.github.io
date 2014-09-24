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
