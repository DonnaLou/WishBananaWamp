// Wish Banana Socket Client
// sClient.js

var sClient = function (url) {
	//Make sure web sockets are supported
	if (!('WebSocket' in window)) {
		throw "Fatal error! Web sockets aren't supported.";
	}

	//Private variables
	var socket = new WebSocket(url, 'wishbanana');
	var isOpen = false;

	//Private methods
	function callIfDefined(func, params) {
		if (typeof func !== "undefined") {
			func.call(this, params);
		}
	}

	//The returned object
	var client = {
		OnOpen: undefined,
		OnClose: undefined,
		OnMessage: undefined,
		OnMatched: undefined,
		OnCountDown: undefined,
		OnGameOver: undefined,
		OnReceiveError: undefined,
		OnSendError: undefined,

		IsOpen: function () {
			return isOpen
		},

		Squeeze: function () {
			if (!isOpen) {
				throw "A connection has not yet been established with the game server."
			}

			var msg = new msg.squeeze()

			try {
				socket.send(JSON.stringify(msg))
			}
			catch (err) {
				callIfDefined(OnSendError, [err, msg])
			}
		},

		Close: socket.close
	}

	//Public member declarations
	socket.onopen = function () {
		isOpen = true;
		callIfDefined(client.OnOpen);
	}

	socket.onclose = function () {
		isOpen = false;
		callIfDefined(client.OnClose);
	}

	socket.onmessage = function (e) {
		var msg;
		try {
			//All messages from the server should be a single valid JSON string.
			msg = JSON.parse(e.data);
		}
		catch (err) {
			callIfDefined(client.OnReceiveError, [err, e.data]);
			return;
		}

		callIfDefined(client.OnMessage, msg);

		var id = msg.Id
		if (id == msgIds["Matched"]) {
			callIfDefined(client.OnMatched, msg.OpponentName);
		}
		else if (id == msgIds["CountDown"]) {
			callIfDefined(client.OnCountDown, msg.Value);
		}
		else if (id == msgIds["GameOver"]) {
			callIfDefined(client.OnGameOver, msg.Won);
		}
		else {
			callIfDefined(client.OnReceiveError, ["Invalid message type.", e.data]);
		}
	}

	return client;
}