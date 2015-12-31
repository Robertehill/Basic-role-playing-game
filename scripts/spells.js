function Spell(stringName, level,manaCost, minDmg, maxDmg){
  this.stringName = stringName;
  this.level = level;
  this.manaCost = manaCost;
  this.minDmg = minDmg;
  this.maxDmg = maxDmg;
}
Spell.prototype.spellHitChance = function(attacker, defender, hitBonus){
  var wisChance = ((attacker.wis - defender.wis) + 100) - 50;
  if(hitBonus < 0 || hitBonus === NaN){
    hitBonus = 0;
  }
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
    util.printToGameWindow(attacker.stringName+'s '+this.stringName+' has missed ' + defender.stringName);
    return false;
  }
};
Spell.prototype.spellCastChance = function(caster, bonus) {
  if (bonus === NaN){
    bonus = 0;
  }
  var chance = (caster.wis / this.level) + bonus;
  if (chance < 10) {
    chance = 10;
  }
  if (chance >= 100) {
    util.printToGameWindow(caster.stringName+' is casting a '+this.stringName+' spell');
    caster.mana -= this.manaCost;
    return true;
  }
  else if (chance >= util.getRandomNum(0,100)){
    util.printToGameWindow(caster.stringName+' is casting a '+this.stringName+' spell');
    caster.mana -= this.manaCost;
    return true;
  }
  else{
    util.printToGameWindow(caster.stringName+'\'s '+this.stringName+' has failed to cast');
    caster.mana -= Math.floor(this.manaCost/4);
    return false;
  }
};
Spell.prototype.castHeal = function(caster, target, hitBonus){
  if(caster.mana - this.manaCost < 0){
    util.printToGameWindow(caster + ' does not have enough mana to cast that');
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
    util.printToGameWindow(attacker + ' does not have enough mana to cast that');
    playerMobile.updateStats();
    return;
  }
  var damage = util.getRandomNum(this.minDmg, this.maxDmg);
  if(this.spellCastChance(attacker, hitBonus)){
    if (this.spellHitChance(attacker, defender, hitBonus)){
      damage += damage * (attacker.wis / 1000);

      var reducedDamage = Math.floor(damage * (defender.magicResist / 100));
      if (reducedDamage < 0){
        reducedDamage = 0;
      }
      var critChance = util.getRandomNum(0, Math.floor(attacker.wis / 10));
      if (critChance > util.getRandomNum(0,100)){
        console.log('player crit Hit for an extra'+ Math.floor(attacker.wis / 10) +' damage');
        damage += attacker.wis / 10;

      }
      damage -= reducedDamage;
      damage = Math.floor(damage);
      if (damage < 1) {
        damage = 1;
      };
      util.printToGameWindow(attacker.stringName +' hits '+ defender.stringName+ ' with a ' + this.stringName + ' for '+damage+' damage');
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

var fireBallSpell = new Spell('Fire Ball',1, 10, 5, 20);
var lesserHealSpell = new Spell('Lesser Heal',1, 10, 10, 20);
