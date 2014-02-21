var App = Ember.Application.create({
	LOG_TRANSITIONS: true //helpful for debugging
});

//products
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

/*

ROUTER

*/
App.Router.map(function() {
	//no need for index route...
	//normal routes
	this.route('about'); //the about path renders the about tpl
	//this.route('about', { path: '/aboutus' }); //specify a different path

	//resource route
	//this.resource('products');
	//this.resource('products', {path: '/items'});
	
	
	//dynamic route
	//this.resource('product', { path: '/products/:title' });

	//nested route for products
	this.resource('products', function() {
		this.resource('product', {path: '/:title'});
	});

});


/*

CONTROLLER

*/

App.IndexController = Ember.Controller.extend({
	productsCount: 6,
	property: 'my-property',
	time: function() {
		return (new Date()).toDateString();
	}.property()
});




/*

ROUTES

*/

App.ProductsRoute = Ember.Route.extend({
	model: function() {
		return App.PRODUCTS;
	}
});

App.ProductRoute = Ember.Route.extend({
	model: function(params) {
		//console.log(params)
		return App.PRODUCTS.findBy('title', params.title);
	}
});





