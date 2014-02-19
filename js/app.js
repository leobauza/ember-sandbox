var App = Ember.Application.create({
	LOG_TRANSITIONS: true //helpful for debugging
});

App.Router.map(function() {
	//no need for index route...
	
	this.route('about'); //the about path renders the about tpl
	//this.route('about', { path: '/aboutus' }); //specify a different path
});


App.IndexController = Ember.Controller.extend({
	productsCount: 6,
	property: 'my-property',
	time: function() {
		return (new Date()).toDateString();
	}.property()
});