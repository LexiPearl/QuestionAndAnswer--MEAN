app.controller('questionController', ['$scope', 'userFactory', '$http', '$location', '$cookies', '$routeParams', '$route', function ($scope, userFactory, $http, $location, $cookies, $routeParams, $route) {
    $scope.questionInfo={}
    var cookieJar=$cookies.getAll();
    console.log("you are in the question Controller at questionInfo!")
    console.log("these are the route params", $routeParams.id)
    $scope.questionInfo1=function(){userFactory.questionInfo($routeParams.id, function(messages){
        if (messages){
            console.log("I AM CONSOLE LOGGING MESSAGE", messages)
            console.log( "question specifics", messages)
            console.log(messages[0])
            $scope.questionInfo=messages[0]
            console.log("this is scope.questionInfo", $scope.questionInfo)
        }
    })};
    if(!cookieJar.name){
        $location.url('/')
    }
    $scope.questionInfo1();
    $scope.addLike=function(answer_id){
        console.log("you are in the question Controller at addLike")
        console.log("this is scope.questionInfo",$scope.questionInfo)
        var question_id=$scope.questionInfo._id
        userFactory.addLike(question_id, answer_id, function(message){
            if(message.created){
                console.log("I am console logging message in addLike", message)
                $scope.questionInfo1();
            }
            else{
                console.log("addLike route worked in questionController")
                $route.reload();
            }
        })
    };
    $scope.addAnswer = function (question_id){
        console.log("you are in the question Controller at AddAnswer!")
        console.log("this is the question_id", question_id)
        console.log("this is scope new answer!",$scope.newAnswer)
        console.log("this is the name", cookieJar.name)
        var name=cookieJar.name
        if (!$scope.newAnswer.answer){
            alert('question must be at least 5 characters')
        }
        if ($scope.newAnswer.answer.length < 5){
            alert('question must be at least 5 characters')
        }
        else{userFactory.newAnswer(question_id, $scope.newAnswer, name, function(message){
            if (message.created){
                console.log("I AM CONSOLE LOGGING MESSAGE", message)
                console.log( "message specifics", message.message)
                $scope.newAnswer={}
                userFactory.getQuestions(function(messages){
                    $scope.messages=messages
                })
                $location.url('/dashboard')
            }
            else{
                $location.url('/question'+question_id)
            }
        })}
    };

    $scope.logout=function(){
        console.log('log me out');
        $cookies.remove('id');
        $cookies.remove('name');
        $cookies.remove('username');
        $location.url('/3');
    }
}]);
