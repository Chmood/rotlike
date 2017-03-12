// RENDER UI

Game.Screen.playScreen.renderUI = function(display) {

  // UI
  const p = this._player;
  const wpn = p.getWeapon();
  const arm = p.getArmor();

  // UI OBJECT
  const ui = {
    screenWidth: Game.getScreenWidth(),
    screenHeight: Game.getScreenHeight(),
    display: display,

    depth: p._z + 1,
    hp: p.getHp(),
    hpMax: p.getMaxHp(),
    level: p.getLevel(),
    xp: p.getExperience(),
    xpNext: p.getNextLevelExperience(),
    vision: p.getSightRadius(),
    attack: p.getAttackValue(),
    defense: p.getDefenseValue(),

    hungerFullness: p._fullness,
    hungerFullnessMax: p._maxFullness,
    hungerRatio: p._fullness / p._maxFullness,

    weapon: wpn,
    weaponName: wpn ? wpn._name : 'none',
    weaponAttack: wpn ? wpn.getAttackValue() : 0,
    weaponDefense: wpn ? wpn.getDefenseValue() : 0,

    armor: arm,
    armorName: arm ? arm._name : 'none',
    armorAttack: arm ? arm.getAttackValue() : 0,
    armorDefense: arm ? arm.getDefenseValue() : 0,
  }

  // RENDER UI CALLS

  Game.Screen.playScreen.renderUIMessages(ui);
  Game.Screen.playScreen.renderUIStats(ui);
  Game.Screen.playScreen.renderUIDepth(ui);
  Game.Screen.playScreen.renderUIHunger(ui);
  Game.Screen.playScreen.renderUIHints(ui);
};

// MESSAGES
Game.Screen.playScreen.renderUIMessages = function(ui) {
  // Get the messages in the player's queue and render them
  var messages = this._player.getMessages();
  var messageY = 0;
  for (var i = 0; i < messages.length; i++) {
    // Draw each message, adding the number of lines
    messageY += ui.display.drawText(
      0,
      messageY,
      '%c{white}%b{black}' + messages[i]
    );
  }
}

// DEPTH
Game.Screen.playScreen.renderUIDepth = function(ui) {
  const depth = 'F' + (ui.depth);
  ui.display.drawText(ui.screenWidth - depth.length, 0, depth);
}

// HUNGER
Game.Screen.playScreen.renderUIHunger = function(ui) {
  var hungerState = this._player.getHungerState() + " " + Math.round(100 * ui.hungerRatio) + "%";
  ui.display.drawText(
    ui.screenWidth - hungerState.length, ui.screenHeight - 1, hungerState);
}

// INTERACTIVE HINTS
Game.Screen.playScreen.renderUIHints = function(ui) {
  let cmdString = '';
  // Static
  // cmdString += 'Help(?) ';
  // cmdString += 'Godmode(l) ';

  // cmdString += 'Look(;) ';
  // cmdString += 'Eat(e) ';
  // cmdString += 'Drop(d) ';
  // cmdString += 'Wield(w) ';
  // cmdString += 'Wear(W) ';
  // cmdString += 'Inventory(i) ';
  // cmdString += 'Examine(x) ';
  // Pick
  var items = this._player.getMap().getItemsAt(
    this._player.getX(),
    this._player.getY(),
    this._player.getZ()
  );
  if (items) {
    cmdString += 'Pick(,)';
  }
  ui.display.drawText(0, ui.screenHeight - 3, cmdString);
}

// STATS
Game.Screen.playScreen.renderUIStats = function(ui) {
  let statsA = '%c{white}%b{transparent}';
  let statsB = '%c{white}%b{transparent}';
  let wpnString = '';
  let armString = '';

  if (ui.weapon) {
    wpnString += '(+' + ui.weaponAttack + ui.weaponName;
    if (ui.armor && ui.armorAttack !== 0) {
      wpnString += '+' + ui.armorAttack;
    }
    wpnString += ')';
  }
  if (ui.armor) {
    armString += '(+' + ui.armorDefense + ui.armorName;
    if (ui.weapon && ui.weaponAttack !== 0) {
      armString += '+' + ui.weaponDefense;
    }
    armString += ')';
  }

  statsA +=
    " HP" + ui.hp + "/" + ui.hpMax +
    " LVL" + ui.level +
    " XP" + ui.xp + "/" + ui.xpNext +
    " VIS" + ui.vision;
  statsB +=
    " ATK" + ui.attack + wpnString +
    " DEF" + ui.defense + armString;

  ui.display.drawText(0, ui.screenHeight - 2, statsA); // last line
  ui.display.drawText(0, ui.screenHeight - 1, statsB); // penultimate line
}
