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
view.startCombat = function(argument) {
  $('#usePassAb').remove();
  $('#usePassAbBut').remove();
  $('#opponentStats').fadeIn();
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
view.makeWepAbList = function() {
  var $parent = $('#aggrActions');
  var $action = $('<select>').attr('id', 'useWepAb');
  $parent.append($action);
  var abs = playerMobile.knownWepAbs;
  for (var i = 0; i < abs.length; i++) {
    var $opt = $('<option>').html(abs[i].stringName).val(abs[i].stringName);
    $action.append($opt);
  };
  var $wepAbBut = $('<button>').html('Use Ability').attr('id','useWepAbBut');
  $parent.append($wepAbBut);
  $('#useWepAbBut').on('click', combat.useWepAb);
};
view.makeSpellList = function() {
  var $parent = $('#aggrActions');
  var $action2 = $('<select>').attr('id','spells');
  $parent.append($action2);
  var spells = playerMobile.knownSpells;

  for (var i = 0; i < spells.length; i++) {
    var $opt = $('<option>').html(spells[i].stringName).val(spells[i].stringName);
    $action2.append($opt);
  };
  var $castBut = $('<button>').attr('id', 'cast').html('Cast Spell');
  $parent.append($castBut);
  $('#cast').on('click', combat.castSpell);
};
view.makeEquipList = function(bodyLoc){
  var $parent = $('#'+bodyLoc+'Equip');
  var $equipList = $('<select>').attr('id', bodyLoc+'List');
  $parent.append($equipList.append($('<option>').html('None').val('None')));
  for (var i = 0; i < playerMobile.inventory.length; i++){
    var $opt = $('<option>');
    if (playerMobile.inventory[i].bodyLoc === bodyLoc ){
      $opt.html(playerMobile.inventory[i].stringName).val(playerMobile.inventory[i].stringName);
      $equipList.append($opt);
    }
  };
};

view.makeDuelWepList = function() {
  var $parentL = $('#leftHandEquip');
  var $wepListL = $('<select>').attr('id','leftHandList');
  var $opt1 = $('<option>').html('None').val('None');
  $parentL.append($wepListL);
  $wepListL.append($opt1);
  for (var i = 0; i < playerMobile.inventory.length; i++){
    var $opt = $('<option>');
    if (playerMobile.inventory[i].wepType === 'pierce' || playerMobile.inventory[i].wepType === 'slash' || playerMobile.inventory[i].wepType === 'bash'){
      $opt.html(playerMobile.inventory[i].stringName).val(playerMobile.inventory[i].stringName);
      $wepListL.append($opt);
    }
  };
};

view.makeShieldWepList = function() {
  var $parentL = $('#leftHandEquip');
  var $wepListL = $('<select>').attr('id', 'leftHandList');
  var $opt1 = $('<option>').html('None').val('None');
  $parentL.append($wepListL);
  $wepListL.append($opt1);
  for (var i = 0; i < playerMobile.inventory.length; i++){
    var $opt = $('<option>');
    if (playerMobile.inventory[i].wepType === 'shield' ){
      $opt.html(playerMobile.inventory[i].stringName).val(playerMobile.inventory[i].stringName);
      $wepListL.append($opt);
    }
  };
};

view.makeWepList = function() {
  var $parentR = $('#rightHandEquip');
  var $wepListR = $('<select>').attr('id','rightHandList');
  $parentR.append($wepListR);
  var $opt1 = $('<option>').html('None').val('None');
  $wepListR.append($opt1);
  for (var i = 0; i < playerMobile.inventory.length; i++){
    var $opt = $('<option>');
    if (playerMobile.inventory[i].wepType === 'pierce' || playerMobile.inventory[i].wepType === 'slash' || playerMobile.inventory[i].wepType === 'bash'){
      $opt.html(playerMobile.inventory[i].stringName).val(playerMobile.inventory[i].stringName);
      $wepListR.append($opt);
    }
  };
  if(playerMobile.charClass === 'Rogue'){
    view.makeDuelWepList();
  }
  else if(playerMobile.charClass === 'Warrior'){
    makeShieldWepList();
  }
};
