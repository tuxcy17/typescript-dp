enum TypeOS {
    OSX = 0,
    WIN = 1
}

abstract class GuiFactory {
    public static getFactory(type: TypeOS): GuiFactory {

        if (type === TypeOS.OSX) {
            return new OSXFactory();
        } else {
            return new WinFactory();
        }
    }

    public abstract createButton(): any;
}

class WinFactory extends GuiFactory {
    constructor() {
        super();
    }
    public createButton(): Button {
        return (new WinButton());
    }
}

class OSXFactory extends GuiFactory {
    constructor() {
        super();
    }
    public createButton(): Button {
        return (new OSXButton());
    }
}

abstract class Button {
    private caption: string;

    public abstract paint(): void;

    public getCaption(): string {
        return this.caption;
    }

    public setCaption(caption: string): void {
        this.caption = caption;
    }
}

class WinButton extends Button {
    public paint(): void {
        console.log('I\'m a WinButton: ' + this.getCaption());

    }
}
class OSXButton extends Button {
    public paint(): void {
        console.log('I\'m a OSXButton: ' + this.getCaption());
    }
}

export {OSXFactory, WinFactory, Button, OSXButton, WinButton, GuiFactory, TypeOS};
