// Structure
// module.exports.actionName = function(req,res){Required Tasks Are Written Here};
const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err,posts){
    //     return res.render('home', {
    //         title : "nested | Home",
    //         posts: posts
    //     });
    // });

    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        let users = await User.find({});
        return res.render('home', {
            title: "nested | Home",
            posts:  posts,
            all_users: users,
        }); 
    }catch(err){
        console.log('Error', err);
        return;
    }

}