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
    background: "url('Assets/background.jpg')"
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

bird.addToWorld(world);
slingshot.addToWorld(world);
pig.addToWorld(world);
box1.addToWorld(world);
box2.addToWorld(world);
box3.addToWorld(world);

// ------------------------------------------------
// OBJETOS DO JOGO
// ------------------------------------------------

// Topo do chão em y = 460; caixas verticais com altura 80 → centro em 420
var boxY = 420;

var box1 = new Box(
  650,
  boxY,
  50,
  80,
  "Assets/woodDefault.png"
);

var box2 = new Box(
  750,
  boxY,
  50,
  80,
  "Assets/woodDefault.png"
);

var box3Scale = 0.75;

var box3 = new Box(
  700,
  369,
  160,
  30,
  "Assets/wood2.png",
  box3Scale
);

// Porco sobre a prancha (box3): topo em y = 369 - (30 * box3Scale) / 2
var pig = new Pig(700, 330);

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

  if (slingshot.isAttached()) {
    slingshot.drawBack(ctx);
  };

  bird.draw(ctx);
  if (slingshot.isAttached()) {
    slingshot.drawPouch(ctx);
  }
  slingshot.drawFront(ctx);
  pig.draw(ctx);

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
