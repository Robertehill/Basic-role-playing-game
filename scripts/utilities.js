var util = {};

util.updateScroll = function(){
  var element = document.getElementById('gameWindow');
  element.scrollTop = element.scrollHeight - element.clientHeight;
};
util.printToGameWindow = function(text,textClass) {
  $('#gameWindow').append($('<p>').attr('id','gameText').attr('class',textClass).text(text));
  util.updateScroll();
};
util.getRandomNum = function(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
util.checkNaN = function(number) {
  if(number <= 0 || number === NaN ) {
    return 0;
  }
  else{
    return number;
  }
};
