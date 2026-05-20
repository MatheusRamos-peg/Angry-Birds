// Pegando as ferrmentas do Matter.js
var Engine = Matter.Engine;
var Render = Matter.Render;
var Runner = Matter.Runner;
var Bodies = Matter.Bodies;
var Composite = Matter.Composite;

// Criando o motor de física
var engine = Engine.create();

// Pegando o mundo do motor para adicionar os corpos
var world = engine.world;

// Criando o renderizador
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 900,
      height: 500,
      wireframes: false,
      background: "url('assets/background.jpg')"
    }
});

// Criando o chão
var ground = Bodies.rectangle(450, 410, 900, 40,{
    isStatic: true,
    render:{
        fillStyle: "#6b4f2a00"
    }
});

//criando objetos do jogo usando nossas classes
var bird = new Bird(150, 300);
var pig = new Pig(700, 250);
var box1 = new Box(650, 430, 50, 80, "assets/woodDefault.png",1,1 );
var box2 = new Box(750, 430, 50, 80, "assets/woodDefault.png",1,1 );
var box3 = new Box(700, 370, 160, 30, "assets/wood2.png",0.2,0.2 );
var box4 = new Box(700, 250, 160, 30, "assets/woodDefault.png",1,1 );


//colocando o chão no mundo
Composite.add(world, ground);

//Adicionando os objetos do jogo ao mundo
bird.addToWorld(world);
pig.addToWorld(world);
box1.addToWorld(world);
box2.addToWorld(world);
box3.addToWorld(world);
box4.addToWorld(world);

// Rodando a tela
Render.run(render);

// Rodando o motor de física
var runner = Runner.create();
Runner.run(runner, engine);