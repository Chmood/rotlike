// THROTTLE
// Throttle with requestAnimationFrame + customEvent
// See: https://developer.mozilla.org/fr/docs/Web/Events/resize

Game.throttle = function(type, name, obj) {
	obj = obj || window;
	var running = false;
	var func = function() {
		if (running) { return; }
		running = true;
		requestAnimationFrame(function() {
			obj.dispatchEvent(new CustomEvent(name));
			running = false;
		});
	};
	obj.addEventListener(type, func);
};

// GAME DOM

Game.DOM = {
	_$game: null,
	_$gameDisplay: null,

	DOM2viewport: function () {
		const desiredSize = 32; // in tiles (minimum)
		const viewportSize = {
			x: _$game.offsetWidth,
			y: _$game.offsetHeight,
		}
		const viewportRatio = viewportSize.x / viewportSize.y;
		const viewportRatioMode = viewportRatio < 1 ? 'portrait' : 'landscape';
		const viewportSmallerDimension = Math.min(viewportSize.x, viewportSize.y);
		const viewportTileSize = Math.floor(viewportSmallerDimension / desiredSize);
		const viewportDisplaySize = {
			x: Math.floor(viewportSize.x / viewportTileSize),
			y: Math.floor(viewportSize.y / viewportTileSize)
		};
		const viewportDisplayWidth = viewportSize.x / viewportTileSize;
    // const width = _$gameDisplay.offsetWidth;
    // const height = _$gameDisplay.offsetHeight;

// console.log("compute viewport " + viewportSize.x + "x" + viewportSize.y + " (" + viewportRatioMode + " / smaller " + viewportSmallerDimension + ") " + viewportTileSize + "px");

		// Update Game
		Game.getDisplay().setOptions({
			fontSize: viewportTileSize,
			width: viewportDisplaySize.x,
			height: viewportDisplaySize.y
		});
		Game.setScreenWidth(viewportDisplaySize.x);
		Game.setScreenHeight(viewportDisplaySize.y);
		Game.refresh();
	},

	// DOM READY

	DOMReady: function () {
		_$game = document.getElementById(CONFIG.render.domGameId);
		_$gameDisplay = document.getElementById(CONFIG.render.domDisplayId);

		// Check if rot.js can work on this browser
		if (ROT.isSupported()) {
			// DOM2viewport();
			// Initialize the game
			Game.init();
			// Add the container to our HTML page
			const $rootDisplay = document.getElementById(CONFIG.render.domDisplayId);
			_$gameDisplay.appendChild(Game.getDisplay().getContainer());
			// Load the start screen
			Game.switchScreen(Game.Screen.startScreen);
		} else {
			alert("The rot.js library isn't supported by your browser.");
		}
		// Trigger an init resize event to fire computation
		window.dispatchEvent(new Event('optimizedResize'));
	}
};

// APP INIT

// DOM ready
document.addEventListener('DOMContentLoaded', Game.DOM.DOMReady, false);

// Resize
// Throttle 'resize' events into 'optimizedResize' events
Game.throttle("resize", "optimizedResize");
// Handle optimized resize event
window.addEventListener("optimizedResize", Game.DOM.DOM2viewport);
