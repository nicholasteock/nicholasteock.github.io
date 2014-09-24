var View     = require('./view'),
	template = require('./templates/contact');

var afterRender = function() {
	console.log("RENDERED CONTACT VIEW");
};

module.exports = View.extend({
    className: 'container contact-view',
    template: template,

    afterRender: afterRender
});
