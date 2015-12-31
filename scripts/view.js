var view = {};
view.endCombat = function() {
  $('#useWepAb').remove();
  $('#useWepAbBut').remove();
  $('#opponentStats').hide();
  playerMobile.combatant = null;
  if(playerMobile.charClass === 'Wizard'){
    $('#spells').remove();
    $('#cast').remove();
  }
};
view.removeEqupFromHtml = function() {
  $('#rightHandList').remove();
  $('#leftHandList').remove();
  $('#headList').remove();
  $('#chestList').remove();
  $('#armsList').remove();
  $('#glovesList').remove();
  $('#legsList').remove();
  $('#bootsList').remove();
};

view.playerEqiupToHtml = function() {
  var tempEquipArray = ['rightHand','leftHand','head','chest','arms','gloves','legs','boots'];
  tempEquipArray.forEach(function(element,index,array) {
    // console.log(element);
    if (playerMobile[element] != null){
      $('#'+element).html(playerMobile[element].stringName);
    }
    else{
      $('#'+element).html(' empty');
    }
  });
  $('#statWindow').attr('style','display:inline');
};
view.playerStatsToHtml = function() {
  $('#nameTable').html(playerMobile.stringName);
  $('#classTable').html(playerMobile.charClass);
  $('#levelTable').html('Level = ' + playerMobile.level +' Exp = ' + playerMobile.exp + ' Gold = ' + playerMobile.gold);
  $('#hitsTable').html(playerMobile.hitPoints);
  $('#manaTable').html(playerMobile.mana);
  $('#stamTable').html(playerMobile.stam);
  $('#strTable').html(playerMobile.str);
  $('#dexTable').html(playerMobile.dex);
  $('#wisTable').html(playerMobile.wis);
  $('#armorTable').html(playerMobile.armor);
  $('#magicResist').html(playerMobile.magicResist);
};
view.addOpponentStatsToHtml = function() {
  $('#opponentnameTable').html(playerMobile.combatant.stringName);
// $('opponentclassTable').html(playerMobile.combatant.charClass);
  $('#opponentlevelTable').html('Level = ' + playerMobile.combatant.level);
  $('#opponenthitsTable').html(playerMobile.combatant.hitPoints);
  $('#opponentmanaTable').html(playerMobile.combatant.mana);
  $('#opponentstamTable').html(playerMobile.combatant.stam);
  $('#opponentstrTable').html(playerMobile.combatant.str);
  $('#opponentdexTable').html(playerMobile.combatant.dex);
  $('#opponentwisTable').html(playerMobile.combatant.wis);
  $('#opponentarmorTable').html(playerMobile.combatant.armor);
  $('#opponentmagicResist').html(playerMobile.combatant.magicResist);
};
