abstract class Image {
    protected filename: string;

    public abstract displayImage(): void ;
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

    public displayImage(): void {
        console.log('Affichage de  ' + this.filename);
    }
}

class ProxyImage extends Image {
    private image: Image;

    constructor(filename: string) {
        super();
        this.filename = filename;
    }

    public displayImage(): void {
        if (this.image == null) {
            this.image = new RealImage(this.filename); // Chargement sur demande seulement
        }
        this.image.displayImage();
    }
}


export {Image, ProxyImage};
