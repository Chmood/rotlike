const CONFIG = {
  game: {
    mapWidth: 80,
    mapHeight: 80,
    mapDepth: 5,
    modeAllExplored: false,
    modeAllVisible: false
  },
  render: {
    domGameId: 'rot-game',
    domDisplayId: 'rot-display',
    // forceSquareRatio: true, // always square by now
    // Let the browser viewport decide of the game size
    // screenWidth: 40,
    // screenHeight: 40
  }
}

// COMPUTED

// CONFIG.render.screenWidth *= CONFIG.render.forceSquareRatio ? 1 : 1.4142;
// CONFIG.render.screenWidth = Math.floor(CONFIG.render.screenWidth);
