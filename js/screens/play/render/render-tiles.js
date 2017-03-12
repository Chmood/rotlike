// RENDER TILES

Game.Screen.playScreen.renderTiles = function(display) {
  var screenWidth = Game.getScreenWidth();
  var screenHeight = Game.getScreenHeight();
  var offsets = this.getScreenOffsets();
  var topLeftX = offsets.x;
  var topLeftY = offsets.y;
  // This object will keep track of all visible map cells
  var visibleCells = {};
  // Store this._player.getMap() and player's z to prevent losing it in callbacks
  var map = this._player.getMap();
  var currentDepth = this._player.getZ();
  // Find all visible cells and update the object
  map.getFov(currentDepth).compute(
    this._player.getX(),
    this._player.getY(),
    this._player.getSightRadius(),
    function(x, y, radius, visibility) {
      visibleCells[x + "," + y] = true;
      // Mark cell as explored
      map.setExplored(x, y, currentDepth, true);
    }
  );
  // Render the explored map cells
  for (var x = topLeftX; x < topLeftX + screenWidth; x++) {
    for (var y = topLeftY; y < topLeftY + screenHeight; y++) {
      if (map.isExplored(x, y, currentDepth) || CONFIG.game.modeAllExplored) {
        // Fetch the glyph for the tile and render it to the screen
        // at the offset position.
        var glyph = map.getTile(x, y, currentDepth);
        var foreground = glyph.getForeground();
        // If we are at a cell that is in the field of vision, we need
        // to check if there are items or entities.
        if (visibleCells[x + ',' + y] || CONFIG.game.modeAllVisible) {
          // Check for items first, since we want to draw entities
          // over items.
          var items = map.getItemsAt(x, y, currentDepth);
          // If we have items, we want to render the top most item
          if (items) {
            glyph = items[items.length - 1];
          }
          // Check if we have an entity at the position
          if (map.getEntityAt(x, y, currentDepth)) {
            glyph = map.getEntityAt(x, y, currentDepth);
          }
          // Update the foreground color in case our glyph changed
          foreground = glyph.getForeground();
        } else {
          // Since the tile was previously explored but is not
          // visible, we want to change the foreground color to
          // dark gray.
          foreground = 'darkGray';
        }
        display.draw(
          x - topLeftX,
          y - topLeftY,
          glyph.getChar(),
          foreground,
          glyph.getBackground()
        );
      }
    }
  }
};
