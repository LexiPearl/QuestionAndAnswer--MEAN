app.controller('loginController', ['$scope', 'userFactory', '$http', '$location', '$cookies', function ($scope, userFactory, $http, $location, $cookies) {
    $scope.newAnswer={}
    $scope.newQuestion={}
    $scope.questions=[]
    userFactory.getQuestions(function(messages){
        $scope.questions=messages
    })
    console.log($cookies)
    var cookieJar=$cookies.getAll();
    $scope.cookies=cookieJar
    console.log(cookieJar)
    $scope.existingUser={}
    $scope.specificUser={}
    $scope.loginUser = function (){
        console.log($scope.existingUser.name + ' is trying to login')
        userFactory.login($scope.existingUser, function(data){
            if (data.data.logged_in){
                console.log("in userFactor.login successful")
                $cookies.put('id', data.data.user._id);
                $cookies.put('name', data.data.user.name);
                $location.url('/dashboard')
            }
        });
    };
    if(!cookieJar.name){
        $location.url('/')
    }
    $scope.addQuestion = function (){
        console.log("you are in the login Controller at AddQuestion!")
        console.log("this is scope new question!",$scope.newQuestion)
        console.log(cookieJar.name)
        var name=cookieJar.name
        console.log("new question.question", $scope.newQuestion.question)
        if (!$scope.newQuestion.question){
            alert('question must be at least 10 characters')
        }
        if ($scope.newQuestion.question.length < 10){
            alert('question must be at least 10 characters')
        }
        else{
        userFactory.newQuestion($scope.newQuestion, name, function(message){
            if (message.created){
                console.log("I AM CONSOLE LOGGING MESSAGE", message)
                console.log( "message specifics", message.message)
                $scope.newQuestion={}
                userFactory.getQuestions(function(messages){
                    $scope.questions=messages
                })
                $location.url('/dashboard')
            }
        })}
    };
    $scope.questionInfo=function(question_id){
        $location.url('/question/'+question_id)
    };
    $scope.questionInfoForAnswer=function(question_id){
        $location.url('/question/'+question_id+'/answer')
    };
    $scope.logout=function(){
        console.log('log me out');
        $cookies.remove('name');
        $cookies.remove('id');
        $location.url('/');
    }
}]);
