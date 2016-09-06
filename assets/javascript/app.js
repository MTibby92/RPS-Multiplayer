//global variables
var database = firebase.database()
database.set({
	playerList: [],

})

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




$(document).ready(function() {
	$('button').on('click', game.getInput(event) {
	}	  
})