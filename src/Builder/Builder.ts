enum TypeCar {
    SPORT,
    CITY,
    BREAK
}

class Car {
    private description: string;

    constructor(aDescription: string) {
        this.description = aDescription;
    }

    public toString(): string {
        return this.description;
    }
}

class CarBuilder {
    private carType: TypeCar;
    private hasTripComputer: boolean;
    private hasGPS: boolean;
    private seaterNumber: number;

    public getResult(): Car {
        return new Car((this.carType === TypeCar.CITY) ? 'A city car' : ((this.carType === TypeCar.SPORT) ? 'A sport car' : 'A cabriolet')
            + ' with ' + this.seaterNumber + ' seaters'
            + (this.hasTripComputer ? ' with a trip computer' : '')
            + (this.hasGPS ? ' with a GPS' : '')
            + '.');
    }

    public setSeaters(number: number): void {
        this.seaterNumber = number;
    }

    public setCityCar(): void {
        this.carType = TypeCar.CITY;
    }

    public setBreak(): void {
        this.carType = TypeCar.BREAK;
    }

    public setSportCar(): void {
        this.carType = TypeCar.SPORT;
    }

    public setTripComputer(): void {
        this.hasTripComputer = true;
    }

    public unsetTripComputer(): void {
        this.hasTripComputer = false;
    }

    public setGPS(): void {
        this.hasGPS = true;
    }

    public unsetGPS(): void {
        this.hasGPS = false;
    }
}

export {Car, CarBuilder};