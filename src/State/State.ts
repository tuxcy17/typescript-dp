interface Statelike {
    writeName(STATE_CONTEXT: StateContext, NAME: string): string;
}

class StateA implements Statelike {
    public writeName(STATE_CONTEXT: StateContext, NAME: string): string {
        const res: string = NAME.toLowerCase();
        console.log(res);
        STATE_CONTEXT.setState(new StateB());
        return res;
    }
}

class StateB implements Statelike {
    private count: number = 0;

    public writeName(STATE_CONTEXT: StateContext, NAME: string): string {
        const res: string = NAME.toUpperCase();
        console.log(res);
        ++this.count;
        if (this.count >= 1) {
            STATE_CONTEXT.setState(new StateA());
        }
        return res;
    }
}

class StateContext {
    private myState: Statelike;

    constructor() {
        this.setState(new StateA());
    }

    public setState(NEW_STATE: Statelike): void {
        this.myState = NEW_STATE;
    }

    public writeName(NAME: string): string {
        const res: string = this.myState.writeName(this, NAME);
        return res;
    }
}

export {StateA, StateB, StateContext, Statelike};