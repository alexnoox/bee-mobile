angular.module(_CONTROLLERS_).controller('index', function($scope, $ionicModal, $ionicSideMenuDelegate, $location, oauth2Token, oauth2Caller) {
	console.log('### index controller in');

	// Search action
	$scope.search = function() {

	}

	// Create and load the login modal
	$ionicModal.fromTemplateUrl('views/app/app-login.html', function(modal) {
		$scope.loginModal = modal;
	}, {
		scope: $scope,
		animation: 'slide-in-up',
		focusFirstInput: true
	});

	// Event action used when login is required from server
	$scope.$on('event:auth-loginRequired', function(e) {
		console.log('### index controller : Received event:auth-loginRequired event.');
		openLoginModal();
	});

	// Event action used when login is confirmed from server
	$scope.$on('event:auth-loginConfirmed', function(e) {
		console.log('### index controller : Received event:auth-loginConfirmed event.');
		closeLoginModal();
	});

	// Event action used when an error is received from server
	$scope.$on('event:auth-errorReceived', function(e, error) {
		console.log('### index controller : Received event:auth-errorReceived event. (error: ' + JSON.stringify(error) + ')');
		$scope.message = error.error_description;
		if (error.code === 401) {
			oauth2Caller.tryRefreshToken()
		}
	});

	openLoginModal = function() {
		$scope.message = '';
		$scope.loginModal.show();
	}

	closeLoginModal = function() {
		$scope.loginModal.hide();
		$scope.message = '';
	}

	$scope.logout = function() {
		oauth2Token.logout();
	}

	// Cleanup the modal by removing it from the DOM
	$scope.$on('$destroy', function() {
		$scope.loginModal.remove();
	});

	$scope.toggleLeftSideMenu = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

	$scope.goTo = function(page) {
		console.log('Going to ' + page);
		$ionicSideMenuDelegate.toggleLeft();
		$location.url('/' + page);
	};

	console.log('### index controller out');
});
