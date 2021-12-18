  var trex, trex_running, trex_collided;
  var ground, invisibleGround, groundImage;
  var nube;
  var nubeImagen;
  var obstaculo;
  var obstaculo1,obstaculo2,obstaculo3,obstaculo4,obstaculo5,obstaculo6,obstaculo7;
  var puntos=0;
  var nubeGrup
  var obstaculoGrup
  var PLAY=1
  var END=0
  var gameState=PLAY;
  var imachGameover 
  var imachReistar
  var gameover 
  var reinicio 
  var checkpointSound
  var dieSound
  var jumpSound

 function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png");

  nubeImagen=loadImage("nube.png");

  obstaculo1=loadImage("obstacle1.png");
  obstaculo2=loadImage("obstacle2.png");
  obstaculo3=loadImage("obstacle3.png");
  obstaculo4=loadImage("obstacle4.png");
  obstaculo5=loadImage("obstacle5.png");
  obstaculo6=loadImage("obstacle6.png");
  obstaculo7=loadImage("obstacle7.png");
  imachGameover=loadImage("Game_Over.png")
  imachReistar=loadImage("reiniciar.png")
  dieSound=loadSound("die.mp3")
  jumpSound=loadSound("jump.mp3")
  checkpointSound=loadSound("checkpoint.mp3")

}

function setup() { 

 createCanvas(600, 200);

 //grupo de las nubes 
 nubeGrup=new Group ();

 // grupo de los obstaculos
 obstaculoGrup=new Group();


 //create a trex sprite
 trex = createSprite(50,160,20,50);
 trex.addAnimation("running", trex_running);
 trex.scale = 0.5;
 trex.addAnimation("dead",trex_collided) 
 //crear suelo invisible
 invisibleGround=createSprite(200,200,400,20);
 invisibleGround.visible=false;

 //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  trex.debug=true
  trex.setCollider("circle",0,0,40)
  
  gameover=createSprite(300,100)
  gameover.addImage(imachGameover)
  gameover.scale=0.4
  reinicio=createSprite(300,140)
  reinicio.addImage(imachReistar)
  reinicio.scale=0.09

}

function draw() {
  background("white");
  //Creando el marcador
 text("kilometraje: "+puntos,420,120);


  if(gameState===PLAY){
    puntos=puntos+Math.round(getFrameRate()/60);

    if(puntos>0&&puntos%100===0){
      checkpointSound.play();
    }
    ground.velocityX = -(4+3*puntos/100);
   //presionar boton espace para saltar
   if (keyDown("space")&&trex.y>=160) {
       trex.velocityY = -10;
       jumpSound.play();
   }
   //Movimeinto del trex
   trex.velocityY = trex.velocityY + 0.8;
   //Se restablece el suelo 
   if (ground.x < 0) {
     ground.x = ground.width / 2;
   }
   //llámamos a la función para aparecer las nubes
   cloud();
   //llámamos a la función para aparecer los obstaculos 
   obstaculos();
   if (obstaculoGrup.isTouching(trex)){
     gameState=END
     dieSound.play();
   }
   gameover.visible=false
   reinicio.visible=false
  }

 else if(gameState===END){
   trex.velocityY=0
   ground.velocityX=0
   nubeGrup.setVelocityXEach(0)
   obstaculoGrup.setVelocityXEach(0)
   trex.changeAnimation("dead",trex_collided)
   obstaculoGrup.setLifetimeEach(-1)
   nubeGrup.setLifetimeEach(-1)
   gameover.visible=true
   reinicio.visible=true
   if(mousePressedOver(reinicio)){
   Reinicio()






   }
   
 }




  
 

  

  

  

  //Evita que el trex caiga 
  trex.collide(invisibleGround);

  

  

  drawSprites();
}
nube.depth=gameover.depth
 gameover.depth=gameover.depth+1;

//funcion para dibujar las nubes
function cloud(){
  if(frameCount%60===0){
    nube=createSprite(610,10,20,5)
    nube.velocityX = -2
    nube.addImage(nubeImagen);
    nube.scale=0.2
    nube.y=Math.round(random(10,90))
    nube.depth=trex.depth
    trex.depth=trex.depth+1;
    nube.lifetime=300;
    nubeGrup.add(nube);
  }
}

//funcion de obstáculos 
function obstaculos (){
 if (frameCount%60===0){
   obstaculo=createSprite(610,180,10,40)
   obstaculo.velocityX=-(4+3*puntos/100);
   obstaculoGrup.add(obstaculo)
   //Creamos nuestro switch
   var rand=Math.round(random(1,6));
   switch(rand){

     case 1:obstaculo.addImage(obstaculo1);
     break;

     case 2:obstaculo.addImage(obstaculo2);
     break;

     case 3:obstaculo.addImage(obstaculo3);
     break;

     case 4:obstaculo.addImage(obstaculo4);
     break;

     case 5:obstaculo.addImage(obstaculo7);
     break;

     case 6:obstaculo.addImage(obstaculo6);
     break;

     default:break
    }
    //Siglo de vida y tamaño de los obstáculos
   obstaculo.scale=0.1;
   obstaculo.lifetime=300;
 }
}

function Reinicio(){


 gameState=PLAY;
 gameover.visible=false;
 reinicio.visible=false;
 obstaculoGrup.destroyEach();
 nubeGrup.destroyEach();
 trex.changeAnimation("running",trex_running)
 puntos=0
 

}



