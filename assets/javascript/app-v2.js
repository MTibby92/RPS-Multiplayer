var database = firebase.database()

var user = undefined
var player = 'player'
currentPlayer = undefined // localStorage.getItem('currentPlayer')
var count = 1
var numPlayers = 0
var input = undefined
var firstPlayer = undefined
var secondPlayer = undefined

var yourPlayer = undefined

function checkWhoWon(player1, player2) {
	if (player2 == "Rock"){
		if (player1 == "Rock"){
			return('Tie')

		}else if (player1 == "Paper"){
			return('Win')

		}else if (player1 == "Scissors"){
			return('Lose')

		}
	}else if (player2 == "Paper"){
		if (player1 == "Rock"){
			return('Lose')

		}else if (player1 == "Paper"){
			return('Tie')

		}else if (player1 == "Scissors"){
			return('Win')

		}
	}else if (player2 == "Scissors" ){
		if (player1 == "Rock"){
			return('Win')

		}else if (player1 == "Paper"){
			return('Lose')

		}else if (player1 == "Scissors"){
			return('Tie')

		}
	}
}



// ============ LOGS HOW MANY PLAYERS THERE ARE ============
firebase.database().ref().on('value', function(childSnapshot, prevChildKey) {
	console.log('Number of players in database: ' + childSnapshot.child('players').numChildren())
	numPlayers = childSnapshot.child('players').numChildren()
	console.log('The value of numPlayers is: ' + numPlayers)


	// BETTER WAY TO ASSIGN CURRENT PLAYER 
	if (childSnapshot.child('players/player1').exists() && !childSnapshot.child('players/player2').exists() && currentPlayer == undefined) {
		localStorage.setItem('currentPlayer', 'player2')
		currentPlayer = localStorage.getItem('currentPlayer')
	} else if (!childSnapshot.child('players/player1').exists() && childSnapshot.child('players/player2').exists() && currentPlayer == undefined) {
		localStorage.setItem('currentPlayer', 'player1')
		currentPlayer = localStorage.getItem('currentPlayer')
	} 

	// DISPLAYS THE USER NAMES ON THE PAGE
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

	// FOR THE CASE OF PLAYERS LEAVING, RESETTING DISPLAYS TO INITIAL
	if (!childSnapshot.child('players/player1/wins').exists()) {
		$('#win1').html('0')
		$('#lose1').html('0')
		$('#player1Name').html('Waiting for an Opponent')
	} else {
		$('#win1').html(childSnapshot.child('players/player1/wins').val())
		$('#lose1').html(childSnapshot.child('players/player1/loses').val())
	}
	if (!childSnapshot.child('players/player2/wins').exists()) {
		$('#win2').html('0')
		$('#lose2').html('0')
		$('#player2Name').html('Waiting for an Opponent')
	} else {
		$('#win2').html(childSnapshot.child('players/player2/wins').val())
		$('#lose2').html(childSnapshot.child('players/player2/loses').val())
	}

	// HANDLES BUTTON DISABLING AND DYNAMIC HTML TEXT
	if (childSnapshot.child('players/player1/choice').exists()) {
		$('#player1Chosen p').html('Choice Made')
		$('.1').prop('disabled', true)
	} else if (!childSnapshot.child('players/player1/choice').exists() && currentPlayer == 'player1') {
		$('#player1Chosen p').html('Waiting')
		$('.1').prop('disabled', false)
		$('.2').prop('disabled', true)
	} else {
		$('#player1Chosen p').html('Waiting')
	}
	if (childSnapshot.child('players/player2/choice').exists()) {
		$('#player2Chosen p').html('Choice Made')
		$('.2').prop('disabled', true)
	} else if (!childSnapshot.child('players/player2/choice').exists() && currentPlayer == 'player2') {
		$('#player2Chosen p').html('Waiting')
		$('.2').prop('disabled', false)
		$('.1').prop('disabled', true)
	} else {
		$('#player2Chosen p').html('Waiting')
	}


	// DETECTS WHEN BOTH USERS HAVE SUBMITTED CHOICES AND DECIDES WINNER AND WRITES DYNAMIC HTML APPROPRIATELY
	if (childSnapshot.child('players/player1/choice').exists() && childSnapshot.child('players/player2/choice').exists()) {

		var choice1 = childSnapshot.child('players/player1/choice').val()
		var choice2 = childSnapshot.child('players/player2/choice').val()

		if (choice1 != undefined && choice2 != undefined) {
			database.ref('players/player1/choice').remove()
			database.ref('players/player2/choice').remove()
		}

		var name1 = childSnapshot.child('players/player1/name').val()
		var name2 = childSnapshot.child('players/player2/name').val()

		var wins1 = childSnapshot.child('players/player1/wins').val()
		var wins2 = childSnapshot.child('players/player2/wins').val()

		var loses1 = childSnapshot.child('players/player1/loses').val()
		var loses2 = childSnapshot.child('players/player2/loses').val()

		var result = checkWhoWon(choice1, choice2)
		choice1 = undefined
		choice2 = undefined
		$('.1').prop('disabled', false)
		$('.2').prop('disabled', false)
		if (result == 'Win') {
			wins1++
			loses2++
			database.ref('players/player1').update({
				"wins": wins1
			})
			database.ref('players/player2').update({
				"loses": loses2
			})

			$('#winner p').html(name1 + ' wins!')
			$('#win1').html(wins1)
			$('#lose2').html(loses2)
		} else if (result == 'Tie') {
			$('#winner p').html('TIE!')
		} else if (result == 'Lose') {
			wins2++
			loses1++
			database.ref('players/player1').update({
				"loses": loses1
			})
			database.ref('players/player2').update({
				"wins": wins2
			})

			$('#winner p').html(name2 + ' wins!')
			$('#lose1').html(loses1)
			$('#win2').html(wins2)
		}
	}
})


$(document).ready(function() {
	$('.input').prop('disabled', true)

	$("#userName").keyup(function(event){
    if(event.keyCode == 13){
        $("#addUser").click();
    }
});

	
	$('#addUser').on('click', function(event) {
		// currentPlayer = localStorage.getItem('currentPlayer')
		if (currentPlayer == 'player1') {
			$('#addUser').prop('disabled', true)
			$('.1').prop('disabled', false)
		} else if (currentPlayer == 'player2') {
			$('#addUser').prop('disabled', true)
			$('.2').prop('disabled', false)
		} else { //added this else block
			currentPlayer = 'player1'
			localStorage.setItem('currentPlayer', 'player1')
			$('#addUser').prop('disabled', true)
			$('.1').prop('disabled', false)
		}

		user = $('#userName').val().trim()
		console.log('User is: ' + user)
		$('#userName').val('')

		if (user != '') {
			database.ref('players/' + currentPlayer).update({
				"name": user,
				"wins": 0,
				"loses": 0
			})
		} else {
			console.log('User did not enter a value for name, please try again. Please a jquery function here later')
		}

		
	})


	$('.1').on('click', function(event) {

		input = $(event.target).html()
		console.log(input)
		database.ref('players/player1').update({
			"choice": input
		})
		input = undefined
		$('.2').prop('disabled', true)
	})

	$('.2').on('click', function(event) {
		input = $(event.target).html()
		console.log(input)
		database.ref('players/player2').update({
			"choice": input
		})
		input = undefined
		$('.1').prop('disabled', true)
	})

	window.onbeforeunload = function(e) {
		currentPlayer = localStorage.getItem('currentPlayer')
		if (currentPlayer == 'player1'){
			database.ref('players/player1').remove()
			$('#win1').html('0')
			$('#lose1').html('0')
			localStorage.clear()
		}
		else if (currentPlayer == 'player2') {
			database.ref('players/player2').remove()
			$('#win2').html('0')
			$('#lose2').html('0')
			localStorage.clear()
		} else {
			database.ref('players/player1').remove()
			$('#win1').html('0')
			$('#lose1').html('0')
			localStorage.clear()
		}
	}
})