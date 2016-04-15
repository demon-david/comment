var app = angular.module('easycomment', []);
app.controller('easycomment', function($scope) {
	$scope.willComment = false;
	$scope.userName = '';
	$scope.postcomment = '';
	$scope.userLike = {
		LikeAmount: 0
	};
	var date = new Date();
	$scope.comments = [];
	var allcomments = JSON.parse(localStorage.getItem('comments')) || {};

	function getAllComments() {
		for (var commentTime in allcomments) {
			if (allcomments.hasOwnProperty(commentTime)) {
				date.setTime(commentTime);
				var dateStr = date.toGMTString();
				$scope.comments.push({
					'time': dateStr,
					'userName': allcomments[commentTime].userName,
					'comment': allcomments[commentTime].comment
				});
			}
		};
	}
	getAllComments();
	$scope.Cancel = function() {
		$scope.willComment = false;
		$scope.userName = '';
		$scope.postcomment = '';
	};
	$scope.Post = function() {
		var time = new Date().getTime();
		allcomments[time] = {
			'userName': $scope.userName == '' ? '匿名用户' : $scope.userName,
			'comment': $scope.postcomment,
		};
		date.setTime(time);
		$scope.comments.push({
			'time': date.toGMTString(),
			'userName': allcomments[time].userName,
			'comment': allcomments[time].comment
		});
		localStorage.setItem('comments', JSON.stringify(allcomments));
		$scope.willComment = false;
	};
	$scope.Comment = function() {
		$scope.willComment = !$scope.willComment;
		$scope.userName = '';
		$scope.postcomment = '';
	};
});
app.directive('like', function() {
	var direction = {};
	direction.restrict = 'AE';
	direction.template = "<a ng-click='Like()' class='likeit'>赞</a>";
	direction.scope = {
		content: '='
	};
	direction.link = function($scope, element) {
		$scope.Like = function() {
			$scope.content.LikeAmount = $scope.content.LikeAmount + 1;
		}
	};
	return direction;
});