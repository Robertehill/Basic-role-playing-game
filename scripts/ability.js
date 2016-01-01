
function WepAb(stringName, stamCost, manaCost) {
  this.stringName = stringName;
  this.stamCost = stamCost;
  this.manaCost = manaCost;
}
function PassAb(stringName, stamCost, manaCost) {
  this.stringName = stringName;
  this.stamCost = stamCost;
  this.manaCost = manaCost;
}
function doMove(){
  var randEvent = util.getRandomNum(1, 1 /* should equal length of switch*/);
  switch(randEvent){
  case 1:
    combat.randomCombat(playerMobile.level, 100);
    break;
  }
  playerMobile.updateStats();
}
function doPassRest(self){
  util.printToGameWindow(self.stringName + ' is resting.');
  // randomCombat(playerMobile.level, 10);
  if (self.hits < self.str){
    if (self.hits + (Math.floor(self.str / 5)) >= self.str){
      self.hits = self.str;
    }else{
      self.hits += Math.floor(self.str / 5);
    }
  }
  if (self.mana < self.wis){
    if (self.mana + (Math.floor(self.wis / 5)) >= self.wis){
      self.mana = self.wis;
    }else{
      self.mana += Math.floor(self.wis / 5);
    }
  }
  if (self.stam < self.dex){
    if (self.stam + (Math.floor(self.dex / 5)) >= self.dex){
      self.stam = self.dex;
    }else{
      self.stam += Math.floor(self.dex / 5);
    }
  }
  playerMobile.updateStats();
}
function doCombatRest(self, opponent){
  util.printToGameWindow(self.stringName + ' is resting.');
  if (self.hits < self.str){
    if (self.hits + (Math.floor(self.str / 10)) >= self.str){
      self.hits = self.str;
    }else{
      self.hits += Math.floor(self.str / 10);
    }
  }
  if (self.mana < self.wis){
    if (self.mana + (Math.floor(self.wis / 10)) >= self.wis){
      self.mana = self.wis;
    }else{
      self.mana += Math.floor(self.wis / 10);
    }
  }
  if (self.stam < self.dex){
    if (self.stam + (Math.floor(self.dex / 10)) >= self.dex){
      self.stam = self.dex;
    }else{
      self.stam += Math.floor(self.dex / 10);
    }
  }
  playerMobile.updateStats();
}

//passive abilities
var pRest = new PassAb('Rest', 0, 0); // passive rest
var move = new PassAb('Move', 1, 0);


// weapon abilities
var swing = new WepAb('Swing Weapon', 0, 0);
var flee = new WepAb('Flee', 0, 0);
var cRest = new WepAb('Rest', 0, 0); //combat rest


var shieldBash = new WepAb('Shield Bash', 5, 0);
shieldBash.use = function(attacker, defender, count){
  if (attacker.mana - this.manaCost < 0){
    util.printToGameWindow('You don\'t have the mana to do that' , 'negitive');
    return;
  }
  if (attacker.stam - this.stamCost < 0){
    util.printToGameWindow('You don\'t have the stamina to do that', 'negitive');
    return;
  }
  if (attacker === playerMobile){
    var wepL = attacker.leftHand;
    if (wepL != null){
      if (wepL.wepType === 'shield'){
        if(count < 1 ){
          count = 1;
        }
        attacker.stam -= this.stamCost;
        attacker.mana -= this.manaCost;
        if(hitChance(attacker,defender, 25)){
          // console.log('poison works');
          util.printToGameWindow(attacker.stringName +' has stunned '+ defender.stringName, 'negitive');

          defender.stunned = true;
          defender.stunCount = count;
        }
        else{
          util.printToGameWindow(attacker.stringName +' shield bash misses', 'negitive');
        }
        if (defender != null){
          defender.combat(attacker);
        }
      }
    }
    else{
      util.printToGameWindow('You need a piercing weapon in a hand to do this!', 'negitive');
    }
  }
};

var doubleStrike = new WepAb('Double Strike', 5, 5);

doubleStrike.use = function(attacker, defender){
  if (attacker.mana - this.manaCost < 0){
    util.printToGameWindow('You don\'t have the mana to do that', 'negitive');
    return;
  }
  if (attacker.stam - this.stamCost < 0){
    util.printToGameWindow('You don\'t have the stamina to do that', 'negitive');
    return;
  }
  if (attacker === playerMobile){
    var wepR = attacker.rightHand;
    var wepL = attacker.leftHand;
    attacker.stam -= this.stamCost;
    attacker.mana -= this.manaCost;
    // console.log('doubleStrike works');
    combat.doMeleeAttack(attacker, defender, 0, 0);
    setTimeout(function(){
      if(defender !=null && defender.hits > 0){
        combat.doMeleeAttack(attacker, defender, -10, 0);
        if (defender != null){
          defender.combat(attacker);
        }
      }
    }, 300);
    if (defender != null && defender.hits <= 0){
      defender.combat(attacker);
    }
  }
};

var poison = new WepAb('Poison', 5, 5);
poison.use = function(attacker, defender, level, count){
  if (attacker.mana - this.manaCost < 0){
    util.printToGameWindow('You don\'t have the mana to do that','negitive');
    return;
  }
  if (attacker.stam - this.stamCost < 0){
    util.printToGameWindow('You don\'t have the stamina to do that','negitive');
    return;
  }
  if (attacker === playerMobile){
    var wepR = attacker.rightHand;
    var wepL = attacker.leftHand;
    var wepDmg = 0;
    if (wepL != null || wepR != null){
      if (wepR.wepType === 'pierce' || wepL.wepType === 'pierce'){
        if(wepR.wepType === 'pierce')
        {
          wepDmg = util.getRandomNum(wepR.minDmg, wepR.maxDmg);
        }
        else if(wepL.wepType === 'pierce')
        {
          wepDmg = util.getRandomNum(wepL.minDmg, wepL.maxDmg);
        }
        if(count < 1 ){
          count = 1;
        }
        if(level < 1){
          level = 1;
        }
        if(level > 5){
          level = 5;
        }
        attacker.stam -= this.stamCost;
        attacker.mana -= this.manaCost;
        if(combat.hitChance(attacker,defender, 25)){
          // console.log('poison works');
          util.printToGameWindow(attacker.stringName +' has hit '+ defender.stringName +' for '+wepDmg+' damage and poisoned them','positive');
          defender.hits -= wepDmg;
          defender.poisoned = true;
          defender.poisonCount = count;
          defender.poisonLevel = level;
        }
        else{
          util.printToGameWindow(attacker.stringName +' poison attack misses');
        }
        if (defender != null){
          defender.combat(attacker);
        }
      }
    }
    else{
      util.printToGameWindow('You need a piercing weapon in a hand to do this!','negitive');
    }
  }
};
