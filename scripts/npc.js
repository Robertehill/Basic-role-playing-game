var vendorList =[];
var Vendor = function(stringName, venType){
  this.stringName = stringName;
  this.venType = venType;
  this.inventory = [];
};
var blackSmith = new Vendor('Joe the Blacksmith','metalSmith');
//make function to populate vendor inventory later
blackSmith.inventory.push(dullIronDagger);
blackSmith.inventory.push(dullIronShortSword);
blackSmith.inventory.push(ironDagger);
blackSmith.inventory.push(ironShortSword);

var monsterList =[];
var Monster = function(stringName, level, hitPoints, mana, stam, str, wis, dex, armor, magicResist, minDmg, maxDmg) {
  this.stringName = stringName;
  this.level = level;
  this.hitPoints = hitPoints;
  this.mana = mana;
  this.stam = stam;
  this.str = str;
  this.wis = wis;
  this.dex = dex;
  this.armor = armor;
  this.magicResist = magicResist;
  this.minDmg = minDmg;
  this.maxDmg = maxDmg;
  this.poisoned = false;
  this.poisonCount = 0;
  this.poisonLevel = 0;
  this.stunned = false;
  this.stunCount = 0;

};
Monster.prototype.death = function(killer){
  util.printToGameWindow(this.stringName+ ' has died','positive');
  if(killer === playerMobile){
    giveExp(killer, this);
    giveLoot(killer, this, this.level);
    combat.endCombat();
  }
  updateStats();
};
Monster.prototype.combat = function(opponent){
  if(this.poisoned && this.hitPoints > 0){
    var poisonDmg = Math.floor(this.hitPoints / (this.poisonLevel * 10) + 1);
    if (poisonDmg <= 1){
      poisonDmg = 1;
    }
    else{
      poisonDmg = poisonDmg;
    }
    if (this.poisonLevel < 1){
      this.poisonLevel = 1;
    }
    // console.log('poison level = ' + this.poisonLevel +' poisonCount = ' + this.poisonCount);
    if(this.hitPoints - poisonDmg <= 0){
      this.hitPoints = 0;
      this.poisonCount -= 1;
      util.printToGameWindow(this.stringName+' has lost '+ poisonDmg +' life from poison','poison');
    }
    else{
      this.hitPoints -= poisonDmg;
      this.poisonCount -= 1;
      util.printToGameWindow(this.stringName+' has lost '+ poisonDmg +' life from poison', 'poison');
    }
    if (this.poisonCount <= 0){
      this.poisoned = false;
      this.poisonLevel = 0;
      util.printToGameWindow(this.stringName + ' is no longer poisoned', 'negitive');
    }
  }
  if(this.stunned){
    util.printToGameWindow(this.stringName + ' is stunned','stun');
    if (this.stunCount - 1 <= 0){
      this.stunCount = 0;
      this.stunned = false;
      util.printToGameWindow(this.stringName + ' is no longer stunned', 'negitive');
    }
    else{
      this.stunCount -= 1;
    }
  }
  if (this.hitPoints <= 0){
    this.death(opponent);
    return;
  }
  if (this.stunned){
    return;
  }
  //start of combat AI
  if (util.getRandomNum(0, 100) < 25 && this.stam < Math.floor(this.dex / 2) || this.hitPoints < Math.floor(this.str / 2) || this.mana < Math.floor(this.wis / 2) ){
    doCombatRest(this, opponent);
    return;
  }
  if (util.getRandomNum(0, 100) < 33 && this.stam < Math.floor(this.dex / 3) || this.hitPoints < Math.floor(this.str / 3) || this.mana < Math.floor(this.wis / 3) ){
    doCombatRest(this, opponent);
    return;
  }
  if (util.getRandomNum(0, 100) < 50 && this.stam < Math.floor(this.dex / 5) || this.hitPoints < Math.floor(this.str / 5) || this.mana < Math.floor(this.wis / 5) ){
    doCombatRest(this, opponent);
    return;
  }
  if (this.stam < Math.floor(this.dex / 10) || this.hitPoints < Math.floor(this.str / 10) || this.mana < Math.floor(this.wis / 10) || this.hitPoints <= 0 || this.mana <= 0 || this.stam <=0){
    doCombatRest(this, opponent);
    return;
  }
  else{
    combat.doMeleeAttack(this, opponent,0,0);
  }
};

//going to move these to a JSON file
// (stringName, level, hitPoints, mana, stam, str, wis, dex, armor, magicResist, minDmg, maxDmg)
var weakSkeleton = new Monster('a skeleton',1,30,5,20,30,5,20,5,5,1,6);
monsterList.push(weakSkeleton);
var wolf = new Monster('a wolf',1,30,10,30,30,10,30,5,5,6,8);
monsterList.push(wolf);

var skeleton = new Monster('a skeleton',2,40,15,40,40,15,40,10,10,5,10);
monsterList.push(skeleton);

var strongSkeleton = new Monster('a skeleton',3,50,20,40,50,20,40,15,15,10,15);
monsterList.push(strongSkeleton);

var weakGoblin = new Monster('a weak goblin',3,40,30,40,40,30,40,10,15,10,15);
monsterList.push(weakGoblin);

var goblin = new Monster('a goblin',4,50,40,40,40,40,40,15,20,15,20);
monsterList.push(goblin);
