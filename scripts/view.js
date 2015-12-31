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

view.startCombat = function() {
  $('#usePassAb').remove();
  $('#usePassAbBut').remove();
  $('#opponentStats').fadeIn();
};

view.removeEqupFromHtml = function() {
  playerMobile.armorSlots.forEach(function(element,index,array) {
    $('#'+element+'List').remove();
  });
};

view.playerEqiupToHtml = function() {
  playerMobile.armorSlots.forEach(function(element) {
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
  var tempArray = ['stringName','charClass','hits','mana','stam','str','dex','dex','wis','armor','magicResist'];
  tempArray.forEach(function(element) {
    $('#'+element+'Table').html(playerMobile[element]);
  });
  $('#levelTable').html('Level = ' + playerMobile.level +' Exp = ' + playerMobile.exp + ' Gold = ' + playerMobile.gold);
};

view.addOpponentStatsToHtml = function() {
  var tempArray = ['stringName','charClass','hits','mana','stam','str','dex','dex','wis','armor','magicResist'];
  tempArray.forEach(function(element) {
    $('#opponent'+element+'Table').html(playerMobile.combatant[element]);
  });
  $('#opponentlevelTable').html('Level = ' + playerMobile.combatant.level);
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
  $parent.append($('<button>').html('Use Ability').attr('id','useWepAbBut').on('click', combat.useWepAb));
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
  var $equipList = $('<select>').attr('id', bodyLoc+'List').append($('<option>').html('None').val('None'));
  $parent.append($equipList);
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
  var $wepListL = $('<select>').attr('id','leftHandList').append($('<option>').html('None').val('None'));
  $parentL.append($wepListL);
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
  var $wepListR = $('<select>').attr('id','rightHandList').append($('<option>').html('None').val('None'));
  $parentR.append($wepListR);
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
