var controller =  {};

controller.saveChar = function (stringName, data){
  var savedGame = JSON.stringify(data);
  localStorage.setItem(stringName, savedGame);
};

controller.loadChar = function(stringName){
  var savedChar = localStorage.getItem(stringName);
  var parseChar = JSON.parse(savedChar);
  // console.log(parseChar);
  if (stringName != null){
    playerMobile.level = parseChar.level;
    playerMobile.gold = parseChar.gold;
    playerMobile.exp = parseChar.exp;
    playerMobile.expToLvl = parseChar.expToLvl;
    playerMobile.stringName = parseChar.stringName;
    playerMobile.charClass = parseChar.charClass;
    playerMobile.hitPoints = parseChar.hitPoints;
    playerMobile.mana = parseChar.mana;
    playerMobile.stam = parseChar.stam;
    playerMobile.str = parseChar.str;
    playerMobile.dex = parseChar.dex;
    playerMobile.wis = parseChar.wis;
    playerMobile.armor = parseChar.armor;
    playerMobile.magicResist = parseChar.magicResist;
    playerMobile.wepDmg = parseChar.wepDmg;
    playerMobile.rHand = parseChar.rHand;
    playerMobile.lHand = parseChar.lHand;
    playerMobile.head = parseChar.head;
    playerMobile.chest = parseChar.chest;
    playerMobile.arms = parseChar.arms;
    playerMobile.gloves = parseChar.gloves;
    playerMobile.legs = parseChar.legs;
    playerMobile.boots = parseChar.boots;
    playerMobile.inventory = parseChar.inventory;
    playerMobile.knownSpells = parseChar.knownSpells;
    playerMobile.knownWepAbs = parseChar.knownWepAbs;
    playerMobile.passiveAbs = parseChar.passiveAbs;
    util.printToGameWindow(playerMobile.stringName +' the ' + playerMobile.charClass +' has joined the world!');
    playerMobile.passiveActs();
    updateStats();
  }
};
