var playerMobile = {
  level: 1,
  gold: 0,
  exp: 0,
  expToLvl: 100,
  stringName: null, // set to null for debugging
  charClass: null,// set to null for debugging
  hitPoints: 0,
  mana: 0,
  stam: 0,
  str: 0,
  dex: 0,
  wis: 0,
  magicResist: 0,
  minDmg: 1,
  maxDmg: 3,
  rightHand: null,
  leftHand: null,
  head: null,
  chest: null,
  arms: null,
  gloves: null,
  legs: null,
  boots: null,
  armor: 0,
  ticksMax: 10,
  inventory: [],
  knownSpells: [],
  knownWepAbs: [],
  passiveAbs: [],
  combatant: null
};
// var playerMobile.combatant = null;
playerMobile.death = function(opponent){
  playerMobile.hitPoints = 1;
  var exp = util.getRandomNum((opponent.level * 10), (opponent.level * 20));
  if(playerMobile.exp - exp < 0){
    playerMobile.exp - 0;
  }
  else{
    playerMobile.exp -= exp;
  }
  util.printToGameWindow(playerMobile.stringName +' has been knocked out and lost ' + exp + ' experience','negitive');
};

playerMobile.getMR = function(){
  var tempArmorArray = ['head','chest','arms','gloves','legs','boots'];
  var magicDef = 0;
  tempArmorArray.forEach(function (element,index,array) {
    if(playerMobile[element]!= null){
      magicDef += playerMobile[element].magicDef;
    }
  });
  return magicDef;
};
playerMobile.getAR = function(){
  var armorRating = 0;
  var tempArmorArray = ['head','chest','arms','gloves','legs','boots'];
  tempArmorArray.forEach(function (element,index,array) {
    if(playerMobile[element] != null){
      armorRating += playerMobile[element].rating;
    }
  });
  return armorRating;
};

playerMobile.passiveActs = function(){
  var $parent = $('#passActions');
  var usePassAb = function(e){
    e.preventDefault();
    var abChoice = document.getElementById('usePassAb').value;
    for (var i = 0; i < playerMobile.passiveAbs.length; i++) {
      if (playerMobile.passiveAbs[i].stringName === abChoice){
        abChoice = playerMobile.passiveAbs[i];
      }
    };
    if (playerMobile.stam < abChoice.stamCost){
      util.printToGameWindow('You need more stam to do that','negitive');
      return;
    }
    if (playerMobile.mana < abChoice.manaCost){
      util.printToGameWindow('You need more mana to do that','negitive');
      return;
    }
    switch(abChoice.stringName){
    case 'Rest':
      doPassRest(playerMobile);
      break;
    case 'Move':
      doMove();
      break;
    }
    playerMobile.updateStats();
  };
  var $action = $('<select>').attr('id', 'usePassAb');
  $parent.append($action);
  var abs = playerMobile.passiveAbs;

  for (var i = 0; i < abs.length; i++) {
    var $opt = $('<option>').html(abs[i].stringName).val(abs[i].stringName);
    $action.append($opt);
  };
  var $passAbBut = $('<button>').html('Use Ability').attr('id','usePassAbBut');
  $parent.append($passAbBut);
  $('#usePassAbBut').on('click', usePassAb);
};

playerMobile.levelUp = function(){
  if ((playerMobile.exp - playerMobile.expToLvl) > 0){
    playerMobile.exp -= playerMobile.expToLvl;
  }
  else{
    playerMobile.exp = 0;
  }
  playerMobile.level += 1;
  playerMobile.expToLvl = playerMobile.level * 100;
  playerMobile.str += Math.floor(playerMobile.str / 10);
  playerMobile.wis += Math.floor(playerMobile.wis / 10);
  playerMobile.dex += Math.floor(playerMobile.dex / 10);
  util.printToGameWindow(playerMobile.stringName+' has reached level '+playerMobile.level, 'positive');
};

playerMobile.makeEquipList = function(bodyLoc){
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

playerMobile.makeWepList = function(argument) {
  var $parentR = $('#rightHandEquip');
  var $parentL = $('#leftHandEquip');
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
  }
  else if(playerMobile.charClass === 'Warrior'){
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
  }
};

playerMobile.updateStats = function(){
  playerMobile.armor = playerMobile.getAR();
  playerMobile.magicResist = playerMobile.getMR();
  if (playerMobile.exp >= playerMobile.expToLvl){
    playerMobile.levelUp();
  }
  if (playerMobile.hits < 0){playerMobile.hits = 0;}
  if (playerMobile.stam < 0){playerMobile.stam = 0;}
  if (playerMobile.mana < 0){playerMobile.mana = 0;}
  view.playerStatsToHtml();
  view.playerEqiupToHtml();
  controller.saveChar(playerMobile.stringName, playerMobile);
  if (playerMobile.combatant != null){
    view.addOpponentStatsToHtml();
  }
  view.removeEqupFromHtml();

  playerMobile.makeEquipList('head');
  playerMobile.makeEquipList('chest');
  playerMobile.makeEquipList('arms');
  playerMobile.makeEquipList('gloves');
  playerMobile.makeEquipList('legs');
  playerMobile.makeEquipList('boots');
  playerMobile.makeWepList();
};

playerMobile.equipL = function(e){
  e.preventDefault();
  // console.log('equipL function');
  var currentWep = playerMobile.leftHand;
  var newWep = $('lHandList').val();
  var rightHandWep = playerMobile.rightHand;
  if(newWep === 'None'){
    // console.log('None choosen for Left hand');
    if(currentWep != null){
      playerMobile.inventory.push(currentWep);
    }
    playerMobile.leftHand = null;
    playerMobile.updateStats();
    return;
  }
  else if(newWep != null){
    // console.log('new wep picked');
    for (var i = 0; i < playerMobile.inventory.length; i++) {
      if(newWep === playerMobile.inventory[i].stringName){
        newWep = playerMobile.inventory[i];
        // console.log('new wep = '+ newWep + ' numHands ' + newWep.numHands);
        if(newWep.wepType === 'shield'){
          if (rightHandWep.numHands > 1){
            util.printToGameWindow('You can\'t equip a a shield while holding a two handed weapon' );
            return;
          };
        }
        if (newWep.wepType != 'shield' && newWep.numHands != 0){
            // console.log('can't duel weld this');
          return;
        }
        if(rightHandWep != null){
          if(newWep.wepType != 'shield' && rightHandWep.numHands > 1){
            // console.log('can't duel weld this becuase right hand wep is to big');
            return;
          }
        }
        if(playerMobile.leftHand != null){
          playerMobile.inventory.push(playerMobile.leftHand);
        }
        playerMobile.inventory.splice( i, 1);
        playerMobile.leftHand = newWep;
        playerMobile.updateStats();
        return;
      }
    };
  }
  else{
    playerMobile.leftHand = null;
    playerMobile.updateStats();
  }
};

playerMobile.equip = function(event, bodyLoc) {
  console.log(playerMobile[bodyLoc]);
  event.preventDefault();
  var currentArmor = playerMobile[bodyLoc];
  var newArmor = $('#'+bodyLoc+'List').val();
  if(newArmor === 'None'){
    if(currentArmor != null){
      playerMobile.inventory.push(currentArmor);
    }
    playerMobile[bodyLoc] = null;
    playerMobile.updateStats();
    return;
  }
  else if(newArmor != null)
  {
    for (var i = 0; i < playerMobile.inventory.length; i++) {
      if(newArmor === playerMobile.inventory[i].stringName){
        if(currentArmor != null){
          playerMobile.inventory.push(currentArmor);
        }
        newArmor = playerMobile.inventory[i];
        playerMobile.inventory.splice( i, 1);
        playerMobile[bodyLoc] = newArmor;
        playerMobile.updateStats();
        return;
      }
    };
  }
  else{
    playerMobile.bodyLoc = null;
  }
};
playerMobile.giveExp = function(attacker, defender){
  var exp = util.getRandomNum((defender.level * 10), (defender.level * 20));
  attacker.exp += exp;
  util.printToGameWindow(attacker.stringName +' has gained ' + exp + ' experience','exp');
};

playerMobile.giveGold = function(min, max, bonus){
  if (min > max){max = min;}
  var gold = util.getRandomNum(min, max);
  gold *= util.checkNaN(bonus);
  this.gold += util.checkNaN(gold);
  util.printToGameWindow(playerMobile.stringName +' has found ' + gold + ' gold','loot');
};

playerMobile.giveLoot = function(attacker, defender, lootLevel){
  lootLevel = util.checkNaN(lootLevel);
  playerMobile.giveGold(attacker.level,(attacker.level * 10), lootLevel);
  if (util.getRandomNum(attacker.level, 100) > util.getRandomNum(defender.level, 100)){
    playerMobile.updateStats();
    return;
  }
  if(lootLevel < 5){
    // TODO refactor with out for loop
    var i = util.getRandomNum(0, lootPackBasic.length - 1);
    util.printToGameWindow(attacker.stringName +' has found ' + lootPackBasic[i].stringName,'loot');
    playerMobile.inventory.push(lootPackBasic[i]);
    playerMobile.updateStats();
    return;
  }
};
