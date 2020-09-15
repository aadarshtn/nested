// Structure
// module.exports.actionName = function(req,res){Required Tasks Are Written Here};


module.exports.home = function(req,res){
    return res.render('home', {
        title : "Home"
    });
};