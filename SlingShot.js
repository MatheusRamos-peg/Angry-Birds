class Slingshot{
    constructor(bodyA, pointB){
        var options = {
            bodyA:bodyA,
            pointB: pointB,
            stiffness: 0.04,
            length: 10
        }
        this.sling1 = loadImage("assets/slingshot1.png");
        this.sling2 = loadImage("assets/slingshot2.png");
        this.sling3 = loadImage("assets/rubberSlingshot.png");
        this.pointB = pointB
    }
}