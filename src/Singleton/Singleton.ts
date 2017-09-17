class SingletonClass {
    private static _instance: SingletonClass;

    private constructor() {

    }

    public static getInstance(): SingletonClass {
        return this._instance || (this._instance = new this());
    }

    public mirror(str: string) {
        return str;
    }
}

export {SingletonClass};
