// Define our initial start screen
Game.Screen.startScreen = {
  enter: function() {
    console.log("Entered start screen.");
  },
  exit: function() {
    console.log("Exited start screen.");
  },
  render: function(display) {
    // Render our prompt to the screen
    const screenWidth = Game.getDisplay().getOptions().width;
    const screenHeight = Game.getDisplay().getOptions().height;
    const midScreenX = screenWidth / 2;
    const midScreenY = screenHeight / 2;

    const strTitle = "JS ROGUELIKE";
    const strSubtitle = "\"You gotta get used to permadeath, dude\"";
    const strTip = "TIP: press [?] anytime for help";
    const strCta = "Press [ENTER] to start!";

    display.drawText(midScreenX - strTitle.length / 2, midScreenY, strTitle);
    display.drawText(midScreenX - strSubtitle.length / 2, midScreenY + 2, strSubtitle);
    display.drawText(midScreenX - strCta.length / 2, midScreenY + 7, strCta);
    display.drawText(midScreenX - strTip.length / 2, screenHeight - 2, strTip);
  },
  handleInput: function(inputType, inputData) {
    // When [Enter] is pressed, go to the play screen
    if (inputType === 'keydown') {
      if (inputData.keyCode === ROT.VK_RETURN) {
        Game.switchScreen(Game.Screen.playScreen);
      }
    }
  }
};
