enum AnimalType {
    CAT = 0,
    DOG = 1
}

interface AnimalInterface {
    speak(): void;
}

abstract class Animal implements AnimalInterface {
    public abstract speak(): void;
}

class Dog extends Animal {
    public speak(): void {
        console.log('i\'m a dog');
    }
}

class Cat extends Animal {
    public speak(): void {
        console.log('i\'m a cat');
    }
}

class AnimalFactory {
    private static _instance: AnimalFactory = new AnimalFactory();

    private constructor() {

    }

    public static getInstance(): AnimalFactory {
        return this._instance;
    }

    public getAnimal(type: AnimalType): Animal {
        if (type === AnimalType.CAT) {
            return new Cat();
        } else if (type === AnimalType.DOG) {
            return new Dog();
        } else {
            console.log('impossible de créér un animal');
            throw new Error();
        }
    }
}

export {AnimalFactory, Cat, Dog, Animal, AnimalType};
