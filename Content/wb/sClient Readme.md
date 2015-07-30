sClient Documentation



Overview: 
sClient provides an interface for communicating with the Wish Banana Game Server.



Construction Example:

require(['path/to/sClient'], function (sClient) {
	var sc = sClient("ws://url/to/socket");
});



Methods:
sClient.IsOpen()
	Used to check if the sockect connection to the game server is still open.
	Returns true if the socket connection is still open. False otherwise.

sClient.Squeeze()
	Used to send a squeeze message to the game server.



Callbacks:
sClient provides hooks for callbacks to handle certain events. An example of hooking up the callback is included below:

sc.OnMessage = function (msg) {
	//Handle the message.
};

All the callbacks are listed below:

sClient.OnMessage(message)
	Called when a message is received from the game server.
	message (object): The message sent by the server.

sClient.OnMatched(opponentName)
	Called when a "Matched" message is received. This means the server has match you up with another player.
	opponentName (string): The name of the opponent you have been matched with.

sClient.OnCountDown(value)
	Called when a "CountDown" message is received. This occurs when the server is counting down in preparation for a match to begin.
	value (number): This is the current value of the count down. Should we a number (inclusively) between 5 and 0.

sClient.GameOver(won)
	Called when a "GameOver" message is received. This occurs when a player wins a match.
	won (boolean): True if the client won the game. False otherwise.

sClient.OnOpen()
	Called when the connection to the game server is opened.

sClient.OnClose()
	Called when the connection to the game server is closed.

sClient.OnReceiveError(error, message)
	Called when an invalid message is received from the game server.
	error (exception): The exception thrown during the message processing.
	message (string): The message received by the client.

sClient.OnSendError(error, message)
	Called when a message fails to be sent to the game server.
	error (exception): The exception thrown during the message processing.
	message (object): The message that failed to be sent.