/** The classes that implement a concrete strategy should implement this.
 * The Context class uses this to call the concrete strategy. */
interface Strategy {
    execute(a: number, b: number);
}

/** Implements the algorithm using the strategy interface */
class Add implements Strategy {
    public execute(a: number, b: number): number {
        console.log('Called Add\'s execute()');
        return a + b;
    }
}
class Subtract implements Strategy {
    public execute(a: number, b: number) {
        console.log('Called Subtract\'s execute()');
        return a - b;
    }
}
class Multiply implements Strategy {
    public execute(a: number, b: number): number {
        console.log('Called Multiply\'s execute()');
        return a * b;
    }
}

class Context {
    private strategy: Strategy;

    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }

    public executeStrategy(a: number, b: number) {
        return this.strategy.execute(a, b);
    }
}

export {Context, Add, Multiply, Subtract};