var bg,bgImg;
var player, shooterImg, shooter_shooting
var zombieWalking
var life = 3
var gameState = "fight"


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieWalking = loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  bulletImg = loadImage("assets/bullet.png")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);
  zombieGroup = new Group()
 
  
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
 bg.addImage(bgImg)
bg.scale = 1.1
 heart1 = createSprite(displayWidth -100,40,20,20)
 heart2 = createSprite(displayWidth -150,40,20,20)
 heart3 = createSprite(displayWidth -144,40,20,20)
 heart1.addImage(heart1Img)
 heart2.addImage(heart2Img)
 heart3.addImage(heart3Img)
 heart1.scale = 0.4
 heart2.scale = 0.4
 heart3.scale = 0.4
 heart1.visible = false
 heart2.visible = false

//criando o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


}

function draw() {
  background(0); 
  if(gameState == "fight"){
  if(life == 3){
    heart1.visible = false
    heart2.visible = false
    heart3.visible = true
  }
  if(life == 2){
    heart1.visible = false
    heart2.visible = true
    heart3.visible = false
  }
  if(life == 1){
    heart1.visible = true
    heart2.visible = false
    heart3.visible = false
  }
  if(life == 0){
    heart1.visible = false
    heart2.visible = true
    heart3.visible = true
    gameState = "lost"
  }


  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
if(keyWentDown("space")){
  player.addImage(shooterImg)
  bullet = createSprite(player.x,player.y -30,20,10)
  bullet.addImage(bulletImg)
  bullet.scale = 0.1
  bullet.velocityX = 50
}


else if(keyWentUp("space")){
  
}
if(zombieGroup.isTouching(player)){
  for(var i=0; i < zombieGroup.length; i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy()
      life-=1
    }
  }
}
zombieGaming()
}
drawSprites();



}
function zombieGaming(){
  
  if(frameCount%80 === 0){
    zombie = createSprite(width,random(500,height),40,40)
    zombie.addImage("zombie",zombieWalking)
    zombie.velocityX =-6
    zombie.scale = 0.15
    zombieGroup.add(zombie)
  }
}
