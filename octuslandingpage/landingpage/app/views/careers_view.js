var View     = require('./view'),
	template = require('./templates/careers');

var afterRender = function() {
	console.log("RENDERED CAREERS VIEW");
};

module.exports = View.extend({
    className: 'container careers-view',
    template: template,

    afterRender: afterRender
});
