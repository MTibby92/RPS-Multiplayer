//global variables
var database = firebase.database()

var player1Boolean = false
var player2Boolean = false

var player1SelectionDatabase = null
var player2SelectionDatabase = null

function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log('a user has signed in')
            var isAnonymous = user.isAnonymous
            var uid = user.uid
            user.updateProfile({
				displayName: "Test User"
			})

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
		$('.input').prop('disabled', false)
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
	}
	// getInput: function(event) {
	// 	var input = $(event.target).val()
	// 	console.log(input)
	// },
}



// At the initial load, this runs everytime the database updates
firebase.database().ref().on('value', function(snapshot) {
	console.log('In database check, player1Present is ' + snapshot.child('player1Present').val())
	console.log('In database check, player2Present is ' + snapshot.child('player2Present').val())

	player1Boolean = snapshot.child('player1Present').val()
	player2Boolean = snapshot.child('player2Present').val()

	player1SelectionDatabase = snapshot.child('player1Selection').val()
	player1SelectionDatabase = snapshot.child('player2Selection').val()

	console.log('In database check, player1SelectionDatabase is ' + player1SelectionDatabase)
	console.log('In database check, player2SelectionDatabase is ' + player2SelectionDatabase)

	//============= CHECKS IF BOTH PLAYERS SIGNED IN =============================
	if (snapshot.child("player1Present").val() == true && snapshot.child("player2Present").val() == true) {
		console.log('Game ready to be played!')
		$('.input').prop('disabled', false)

		// // =============START CLICK FUNCTION =============
		// $('.input').on('click', function(event) {
		// 	var input = $(event.target).html()
		// 	console.log(input)

			// ============= SAVES PLAYER 1 SELECTION =============
			if (!snapshot.child('player1Selection').exists()) {
				console.log('Updating player1Selection to input because it has no value yet')
				database.ref().update({
					"player1Selection": input
				})

			// ============= SAVES PLAYER 2 SELECTION IF PLAYER 1 HAS SELECTED =============
			} else if (snapshot.child('player1Selection').exists() && !snapshot.child('player2Selection').exists()) {
				console.log('Updating player2Selection to input because it has no value yet but selection 1 does')
				database.ref().update({
					"player2Selection": input
				})

			// ============= BOTH PLAYERS HAVE SAVED SELECTIONS =============
			} else {
				console.log('Both players have made their selection and stored it in the database')
			}
		//})

	// ============= CHECKS IF ONE PLAYER SIGNED IN =============
	} else if (snapshot.child("player1Present").val() == true && snapshot.child('player2Present').val() == false) {
		console.log('Waiting on player 2')

	// ============= NO PLAYERS SIGNED IN =============
	} else {
		console.log('Waiting on 2 players to join')
	}
})


firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
			console.log('Player1Boolean is ' + player1Boolean)
			console.log('Player2Boolean is ' + player2Boolean)

            // User is signed in.
            var isAnonymous = user.isAnonymous
            var uid = user.uid
            if (player1Boolean && player2Boolean) {
            	console.log('Sorry, already two players! (Condition 1)')
            } else if (player1Boolean && !player2Boolean) {
            	console.log('Condition 2 met')
            	database.ref().update({
            		"player2Present": true
            	})
            } else if (!player1Boolean && !player2Boolean) {
            	console.log('Condition 3 met')
            	database.ref().update({
            		"player1Present": true
            	})
            } else {
            	console.log('Somehow none of the proper conditions were met')
            }
		} else {
			console.log('user is not signed in')
		}
})

window.onload = function() {
    initApp()
 }

$(document).ready(function() {
	$('.input').prop('disabled', true)
	$('.input').on('click', function(event) {
		var input = $(event.target).html()
		console.log(input)
		
		if (player1SelectionDatabase == null && player2SelectionDatabase == null) {
			console.log('ON CLICK FUNCTION: Player 1 choice not saved; saving player 1')
			player1SelectionDatabase = input
		} else if (player1SelectionDatabase != null && player2SelectionDatabase == null) {
			console.log('ON CLICK FUNCTION: Player 1 choice saved, not player 2; saving player 2')
			player2SelectionDatabase = input
		} else if (player1SelectionDatabase != null && player2SelectionDatabase != null) {
			console.log('ON CLICK FUNCTION: Both selections have been saved to the database; did not write selection')
		}
	})
	// $('#signIn').on('click', function(event) {})  
});