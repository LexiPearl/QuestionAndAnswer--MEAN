
var mongoose = require('mongoose');

var AnswerSchema= new mongoose.Schema({
    answer:String,
    name:String,
    details:String,
    likes:{type:Number, default:0},
      }, {timestamps:true });

var QuestionSchema= new mongoose.Schema({
    question: String,
    name: String,
    description:String,
    answer: [AnswerSchema],
        },{timestamps:true});

mongoose.model('Question', QuestionSchema)
mongoose.model('Answer', AnswerSchema)
