var lootPackBasic = [];
function Weapon(stringName, wepType, minDmg, maxDmg, stamUsed, range, numHands){
  this.stringName = stringName;
  this.wepType = wepType;
  this.minDmg = minDmg;
  this.maxDmg = maxDmg;
  this.stamUsed = stamUsed;
  this.range = range;
  this.numHands = numHands;
  this.worth = ((this.minDmg * this.maxDmg) * stamUsed) * 10;
}
function Shield(stringName, rating, blockChance){
  this.stringName = stringName;
  this.rating = rating;
  this.blockChance = blockChance;
  this.wepType = 'shield';
  this.worth = this.rating * 100;
}
function Armor(stringName, rating, magicDef, arType, bodyLoc){
  this.stringName = stringName;
  this.rating = rating;
  this.magicDef = magicDef;
  this.arType = arType;
  this.bodyLoc = bodyLoc;
  this.worth = this.rating * 100;
}

//going to move these to a JSON or SQL or XML file at some point.
//Weapon(stringName, wepType, minDmg, maxDmg, stamUsed, range, numHands)
var dullIronDagger = new Weapon('a dull iron dagger', 'pierce', 2, 5, 1, 1, 0);
lootPackBasic.push(dullIronDagger);
var ironDagger = new Weapon('a iron dagger', 'pierce', 4, 7, 1, 1, 0);
lootPackBasic.push(ironDagger);
var dullIronShortSword = new Weapon('a dull iron short sword', 'slash', 4, 7, 2, 1, 1);
lootPackBasic.push(dullIronShortSword);
var ironShortSword = new Weapon('a iron short sword', 'slash', 6, 10, 2, 1, 1);
lootPackBasic.push(ironShortSword);
var lightWoodenStaff = new Weapon('a light wooden staff', 'bash', 2, 10, 2, 2, 2);
lootPackBasic.push(lightWoodenStaff);

//Shield(stringName, armor, blockChance)
var weakWoodenShield = new Shield('a weak wooden shield', 5, 15);
lootPackBasic.push(weakWoodenShield);
var rustyMetalShield = new Shield('a rusty metal shield', 10, 10);
lootPackBasic.push(weakWoodenShield);

//Armor(stringName, rating, magicDef, arType, bodyLoc)
var thinLeatherHelmet = new Armor('a thin leather helmet', 2, 1, 'leather','head');
lootPackBasic.push(thinLeatherHelmet);
var thinLeatherChest = new Armor('a thin leather chest', 3, 1, 'leather','chest');
lootPackBasic.push(thinLeatherChest);
var thinLeatherArms = new Armor('a thin leather arms', 3, 1,'leather','arms');
lootPackBasic.push(thinLeatherArms);
var thinLeatherGloves = new Armor('a thin leather gloves', 2, 1,'leather','gloves');
lootPackBasic.push(thinLeatherGloves);
var thinLeatherLegs = new Armor('a thin leather legs', 3, 1,'leather','legs');
lootPackBasic.push(thinLeatherLegs);
var thinLeatherBoots = new Armor('a thin leather boots', 2, 1,'leather','boots');
lootPackBasic.push(thinLeatherBoots);

var LeatherHelmet = new Armor('a leather helmet', 3, 2, 'leather','head');
lootPackBasic.push(LeatherHelmet);
var LeatherChest = new Armor('a leather chest', 5, 2, 'leather','chest');
lootPackBasic.push(LeatherChest);
var LeatherArms = new Armor('a leather arms', 5, 2,'leather','arms');
lootPackBasic.push(LeatherArms);
var LeatherGloves = new Armor('a leather gloves', 3, 2,'leather','gloves');
lootPackBasic.push(LeatherGloves);
var LeatherLegs = new Armor('a leather legs', 5, 2,'leather','legs');
lootPackBasic.push(LeatherLegs);
var LeatherBoots = new Armor('a leather boots', 3, 2,'leather','boots');
lootPackBasic.push(LeatherBoots);
