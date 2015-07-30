var c = new sClient("ws://localhost:8080");

c.OnOpen = function () {
	console.log("Opened");
};

c.OnClose = function () {
	console.log("Closed");
};

c.OnMessage = function (msg) {
	console.log("Message:");
	console.log(msg);
};

c.OnMatched = function (name) {
	console.log("Matched with " + name);
};

c.OnCountDown = function (value) {
	console.log(value);
};

c.OnGameOver = function (win) {
	if (win) {
		console.log("You won!");
	}
	else {
		console.log("You lost!");
	}
};

c.OnReceiveError = function (err, data) {
	console.log("Receive Error!");
	console.log(err);
	console.log("Bad data: " + data);
};

c.OnSendError = function (err, msg) {
	console.log("Send Error!");
	console.log(err);
	console.log("Failed message:");
	console.log(msg);
};