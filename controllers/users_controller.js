module.exports.users = function(req,res){
    return res.render('users', {
        title : "Users"
    });
}

module.exports.profile = function(req,res){
    return res.render('profile', {
        title : "Profile"
    });
}

module.exports.posts = function(req,res){
    return res.render('posts', {
        title : "Posts"
    });
}