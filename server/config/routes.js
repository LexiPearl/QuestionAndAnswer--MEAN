
var users= require('../controllers/users.js')
var questions=require('../controllers/questions.js')
var answers=require('../controllers/questions.js')

module.exports=function(app){
    app.post('/login', function(req,res){
        console.log(req.body)
        users.login(req,res)
    });
    app.get('/dashboard', function(req,res){
        questions.dashboard(req,res)
    });
    app.post('/newQuestion', function(req, res){
        console.log("this is the req.body from newQuestion", req.body)
        questions.newQuestion(req,res)
    });
    app.get('/question/:id', function(req, res){
        console.log("this is the req.body from question/id", req.body)
        questions.showQuestion(req,res)
    });
    app.get('/question/:id/newAnswer', function(req, res){
        console.log("this is the req.body from question/id/answer", req.body)
        questions.showQuestion(req,res)
    });
    app.post('/newAnswer', function(req, res){
        console.log("this is the req.body from newAnswer", req.body)
        questions.newAnswer(req,res)
    });
    app.post('/answer/like', function(req,res){
        console.log("you are at answer like in routes", req.body)
        questions.like(req,res)
    });
}
