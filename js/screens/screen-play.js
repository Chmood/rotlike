// Define our playing screen
Game.Screen.playScreen = {
  _player: null,
  _gameEnded: false,
  _subScreen: null,

  // RENDER & RENDER TILE
  // Dedicated: ./play.render.js

  // HANDLE INPUT
  // Dedicated: ./play.handle-input.js

  // ENTER & EXIT
  enter: function() {
    console.log("Entered play screen.");
    // Create a map based on our size parameters
    var width = CONFIG.game.mapWidth;
    var height = CONFIG.game.mapHeight;
    var depth = CONFIG.game.mapDepth;
    // Create our map from the tiles and player
    this._player = new Game.Entity(Game.PlayerTemplate);
    var tiles = new Game.Builder(width, height, depth).getTiles();
    var map = new Game.Map.Cave(tiles, this._player);
    // Start the map's engine
    map.getEngine().start();
  },

  exit: function() {
    console.log("Exited play screen.");
  },

  // GET SCREEN OFFSETS
  getScreenOffsets: function() {
    // Make sure we still have enough space to fit an entire game screen
    var topLeftX = Math.max(0, this._player.getX() - (Game.getScreenWidth() / 2));
    // Make sure we still have enough space to fit an entire game screen
    topLeftX = Math.min(topLeftX, this._player.getMap().getWidth() -
    Game.getScreenWidth());
    // Make sure the y-axis doesn't above the top bound
    var topLeftY = Math.max(0, this._player.getY() - (Game.getScreenHeight() / 2));
    // Make sure we still have enough space to fit an entire game screen
    topLeftY = Math.min(topLeftY, this._player.getMap().getHeight() - Game.getScreenHeight());
    return {
      x: topLeftX,
      y: topLeftY
    };
  },

  // MOVE
  move: function(dX, dY, dZ) {
    var newX = this._player.getX() + dX;
    var newY = this._player.getY() + dY;
    var newZ = this._player.getZ() + dZ;
    // Try to move to the new cell
    this._player.tryMove(newX, newY, newZ, this._player.getMap());
  },

  // SET GAME ENDED
  setGameEnded: function(gameEnded) {
    this._gameEnded = gameEnded;
  },

  // SET SUB SCREEN
  setSubScreen: function(subScreen) {
    this._subScreen = subScreen;
    // Refresh screen on changing the subscreen
    Game.refresh();
  },

  // SHOW ITEMS SUB SCREEN
  showItemsSubScreen: function(subScreen, items, emptyMessage) {
    if (items && subScreen.setup(this._player, items) > 0) {
      this.setSubScreen(subScreen);
    } else {
      Game.sendMessage(this._player, emptyMessage);
      Game.refresh();
    }
  }
};
