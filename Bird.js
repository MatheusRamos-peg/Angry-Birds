class Bird{
    constructor(x,y){
        this.body = Bodies.circle(x, y, 25, {
            restitution: 0.6,
            density: 0.004, 
            render: {
                fillStyle: "red"
            }
        });
    }

    addToWorld(world) {
        Composite.add(world, this.body);
    }
}