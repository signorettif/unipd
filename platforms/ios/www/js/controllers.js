angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $location){
	$scope.mail = "nome.cognome@studenti.unipd.it";
	$scope.password = "password";

	$scope.continue = function(){
		$location.path("/preferences");
	}

	$scope.check = function(){
		var loggedin = window.localStorage['loggedin'];

		if (loggedin == 'true'){
			$scope.continue();
		} else{
			$scope.loggedin = false;
		}
	}

	$scope.signin = function(){
		//invio dati
		window.localStorage['email']=$scope.mail;
		window.localStorage['password']=$scope.password;
		$scope.loggedin = true;
		window.localStorage['loggedin']=$scope.loggedin;
		$scope.continue();
	};

})

.controller('PrefCtrl', function($scope, $location){

	$scope.cards = [
		{
			id: 0,
			title: "sport",
			img: "http://i.imgur.com/gelNDWR.jpg",
			isSel: false
		},
		{
			id: 1,
			title: "cibo",
			img: "http://i.imgur.com/D8T7mre.jpg",
			isSel: false
		},
		{
			id: 2,
			title: "tecnologia",
			img: "http://www.imageurlhost.com/images/2m03bagsqgq7o44292sn.jpg",
			isSel: false
		},
		{
			id: 3,
			title: "Musica",
			img: "http://www.imageurlhost.com/images/18y7ixislew2e7esbxvc.jpeg",
			isSel: false
		},
		{
			id: 4,
			title: "Arte",
			img: "http://i.imgur.com/mIPUbrK.jpg",
			isSel: false
		},
		{
			id: 5,
			title: "politica",
			img: "http://i.imgur.com/B8WpGCk.jpg",
			isSel: false
		}
	];

	$scope.next = function(){
		$location.path("/tab/dashboard");
	}

	$scope.savePreferences = function(){
		window.localStorage['hasPreferences'] = true;
		$scope.next();
	}

	$scope.check = function(){
		var hasPreferences = window.localStorage['hasPreferences'];

		if (hasPreferences == 'true'){
			$scope.next();
		} else{
			$scope.hasPreferences = false;
		}
	}

	$scope.select = function(id){
		$scope.cards[id].isSel= !$scope.cards[id].isSel;
	} 
})

.controller('DashCtrl', function($scope) {})

.controller('CalendarCtrl', function($scope) {})
// .controller('ChatsCtrl', function($scope, Chats) {
// 	// With the new view caching in Ionic, Controllers are only called
// 	// when they are recreated or on app start, instead of every page change.
// 	// To listen for when this page is active (for example, to refresh data),
// 	// listen for the $ionicView.enter event:
// 	//
// 	//$scope.$on('$ionicView.enter', function(e) {
// 	//});
	
// 	$scope.chats = Chats.all();
// 	$scope.remove = function(chat) {
// 		Chats.remove(chat);
// 	}
// })

.controller('EventsCtrl', function($scope, Events,$interval,$ionicLoading){
		$scope.notReady=false;

		$scope.show = function() {
	    $ionicLoading.show({
	      template: '<ion-spinner icon="android" class="spinner-stable"></ion-spinner>'
	    });
	  };
	  $scope.hide = function(){
	    $ionicLoading.hide();
	  };


		$scope.update = function() {
      $scope.show();
      Events.update();
      $scope.notReady = true;
      stop = $interval(function() { 
    		$scope.hide(); $scope.stopTimeout(); }, 1500);
    };
    $scope.stopTimeout = function() {
      $interval.cancel(stop);
    };
    $scope.refresh=function(){
    	if(Events.isReady()&&Events.justNow()){
    		$scope.events=Events.all();
    	}else{
    		return $scope.events;
    	}
    }
		$scope.tabs = [{
						title: 'Lezioni',
						url: ''
				}, {
						title: 'Prossimi eventi',
						url: 'events-progra.html'
				}, {
						title: 'Inviti',
						url: 'events-friend.html',
						hasNotification: true
				}
		];

		$scope.currentTab = 'events-progra.html';

		$scope.onClickTab = function (tab) {
				$scope.currentTab = tab.url;
		}
		$scope.isActiveTab = function(tabUrl) {
				return tabUrl == $scope.currentTab;
		}

		$scope.events = Events.all();
})

.controller('EventDetailCtrl', function($scope, $stateParams, Events) {
	$scope.eventObj = Events.get($stateParams.eventId);
})

.controller('EventDetailCtrl', function($scope, $stateParams, Events, $ionicActionSheet, $ionicPopup) {
	$scope.eventObj = Events.get($stateParams.eventId);
 		
 		$scope.show = function() {
			var hideSheet = $ionicActionSheet.show({
	     		buttons: [
			       { text: 'Invita un amico' },
			       { text: 'Condividi' }
			     ],
			    cancelText: 'Cancella',
			    cancel: function() {},
			    buttonClicked: function(index) {
			      switch(index){
			      	case 0:
			      		$scope.showAlert({
			      			title:"Inviato!",
			      			template:'<center>Invito inoltrato a Gigi</center>',
			      			buttons: [{
								    text: 'Ok',
								    type: 'button-assertive'
								  }]
								});
			      	break;
			      	case 1:
			      		$scope.showAlert({
			      			title:"Condiviso!",
			      			template:'<center>Evento condiviso in bacheca</center>',
			      			buttons: [{
								    text: 'Ok',
								    type: 'button-assertive'
								  }]
								});
			      	break;
			      }
			      return true;
			    }
			});
		};
		$scope.showAlert = function(input) {
		  var alertPopup = $ionicPopup.alert(input);
		};
})

.controller('AccountCtrl', function($scope, $ionicHistory, $location) {
	$scope.MyGoBack = function(){
		$ionicHistory.goBack();
	}

	$scope.notify = function(){
		var t = new Date();
		t.setSeconds(t.getSeconds() + 10);
		cordova.plugins.notification.local.schedule({
		    id: 1,
		    text: "La lezione di Biologia di oggi è stata annullata.",
		    at: t,
		    sound: 'file://sound.caf',
		    data: {}
		});
	}

	$scope.logOut = function(){
		window.localStorage.clear();
		$ionicHistory.clearCache();
		$location.path("/intro");	
		window.location.reload();
	}
});