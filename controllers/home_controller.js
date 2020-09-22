// Structure
// module.exports.actionName = function(req,res){Required Tasks Are Written Here};

const User = require('../models/user');

module.exports.home = function(req,res){
    return res.render('home', {
        title : "nested | Home"
    });
};