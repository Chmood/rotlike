Game.Screen.playScreen.handleInput = function(inputType, inputData) {

  // If the game is over, enter will bring the user to the losing screen.
  if (this._gameEnded) {
    if (inputType === 'keydown' && inputData.keyCode === ROT.VK_RETURN) {
      Game.switchScreen(Game.Screen.loseScreen);
    }
    // Return to make sure the user can't still play
    return;
  }
  // Handle subscreen input if there is one
  if (this._subScreen) {
    this._subScreen.handleInput(inputType, inputData);
    return;
  }
  // KEYS
  if (inputType === 'keydown') {
    // God modes [l]
    if (inputData.keyCode === ROT.VK_L) {
      if (!CONFIG.game.modeAllVisible && !CONFIG.game.modeAllExplored) {
        CONFIG.game.modeAllExplored = true;
      } else if (!CONFIG.game.modeAllVisible && CONFIG.game.modeAllExplored) {
        CONFIG.game.modeAllVisible = true;
      } else  {
        CONFIG.game.modeAllVisible = false;
        CONFIG.game.modeAllExplored = false;
      }
    // Movement [arrows]
    } else if (inputData.keyCode === ROT.VK_LEFT) {
      this.move(-1, 0, 0);
    } else if (inputData.keyCode === ROT.VK_RIGHT) {
      this.move(1, 0, 0);
    } else if (inputData.keyCode === ROT.VK_UP) {
      this.move(0, -1, 0);
    } else if (inputData.keyCode === ROT.VK_DOWN) {
      this.move(0, 1, 0);
    } else if (inputData.keyCode === ROT.VK_I) {
      // Show the inventory screen [i]
      this.showItemsSubScreen(Game.Screen.inventoryScreen, this._player.getItems(),
      'You are not carrying anything.');
      return;
    } else if (inputData.keyCode === ROT.VK_D) {
      // Show the drop screen [d]
      this.showItemsSubScreen(Game.Screen.dropScreen, this._player.getItems(),
      'You have nothing to drop.');
      return;
    } else if (inputData.keyCode === ROT.VK_E) {
      // Show the eat screen [e]
      this.showItemsSubScreen(Game.Screen.eatScreen, this._player.getItems(),
      'You have nothing to eat.');
      return;
    } else if (inputData.keyCode === ROT.VK_W) {
      if (inputData.shiftKey) {
        // Show the wear screen [W]
        this.showItemsSubScreen(Game.Screen.wearScreen, this._player.getItems(),
        'You have nothing to wear.');
      } else {
        // Show the wield screen [w]
        this.showItemsSubScreen(Game.Screen.wieldScreen, this._player.getItems(),
        'You have nothing to wield.');
      }
      return;
    } else if (inputData.keyCode === ROT.VK_X) {
      // Show the examine screen [x]
      this.showItemsSubScreen(Game.Screen.examineScreen, this._player.getItems(),
      'You have nothing to examine.');
      return;
    } else if (inputData.keyCode === ROT.VK_COMMA) {
      // PICK [,]
      var items = this._player.getMap().getItemsAt(
        this._player.getX(),
        this._player.getY(),
        this._player.getZ()
      );
      // If there is only one item, directly pick it up
      if (items && items.length === 1) {
        var item = items[0];
        if (this._player.pickupItems([0])) {
          Game.sendMessage(this._player, "You pick up %s.", [item.describeA()]);
        } else {
          Game.sendMessage(this._player, "Your inventory is full! Nothing was picked up.");
        }
      } else {
        // Show the pick screen [,] (too)
        this.showItemsSubScreen(Game.Screen.pickupScreen, items,
          'There is nothing here to pick up.');
      }
    } else {
      // Not a valid key
      console.warn("You pressed an unrecognized key!", inputData.keyCode);
      return;
    }
    // UNLOCK THE ENGINE
    this._player.getMap().getEngine().unlock();

  } else if (inputType === 'keypress') {
    var keyChar = String.fromCharCode(inputData.charCode);
    if (keyChar === '>') {
      this.move(0, 0, 1);
    } else if (keyChar === '<') {
      this.move(0, 0, -1);
    } else if (keyChar === ';') {
      // Setup the look screen.
      var offsets = this.getScreenOffsets();
      Game.Screen.lookScreen.setup(
        this._player,
        this._player.getX(), this._player.getY(),
        offsets.x, offsets.y
      );
      this.setSubScreen(Game.Screen.lookScreen);
      return;
    } else if (keyChar === '?') {
      // Setup the help screen.
      this.setSubScreen(Game.Screen.helpScreen);
      return;
    } else {
      // Not a valid key
      return;
    }
    // Unlock the engine
    this._player.getMap().getEngine().unlock();
  }
};
