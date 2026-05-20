class Box{
    constructor(x,y,width,height, imagem, xScale, yScale){
        this.body = Bodies.rectangle(x, y, width, height, {
            restitution: 0.2,
            render:{
                sprite:{
                    texture:imagem,
                    xScale: xScale,
                    yScale: yScale,
                }
            }
        });
    }
    addToWorld(world) {
        Composite.add(world, this.body);
    }
}