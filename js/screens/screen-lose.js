// Define our losing screen
Game.Screen.loseScreen = {
  enter: function() {
    console.log("Entered lose screen.");
  },
  exit: function() {
    console.log("Exited lose screen.");
  },
  render: function(display) {
    // Render our prompt to the screen
    for (var i = 0; i < 22; i++) {
      display.drawText(2, i + 1, "%b{red}You lose! :(");
    }
  },
  handleInput: function(inputType, inputData) {
    // When [Enter] is pressed, go to the play screen
    if (inputType === 'keydown') {
      if (inputData.keyCode === ROT.VK_RETURN) {
        Game.switchScreen(Game.Screen.startScreen);
      }
    }
  }
};
