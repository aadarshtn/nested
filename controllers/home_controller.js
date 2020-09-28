// Structure
// module.exports.actionName = function(req,res){Required Tasks Are Written Here};
const Post = require('../models/post');

module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err,posts){
    //     return res.render('home', {
    //         title : "nested | Home",
    //         posts: posts
    //     });
    // });

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        return res.render('home', {
            title: "nested | Home",
            posts:  posts
        });
    })    
}