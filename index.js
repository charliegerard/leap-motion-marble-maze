var five = require('johnny-five');
var board = new five.Board({port:'/dev/cu.usbmodem1411'});
var Leap = require('leapjs');

board.on("ready", function(){
	console.log('ready')
	var myServo = new five.Servo({
		pin: '9',
		center: true
	});

	var myServo2 = new five.Servo({
		pin: '8',
		center: true
	});

	var controller = Leap.loop(function(frame){
		if(frame.hands[0]){
			var hand = frame.hands[0]

			var previousFrame = controller.frame(1);
			var axis = hand.rotationAxis(previousFrame);
			// console.log("Axis of Rotation: (" + axis[2] + "");
			if(axis[0] < -0.5){
				console.log('hand backwards')
				myServo.to(70);
			} else if(axis[0] > 0.7){
				console.log('hand forward')
				myServo.to(90);
			}

			if(axis[2] > 0.9){
				console.log('orientation right')
				myServo2.to(70)
			} else if (axis[2] < -0.9){
				console.log('orientation left')
				myServo2.to(90)
			}
		}

	})
})