import * as _ from 'underscore';
import {Observer} from './Observer';

abstract class Subject {
    // Fields
    private observers: Array<Observer> = [];

    public attach(observer: Observer): void {
        this.observers.push(observer);
    }

    public detach(observer: Observer): void {
        let index: number;

        _.each(this.observers, (o, i) => {
            if (o === observer) {
                index = i;
            }
        });

        if (index != null) {
            this.observers.splice(index, 1);
        }
    }

    public notifyObservers(): Array<any> {
        const res = [];

        _.each(this.observers, function (o) {
            res.push(o.update());
        });

        return res;
    }
}

class ConcreteSubject extends Subject {
    private subjectState: string;

    public getSubjectState(): string {
        return this.subjectState;
    }

    public setSubjectState(value: string): void {
        this.subjectState = value;
    }
}

export {ConcreteSubject, Subject};
