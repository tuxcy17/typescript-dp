import * as _ from 'underscore';

abstract class CarElementVisitor {
    abstract visitBody(body: Body): string;

    abstract visitCar(car: Car): string;

    abstract visitEngine(engine: Engine): string;

    abstract visitWheel(wheel: Wheel): string;

    public visit(obj: CarElement): string {
        if (obj instanceof Body) {
            return this.visitBody(obj);
        }
        if (obj instanceof Car) {
            return this.visitCar(obj);
        }
        if (obj instanceof Engine) {
            return this.visitEngine(obj);
        }
        if (obj instanceof Wheel) {
            return this.visitWheel(obj);
        }
    }
}

interface CarElement {
    accept(visitor: CarElementVisitor): string; // CarElements have to provide accept().
}

class Engine implements CarElement {
    public accept(visitor: CarElementVisitor): string {
        return visitor.visit(this);
    }
}

class Body implements CarElement {
    public accept(visitor: CarElementVisitor): string {
        return visitor.visit(this);
    }
}

class Wheel implements CarElement {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public accept(visitor: CarElementVisitor): string {
        return visitor.visit(this);
    }
}

class Car implements CarElement {
    public elements: Array<CarElement>;

    constructor() {
        this.elements = new Array<CarElement>();
        this.elements = [
            new Wheel('front left'),
            new Wheel('front right'),
            new Wheel('back left'),
            new Wheel('back right'),
            new Body(),
            new Engine()
        ];
    }

    public accept(visitor: CarElementVisitor) {
        return visitor.visit(this);
    }
}

class CarElementPrintVisitor extends CarElementVisitor {

    public visitBody(body: Body): string {
        console.log('Visiting body');
        return "BODY";
    }

    public visitCar(car: Car): string {
        console.log('Visiting car');

        _.each(car.elements, (elem: CarElement) => {
            elem.accept(this);
        });

        console.log('Visited car');

        return "CAR";
    }

    public visitEngine(engine: Engine): string {
        console.log('Visiting engine');
        return "ENGINE";
    }

    public visitWheel(wheel: Wheel): string {
        console.log('Visiting ' + wheel.getName() + ' wheel');
        return "WHEEL"
    }
}

export {CarElement, Car, Body, CarElementPrintVisitor, Engine, Wheel};