var view = {};

view.removeEqupFromHtml = function() {
  $('#wepListR').remove();
  $('#wepListL').remove();
  $('#headList').remove();
  $('#chestList').remove();
  $('#armsList').remove();
  $('#glovesList').remove();
  $('#legsList').remove();
  $('#bootsList').remove();
};
view.playerEqiupToHtml = function() {
  if (playerMobile.rHand != null){
    $('#rightHand').html(playerMobile.rHand.stringName);
  }
  else{
    $('#rightHand').html(' empty');
  }
  if (playerMobile.lHand != null){
    $('#leftHand').html(playerMobile.lHand.stringName);
  }
  else{
    $('#leftHand').html(' empty');
  }
  if (playerMobile.head != null){
    $('#head').html(playerMobile.head.stringName);
  }
  else{
    $('#head').html(' empty');
  }
  if (playerMobile.chest != null){
    $('#chest').html(playerMobile.chest.stringName);
  }
  else{
    $('#chest').html(' empty');
  }
  if (playerMobile.arms != null){
    $('#arms').html(playerMobile.arms.stringName);
  }
  else{
    $('#arms').html(' empty');
  }
  if (playerMobile.gloves != null){
    $('#gloves').html(playerMobile.gloves.stringName);
  }
  else{
    $('#gloves').html(' empty');
  }
  if (playerMobile.legs != null){
    $('#legs').html(playerMobile.legs.stringName);
  }
  else{
    $('#legs').html(' empty');
  }
  if (playerMobile.boots != null){
    $('#boots').html(playerMobile.boots.stringName);
  }
  else{
    $('#boots').html(' empty');
  }
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
view.addOpponentStatsToHtml =function() {
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
