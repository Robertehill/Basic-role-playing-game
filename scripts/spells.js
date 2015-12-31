function Spell(stringName, level,manaCost, minDmg, maxDmg){
  this.stringName = stringName;
  this.level = level;
  this.manaCost = manaCost;
  this.minDmg = minDmg;
  this.maxDmg = maxDmg;
}

Spell.prototype.spellHitChance = function(attacker, defender, hitBonus){
  var wisChance = ((attacker.wis - defender.wis) + 100) - 50;
  hitBonus = util.checkNaN(hitBonus);
  if (wisChance < 10){
    wisChance = 10;
  }
  wisChance + hitBonus;
  if (wisChance >= 100){
    return true;
  }
  else if (wisChance >= util.getRandomNum(1,100)){
    return true;
  }
  else{
    util.printToGameWindow(attacker.stringName+'s '+this.stringName+' has missed ' + defender.stringName, 'negitive');
    return false;
  }
};

Spell.prototype.spellCastChance = function(caster, bonus) {
  var chance = (caster.wis / this.level) + util.checkNaN(bonus);
  if (chance < 10) {
    chance = 10;
  }
  if (chance >= 100) {
    util.printToGameWindow(caster.stringName+' is casting a '+this.stringName+' spell','positive');
    caster.mana -= this.manaCost;
    return true;
  }
  else if (chance >= util.getRandomNum(0,100)){
    util.printToGameWindow(caster.stringName+' is casting a '+this.stringName+' spell','positive');
    caster.mana -= this.manaCost;
    return true;
  }
  else{
    util.printToGameWindow(caster.stringName+'\'s '+this.stringName+' has failed to cast','negitive');
    caster.mana -= Math.floor(this.manaCost/4);
    return false;
  }
};

Spell.prototype.castHeal = function(caster, target, hitBonus){
  if(caster.mana - this.manaCost < 0){
    util.printToGameWindow(caster + ' does not have enough mana to cast that','negitive');
    playerMobile.updateStats();
    return;
  }
  if (this.spellCastChance(caster, hitBonus)){
    var healAmt = util.getRandomNum(this.minDmg, this.maxDmg);
    if(target.hitPoints + healAmt < target.str){
      target.hitPoints += healAmt;
      util.printToGameWindow(caster.stringName+' has healed ' + target.stringName + ' for '+ healAmt, 'positive');
    }
    else{
      target.hitPoints = target.str;
      util.printToGameWindow(caster.stringName+' has healed ' + target.stringName + ' for '+ healAmt, 'positive');
    }
  }
  playerMobile.updateStats();
};

Spell.prototype.castDmg = function(attacker, defender, hitBonus){
  if(attacker.mana - this.manaCost < 0){
    util.printToGameWindow(attacker + ' does not have enough mana to cast that','negitive');
    playerMobile.updateStats();
    return;
  }
  var damage = util.getRandomNum(this.minDmg, this.maxDmg);
  if(this.spellCastChance(attacker, hitBonus)){
    if (this.spellHitChance(attacker, defender, hitBonus)){
      damage += damage * (attacker.wis / 1000);
      var reducedDamage = util.checkNaN(Math.floor(damage * (defender.magicResist / 100)));
      var critChance = util.getRandomNum(0, Math.floor(attacker.wis / 10));
      if (critChance > util.getRandomNum(0,100)){
        console.log('player crit Hit for an extra'+ Math.floor(attacker.wis / 10) +' damage','positive');
        damage += attacker.wis / 10;
      }
      damage -= reducedDamage;
      damage = Math.floor(damage);
      if (damage < 1) {
        damage = 1;
      };
      util.printToGameWindow(attacker.stringName +' hits '+ defender.stringName+ ' with a ' + this.stringName + ' for '+damage+' damage','positive');
      defender.hitPoints -= damage;
      if(defender.hitPoints <= 0){
        playerMobile.giveExp(attacker, defender);
        playerMobile.giveLoot(attacker, defender, defender.level);
        combat.endCombat();
      }
    }
  }
  playerMobile.updateStats();
};
// move to JSON file
var fireBallSpell = new Spell('Fire Ball',1, 10, 5, 20);
var lesserHealSpell = new Spell('Lesser Heal',1, 10, 10, 20);
