var View     = require('./view')
  , template = require('./templates/home')

// var afterRender = function() {
//     var s = skrollr.init();
// }

var afterRender = function() {
	$("body").removeClass("body2");
}

module.exports = View.extend({
    id: 'home-view',
    template: template,
    afterRender: afterRender
});
