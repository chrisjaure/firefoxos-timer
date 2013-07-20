var Timer = function(endTime, parent) {

	this.endTime = endTime;
	this.build(parent);
	this.start(endTime);

};

Timer.prototype.build = function(parent) {

	var el = document.createElement('div');
	el.className = 'timer';
	el.innerHTML = '<svg>' +
		'<circle cx="70" cy="70" r="60" fill="#000" />' +
		'<path class="timer-progress" d="" fill="#f00" />' +
	'</svg>'+
	'<div class="timer-countdown">';

	parent.appendChild(el);
	this.svg = el.querySelector('.timer-progress');
	this.countdown = el.querySelector('.timer-countdown');

};

Timer.prototype.start = function(duration) {

	var radius = 60;
	var offset = 10;
	var milliseconds = Date.now();
	var svg = this.svg;
	var countdown = this.countdown;

	function drawCoord(radius, degrees) {
		var radians = degrees * Math.PI / 180;

		var rX = radius + offset + Math.sin(radians) * radius;
		var rY = radius + offset - Math.cos(radians) * radius;

		var dir = (degrees > 180) ? 1 : 0;

		var coord = 'M' + (radius + offset) + ',' + (radius + offset) + ' ' +
					'L' + (radius + offset) + ',' + offset + ' ' +
					'A' + radius + ',' + radius + ' 0 ' + dir + ',1 ' +
					rX + ',' + rY;

		return coord;
	}

	(function updateTimer(now) {

		var RGB  = [];

		var diff    = (now - milliseconds) % (duration * 1000) / 1000;
		var degrees = 360 / duration * diff;
		var draw    = drawCoord(radius, degrees);

		svg.setAttribute('d', draw);

		var sec  = duration - Math.floor(diff);
		countdown.innerHTML = sec;

		mozRequestAnimationFrame(updateTimer);

	})(milliseconds);

};

/*

120 * 0.003 = 0.36;
60 * 0.006 = 0.36;
30 * 0.012 = 0.36;

120 x = 0.003;
60 x = 0.006;
30 x = 0.012

 */