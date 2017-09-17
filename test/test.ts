import * as _ from 'underscore';
import * as moment from 'moment';
import {Setup, Teardown, Test, TestCase, TestFixture, Expect} from 'alsatian';
import {Image, ProxyImage} from '../src/Proxy/Proxy';
import {SingletonClass} from '../src/Singleton/Singleton';
import {CircleShape, DrawingAPI1, Shape, DrawingAPI2} from '../src/Bridge/Bridge';
import {HorizontalScrollBarDecorator, SimpleTable, Table, VerticalScrollBarDecorator} from '../src/Decorator/Decorator';
import {ConcreteSubject} from '../src/Observer/Subject';
import {ConcreteObserver} from '../src/Observer/Observer';
// import moment = require('moment');

@TestFixture('Design Pattern')
export class DesignPatternTest {
    now;

    @Setup
    public setup() {
        this.now = moment();
    }

    @Teardown
    public teardown() {
        const diff = moment().diff(this.now);
        console.log(`takes: ${diff}ms.`);
    }

    @TestCase()
    @Test('#Proxy')
    public factoryTest() {
        const image1: Image = new ProxyImage('HiRes_10MB_Photo1');
        const image2: Image = new ProxyImage('HiRes_10MB_Photo2');

        Expect(image1.displayImage() && image2.displayImage()).toEqual(true); // chargement nécessaire
    }

    @TestCase('one test string')
    @TestCase('two test string')
    @Test('#Singleton test, must return same string that is passed to mirror')
    public singletonTest(testString: string) {
        Expect(SingletonClass.getInstance().mirror(testString)).toBe(testString);
    }

    @Test('#Decorator')
    public decoratorTest () {
        const shapes: Array<Shape> = [];
        shapes.push(new CircleShape(1, 2, 3, new DrawingAPI1()));
        shapes.push(new CircleShape(5, 7, 11, new DrawingAPI2()));

        const decoratedTable: Table =
            new HorizontalScrollBarDecorator(
                new VerticalScrollBarDecorator(
                    new SimpleTable()
                )
            );

        console.log(decoratedTable.getDescription());
    }

    @TestCase()
    @Test('#Observer')
    public observerTest() {
        const subject: ConcreteSubject = new ConcreteSubject();
        subject.attach(new ConcreteObserver(subject, 'A'));
        subject.attach(new ConcreteObserver(subject, 'B'));
        subject.attach(new ConcreteObserver(subject, 'C'));
        subject.notifyObservers();
        subject.setSubjectState('NEW');
        Expect(subject.notifyObservers()).toEqual(['NEW', 'NEW', 'NEW']);
    }

}
