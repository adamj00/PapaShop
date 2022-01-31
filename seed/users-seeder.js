var User = require('../models/user');
var mongoose = require('mongoose');
const { exists } = require('../models/user');
mongoose.connect('mongodb://localhost:27017/shopping');

var users = [
    new User({
        email: 'admin@admin.com',
        password: 'admin',
        role: true
    })
];

var done = 0;
for(var i = 0; i < users.length; i++) {
    users[i].save(function(err, result) {
        done ++;
        if (done === users.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
