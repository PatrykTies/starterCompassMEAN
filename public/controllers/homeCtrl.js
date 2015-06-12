app.controller('homeCtrl', ['Quiz','$scope',function(Quiz, $scope){
		$scope.pageClass = 'page-home';
		$scope.title = 'Wprowadz pytania do Quizu';	


		$scope.quiz = $scope.quiz || Quiz.getData();

		$scope.addItem = function(question, answer){
			if(question && answer){
				$scope.quiz.push({q: $scope.formQ, a:$scope.formA});
				$scope.formQ = '';
				$scope.formA = '';
			}
		};

		$scope.removeLast = function(){
			$scope.quiz.pop();
		};

		$scope.getTotal = function(){
			return $scope.quiz.length;
		};

		$scope.clearList = function(){
			$scope.quiz = [];
		};


	}]);