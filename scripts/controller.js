var controller =  {};
// this handles all the equip button event handlers
controller.equipButtonHandler = function(e) {
  if (e.target !== e.currentTarget) {
    var clickedItem = e.target.id;
    clickedItem = clickedItem.replace('EquipBut','');
    // console.log(clickedItem);
    playerMobile.equip(e, clickedItem);
  }
  e.stopPropagation();
};
//not sure save/load stuff should be here
controller.saveChar = function (stringName, data){
  var savedGame = JSON.stringify(data);
  localStorage.setItem(stringName, savedGame);
};

controller.loadChar = function(stringName){
  var savedChar = localStorage.getItem(stringName);
  var parseChar = JSON.parse(savedChar);
  if (parseChar != null){
    Object.keys(parseChar).forEach(function(element){
      // console.log(playerMobile[element]);
      playerMobile[element] = parseChar[element];

    });
  }
  util.printToGameWindow(playerMobile.stringName +' the ' + playerMobile.charClass +' has joined the world!');
  playerMobile.passiveActs();
  playerMobile.updateStats();
};
// start eventHandlers on doc ready
$(function() {
  $('#createCharButton').on('click', playerMobile.createChar);
  // left hand has some unquie rules and can't be grouped with the rest of the equipment easily
  $('#leftHandEquipBut').on('click', playerMobile.equipL);
  $('#statTable').on('click', controller.equipButtonHandler);
});
