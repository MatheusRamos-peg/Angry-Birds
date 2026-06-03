class SlingShot {

  constructor(body, options) {

    options = options || {};

    // Corpo do pássaro
    this.body = body;

    // Escala do estilingue
    this.scale = options.scale !== undefined ? options.scale : 1;

    // Posição da madeira
    this.x = options.x !== undefined ? options.x : 150;
    this.y = options.y !== undefined ? options.y : 255;

    // Tamanho das madeiras
    this.forkWidth = 79 * this.scale;
    this.forkHeight = 158 * this.scale;

    // Tamanho do couro
    this.pouchWidth = 75 * this.scale;
    this.pouchHeight = 41 * this.scale;

    // Distância da ponta esquerda do elástico
    var forkLeftOffsetX = options.forkLeftOffsetX !== undefined ? options.forkLeftOffsetX
      : 20;

    var forkLeftOffsetY =
      options.forkLeftOffsetY !== undefined
      ? options.forkLeftOffsetY
      : 30;

    // Distância da ponta direita do elástico
    var forkRightOffsetX =
      options.forkRightOffsetX !== undefined
      ? options.forkRightOffsetX
      : 60;

    var forkRightOffsetY =
      options.forkRightOffsetY !== undefined
      ? options.forkRightOffsetY
      : 30;

    // Ponta esquerda do elástico
    this.forkLeft = {
      x: this.x + forkLeftOffsetX * this.scale,
      y: this.y + forkLeftOffsetY * this.scale
    };

    // Ponta direita do elástico
    this.forkRight = {
      x: this.x + forkRightOffsetX * this.scale,
      y: this.y + forkRightOffsetY * this.scale
    };

    // Ajuste do couro em relação ao pássaro
    this.pouchOffsetX = -37 * this.scale;
    this.pouchOffsetY = 18 * this.scale;

    // Imagem da madeira de trás
    this.imageBack = new Image();
    this.imageBack.src = "assets/estilingue-tras.png";

    // Imagem da madeira da frente
    this.imageFront = new Image();
    this.imageFront.src = "assets/estilingue-frente.png";

    // Imagem do couro
    this.imageBase = new Image();
    this.imageBase.src = "assets/estilingue.png";
  }

  // Madeira de trás
  drawBack(ctx) {

    ctx.drawImage(
      this.imageBack,
      this.x,
      this.y,
      this.forkWidth,
      this.forkHeight
    );

  }

  // Madeira da frente
  drawFront(ctx) {

    ctx.drawImage(
      this.imageFront,
      this.x,
      this.y,
      this.forkWidth,
      this.forkHeight
    );

  }

  // Couro do estilingue
  drawPouch(ctx) {

    var bx = this.body.position.x;
    var by = this.body.position.y;

    ctx.drawImage(
      this.imageBase,
      bx + this.pouchOffsetX,
      by + this.pouchOffsetY,
      this.pouchWidth,
      this.pouchHeight
    );

  }

  // Elásticos visuais
  drawBands(ctx) {

    var birdX = this.body.position.x;
    var birdY = this.body.position.y;

    ctx.strokeStyle = "#4B3619";
    ctx.lineWidth = 6 * this.scale;
    ctx.lineCap = "round";

    // Elástico esquerdo
    ctx.beginPath();
    ctx.moveTo(
      this.forkLeft.x,
      this.forkLeft.y
    );
    ctx.lineTo(
      birdX,
      birdY
    );
    ctx.stroke();

    // Elástico direito
    ctx.beginPath();
    ctx.moveTo(
      this.forkRight.x,
      this.forkRight.y
    );
    ctx.lineTo(
      birdX,
      birdY
    );
    ctx.stroke();

  }

}
