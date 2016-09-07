//global variables
var database = firebase.database()
// database.set({
// 	playerList: [],

// })

function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var isAnonymous = user.isAnonymous
            var uid = user.uid
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            $('#signIn').html('Sign out')
            document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            // [END_EXCLUDE]
        } else {
            // User is signed out.
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            $('#signIn').html('Sign in')
            document.getElementById('quickstart-account-details').textContent = 'null';
            // [END_EXCLUDE]
        }
        // [START_EXCLUDE]
        document.getElementById('signIn').disabled = false;
        // [END_EXCLUDE]
    });
      // [END authstatelistener]
      document.getElementById('signIn').addEventListener('click', toggleSignIn, false);
}

function toggleSignIn() {
	if (firebase.auth().currentUser) {
		// [START signout]
		firebase.auth().signOut();
		// [END signout]
	} else {
		// [START authanon]
		firebase.auth().signInAnonymously().catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// [START_EXCLUDE]
			if (errorCode === 'auth/operation-not-allowed') {
				alert('You must enable Anonymous auth in the Firebase Console.');
			} else {
				console.error(error);
			}
			// [END_EXCLUDE]
		});
		// [END authanon]
	}
	document.getElementById('signIn').disabled = true;
}

//game object
var game = {
	player1Choice: undefined,
	player2Choice: undefined,
	player1Win: false,
	player2Win: false,
	wins: 0,
	losses: 0,
	ties: 0,
	checkWhoWon: function(player1, player2) {
		if (player2 == "r"){
			if (player1 == "r"){
				ties = ties + 1
				alert("You tied!")

			}else if (player1 == "p"){
				wins = wins +1
				alert("You won!")

			}else if (player1 == "s"){
				loses = loses + 1
				alert("You lost!")

			}
		}else if (player2 == "p"){
			if (player1 == "r"){
				loses = loses + 1
				alert("You lost!")

			}else if (player1 == "p"){
				ties = ties + 1
				alert("You tied!")

			}else if (player1 == "s"){
				wins = wins + 1
				alert("You won!")

			}
		}else if (player2 == "s" ){
			if (player1 == "r"){
				wins = wins + 1
				alert("You won!")

			}else if (player1 == "p"){
				loses = loses + 1
				alert("You lost!")

			}else if (player1 == "s"){
				ties = ties + 1
				alert("You tied!")

			}
		}
	},
	getInput: function(event) {
		var input = $(event.target).val()
	},
}


window.onload = function() {
    initApp()
 }

$(document).ready(function() {
	$('.input').on('click', game.getInput(event))
	$('#signIn').on('click', function(event) {

	})  
})