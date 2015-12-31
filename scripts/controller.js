var controller =  {};
controller.equipButtonHandler = function(e) {
  if (e.target !== e.currentTarget) {
    var clickedItem = e.target.id;
    clickedItem = clickedItem.replace('EquipBut','');
    // console.log(clickedItem);
    playerMobile.equip(e, clickedItem);
  }
  e.stopPropagation();
};

//not sure this should be here
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
    playerMobile.rightHand = parseChar.rightHand;
    playerMobile.leftHand = parseChar.leftHand;
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
    playerMobile.updateStats();
  }
};
// start eventHandlers on doc ready
$(function() {
  // left hand has some unquie rules and can't be grouped with the rest of the equipment easily
  $('#leftHandEquipBut').on('click', playerMobile.equipL);
  $('#statTable').on('click', controller.equipButtonHandler);
});
