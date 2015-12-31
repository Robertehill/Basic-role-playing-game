var createChar = function(e) {
  e.preventDefault();
  var $stringName = $('#charNameForm');
  var savedChar = localStorage.getItem($stringName);
  var parseChar = JSON.parse(savedChar);
  console.log('char create function called');
  if (!$stringName.val() || $stringName.val() === 'Please Enter a Name'){
    $stringName.val('Please Enter a Name');
    return;
  }
  for(var i in window.localStorage){
    val = localStorage.getItem(i);
    if ($stringName.val() === i){
      controller.loadChar(i);
      playerMobile.combat(weakSkeleton);
      $('#charCreateForm').remove();
      return;
    }
  }
  var charClass = $('#charClass').val();
  playerMobile.stringName = $stringName.val();
  playerMobile.charClass = charClass;
//give the player char starting weapon abilities here
  playerMobile.knownWepAbs.push(swing);
  playerMobile.knownWepAbs.push(flee);
  playerMobile.knownWepAbs.push(cRest);
  //give the player char starting passive abilities here
  playerMobile.passiveAbs.push(pRest);
  playerMobile.passiveAbs.push(move);
  playerMobile.passiveActs();

  switch(charClass){
    //set stats here for new players
  case 'Warrior':
    playerMobile.hitPoints = 50;
    playerMobile.mana = 10;
    playerMobile.stam = 40;
    playerMobile.str = 50;
    playerMobile.dex = 40;
    playerMobile.wis = 10;
    playerMobile.rHand = dullIronShortSword;
    playerMobile.lHand = weakWoodenShield;
    playerMobile.knownWepAbs.push(shieldBash);
    playerMobile.knownWepAbs.push(doubleStrike);
    break;
  case 'Rogue':
    playerMobile.hitPoints = 40;
    playerMobile.mana = 20;
    playerMobile.stam = 40;
    playerMobile.str = 40;
    playerMobile.dex = 40;
    playerMobile.wis = 20;
    playerMobile.rHand = dullIronDagger;
    playerMobile.lHand = dullIronDagger;
    playerMobile.knownWepAbs.push(doubleStrike);
    playerMobile.knownWepAbs.push(poison);
    break;
  case 'Wizard':
    playerMobile.hitPoints = 40;
    playerMobile.mana = 50;
    playerMobile.stam = 10;
    playerMobile.str = 40;
    playerMobile.dex = 10;
    playerMobile.wis = 50;
    playerMobile.rHand = lightWoodenStaff;
    playerMobile.knownSpells.push(fireBallSpell);
    playerMobile.knownSpells.push(lesserHealSpell);
    break;
  }
  $('#charCreateForm').remove();
  playerMobile.updateStats();
  util.printToGameWindow(playerMobile.stringName +' the ' + playerMobile.charClass +' has joined the world!');
  playerMobile.combat(weakSkeleton);
};

$('#createCharButton').on('click', createChar);
