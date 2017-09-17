/** "Implémentation" */
interface DrawingAPI {
    drawCircle(x: number, y: number, radius: number): void;
}

/** "Implémentation1" */
class DrawingAPI1 implements DrawingAPI {
    public drawCircle(x: number, y: number, radius: number): void {
        console.log('API1.cercle position %f:%f rayon %f\n', x, y, radius);
    }
}

/** "Implémentation2" */
class DrawingAPI2 implements DrawingAPI {
    public drawCircle(x: number, y: number, radius: number): void {
        console.log('API2.cercle position %f:%f rayon %f\n', x, y, radius);
    }
}

/** "Abstraction" */
interface Shape {
    draw(): void;                             // bas niveau
    resizeByPercentage(pct: number): void;     // haut niveau
}

/** "AbstractionRaffinée" */
class CircleShape implements Shape {
    private x: number;
    private y: number;
    private radius: number;
    private drawingAPI: DrawingAPI;

    constructor(x: number, y: number, radius: number, drawingAPI: DrawingAPI) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.drawingAPI = drawingAPI;
    }

// bas niveau, càd spécifique à une implémentation
    public draw(): void {
        this.drawingAPI.drawCircle(this.x, this.y, this.radius);
    }

// haut niveau, càd spécifique à l'abstraction
    public resizeByPercentage(pct: number): void {
        this.radius *= pct;
    }
}

export {Shape, CircleShape, DrawingAPI1, DrawingAPI2};
