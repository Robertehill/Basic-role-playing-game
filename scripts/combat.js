var combat = {};
combat.endCombat = function(){
  view.endCombat();
  playerMobile.passiveActs();
};

combat.hitChance = function(attacker, defender, hitBonus){
  var dexChance = ((attacker.dex - defender.dex) + 100 ) - 50;
  dexChance = util.checkNaN(dexChance);
  hitBonus = util.checkNaN(hitBonus);

  dexChance += hitBonus;
  if(dexChance < 1){
    dexChance = 1;
  }
  if(dexChance >= 100){
    return true;
  }
  else if (dexChance >= util.getRandomNum(1,100)){
    return true;
  }
  else{
    return false;
  }
};
combat.randomCombat = function(level, chance){
  var lvl = 0;
  if (level > playerMobile.level + Math.floor(playerMobile.level / 10)){
    lvl = playerMobile.level + Math.floor(playerMobile.level / 10);
  }
  else{
    lvl = level;
  }
  if(chance < util.getRandomNum(1, 100)){
    return;
  }
  for (var i = util.getRandomNum(0, monsterList.length -1); i < monsterList.length; i++){
    if (monsterList[i].level <= lvl){
      playerMobile.combat(monsterList[i]);
      return;
    }
  };
};
//TODO  make useable by NPCs
combat.useWepAb = function(e){
  e.preventDefault();
  var abChoice = $('#useWepAb').val();
  for (var i = 0; i < playerMobile.knownWepAbs.length; i++) {
    if (playerMobile.knownWepAbs[i].stringName === abChoice){
      abChoice = playerMobile.knownWepAbs[i];
    }
  };
  if (playerMobile.stam - abChoice.stamCost < 0 ){
    util.printToGameWindow('You need more stam to do that','negitive');
    return;
  }
  if (playerMobile.mana - abChoice.manaCost < 0){
    util.printToGameWindow('You need more mana to do that','negitive');
    return;
  }
  // TODO break down to a getActiveWepAbs function
  switch(abChoice.stringName){
  case 'Rest':
    doCombatRest(playerMobile, playerMobile.combatant);
    if (playerMobile.combatant != null){
      playerMobile.combatant.combat(playerMobile);
    }
    break;

  case 'Swing Weapon':
    combat.doMeleeAttack(playerMobile, playerMobile.combatant, 0, 0);
    if (playerMobile.combatant != null){
      playerMobile.combatant.combat(playerMobile);
    }
    break;

  case 'Flee':
    combat.endCombat();
    break;

  case 'Double Strike':
    doubleStrike.use(playerMobile, playerMobile.combatant);
    break;

  case 'Poison':
    var pLevel = Math.floor(playerMobile.wis / 20);
    var pCount = Math.floor(playerMobile.dex / 5);
    poison.use(playerMobile, playerMobile.combatant, pLevel, pCount);
    break;

  case 'Shield Bash':
    shieldBash.use(playerMobile, playerMobile.combatant, Math.floor(playerMobile.str / 20));
    break;
  }
  //Add new weapon abilities here
  playerMobile.updateStats();
};
// TODO make useable by NPCs
combat.castSpell = function(e) {
  e.preventDefault();
  var spellChoice = $('spells').val();
  for (var i = 0; i < playerMobile.knownSpells.length; i++) {
    if (playerMobile.knownSpells[i].stringName === spellChoice){
      spellChoice = playerMobile.knownSpells[i];
    }
  };
  if (playerMobile.mana - spellChoice.manaCost < 0){
    util.printToGameWindow('You need more mana to do that','negitive');
    return;
  }
  // TODO break down to a get active spells function
  switch(spellChoice.stringName){

  case 'Fire Ball':
    // console.log('casting fireBall');
    fireBallSpell.castDmg(playerMobile, playerMobile.combatant, 0);
    if (playerMobile.combatant != null){
      playerMobile.combatant.combat(playerMobile);
    }
    break;

  case 'Lesser Heal':
    lesserHealSpell.castHeal(playerMobile, playerMobile,0);
    break;
    // add new spells here
  }
};

combat.doMeleeAttack = function(attacker, defender, hitBonus, dmgBonus){
  var stamLoss = 0;
  hitBonus = util.checkNaN(hitBonus);
  dmgBonus = util.checkNaN(dmgBonus);
  if(attacker.stam === 0){
    util.printToGameWindow(attacker.stringName + ' does not have enough stamina to swing thier weapon', 'negitive');
    return;
  }
  if (defender === playerMobile){
    if (combat.hitChance(attacker, defender, hitBonus)){
      var damage = util.getRandomNum(attacker.minDmg, attacker.maxDmg) + dmgBonus;
      stamLoss += 1;
      if (playerMobile.leftHand != null){
        if (playerMobile.leftHand.wepType === 'shield'){
          var shield = playerMobile.leftHand;
          if (shield.blockChance > util.getRandomNum(1,100)){
            var reducedDamage = Math.floor(damage * ((shield.armor * 2) / 100));
            if (reducedDamage < 1){
              reducedDamage = 1;
            }
            damage -= reducedDamage;
            util.printToGameWindow(defender.stringName + ' blocked the hit and reduced the damage by ' + reducedDamage,'positive');
          }
        }
      }
      damage += damage * (attacker.str / 1000);
      var critChance = util.getRandomNum(0, Math.floor(attacker.dex / 10));
      if (critChance > util.getRandomNum(0,100)){
        console.log('monster crit Hit for an extra'+ Math.floor(attacker.str / 10) +' damage');
        damage += Math.floor(attacker.str / 10);
      }
      var reducedDamage = Math.floor(damage * (defender.armor / 100));
      reducedDamage = util.checkNaN(reducedDamage);
      damage -= reducedDamage;
      damage = Math.floor(damage);
      if (damage < 1){
        damage = 1;
      }
      if (damage < defender.hitPoints){
        defender.hitPoints -= damage;
        attacker.stam -= stamLoss;
        util.printToGameWindow(attacker.stringName +' hits ' + defender.stringName + ' for '+ damage +' damage','negitive');
        playerMobile.updateStats();
      }
      else{
        util.printToGameWindow(attacker.stringName +' hits ' + defender.stringName + ' for '+ damage +' damage','negitive');
        playerMobile.updateStats();
        attacker.stam -= stamLoss;
        defender.hitPoints = 0;
        playerMobile.death(attacker);
        combat.endCombat();
      }
    }
    else{
      attacker.stam -= 1;
      util.printToGameWindow(attacker.stringName +' misses '+ defender.stringName);
    }
  }
  else{
    // console.log('defender is monster')
    var damage = util.getRandomNum(attacker.minDmg, attacker.maxDmg) + dmgBonus;
    var damage2 = util.getRandomNum(attacker.minDmg, attacker.maxDmg) + dmgBonus;
    var duelWeild = false;
    if ( attacker === playerMobile){
      if ( attacker.rightHand != null){
        weapon = attacker.rightHand;
        stamLoss += weapon.stamUsed;
        damage = util.getRandomNum(weapon.minDmg, weapon.maxDmg)+ dmgBonus;
      }
      else{
        stamLoss += 1;
        damage = util.getRandomNum(playerMobile.minDmg, playerMobile.maxDmg)+ dmgBonus;
      }
      if(attacker.leftHand != null){
        weapon2 = attacker.leftHand;
        if(weapon2.wepType != 'shield'){
          duelWeild = true;
          damage2 = util.getRandomNum(weapon2.minDmg, weapon2.maxDmg)+ dmgBonus;
        }
      }
    }
    if(attacker.stam - stamLoss < 0){
      util.printToGameWindow(attacker.stringName + ' does not have enough stamina to swing thier weapon');
      return;
    }
    damage += damage * (attacker.str / 1000);
    damage2 += damage2 * (attacker.str / 1000);
    var critChance = util.getRandomNum(0, Math.floor(attacker.dex / 10));
    if (critChance > util.getRandomNum(0,100)){
      // console.log('player crit Hit for an extra'+ Math.floor(attacker.str / 10) +' damage');
      damage += attacker.str / 10;
    }
    if (critChance > util.getRandomNum(0,100)){
      // console.log('player crit Hit for an extra'+ Math.floor(attacker.str / 10) +' damage');
      damage2 += attacker.str / 10;
    }
    var reducedDamage1 = util.checkNaN(Math.floor(damage * (defender.armor / 100)));
    var reducedDamage2 = util.checkNaN(Math.floor(damage2 * (defender.armor / 100)));

    if (duelWeild){
      if(attacker.rightHand != null){
        damage -= damage * ((attacker.rightHand.numHands + 2) * 10) / 100;
      }
      if (attacker.leftHand != null){
        damage2 -= damage2 * ((attacker.leftHand.numHands + 2) * 10) / 100;
      }
    }
    damage -= reducedDamage1;
    damage2 -= reducedDamage2;
    damage = Math.floor(damage);
    damage2 = Math.floor(damage2);
    if (damage2 < 1){
      damage2 = 1;
    }
    if (damage < 1){
      damage = 1;
    }
    if(attacker.stam - stamLoss < 0){
      util.printToGameWindow(attacker.stringName + ' does not have enough stamina to swing thier weapon', 'negitive');
      return;
    }
    if(combat.hitChance(attacker, defender, hitBonus) && defender.hitPoints > 0){
      if (damage < defender.hitPoints ){
        defender.hitPoints -= damage;
        attacker.stam -= stamLoss;
        playerMobile.updateStats();
        util.printToGameWindow(attacker.stringName +' hits ' + defender.stringName+ ' for '+ damage +' damage','positive');
      }
      else{
        defender.hitPoints = 0;
        attacker.stam -= stamLoss;
        playerMobile.updateStats();
        util.printToGameWindow(attacker.stringName +' hits ' + defender.stringName+ ' for '+ damage +' damage','positive');
      }
    }
    else{
      util.printToGameWindow(attacker.stringName +' misses '+ defender.stringName);
    }
    if(duelWeild === true && defender.hitPoints > 0 && (attacker.stam - stamLoss) >= 0){
      if(combat.hitChance(attacker, defender, hitBonus)){
        if (damage2 < defender.hitPoints){
          defender.hitPoints -= damage2;
          attacker.stam -= stamLoss;
          playerMobile.updateStats();
          util.printToGameWindow(attacker.stringName +' hits ' + defender.stringName+ ' for '+ damage2 +' damage','positive');
        }
        else{
          defender.hitPoints = 0;
          attacker.stam -= stamLoss;
          playerMobile.updateStats();
          util.printToGameWindow(attacker.stringName +' hits ' + defender.stringName+ ' for '+ damage2 +' damage','positive');
        }
      }
      else{
        util.printToGameWindow(attacker.stringName +' misses '+ defender.stringName);
      }
    }
  }
};
playerMobile.combat = function(opponent){
  playerMobile.combatant = new Monster(opponent.stringName, opponent.level, opponent.hitPoints, opponent.mana, opponent.stam, opponent.str, opponent.wis, opponent.dex, opponent.armor, opponent.magicResist, opponent.minDmg, opponent.maxDmg);
  playerMobile.updateStats();
  view.startCombat();

  if (this.hitPoints > 0){
    util.printToGameWindow('You are fighting ' + opponent.stringName, 'negitive');
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

    if (this.charClass ==='Wizard'){
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
    }
  }
  else{
    playerMobile.death(opponent);
  }
};
