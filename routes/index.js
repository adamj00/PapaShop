var express = require('express');
const cart = require('../models/cart');
var router = express.Router();

var Cart = require('../models/cart');

var Product = require('../models/product');

var Order = require('../models/order');

var User = require('../models/user');
var mongoose = require('mongoose');


router.get('/', function (req, res, next) {
  Product.find({}).lean()
    .exec(function (error, body) {
      var productChunks = [];
      var chunkSize = 3;
      for (var i = 0; i < body.length; i += chunkSize) {
        productChunks.push(body.slice(i, i + chunkSize));
      }
      res.render('shop/index', {
        title: 'Papa Shop',
        products: productChunks
      });
    });
});


router.post('/search', function (req, res, next) {
  var query = req.body.query;
  Product.find({$or: [{"title": {$regex : query}}, {"description": {$regex : query}}]}).lean()
    .exec(function (error, body) {
      if (error) {
        res.render('shop/search', {
          title: 'Wyniki wyszukiwania',
          products: null,
          query: req.body.query,
          err: error.message
        });
      }
      var productChunks = [];
      var chunkSize = 3;
      for (var i = 0; i < body.length; i += chunkSize) {
        productChunks.push(body.slice(i, i + chunkSize));
      }
      res.render('shop/search', {
        title: 'Wyniki wyszukiwania',
        products: productChunks,
        query: req.body.query,
        err: null
      });
    });
});

router.get('/add-to-cart/:id', isLoggedIn, function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function (err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });
});

router.get('/reduce/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/shopping-cart', isLoggedIn, function (req, res, next) {
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', {
      products: null
    });
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  });
  
});

router.get('/checkout', isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/checkout', {
    total: cart.totalPrice
  });
});

router.post('/checkout', isLoggedIn, function(req, res, next) {
  var cart = new Cart(req.session.cart);
  var order = new Order({
    user: req.user,
    email: req.user.email,
    cart: cart,
    address: req.body.address,
    name: req.body.name,
    comment: req.body.comments,
    date: Date.now()
  });
  order.save(function(err, result) {
    if (err) {
      req.flash('success', 'Wystąpił błąd');
      console.log('Błąd');
    }
    else {
      req.flash('success', 'Złożono zamówienie');
      console.log('Sukces');
    }
    req.session.cart = null;
    res.redirect('/');
  });
});


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  } else {
      req.session.oldUrl = req.url;
      res.redirect('/user/signin');
  }
}



function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
      return next();
  } else {
      res.redirect('/');
  }
}

module.exports = router;
