var ballRadius = 1.5;
var ballMargin = 50 - ballRadius;
var ballDistance = - ballRadius*3;
var ballSpeed = 0;
var ballElem = document.getElementById('dropping_ball');
var coverHeight = 100;
var infoPageStyleTop = 90;
var arrowStyleBottom = 3;
var ballPosTimer;
var ballTimer;
var elemOpacity = 0;

function startUncovering(){
  clearInterval(ballPosTimer);
  var timer = setInterval(function(){uncoverOnePerc()}, 1000/60);
  function uncoverOnePerc(){
    coverHeight += -1;
    document.getElementById('black_cover').style.height = coverHeight + "%";
    if (coverHeight <= 0){
      clearInterval(timer);
    }
  }
}

function checkBallPos(){
  if (ballDistance >= 100){
    setTimeout(function(){startUncovering()},200);
    clearInterval(ballTimer);
    ballElem.style.display = "none";
  }
}

function ballIncreaseSpeed(){
  if (ballDistance < 0){
    ballSpeed += 1/80;
  }
  else {
    ballSpeed +=  1/6;
  }
}

function ballChangeDistance(){
  ballDistance += ballSpeed;
}

function loadBall(){
  ballElem.style.top = ballDistance+"%";
}

function showMainText(){
  document.getElementById('main_text').style.display = "block";
  var showTextTimer = setInterval(function(){
    elemOpacity += 0.05;
    document.getElementById('main_text').style.opacity = elemOpacity;
    if (elemOpacity >= 1){
      clearInterval(showTextTimer);
    }
  },1000/60);
}

function showInfoPage(){
  var pageMoveTimer = setInterval(function(){increasePageHeight();moveArrow();},1000/120);
  function increasePageHeight(){
    infoPageStyleTop += -1;
    document.getElementById('info_background').style.top = infoPageStyleTop + "%";
    if (infoPageStyleTop <= -15){
      showMainText();
      clearInterval(pageMoveTimer);
    }
  }
  function moveArrow(){
    arrowStyleBottom += 1;
    document.getElementById('arrow_button').style.bottom = arrowStyleBottom + "%";
  }
}

ballPosTimer = setInterval(function(){checkBallPos()},1000/90);

function startDrop(){
  ballElem.style.display = "block";
  ballElem.style.width = ballRadius*2+"%";
  ballElem.style.paddingTop = ballRadius*2+"%";
  ballElem.style.left = ballMargin+"%";
  ballElem.style.right = ballMargin+"%";


  ballTimer = setInterval( function(){
    ballIncreaseSpeed();
    ballChangeDistance();
    loadBall();
    document.getElementById("arrow_button").addEventListener("click",showInfoPage);
  }, 1000/90)
}

window.onload = startDrop;
