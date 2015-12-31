var combat = {};
combat.endCombat = function(){
  $('#useWepAb').remove();
  $('#useWepAbBut').remove();
  $('#opponentStats').hide();
  playerMobile.combatant = null;
  if(playerMobile.charClass === 'Wizard'){
    $('#spells').remove();
    $('#cast').remove();
  }
  playerMobile.passiveActs();
};

combat.hitChance = function(attacker, defender, hitBonus){
  var dexChance = ((attacker.dex - defender.dex) + 100 ) - 50;
  if(dexChance <= 0 || dexChance === NaN ) {
    dexChance = 0;
  };
  if(hitBonus <= 0 || hitBonus === NaN){
    hitBonus = 0;
  }
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
combat.doMeleeAttack = function(attacker, defender, hitBonus, dmgBonus){
  var stamLoss = 0;
  if (hitBonus < 0 || hitBonus === NaN) {
    hitBonus = 0;
  };
  if (dmgBonus < 0 || dmgBonus === NaN) {
    dmgBonus = 0;
  };
  if(attacker.stam === 0){
    util.printToGameWindow(attacker.stringName + ' does not have enough stamina to swing thier weapon', 'negitive');
    return;
  }
  if (defender === playerMobile){
    if (combat.hitChance(attacker, defender, hitBonus)){
      var damage = util.getRandomNum(attacker.minDmg, attacker.maxDmg) + dmgBonus;
      stamLoss += 1;
      if (playerMobile.lHand != null){
        if (playerMobile.lHand.wepType === 'shield'){
          var shield = playerMobile.lHand;
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
      if (reducedDamage < 0){
        reducedDamage = 0;
      }
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
        updateStats();
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
      if ( attacker.rHand != null){
        weapon = attacker.rHand;
        stamLoss += weapon.stamUsed;
        damage = util.getRandomNum(weapon.minDmg, weapon.maxDmg)+ dmgBonus;
      }
      else{
        stamLoss += 1;
        damage = util.getRandomNum(playerMobile.minDmg, playerMobile.maxDmg)+ dmgBonus;
      }
      if(attacker.lHand != null){
        weapon2 = attacker.lHand;
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
      console.log('player crit Hit for an extra'+ Math.floor(attacker.str / 10) +' damage');
      damage += attacker.str / 10;

    }
    if (critChance > util.getRandomNum(0,100)){
      console.log('player crit Hit for an extra'+ Math.floor(attacker.str / 10) +' damage');
      damage2 += attacker.str / 10;

    }
    var reducedDamage1 = Math.floor(damage * (defender.armor / 100));
    if (reducedDamage1 < 0){
      reducedDamage1 = 0;
    }
    var reducedDamage2 = Math.floor(damage2 * (defender.armor / 100));
    if (reducedDamage2 < 0){
      reducedDamage2 = 0;
    }
    if (duelWeild){
      if(attacker.rHand != null){
        damage -= damage * ((attacker.rHand.numHands + 2) * 10) / 100;
      }
      if (attacker.lHand != null){
        damage2 -= damage2 * ((attacker.lHand.numHands + 2) * 10) / 100;
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
  $('#usePassAb').remove();
  $('#usePassAbBut').remove();
  playerMobile.combatant = new Monster(opponent.stringName, opponent.level, opponent.hitPoints, opponent.mana, opponent.stam, opponent.str, opponent.wis, opponent.dex, opponent.armor, opponent.magicResist, opponent.minDmg, opponent.maxDmg);
  $('#opponentStats').fadeIn();
  playerMobile.updateStats();
  var castSpell = function(e) {
    e.preventDefault();
    var spellChoice = document.getElementById('spells').value;
    for (var i = 0; i < playerMobile.knownSpells.length; i++) {
      if (playerMobile.knownSpells[i].stringName === spellChoice){
        spellChoice = playerMobile.knownSpells[i];
      }
    };
    if (playerMobile.mana - spellChoice.manaCost < 0){
      util.printToGameWindow('You need more mana to do that','negitive');
      return;
    }
    switch(spellChoice.stringName){

    case 'Fire Ball':
      console.log('casting fireBall');
      fireBallSpell.castDmg(playerMobile, playerMobile.combatant, 0);
      if (playerMobile.combatant != null){
        playerMobile.combatant.combat(playerMobile);
      }
      break;

    case 'Lesser Heal':
      lesserHealSpell.castHeal(playerMobile, playerMobile,0);
      break;
    }
  };
  var useWepAb = function(e){
    e.preventDefault();
    var $abChoice = $('#useWepAb').val();
    for (var i = 0; i < playerMobile.knownWepAbs.length; i++) {
      if (playerMobile.knownWepAbs[i].stringName === $abChoice){
        $abChoice = playerMobile.knownWepAbs[i];
      }
    };
    if (playerMobile.stam - $abChoice.stamCost < 0 ){
      util.printToGameWindow('You need more stam to do that','negitive');
      return;
    }
    if (playerMobile.mana - $abChoice.manaCost < 0){
      util.printToGameWindow('You need more mana to do that','negitive');
      return;
    }
    switch($abChoice.stringName){
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
  if (this.hitPoints > 0){
    util.printToGameWindow('You are fighting ' + opponent.stringName, 'negitive');
    // need to refactor using JQ
    var parent = document.getElementById('aggrActions');
    var action = document.createElement('select');
    parent.appendChild(action);
    var abs = playerMobile.knownWepAbs;
    // $('#aggrActions').append($('<select>')
    // .append($('<option>')));

    for (var i = 0; i < abs.length; i++) {
      var opt = document.createElement('option');

      opt.innerHTML = abs[i].stringName;
      opt.value = abs[i].stringName;
      action.appendChild(opt);
    };
    action.id = 'useWepAb';
    var wepAbBut = document.createElement('button');
    wepAbBut.type = 'click';
    wepAbBut.id = 'useWepAbBut';
    wepAbBut.innerHTML = 'Use Ability';
    parent.appendChild(wepAbBut);

    var wepAbButton = document.getElementById('useWepAbBut');
    wepAbButton.addEventListener('click', useWepAb);

    if (this.charClass ==='Wizard'){
      var action2 = document.createElement('select');
      parent.appendChild(action2);
      var spells = playerMobile.knownSpells;

      for (var i = 0; i < spells.length; i++) {
        var opt = document.createElement('option');

        opt.innerHTML = spells[i].stringName;
        opt.value = spells[i].stringName;
        action2.appendChild(opt);
      };
      action2.id = 'spells';
      var castBut = document.createElement('button');
      castBut.type = 'click';
      castBut.id = 'cast';
      castBut.innerHTML = 'Cast Spell';
      parent.appendChild(castBut);

      var castButton = document.getElementById('cast');
      castButton.addEventListener('click', castSpell);
    }
  }
  else{
    playerMobile.death(opponent);
  }
};
