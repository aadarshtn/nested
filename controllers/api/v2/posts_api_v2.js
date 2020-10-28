module.exports.index = function(req,res){
    return res.json(200, {
        message: "Posts List V2",
        test: 'test data'
    })
}