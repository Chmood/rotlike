// RENDER

Game.Screen.playScreen.render = function(display) {
  // Render subscreen if there is one
  if (this._subScreen) {
    this._subScreen.render(display);
    return;
  }

  // Render the tiles
  this.renderTiles(display);

  // Render UI
  this.renderUI(display);
};
