app.factory('userFactory', ['$http', function($http){
    var users= [];
    var factory = {};
    factory.login = function(user, callback){
        console.log('user in the factory', user);
        $http.post('/login', user).then(function(response){
            console.log("response from login", response)
            callback(response)
        })
    };
    factory.newQuestion = function(question, name, callback){
        console.log('I am adding a question', question);
        console.log("this is the name for the question", name);
        var quest=question.question
        var description=question.description
        var newQuestion={question:quest, name:name, description:description}
        console.log(newQuestion)
        $http.post('/newQuestion', newQuestion).then(function(response){
            console.log("newQuestion route worked")
            var message=response.data
            console.log("this is response.data from newQuestion", message)
            callback(message)
        })
    };
    factory.newAnswer = function(question_id, newAnswer, name, callback){
        console.log('I am adding an answer', newAnswer);
        var answer=newAnswer.answer
        var details=newAnswer.details
        var newAnswer={
            answer:answer,
            name:name,
            details:details,
            question_id:question_id}
        $http.post('/newAnswer', newAnswer).then(function(response){
            console.log("addAnswer route worked")
            var message=response.data
            console.log("this is response.data from newAnswer", message)
            callback(message)
        })
    };
    factory.addLike = function(question_id, answer_id, callback){
        console.log("I am adding a like")
        var like={question_id:question_id, answer_id:answer_id}
        $http.post('/answer/like', like).then(function(response){
            console.log("answer/id/like route worked")
            var message=response.data
            console.log("This is response.data from addLike", message)
            callback(message)
        })
    };
    factory.getQuestions = function (callback){
        $http.get('/dashboard').then(function(response){
            console.log("factory get messages response", response);
        var messages=response.data
        console.log("response.data", messages)
        callback(messages);
        console.log("callback messages", messages)
    })};
    factory.questionInfo = function(id, callback){
        console.log("this is the question id", id);
        $http.get('/question/'+id+'/newAnswer').then(function(response){
            console.log("questionInfo route worked")
            var message=response.data
            console.log("this is response.data from questionInfo", message)
            callback(message)
        })
    }
    return factory
}]);
