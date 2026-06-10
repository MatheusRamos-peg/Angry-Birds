class Box {

  constructor(x, y, width, height, imagem, scale) {

    scale = scale === undefined ? 1 : scale;

    var scaledWidth = width * scale;
    var scaledHeight = height * scale;

    this.body = Matter.Bodies.rectangle(x, y, scaledWidth, scaledHeight, {
      restitution: 0.2,
      render: {
        sprite: {
          texture: imagem,
          xScale: 1,
          yScale: 1
        }
      }
    });
  }

  addToWorld(world) {
    Matter.Composite.add(world, this.body);
  }

}
