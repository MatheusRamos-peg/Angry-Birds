// Pegando as ferramentas do Matter.js
var Engine = Matter.Engine;
var Render = Matter.Render;
var Runner = Matter.Runner;
var Bodies = Matter.Bodies;
var Composite = Matter.Composite;
var Constraint = Matter.Constraint;
var Body = Matter.Body;
var Events = Matter.Events;
;

var pigAtingido = false;
var jogoFinalizado = false;
var tempolancamento = 0;

// Criando o motor de física
var engine = Engine.create();
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
var ground = Bodies.rectangle(450, 480, 900, 40, {
  isStatic: true,
  render: {
    fillStyle: "#6b4f2a"
  }
});

// ------------------------------------------------
// POSIÇÃO DO PÁSSARO
// ------------------------------------------------

var slingY = 350;
var birdBack = 25;
var slingX = 150 - birdBack;

var bird = new Bird(slingX, slingY);
var slingPoint = { x: slingX, y: slingY };

// ------------------------------------------------
// ESTILINGUE
// ------------------------------------------------

var slingshot = new SlingShot(bird.body, slingPoint, {
  scale: 1.5,
  x: 150,
  y: 255,
  forkLeftOffsetX: 20,
  forkLeftOffsetY: 30,
  forkRightOffsetX: 60,
  forkRightOffsetY: 30
});

// ------------------------------------------------
// OBJETOS DO JOGO
// ------------------------------------------------

var pig = new Pig(700, 250);

var box1 = new Box(650, 430, 50, 80, "assets/madeira1.png");
var box2 = new Box(750, 430, 50, 80, "assets/madeira1.png");
var box3 = new Box(700, 370, 160, 30, "assets/madeira2.png");

var trajectory = []; // 
// ------------------------------------------------
// ADICIONANDO AO MUNDO
// ------------------------------------------------

Composite.add(world, ground);

bird.addToWorld(world);
slingshot.addToWorld(world);
pig.addToWorld(world);
box1.addToWorld(world);
box2.addToWorld(world);
box3.addToWorld(world);

var painelFinal = document.createElement("div");
painelFinal.style.position = "absolute";
painelFinal.style.top = "50%";
painelFinal.style.left = "50%";
painelFinal.style.transform = "translate(-50%, -50%)";
painelFinal.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
painelFinal.style.color = "white";
painelFinal.style.padding = "25px";
painelFinal.style.borderRadius = "15px";
painelFinal.style.textAlign = "center";
painelFinal.style.fontFamily = "Arial";
painelFinal.style.display = "none";
painelFinal.style.zIndex = "10";

document.body.appendChild(painelFinal);

//Mostra a tela final quando o porco desaparece
function mostrarTelaFinal() {

  jogoFinalizado = true;

  painelFinal.innerHTML = 
  "<h1>Parabéns!</h1><p>Você acertou o porco!</p>";

  "<img src='assets/next.png'"
  onclick='proximaFase()' 
  style='width: 120px; cursor: pointer; margin-top: 10px;'>"
  >
  painelFinal.style.display = "block";
}

function antigirPorco() {
  if (!pigAtingido || jogoFinalizado || pig.removed) {
    return;
  }
  pigAtingido = true;
  pig.startFade();
}
    Events.on(engine, "collisionStart", function(event) {
      if (slingshot.isAttached()) {
        return;
      }
    var pairs = event.pairs;
    for (var i = 0; i < pairs.length; i++) {
      var bodyA = pairs[i].bodyA;
      var bodyB = pairs[i].bodyB;
      var bateuNoPorco =
      (bodyA.label === "bird" && bodyB.label === "pig") ||
      (bodyB.label === "bird" && bodyA.label === "pig");
      if (bateuNoPorco) {
        pigAtingido = true;
        antigirPorco();
        break;
      }
    }
    }};

    function verificarColisaoComPorco() {

      if (slinghost.isAttached() || pigAtingido || jogoFinalizado || pig.removed) {
        return;
      }

      var dx = bird.body.position.x - pig.body.position.x;
      var dy = bird.body.position.y - pig.body.position.y;
      var raioColisao= 25 + 28;

      if (dx * dx + dy * dy <= raioColisao * raioColisao) {
        atingirPorco();
      }

    }

    Events.on(render, "afterRender", function() {

      var ctx = render.context;

  var ctx = render.context;

  slingshot.drawBack(ctx);
  if (slingshot.isAttached()) {
    slingshot.drawBands(ctx);
  }
  bird.draw(ctx);
  if (slingshot.isAttached()) {
    slingshot.drawPouch(ctx);
  }
  slingshot.drawFront(ctx);
  pig.draw(ctx);
});

*/

Events.on(render, "afterRender", function() {
  var ctx = render.context;

  slingshot.drawBack(ctx);

  if (slingshot.isAttached()) {
    slingshot.drawBands(ctx);
  }

  // Salva a posição do pássaro após o lançamento
  if (!slingshot.isAttached()) {

    trajectory.push({
      x: bird.body.position.x,
      y: bird.body.position.y,
      life: 60
    });

  }

  // Desenha as bolinhas da trajetória
  for (var i = trajectory.length - 1; i >= 0; i--) {

    var p = trajectory[i];

    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255," + (
p.life
 / 60) + ")";
    ctx.fill();

    p.life--;

    if (
p.life
 <= 0) {
      trajectory.splice(i, 1);
    }
  }

  bird.draw(ctx);

  if (slingshot.isAttached()) {
    slingshot.drawPouch(ctx);
  }

  slingshot.drawFront(ctx);
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
// ARRASTAR E LANÇAR O PÁSSARO
// ------------------------------------------------

var canvas = render.canvas;

function getMousePos(event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - 
rect.top

  };
}

canvas.addEventListener("mousedown", function(event) {
  var pos = getMousePos(event);
  slingshot.tryStartDrag(pos.x, pos.y);
});

canvas.addEventListener("mousemove", function(event) {
  if (!slingshot.dragging) {
    return;
  }
  var pos = getMousePos(event);
  slingshot.dragTo(pos.x, pos.y);
});

function onMouseRelease() {
  slingshot.release(world);
}

canvas.addEventListener("mouseup", onMouseRelease);
canvas.addEventListener("mouseleave", onMouseRelease);
window.addEventListener("mouseup", onMouseRelease);

// ------------------------------------------------
// INICIANDO O JOGO
// ------------------------------------------------

Render.run
(render);

var runner = Runner.create();
Runner.run
(runner, engine); 
