import {Player} from "./player";

export class Game {
    private readonly MIN: number = 1
    private readonly MAX: number = 1025
    private readonly MAX_TRIES: number = 10

    private readonly number: number
    private tries: number = 0

    constructor() {
        this.number = Math.floor(Math.random() * (this.MAX - this.MIN)) + this.MIN;
    }

    public guess(number: number): Result {
        this.tries++
        if(this.tries >= this.MAX_TRIES) {
            return new GameOver(this.currentTry(),this.number)
        }
        if(number === this.number){
            return new Success(this.currentTry())
        }
        else {
            const hint = number < this.number ? 'low' : 'high'
            return new TryAgain(this.currentTry(),hint)
        }
    }

    private currentTry(): number {
        return this.tries
    }
}

export class Result {
    readonly success: boolean
    constructor(readonly currentTry: number) {}
}

export class Success extends Result {
    readonly success = true
}

export class TryAgain extends Result {
    readonly success = false
    constructor(readonly currentTry: number, readonly hint: string) {
        super(currentTry)
    }
}

export class GameOver extends Result {
    readonly success = false
    constructor(readonly currentTry: number, readonly number: number) {
        super(currentTry)
    }
}
