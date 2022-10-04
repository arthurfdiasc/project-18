//Estados do jogo
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var cutSound, GameOverSound
function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")

  //carregue o som aqui
  cutSound = loadSound("knifeSwoosh.mp3")
  GameOverSound = loadSound("gameover.mp3")

}



function setup() {
  createCanvas(600, 600);
  
  //criar espada
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  //definir colisor para espada
  knife.setCollider("rectangle",0,0,40,40);

  // Variáveis de pontuação e grupos
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Chamar função de frutas e monstros
    fruits();
    Monster();
    
    // Mova a espada com o mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Aumenta a pontuação se a espada tocar na fruta
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      cutSound.play()
      score = score + 2
    }
    else
    {
      // Vá para o estado final se a espada tocar o inimigo
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        
        //adicione o som do gameover (fim de jogo) aqui
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        
        
        

        GameOverSound.play()
      }
    }
  } else if(gameState === END)
  {
    // Mude a animação da espada para gameover (fim de jogo) e redefina sua posição
        
        knife.scale=2;
        knife.x=300;
        knife.y=300;
        knife.changeImage("dead", gameOverImage);
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
  }
  
  drawSprites();
  //Exibir pontuação
  textSize(25);
  text("Score : "+ score,250,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    //atualize o código abaixo para aumentar a velocidade do monsterGroup (grupo de monstros) em 10
    monster.velocityX = score/10 * -1 -8;
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%40===0){
    position = Math.round(random(1,4));
    monster=createSprite(400,200,20,20);
    
     //usar uma variável aleatória para mudar a posição da fruta e tornar mais desafiador
     
    
    if(position==1)
    {
    monster.x=600;
    //atualize o código abaixo para aumentar a velocidade do monsterGroup (grupo de frutas) em 4
    monster.velocityX=score / 4 * -1 -7
    }
    else
    {
      if(position==2){
      monster.x=0;
      
     //atualize o código abaixo para aumentar a velocidade do monsterGroup (grupo de frutas) em 4
      monster.velocityX= score / 4 + 7;
      }
    }
    
    monster.scale=0.2;
     //monster.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      monster.addImage(monsterImage);
    } else if (r == 2) {
      monster.addImage(monsterImage);
    } else if (r == 3) {
      monster.addImage(monsterImage);
    } else {
      monster.addImage(monsterImage);
    }
    
    monster.y=Math.round(random(50,550));
   
    
    monster.setLifetime=100;
    
    monsterGroup.add(monster);
  }
}