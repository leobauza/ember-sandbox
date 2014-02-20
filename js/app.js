var App = Ember.Application.create({
	LOG_TRANSITIONS: true //helpful for debugging
});

App.Router.map(function() {
	//no need for index route...
	//normal routes
	this.route('about'); //the about path renders the about tpl
	//this.route('about', { path: '/aboutus' }); //specify a different path

	//resource route
	this.resource('products');
	//this.resource('products', {path: '/items'});

});


App.IndexController = Ember.Controller.extend({
	productsCount: 6,
	property: 'my-property',
	time: function() {
		return (new Date()).toDateString();
	}.property()
});

App.PRODUCTS = [
	{
		title: 'Flint',
		price: 99,
		description: 'Flint is..',
		isOnSale: true,
		image: 'flint.png'
	},
	{
		title: 'Kindling',
		price: 249,
		description: 'Easily..',
		isOnSale: false,
		image: 'kindling.png'
	}
];

App.ProductsRoute = Ember.Route.extend({
	model: function() {
		return App.PRODUCTS;
	}
});





