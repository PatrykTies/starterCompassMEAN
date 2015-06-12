
app.controller('playCtrl', ['Quiz','$scope','$timeout', function(Quiz, $scope, $timeout){
	$scope.pageClass = 'page-play';

	$scope.title = 'Play';
	$scope.quiz = $scope.quiz || Quiz.getData();

	$scope.counter = $scope.counter || 0;

	$scope.getTotal = function(){
			return $scope.quiz.length;
		};

	$scope.incrementCounter = function(){
		if($scope.counter === $scope.getTotal()-1){
			$scope.counter = 0;
		}else{
			$scope.counter += 1;
		}	
	};
    
	// clear input for next question
    $scope.clearAnswer = function() {
        $scope.userAnswer = '';
    };

	$scope.nextQuestion = function(){
		$timeout(function(){
	        $scope.flipClass = '';
	    }, 500);
		$scope.incrementCounter();
		$scope.clearAnswer();
	};
	$scope.isCorrect = function(inputedValue){
		return inputedValue === this.quiz[this.counter].a ? true : false;
	};
	$scope.$watch('userAnswer', function(inputedValue){
		if($scope.isCorrect(inputedValue)){
			$scope.flipClass = 'flip-add'; //THIS MAKES IT TO FLY OUT FROM SCREEN
			$scope.nextQuestion();
		}
		
	});
}]);