var database = firebase.database()

var user = undefined
var player = 'player'
currentPlayer = ''
var count = 1
var numPlayers = 0

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

// firebase.database().ref().on('child_added', function(childSnapshot, prevChildKey) {
// 	console.log(childSnapshot.val())
// 	//console.log(childSnapshot.val().name)
// 	console.log(childSnapshot.child('player1').exists())
// 	console.log(childSnapshot.child('player1').val())
// })

// ============ LOGS HOW MANY PLAYERS THERE ARE ============
firebase.database().ref().on('value', function(childSnapshot, prevChildKey) {
	console.log('Number of players in database: ' + childSnapshot.child('players').numChildren())
	numPlayers = childSnapshot.child('players').numChildren()
})

// ============ LOGS VALUES OF PLAYER INPUTS ============
firebase.database().ref('players').on('child_added', function(childSnapshot, prevChildKey) {
	console.log(childSnapshot.val())
	console.log(childSnapshot.val().name)
})


$(document).ready(function() {
	$('.input').prop('disabled', true)

	if (numPlayers >= 2) {
		$('#addUser').prop('disabled', true)
	}


	$('#addUser').on('click', function(event) {
		user = $('#userName').val()
		console.log('User is: ' + user)
		$('#userName').val('')

		currentPlayer = player.concat(count)
		count++

		database.ref('players/' + currentPlayer).update({
			"name": user,
			"wins": 0,
			"loses": 0
		})
	})


	$('.input').on('click', function(event) {
		var input = $(event.target).html()
		console.log(input)
	})
})