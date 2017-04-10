var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');

module.exports={
    newQuestion: function(req, res){
        console.log("at questions.js new question", req.body)
        var question=req.body.question
            console.log("this is req body question", question)
        var description=req.body.description
        var name=req.body.name
        var newQuestion=new Question({question:question, name:name, description:description})
            console.log("this is the new question", newQuestion)
        var question=newQuestion
        question.save(function(err){
            if(err){
                console.log('something went wrong')
                console.log(err)
                res.json(err)
            }
            else{
                console.log('successfully added a new question')
                    res.json({created:true, question:question})
            }
            })
        },
    newAnswer: function(req, res){
         console.log("at questions.js new answer", req.body)
         var answer=req.body.answer
         console.log("this is req.body.answer", answer)
         var name=req.body.name
         var details=req.body.details
         console.log("this is the req.body.question id", req.body.question_id)
         var question_id=req.body.question_id
         Question.findOne({_id:question_id}, function(err, question){
             var newAnswer={answer:answer, name:name, details:details}
             console.log("this is the newAnswer", newAnswer);
             console.log("question before", question)
             question.answer.push(newAnswer)
             question.save(function(err){
                if(err){
                    console.log('something went wrong')
                    console.log(err)
                    res.json(err)
                }
                else{
                    console.log('successfully added a new answer')
                    res.json({created:true, question:question})
                }
             })
         })
       },
        dashboard: function(req,res){
          Question.find({}).exec(function(err, questions){
              if(err){
                  console.log('something went wrong')
              }
              else{
                 res.json(questions)
          }})
    },
        like: function(req,res){
            console.log("at questions.js like", req.body)
            console.log("this is req question id", req.body.question_id)
            console.log("this is req answer id", req.body.answer_id)
            Question.findOne({_id: req.body.question_id}, function(err, answer){
                console.log("this is answer", answer);
                console.log("This is answer.answer", answer.answer)
                for(var i=0; i<answer.answer.length; i++){
                    if(answer.answer[i]._id==req.body.answer_id){
                        answer.answer[i].likes += 1;
                        answer.save(function(err){
                            if(err){
                                console.log("something went wrong")
                                console.log(err)
                                res.json(err)
                            }
                            else{
                                console.log('successfully added a like')
                                res.json({created:true, answer:answer})
                            }})
                    }
                }
                // console.log("this is answer",answer)
                // if(err){
                //     console.log('something went wrong')
                // }
                // else{
                //     answer.likes += 1;
                //     answer.save(function(err){
                //         if(err){
                //             console.log("something went wrong")
                //             console.log(err)
                //             res.json(err)
                //         }
                //         else{
                //             console.log('successfully added a like')
                //             res.json({created:true, answer:answer})
                //         }})
                //     res.json(answer)
                // }
            })
        },
        showQuestion: function(req,res){
            console.log("at topics.js showAnswer", req.body)
            console.log("this is req params id",req.params.id)
            Question.find({_id:req.params.id}, function(err, questions){
              if(err){
                  console.log('something went wrong')
              }
              else{
                 res.json(questions)
          }})
    },
        showAnswer: function (req, res){
            console.log("at questions.js showAnswer", req.body)
            console.log("this is req params id", req.params.id)
            Answer.find({_question: req.params.id}).sort([['likes', 'descending']]).populate('_user _question').exec(function(err, answers){
                if(err){
                    console.log('something went wrong')
                }
                else{
                    res.json(answers)
                }
            })
        },
}
