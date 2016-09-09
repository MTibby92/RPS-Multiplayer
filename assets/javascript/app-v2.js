var database = firebase.database()

var user = undefined
var player = 'player'
currentPlayer = ''
var count = 1
var numPlayers = 0
var input = undefined
var firstPlayer = undefined
var secondPlayer = undefined

var yourPlayer = undefined

function checkWhoWon(player1, player2) {
	if (player2 == "Rock"){
		if (player1 == "Rock"){
			ties = ties + 1
			alert("You tied!")

		}else if (player1 == "Paper"){
			wins = wins +1
			alert("You won!")

		}else if (player1 == "Scissors"){
			loses = loses + 1
			alert("You lost!")

		}
	}else if (player2 == "Paper"){
		if (player1 == "Rock"){
			loses = loses + 1
			alert("You lost!")

		}else if (player1 == "Paper"){
			ties = ties + 1
			alert("You tied!")

		}else if (player1 == "Scissors"){
			wins = wins + 1
			alert("You won!")

		}
	}else if (player2 == "Scissors" ){
		if (player1 == "Rock"){
			wins = wins + 1
			alert("You won!")

		}else if (player1 == "Paper"){
			loses = loses + 1
			alert("You lost!")

		}else if (player1 == "Scissors"){
			ties = ties + 1
			alert("You tied!")

		}
	}
}



// ============ LOGS HOW MANY PLAYERS THERE ARE ============
firebase.database().ref().on('value', function(childSnapshot, prevChildKey) {
	console.log('Number of players in database: ' + childSnapshot.child('players').numChildren())
	numPlayers = childSnapshot.child('players').numChildren()
	console.log('The value of numPlayers is: ' + numPlayers)

	if (childSnapshot.child('players/player1').exists()) {
		firstPlayer = childSnapshot.child('players/player1').val().name
		console.log('The firstPlayer is ' + firstPlayer)
		$('#player1Name').html(firstPlayer)
	}
	if (childSnapshot.child('players/player2').exists()) {
		secondPlayer = childSnapshot.child('players/player2').val().name
		console.log('The secondPlayer is ' + secondPlayer)
		$('#player2Name').html(secondPlayer)
	}


	if (childSnapshot.child('players/player1').exists() && childSnapshot.child('players/player2').exists()) {
		yourPlayer = 'player2'
	} else if (childSnapshot.child('players/player1').exists() && !childSnapshot.child('players/player2').exists()) {
		yourPlayer = 'player1'
		currentPlayer = 'player2'
	} else {
		currentPlayer = 'player1'
	}


})

// ============ LOGS VALUES OF PLAYER INPUTS ============
firebase.database().ref('players').on('child_added', function(childSnapshot, prevChildKey) {
	console.log(childSnapshot.val())
	console.log(childSnapshot.val().name)
})


$(document).ready(function() {
	$('.input').prop('disabled', true)

	
	$('#addUser').on('click', function(event) {
		if (yourPlayer != undefined) {
			$('#addUser').prop('disabled', true)
			$('.input').prop('disabled', false)
		}

		user = $('#userName').val().trim()
		console.log('User is: ' + user)
		$('#userName').val('')

		if (user != '') {
			// currentPlayer = yourPlayer
			

			database.ref('players/' + currentPlayer).update({
				"name": user,
				"wins": 0,
				"loses": 0
			})
		} else {
			console.log('User did not enter a value for name, please try again. Please a jquery function here later')
		}

		
	})


	$('.input').on('click', function(event) {
		input = $(event.target).html()
		console.log(input)
	})
})