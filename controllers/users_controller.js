const e = require('express');
const User = require('../models/user');

module.exports.users = function(req,res){
    return res.render('./users', {
        title : "Users"
    });
}

module.exports.profile = function(req,res){

    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('profile', {
                    title : "User Profile",
                    user : user
                });
            }
            return res.redirect('/login');
        });
    }else{
        return res.redirect('/login');
    }

}

module.exports.endSession = function(req,res){
    if(req.cookies.user_id){
        res.cookie('user_id', 0);
        console.log(req.cookies.user_id);
        return res.redirect('profile');
    }
    
}

module.exports.posts = function(req,res){
    return res.render('./posts', {
        title : "Posts"
    });
}