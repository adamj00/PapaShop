var express = require('express');
const cart = require('../models/cart');
var router = express.Router();

var Cart = require('../models/cart');

var Product = require('../models/product');

var Order = require('../models/order');

var User = require('../models/user');
var mongoose = require('mongoose');


router.get('/all-users',isAdmin, function(req, res, next) {
    User.find({}).lean()
    .exec(function(err, users) {
            if (err) {
                return res.write('Błąd');
            }
            res.render('admin/all-users', {users: users});
        }); 
  });
  
  router.get('/all-orders',isAdmin, function(req, res, next) {
    Order.find({}).lean()
    .exec(function(err, orders) {
            if (err) {
                return res.write('Błąd');
            }
            var cart;
              orders.forEach(function(order) {
                  cart = new Cart(order.cart);
                  order.items = cart.generateArray();
              });
            res.render('admin/all-orders', {orders: orders});
        }); 
  });
  
  router.get('/products',isAdmin, function(req, res, next) {
    Product.find({}).lean()
    .exec(function(err, products) {
            if (err) {
                return res.write('Błąd');
            }
            res.render('admin/products', {products: products});
        }); 
  });
  
  router.get('/edit-product/:id', isAdmin, function(req, res, next) {
    var productId = req.params.id;
    Product.find({_id: productId}).lean()
    .exec(function(err, products) {
            if (err) {
                return res.write('Błąd');
            }
            res.render('admin/edit-product', {product: products[0]});
        }); 
  });
  
  
  router.post('/edit-product/:id', isAdmin, function(req, res, next) {
    var newTitle = req.body.title;
    var newDescription = req.body.description;
    var newImagePath = req.body.imagePath;
    var newPrice = req.body.price;
    var productId = req.params.id;
  
    
    var id = mongoose.Types.ObjectId(productId);
    Product.findByIdAndUpdate(id,{
      "title": newTitle,
      "description": newDescription,
      "imagePath": newImagePath,
      "price": newPrice
    }, function(err, result){
  
      if(err){
        console.log(err); 
        res.redirect('/');
      }
      else{
          res.redirect('/admin/products');
      }
    });
  });
  
  router.get('/delete-product/:id', function(req, res, next) {
    var productId = req.params.id;
    var id = mongoose.Types.ObjectId(productId);
    Product.deleteOne( {_id: id}, function(err, res) {
      if (err) {
        console.log(err);
      }
    });
    res.redirect('/admin/products');
  });
  
  router.get('/add-product', function(req, res, next) {
    res.render('admin/add-product');
  });
  
  router.post('/add-product', function(req, res, next) {
    var title = req.body.title;
    var description = req.body.description;
    var imagePath = req.body.imagePath;
    var price = req.body.price;
    
    var newProduct = new Product({
      title: title,
      description: description,
      imagePath: imagePath,
      price: price
    });
  
    newProduct.save(function(err, res) {
      if(err) {
        console.log(err);
      }
    });
    
    res.redirect('/admin/products');
  });

  function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role) {
      next();
  } else {
      req.session.oldUrl = req.url;
      res.redirect('/');
    }
  }

  module.exports = router;