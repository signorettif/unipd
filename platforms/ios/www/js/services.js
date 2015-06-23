angular.module('starter.services', [])

.factory('People', function(){
	var people = [{

	}];

	return people;
})

.factory('Events', function(People,$http) {
	// Might use a resource here that returns a JSON array
	// Some fake testing data
	var events = [];
	var ready = true;
	var just_now = false;
	return {
		update: function(){
			ready=false;
			$http.get('http://www.universogioco.com/test.php?function=getallevents')
			.success(function(data){
				if(typeof data !== 'undefined'){
					events=data;
				}else{
					events=[{
						eventId: 0,
						date: "21/06/2015",
						time: "16",
						name: 'H-ACK Unipd',
						image: "",
						location: "",
						people: [11, 4, 1]
					}, 
					{
						eventId: 1,
						date: "22/06/2015",
						name: 'Incontro sulle startups',
						image: "",
						location: "",
						people: [5, 9, 78, 4, 60]
					},
					{
						eventId: 2,
						date: "23/06/2015",
						name: 'Mostra d\'arte',
						image: "",
						location: "",
						people: [7]
					}];
					console.log('error');
				} 
				ready=true;
				just_now=true;

			});
		},
		all: function() {
			just_now=false;
			return events;
		},
		allByFriend: function(friendsId) {
			var FriendEvents=[];
			for (var i = 0; i < friendsId.length; i++) {		
				for (var i = 0; i < events.length; i++) {
					if (events[i].friendId === parseInt(friendId)) {
						
					}
				}
			}
			return FriendEvents;
		},
		remove: function(event) {
			events.splice(events.indexOf(event), 1);
		},
		get: function(eventId) {
			eventId = eventId - 1;
			if (events[eventId]) {
				return events[eventId];
			}else{
				console.log('Evento non trovato!')
			}
			return null;
		},
		isReady: function(){
			return ready;
		},
		justNow: function(){
			return just_now;
		}
	};
});