import {ConcreteSubject} from './Subject';

abstract class Observer {
    public abstract update(): void;
}

class ConcreteObserver extends Observer {
    private name: string;
    private observerState: string;
    private subject: ConcreteSubject;

    constructor(subject: ConcreteSubject, name: string) {
        super();
        this.subject = subject;
        this.name = name;
        // subject.attach(this);
    }

    public update(): string {
        this.observerState = this.subject.getSubjectState();
        console.log(`Observer ${this.name}'s new state is ${this.observerState}`);
        return this.observerState;
    }
}

export {ConcreteObserver, Observer};
