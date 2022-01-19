var Product = require('../models/product');
var mongoose = require('mongoose');
const { exists } = require('../models/product');
mongoose.connect('mongodb://localhost:27017/shopping');

var products = [
    new Product({
        imagePath: "https://a.allegroimg.com/s512/03389b/c037d6a545fd8826ffd654662415/Kubek-PREZENT-SW-JAN-PAWEL-II-PAPIEZ-Z-POLSKI-JP",
        title: 'Kubek z wizerunkiem św. Jana Pawła II 1',
        description: 'Święta jakość',
        price: 21.37
    }),
    new Product({
        imagePath: "https://a.allegroimg.com/s512/03389b/c037d6a545fd8826ffd654662415/Kubek-PREZENT-SW-JAN-PAWEL-II-PAPIEZ-Z-POLSKI-JP",
        title: 'Kubek z wizerunkiem św. Jana Pawła II 2',
        description: 'Święta jakość',
        price: 21.37
    }),
    new Product({
        imagePath: "https://a.allegroimg.com/s512/03389b/c037d6a545fd8826ffd654662415/Kubek-PREZENT-SW-JAN-PAWEL-II-PAPIEZ-Z-POLSKI-JP",
        title: 'Kubek z wizerunkiem św. Jana Pawła II 3',
        description: 'Święta jakość',
        price: 21.37
    }),
    new Product({
        imagePath: "https://a.allegroimg.com/s512/03389b/c037d6a545fd8826ffd654662415/Kubek-PREZENT-SW-JAN-PAWEL-II-PAPIEZ-Z-POLSKI-JP",
        title: 'Kubek z wizerunkiem św. Jana Pawła II 4',
        description: 'Święta jakość',
        price: 21.37
    })
];

var done = 0;
for(var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done ++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
