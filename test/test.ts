import * as _ from 'underscore';
import * as moment from 'moment';
import {Setup, Teardown, Test, TestCase, TestFixture} from 'alsatian';
import {Image, ProxyImage} from '../src/Proxy/Proxy';
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

        image1.displayImage(); // chargement nécessaire
        image2.displayImage(); // chargement nécessaire
        image1.displayImage(); // pas de chargement nécessaire, déjà fait
    }
}
