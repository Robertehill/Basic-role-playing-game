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
  rHand: null,
  lHand: null,
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
  var magicDef = 0;
  if(playerMobile.head != null){
    magicDef += playerMobile.head.magicDef;
  }
  if(playerMobile.chest != null){
    magicDef += playerMobile.chest.magicDef;
  }
  if(playerMobile.arms != null){
    magicDef += playerMobile.arms.magicDef;
  }
  if(playerMobile.gloves != null){
    magicDef += playerMobile.gloves.magicDef;
  }
  if(playerMobile.legs != null){
    magicDef += playerMobile.legs.magicDef;
  }
  if(playerMobile.boots != null){
    magicDef += playerMobile.boots.magicDef;
  }
  return magicDef;

};
playerMobile.getAR = function(){
  var armorRating = 0;
  if(playerMobile.head != null){
    armorRating += playerMobile.head.rating;
  }
  if(playerMobile.chest != null){
    armorRating += playerMobile.chest.rating;
  }
  if(playerMobile.arms != null){
    armorRating += playerMobile.arms.rating;
  }
  if(playerMobile.gloves != null){
    armorRating += playerMobile.gloves.rating;
  }
  if(playerMobile.legs != null){
    armorRating += playerMobile.legs.rating;
  }
  if(playerMobile.boots != null){
    armorRating += playerMobile.boots.rating;
  }
  if(playerMobile.lHand != null){
    if(playerMobile.lHand.wepType === 'shield'){

      armorRating += playerMobile.lHand.armor;
    }
  }
  return armorRating;

};
playerMobile.passiveActs = function(){
  var parent = document.getElementById('passActions');
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
      // console.log('passive Ability function = '+ abChoice.stringName);
      break;
        // case 'Flee':
        //   //doFlee();
        //   console.log('weapon Ability function using..'+ abChoice.stringName + ' on ' + opponent.stringName);

        //   break;
    }
    updateStats();
  };
  var action = document.createElement('select');
  parent.appendChild(action);
  var abs = playerMobile.passiveAbs;

  for (var i = 0; i < abs.length; i++) {
    var opt = document.createElement('option');

    opt.innerHTML = abs[i].stringName;
    opt.value = abs[i].stringName;
    action.appendChild(opt);
  };
  action.id = 'usePassAb';
  var passAbBut = document.createElement('button');
  passAbBut.type = 'click';
  passAbBut.id = 'usePassAbBut';
  passAbBut.innerHTML = 'Use Ability';
  parent.appendChild(passAbBut);

  var passAbButton = document.getElementById('usePassAbBut');
  passAbButton.addEventListener('click', usePassAb);

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
  var $wepListR = $('<select>').attr('id','wepListR');
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
    var $wepListL = $('<select>').attr('id','wepListL');
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
    var $wepListL = $('<select>').attr('id', 'wepListL');
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
    levelUp();
  }
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
  // makeEquipList('leftHand');
};
playerMobile.equipR = function(e){
  e.preventDefault();
  // console.log('equip right function');
  var currentWep = playerMobile.rHand;
  var leftHandWep = playerMobile.lHand;

  var newWep = document.getElementById('wepListR').value;
  if(newWep === 'None'){
    // console.log('None choosen for Right hand');
    if(currentWep != null){
      playerMobile.inventory.push(currentWep);
    }
    playerMobile.rHand = null;
    updateStats();
    return;
  }
  else if(newWep != null){
    for (var i = 0; i < playerMobile.inventory.length; i++) {
      if(newWep === playerMobile.inventory[i].stringName){
        if(currentWep != null){
          playerMobile.inventory.push(currentWep);
        }
        newWep = playerMobile.inventory[i];
        playerMobile.inventory.splice( i, 1);
        playerMobile.rHand = newWep;
        if (newWep.numHands > 1 && leftHandWep != null){
          playerMobile.inventory.push(leftHandWep);
          playerMobile.lHand = null;
        }
        playerMobile.updateStats();
        return;
      }
    };
  }
  else
  {
    playerMobile.rHand = null;
  }
};
var rightHandEquipBut = document.getElementById('rightHandEquipBut');
rightHandEquipBut.addEventListener('click', playerMobile.equipR);

playerMobile.equipL = function(e){
  e.preventDefault();
  // console.log('equipL function');
  var currentWep = playerMobile.lHand;
  var newWep = document.getElementById('wepListL').value;
  var rightHandWep = playerMobile.rHand;
  if(newWep === 'None'){
    // console.log('None choosen for Left hand');
    if(currentWep != null){
      playerMobile.inventory.push(currentWep);
    }
    playerMobile.lHand = null;
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
        if(playerMobile.lHand != null){
          playerMobile.inventory.push(playerMobile.lHand);
        }
        playerMobile.inventory.splice( i, 1);
        playerMobile.lHand = newWep;
        playerMobile.updateStats();
        return;
      }
    };
  }
  else{
    playerMobile.lHand = null;
    playerMobile.updateStats();
  }
};

var leftHandEquipBut = document.getElementById('leftHandEquipBut');
leftHandEquipBut.addEventListener('click', playerMobile.equipL);

playerMobile.equipHead = function(e){
  e.preventDefault();
  // console.log('equip head function');
  var currentArmor = playerMobile.head;
  var newArmor = document.getElementById('headList').value;
  if(newArmor === 'None'){
    // console.log('None choosen for head');
    if(currentArmor != null){
      playerMobile.inventory.push(currentArmor);
    }
    playerMobile.head = null;
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
        playerMobile.head = newArmor;
        playerMobile.updateStats();
        return;
      }
    };
  }
  else{
    playerMobile.head = null;
  }
};

var headEquipBut = document.getElementById('headEquipBut');
headEquipBut.addEventListener('click', playerMobile.equipHead);

playerMobile.equipChest = function(e){
  e.preventDefault();
  // console.log('equip chest function');
  var currentArmor = playerMobile.chest;
  var newArmor = document.getElementById('chestList').value;
  if(newArmor === 'None'){
    // console.log('None choosen for chest');
    if(currentArmor != null){
      playerMobile.inventory.push(currentArmor);
    }
    playerMobile.chest = null;
    playerMobile.updateStats();
    return;
  }
  else if(newArmor != null){
    for (var i = 0; i < playerMobile.inventory.length; i++) {
      if(newArmor === playerMobile.inventory[i].stringName){
        if(currentArmor != null){
          playerMobile.inventory.push(currentArmor);
        }


        newArmor = playerMobile.inventory[i];
        playerMobile.inventory.splice( i, 1);

        playerMobile.chest = newArmor;
        playerMobile.updateStats();
        return;
      }
    };

  }
  else{
    playerMobile.chest = null;
  }
};

var chestEquipBut = document.getElementById('chestEquipBut');
chestEquipBut.addEventListener('click', playerMobile.equipChest);

playerMobile.equipArms = function(e){
  e.preventDefault();
  // console.log('equip arms function');
  var currentArmor = playerMobile.arms;
  var newArmor = document.getElementById('armsList').value;
  if(newArmor === 'None'){
    // console.log('None choosen for arms');
    if(currentArmor != null){
      playerMobile.inventory.push(currentArmor);
    }
    playerMobile.arms = null;
    playerMobile.playerMobile.updateStats();
    return;
  }
  else if(newArmor != null){
    for (var i = 0; i < playerMobile.inventory.length; i++){
      if(newArmor === playerMobile.inventory[i].stringName){
        if(currentArmor != null){
          playerMobile.inventory.push(currentArmor);
        }
        newArmor = playerMobile.inventory[i];
        playerMobile.inventory.splice( i, 1);
        playerMobile.arms = newArmor;
        playerMobile.updateStats();
        return;
      }
    };
  }
  else{
    playerMobile.arms = null;
  }
};

var armsEquipBut = document.getElementById('armsEquipBut');
armsEquipBut.addEventListener('click', playerMobile.equipArms);
playerMobile.equipGloves = function(e){
  e.preventDefault();
  // console.log('equip gloves function');
  var currentArmor = playerMobile.gloves;
  var newArmor = document.getElementById('glovesList').value;
  if(newArmor === 'None'){
    // console.log('None choosen for gloves');
    if(currentArmor != null){
      playerMobile.inventory.push(currentArmor);
    }
    playerMobile.gloves = null;
    playerMobile.updateStats();
    return;
  }
  else if(newArmor != null){
    for (var i = 0; i < playerMobile.inventory.length; i++) {
      if(newArmor === playerMobile.inventory[i].stringName){
        if(currentArmor != null){
          playerMobile.inventory.push(currentArmor);
        }
        newArmor = playerMobile.inventory[i];
        playerMobile.inventory.splice( i, 1);
        playerMobile.gloves = newArmor;
        playerMobile.updateStats();
        return;
      }
    };
  }
  else{
    playerMobile.gloves = null;
  }
};

var glovesEquipBut = document.getElementById('glovesEquipBut');
glovesEquipBut.addEventListener('click', playerMobile.equipGloves);

playerMobile.equipLegs = function(e){
  e.preventDefault();
  // console.log('equip legs function');
  var currentArmor = playerMobile.legs;
  var newArmor = document.getElementById('legsList').value;
  if(newArmor === 'None'){
    // console.log('None choosen for legs');
    if(currentArmor != null){
      playerMobile.inventory.push(currentArmor);
    }
    playerMobile.legs = null;
    playerMobile.updateStats();
    return;
  }
  else if(newArmor != null){
    for (var i = 0; i < playerMobile.inventory.length; i++) {
      if(newArmor === playerMobile.inventory[i].stringName){
        if(currentArmor != null){
          playerMobile.inventory.push(currentArmor);
        }
        newArmor = playerMobile.inventory[i];
        playerMobile.inventory.splice( i, 1);
        playerMobile.legs = newArmor;
        playerMobile.updateStats();
        return;
      }
    };
  }
  else{
    playerMobile.legs = null;
  }
};

var legsEquipBut = document.getElementById('legsEquipBut');
legsEquipBut.addEventListener('click', playerMobile.equipLegs);

playerMobile.equipBoots = function(e){
  e.preventDefault();
  // console.log('equip boots function');
  var currentArmor = playerMobile.boots;
  var newArmor = document.getElementById('bootsList').value;
  if(newArmor === 'None'){
    // console.log('None choosen for boots');
    if(currentArmor != null){
      playerMobile.inventory.push(currentArmor);
    }
    playerMobile.boots = null;
    playerMobile.updateStats();
    return;
  }
  else if(newArmor != null){
    for (var i = 0; i < playerMobile.inventory.length; i++) {
      if(newArmor === playerMobile.inventory[i].stringName){
        if(currentArmor != null){
          playerMobile.inventory.push(currentArmor);
        }
        newArmor = playerMobile.inventory[i];
        playerMobile.inventory.splice( i, 1);
        playerMobile.boots = newArmor;
        playerMobile.updateStats();
        return;
      }
    };
  }
  else{
    playerMobile.boots = null;
  }
};

var bootsEquipBut = document.getElementById('bootsEquipBut');
bootsEquipBut.addEventListener('click', playerMobile.equipBoots);

playerMobile.giveExp = function(attacker, defender){
  var exp = util.getRandomNum((defender.level * 10), (defender.level * 20));

  attacker.exp += exp;
  util.printToGameWindow(attacker.stringName +' has gained ' + exp + ' experience','exp');

};
playerMobile.giveLoot = function(attacker, defender, lootLevel){
  var gold = util.getRandomNum((defender.level), (defender.level * 10));
  if (lootLevel < 0 || lootLevel === NaN){
    lootLevel = 0;
  }
  if(gold < 1){
    gold = 1;
  }
  gold *= lootLevel;
  attacker.gold += gold;
  util.printToGameWindow(attacker.stringName +' has found ' + gold + ' gold','loot');
  if (util.getRandomNum(attacker.level, 100) > util.getRandomNum(defender.level, 100)){
      // console.log('random loot chance failed');
    playerMobile.updateStats();
    return;
  }
  if(lootLevel < 5){

    for (var i = util.getRandomNum(0, lootPackBasic.length - 1); i < lootPackBasic.length; i++){
      util.printToGameWindow(attacker.stringName +' has found ' + lootPackBasic[i].stringName,'loot');
      playerMobile.inventory.push(lootPackBasic[i]);
      playerMobile.updateStats();
      return;
    };
  }
};
