import Prompt from "prompt-sync";
import {Result, TryAgain} from "./game";

export interface Player {
    next(prevResult: Result): number
}

export class PromptPlayer implements Player {
    private readonly prompt = Prompt();
    next(prevResult: Result): number {
        const input = this.prompt(`Your Guess: `);
        const number: number | undefined = parseInt(input);
        if(!number){
            throw new Error(`Input must be a number!`);
        }
        return number
    }

}

export class BotPlayer implements Player {
    // The minimum and maximum values the random number can be. This sets the
    // initial bounds for the first guess.
    private minThreshold: number = 1;
    private maxThreshold: number = 1024;

    // The actual number to be returned by next()
    private guess: number;

    next(prevResult: Result): number {
        // If the previous guess failed, try to determine the next guess base on
        // whether it was too low or too high.
        if (prevResult instanceof TryAgain)
        {
            switch(prevResult.hint)
            {
                // If the previously guessed number was too high...
                case 'high':
                    // ...now you know that the bounds is less than that guess.
                    this.maxThreshold = this.guess - 1;
                    break;
                // Similarly, if the previously guessed number was too low...
                case 'low':
                    // ...now you know that the bounds greater than that guess.
                    this.minThreshold = this.guess + 1;
                    break;
            }
        }

        // This gets the average of the two bounds for the statistically most
        // probable answer and then floors it.
        this.guess = Math.floor((this.maxThreshold + this.minThreshold) / 2);

        // Finally return the guess.
        return this.guess;
    }
}