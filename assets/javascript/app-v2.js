var database = firebase.database()


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


firebase.database().ref().on('value', function(snapshot) {})

$(document).ready(function() {
	$('.input1').prop('disabled', true)
	$('.input2').prop('disabled', true)
	$('.input').on('click', function(event) {
		var input = $(event.target).html()
		console.log(input)
	})
})