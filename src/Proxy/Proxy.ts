abstract class Image {
    protected filename: string;

    public abstract displayImage(): boolean ;
}

class RealImage extends Image {

    constructor(filename: string) {
        super();
        this.filename = filename;
        this.loadImageFromDisk();
    }

    private loadImageFromDisk(): void {
        console.log('Chargement de ' + this.filename);
    }

    public displayImage(): boolean {
        console.log('Affichage de  ' + this.filename);
        return true;
    }
}

class ProxyImage extends Image {
    private image: Image;

    constructor(filename: string) {
        super();
        this.filename = filename;
    }

    public displayImage(): boolean {
        if (this.image == null) {
            this.image = new RealImage(this.filename); // Chargement sur demande seulement
        }
        this.image.displayImage();
        return true;
    }
}


export {Image, ProxyImage};
