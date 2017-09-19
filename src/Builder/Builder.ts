class User {
    protected firstName: string;
    protected age: number;
    protected phone: string;
    protected lastName: string;
    protected address: string;

    protected constructor(builder?: UserBuilder) {
        this.firstName = builder && builder.firstName;
        this.lastName = builder && builder.lastName;
        this.age = builder && builder.age;
        this.phone = builder && builder.phone;
        this.address = builder && builder.address;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public getAge(): number {
        return this.age;
    }

    public getPhone(): string {
        return this.phone;
    }

    public getAddress(): string {
        return this.address;
    }

    public getDescription(): string {
        return `${this.age} ${this.firstName} ${this.lastName} ${this.phone} ${this.address}`;
    }
}

class UserBuilder extends User {
    constructor(firstName: string, lastName: string) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public setAge(age: number): UserBuilder {
        this.age = age;
        return this;
    }

    public setPhone(phone: string): UserBuilder {
        this.phone = phone;
        return this;
    }

    public setAddress(address: string): UserBuilder {
        this.address = address;
        return this;
    }

    public build(): User {
        return new User(this);
    }
}

export {User, UserBuilder}