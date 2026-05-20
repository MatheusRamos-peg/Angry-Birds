class Pig{
    constructor(x,y){
        this.body = Bodies.circle(x, y, 28, {
            restitution: 0.3, 
            render: {
                fillStyle: "green"
            }
        });
    }

    addToWorld(world) {
        Composite.add(world, this.body);
    }
}