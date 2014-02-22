var App = Ember.Application.create({
	LOG_TRANSITIONS: true //helpful for debugging
});
App.ApplicationAdapter = DS.FixtureAdapter.extend();

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
		this.resource('product', {path: '/:product_id'});
	});

});

/*

MODELS

*/
App.Product = DS.Model.extend({
	title: DS.attr('string'),
	price: DS.attr('number'),
	description: DS.attr('string'),
	isOnSale: DS.attr('boolean'),
	image: DS.attr('string')
});


//ember data fixetures for Products
App.Product.FIXTURES = [ //needs to use the FIXTURES constant within the model
	{
		id: 1, //need to give each product a unique ID
		title: 'Flint',
		price: 99,
		description: 'Flint is..',
		isOnSale: true,
		image: 'flint.png'
	},
	{
		id: 2,
		title: 'Kindling',
		price: 249,
		description: 'Easily..',
		isOnSale: false,
		image: 'kindling.png'
	}
];



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
		//return App.PRODUCTS;
		return this.store.findAll('product');
	}
});


//Product Route not needed as this is the ember default behaviour
// App.ProductRoute = Ember.Route.extend({
// 	model: function(params) {
// 		//console.log(params)
// 		//return App.PRODUCTS.findBy('title', params.title);
// 		return this.store.find('product', params.product_id);
// 	}
// });




