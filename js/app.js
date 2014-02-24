var App = Ember.Application.create({
	LOG_TRANSITIONS: true //helpful for debugging
});
App.ApplicationAdapter = DS.FixtureAdapter.extend();
//App.ApplicationAdapter = DS.RESTAdapter.extend(); //REST adapter

/*

ROUTER

*/
App.Router.map(function() {
	//no need for index route...
	//normal routes
	//this.route('about'); //the about path renders the about tpl
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
	
	this.resource('contacts', function() {
		this.resource('contact', {path: '/:contact_id'});
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
	image: DS.attr('string'),
	reviews: DS.hasMany('review', {async: true}), //relationship to reviews stablished
	crafter: DS.belongsTo('contact')
});

App.Review = DS.Model.extend({
	text: DS.attr('string'),
	reviewedAt: DS.attr('date'),
	product: DS.belongsTo('product') //establishes the relationship to product
});

App.Contact = DS.Model.extend({
	name: DS.attr('string'),
	about: DS.attr('string'),
	avatar: DS.attr('string'),
	products: DS.hasMany('product', {async: true})
});


/*

ROUTES

*/
App.IndexRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('product');
	}
});


App.ProductsRoute = Ember.Route.extend({
	model: function() {
		//return App.PRODUCTS;
		return this.store.findAll('product');
		//return this.store.find('product', {order: 'title'}); //this will generate a url like example.com/products?order=title sorting happens server side
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

App.ContactsRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('contact');
	}
});
//Same as product route this is an ember default
// App.ContactRoute = Ember.Route.extend({
// 	model: function(params) {
// 		return this.store.find('contact', params.contact_id);
// 	}
// });


/*

CONTROLLERS

*/

// App.IndexController = Ember.Controller.extend({
// 	productsCount: 6,
// 	property: 'my-property',
// 	time: function() {
// 		return (new Date()).toDateString();
// 	}.property()
// });

//change the above to be dynamic
App.IndexController = Ember.ArrayController.extend({
	// productsCount: function() {
	// 	return this.get('length'); //looks for length property of the ArrayController...finds none...delegates to the model and finds the lenght of the model (product array). == model.length
	// }.property('length') //keeps a watch of the length property of the controller and if it changes update productsCount
	
	//shortened version of the above
	productsCount: Ember.computed.alias('length'),
	property: 'my-prop',
	time: function() {
		return (new Date()).toDateString();
	}.property(),
	thisis: function() {
		return {
			one: this.get('model').get('length'),
			two: this.get('length')
		}
	}.property()
	
});


App.ProductsController = Ember.ArrayController.extend({
	sortProperties: ['title'],
	sortAscending: true
});


// App.ContactsIndexController = Ember.Controller.extend({
// 	contactName: 'Anostagia',
// 	avatar: 'images/avatar.png',
// 	open: function() {
// 		return ((new Date()).getDay() === 0) ? "Closed" : "Open";
// 	}.property()
// });



/*

FIXTURES

*/
App.Product.FIXTURES = [ //needs to use the FIXTURES constant within the model
	{
		id: 1, //need to give each product a unique ID
		title: 'Flint',
		price: 99,
		description: 'Flint is..',
		isOnSale: true,
		image: 'flint.png',
		reviews: [100, 101],
		crafter: 200
	},
	{
		id: 2,
		title: 'Kindling',
		price: 249,
		description: 'Easily..',
		isOnSale: false,
		image: 'kindling.png',
		crafter: 201
	},
	{
		id: 3,
		title: 'Bow Drill',
		price: 49.99,
		description: 'Easily..',
		isOnSale: false,
		image: 'bowdrill.png',
		crafter: 200
	},
	{
		id: 4,
		title: 'Zebra',
		price: 20,
		description: 'Easily..',
		isOnSale: false,
		image: 'zebra.png',
		crafter: 200
	}
];

App.Review.FIXTURES = [
	{
		id: 100,
		product: 1, //map reviews back to a product!
		text: "Started a fire in no time!"
	},
	{
		id: 101,
		product: 1, //map reviews back to a product!
		text: "Not the brightest flame, but warm!"
	}
];

App.Contact.FIXTURES = [
	{
    id: 200,
    name: "Giamia",
    about: "Although Giamia came from a humble spark of lightning, he quickly grew to be a great craftsman, providing all the warming instruments needed by those close to him.",
    avatar: "images/contacts/giamia.png",
  	products: [1, 3, 4]
	},
  {
    id: 201,
    name: "Anostagia",
    about: "Knowing there was a need for it, Anostagia drew on her experience and spearheaded the Flint & Flame storefront. In addition to coding the site, she also creates a few products available in the store.",
    avatar: "images/contacts/anostagia.png",
  	products: [2]
  }
];








