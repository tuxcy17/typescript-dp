// inspired by: https://fr.wikibooks.org/wiki/Patrons_de_conception/Cha%C3%AEne_de_responsabilit%C3%A9

enum Level {
    ERR = 0,
    NOTICE = 1,
    DEBUG = 2
}

enum Status {
    PENDING = 0,
    RUNNING = 1,
    ERROR = 2,
    FINISH = 3
}

class QueryLogger {
    id: string;
    msg: string;
    level: Level;

    constructor(msg: string, level: Level, id: string) {
        this.id = id;
        this.msg = msg;
        this.level = level;
    }
}


// A wrapper for every chain of responsability
class ChainLogger<T1> {
    status: Status;
    chain: any;

    constructor() {
        this.status = Status.PENDING;
    }

    addChain(toAdd: any) {
        this.chain === undefined ?
            this.chain = toAdd :
            this.chain.setNext(toAdd);
    }

    process(query: T1): Promise<any> {
        this.status = Status.RUNNING;
        const p = new Promise((resolve, reject) => {
            this.chain.process(query).then((res) => {
                this.status = Status.FINISH;
                resolve(res);
            }, (err) => {
                this.status = Status.ERROR;
                reject(err);
            });
        });

        return p;
    }
}

abstract class Logger {
    level: Level;
    next: Logger;

    protected constructor(level: Level) {
        this.next = null;
        this.level = level;
    }

    public setNext(l: Logger) {
        let cursor: Logger = this;
        while (cursor.next != null) {
            cursor = cursor.next;
        }
        cursor.next = l;
    }

    public process(query: QueryLogger, result: string[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            if (query.level <= this.level) {
                this.action(query.msg, query.id).then((res) => {
                    result.push(res);
                    if (this.next != null) {
                        resolve(this.next.process(query, result));
                    } else {
                        resolve(result);
                    }
                }, (err) => {
                    reject(err);
                });
            } else if (this.next != null) {
                resolve(this.next.process(query, result));
            } else {
                resolve(result);
            }
        });
    }

    protected abstract action(msg: string, id: string): Promise<any>;
}

class StdoutLogger extends Logger {
    constructor(level: Level) {
        super(level);
    }

    protected action(msg: string, id: string): Promise<any> {
        const p = new Promise((resolve, reject) => {
            console.log(id + ' Writing to stdout: ' + msg);
            resolve(id + '=>OK');
        });

        return p;
    }
}

class EmailLogger extends Logger {
    constructor(level: Level) {
        super(level);
    }

    protected action(msg: string, id: string): Promise<any> {
        const p = new Promise((resolve, reject) => {
            console.log(id + ' Sending via email: ' + msg);
            resolve(id + '=>OK');
        });

        return p;
    }
}

class StderrLogger extends Logger {
    constructor(level: Level) {
        super(level);
    }

    protected action(msg: string, id: string): Promise<any> {
        const p = new Promise((resolve, reject) => {
            console.log(id + ' Writing to stderr: ' + msg);
            resolve(id + '=>OK');
        });

        return p;
    }
}


export {QueryLogger, ChainLogger, Logger, StderrLogger, EmailLogger, StdoutLogger, Level};
