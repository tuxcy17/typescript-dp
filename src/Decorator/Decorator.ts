// interface des fenêtres
interface Table {
    draw(): void; // dessine la fenêtre
    getDescription(): string; // retourne une description de la fenêtre
}

// implémentation d'une fenêtre simple, sans barre de défilement
class SimpleTable implements Table {
    public draw(): void {
        // dessiner la fenêtre
    }

    public getDescription(): string {
        return 'fenêtre simple';
    }
}

// classe décorative abstraite, implémente Table
abstract class TableDecorator implements Table {
    protected decoratedTable: Table; // la fenêtre décorée

    constructor(decoratedTable: Table) {
        this.decoratedTable = decoratedTable;
    }

    public abstract draw(): void;

    public abstract getDescription(): string;
}

// décorateur concret ajoutant une barre verticale de défilement
class VerticalScrollBarDecorator extends TableDecorator {

    constructor(decoratedTable: Table) {
        super(decoratedTable);
    }

    public draw(): void {
        this.drawVerticalScrollBar();
        this.decoratedTable.draw();
    }

    private drawVerticalScrollBar(): void {
        // afficher la barre verticale de défilement
    }

    public getDescription(): string {
        return this.decoratedTable.getDescription() + ', avec une barre verticale de défilement';
    }
}


// décorateur concret ajoutant une barre horizontale de défilement
class HorizontalScrollBarDecorator extends TableDecorator {
    constructor(decoratedTable: Table) {
        super(decoratedTable);
    }

    public draw(): void {
        this.drawHorizontalScrollBar();
        this.decoratedTable.draw();
    }

    private drawHorizontalScrollBar(): void {
        // afficher la barre horizontale de défilement
    }

    public getDescription(): string {
        return this.decoratedTable.getDescription() + ', avec une barre horizontale de défilement';
    }
}

export {HorizontalScrollBarDecorator, VerticalScrollBarDecorator, Table, SimpleTable};
