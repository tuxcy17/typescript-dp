import * as _ from 'underscore';
import * as moment from 'moment';
import {Setup, Teardown, Test, TestCase, TestFixture, Expect, AsyncTest} from 'alsatian';
import {Image, ProxyImage} from '../src/Proxy/Proxy';
import {SingletonClass} from '../src/Singleton/Singleton';
import {CircleShape, DrawingAPI1, Shape, DrawingAPI2} from '../src/Bridge/Bridge';
import {HorizontalScrollBarDecorator, SimpleTable, Table, VerticalScrollBarDecorator} from '../src/Decorator/Decorator';
import {ConcreteSubject} from '../src/Observer/Subject';
import {ConcreteObserver} from '../src/Observer/Observer';
import {
    ChainLogger, EmailLogger, Level, QueryLogger, StderrLogger,
    StdoutLogger
} from '../src/ChainOfResponsability/ChainOfResponsability';
import {Animal, AnimalFactory, AnimalType} from '../src/Factory/Factory';
import {Button, GuiFactory, TypeOS} from '../src/AbstractFactory/AbstractFactoryImpl';
import {User, UserBuilder} from '../src/Builder/Builder';
import {StateContext} from '../src/State/State';

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
    public proxyTest() {
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

    @TestCase()
    @Test('#Factory')
    public factoryTest() {
        const animalFactory: AnimalFactory = AnimalFactory.getInstance();
        const dog: Animal = animalFactory.getAnimal(AnimalType.DOG);
        const cat: Animal = animalFactory.getAnimal(AnimalType.CAT);
        const res = [dog.constructor.name, cat.constructor.name];
        Expect(true).toBe(_.isEqual(['Dog', 'Cat'], res));
    }


    @Test('#Decorator')
    public decoratorTest() {
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

    @TestCase()
    @Test('#Abstract Factory')
    public abstractFactoryTest() {
        const guiFactory: GuiFactory = GuiFactory.getFactory(TypeOS.OSX);
        const button: Button = guiFactory.createButton();
        Expect(true).toEqual(guiFactory.constructor.name === 'OSXFactory');
    }

    @TestCase()
    @Test('#Builder')
    public builderTest() {
        const userBuilder: UserBuilder = new UserBuilder('Cyril', 'RICHARD')
            .setAddress('somewhere')
            .setAge(12)
            .setPhone('12345');
        const user: User = userBuilder.build();

        Expect(user.getDescription()).toEqual(`${12} ${'Cyril'} ${'RICHARD'} ${'12345'} ${'somewhere'}`);
    }

    @TestCase()
    @Test('#State00')
    public stateTest() {
        const res = [];
        const SC: StateContext = new StateContext();
        res.push(SC.writeName("Monday"));
        res.push(SC.writeName("Tuesday"));
        res.push(SC.writeName("Wednesday"));
        res.push(SC.writeName("Thursday"));
        res.push(SC.writeName("Friday"));
        res.push(SC.writeName("Saturday"));
        res.push(SC.writeName("Sunday"));

        Expect(res).toEqual(['monday', 'TUESDAY', 'wednesday', 'THURSDAY', 'friday', 'SATURDAY', 'sunday']);
    }

    @TestCase()
    @AsyncTest('#chainOfResponsability ? Async chain of responsability with returning state for eache promise')
    public chainOfResponsabilityTest() {
        const chain: ChainLogger<QueryLogger> = new ChainLogger<QueryLogger>();

        chain.addChain(new StdoutLogger(Level.DEBUG));
        chain.addChain(new EmailLogger(Level.NOTICE));
        chain.addChain(new StderrLogger(Level.ERR));

        const promises = [];
        const q1: QueryLogger = new QueryLogger('Entering function y.', Level.DEBUG, 'P1');
        const q2: QueryLogger = new QueryLogger('Step1 completed.', Level.NOTICE, 'P2');
        const q3: QueryLogger = new QueryLogger('An error has occurred.', Level.ERR, 'P3');

        promises.push(chain.process(q1));
        promises.push(chain.process(q2));
        promises.push(chain.process(q3));


        return Promise.all(promises).then((res) => {
            console.log('All promises end');
            const promisesResult = _.chain(res).flatten(true).uniq().value();
            Expect(true).toEqual(_.isEqual(['P1=>OK', 'P2=>OK', 'P3=>OK'], promisesResult));
        });
    }
}
