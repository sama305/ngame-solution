export class Game {
    private readonly MIN: number = 1
    private readonly MAX: number = 1025
    private readonly MAX_TRIES: number = 10

    private readonly number: number
    private tries: number = 0

    constructor() {
        this.number = Math.floor(Math.random() * (this.MAX - this.MIN)) + this.MIN;
    }

    guess(number: number): Result {
        if(number === this.number){
            return new Success()
        }
        if(++this.tries >= this.MAX_TRIES) {
            return new GameOver(this.number)
        }
        else {
            const hint = number < this.number ? 'low' : 'high'
            return new TryAgain(hint)
        }
    }

    currentTry(): number {
        return this.tries + 1
    }
}

export interface Result {
    readonly success: boolean
}

export class Success implements Result {
    readonly success = true
}

export class TryAgain implements Result {
    readonly success = false
    constructor(readonly hint: string) {}
}

export class GameOver implements Result {
    readonly success = false
    constructor(readonly number: number) {}
}
