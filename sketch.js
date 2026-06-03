// Pegando as ferramentas do Matter.js
var Engine = Matter.Engine;
var Render = Matter.Render;
var Runner = Matter.Runner;
var Bodies = Matter.Bodies;
var Composite = Matter.Composite;
var Body = Matter.Body;
var Events = Matter.Events;

// Criando o motor de física
var engine = Engine.create();

// Pegando o mundo do motor
var world = engine.world;

// Criando o renderizador
var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 900,
    height: 500,
    wireframes: false,
    background: "url('assets/bg.webp')"
  }
});

// Criando o chão
var ground = Bodies.rectangle(
  450,
  480,
  900,
  40,
  {
    isStatic: true,
    render: {
      fillStyle: "#6b4f2a"
    }
  }
);

// ------------------------------------------------
// POSIÇÃO DO PÁSSARO
// ------------------------------------------------

// Altura do pássaro
var slingY = 350;

// Quanto ele fica para trás
var birdBack = 25;

// Posição final do pássaro
var slingX = 150 - birdBack;

// Criando o pássaro
var bird = new Bird(slingX, slingY);

// Mantendo o pássaro parado nesta aula
Body.setStatic(bird.body, true);

// ------------------------------------------------
// ESTILINGUE VISUAL
// ------------------------------------------------

var slingshot = new SlingShot( bird.body,
  {
    scale: 1.5,

    x: 150,
    y: 255,

    forkLeftOffsetX: 20,
    forkLeftOffsetY: 30,

    forkRightOffsetX: 60,
    forkRightOffsetY: 30
  }
);

// ------------------------------------------------
// OBJETOS DO JOGO
// ------------------------------------------------

var pig = new Pig(700, 250);

var box1 = new Box(
  650,
  430,
  50,
  80,
  "assets/madeira1.png"
);

var box2 = new Box(
  750,
  430,
  50,
  80,
  "assets/madeira1.png"
);

var box3 = new Box(
  700,
  370,
  160,
  30,
  "assets/madeira2.png"
);

// ------------------------------------------------
// ADICIONANDO AO MUNDO
// ------------------------------------------------

Composite.add(world, ground);

bird.addToWorld(world);

pig.addToWorld(world);

box1.addToWorld(world);
box2.addToWorld(world);
box3.addToWorld(world);

// ------------------------------------------------
// DESENHO DAS CAMADAS
// ------------------------------------------------

Events.on(render, "afterRender", function() {

  var ctx = render.context;

  // Madeira de trás
  slingshot.drawBack(ctx);

  // Elásticos
  slingshot.drawBands(ctx);

  // Pássaro
  bird.draw(ctx);

  // Couro
  slingshot.drawPouch(ctx);

  // Madeira da frente
  slingshot.drawFront(ctx);

  // Porco
  pig.draw(ctx);

});

// ------------------------------------------------
// ANIMAÇÕES
// ------------------------------------------------

setInterval(function() {

  bird.animate();
  pig.animate();

}, 300);

// ------------------------------------------------
// INICIANDO O JOGO
// ------------------------------------------------

Render.run(render);

var runner = Runner.create();

Runner.run(
  runner,
  engine
);
