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
   // These numbers are -/+ 1 than the actual min and max values so that there
    // is some leeway
    private minGuess: number = 0;
    private maxGuess: number = 1025;
    private guess: number = 1024 / 2;

    next(prevResult: Result): number {
        
        // This is the initial guess (Result == undefined).
        // Since there is nothing to base this guess off of, the best option is
        // to simply pick the value in the middle. Since the randomizer can
        // choose from between 1 and 1025 (not including 1025), the middle
        // would be 1024 / 2 = 512.
        if (prevResult == undefined)
        { return this.guess; }

        // Previous guess failed, so try to determine the next guess base on
        // whether it was too low or too high.
        if (prevResult instanceof TryAgain)
        {
            switch(prevResult.hint)
            {
                // Previous guess was too high
                case 'high':
                    // Set upper limit
                    this.maxGuess = this.guess;

                    // Get average of lower limit and previous guess.
                    // In this case, we use Math.floor() because are trying to
                    // reach the lowest integer values. Without it, we would
                    // get floating point numbers, and with something like
                    // Math.ceil() we would never be able to get the lowest
                    // possible value, 1.
                    this.guess = Math.floor((this.guess + this.minGuess) / 2);
                    break;
                // Previous guess was too low
                case 'low':
                    // Set lower limit
                    this.minGuess = this.guess;

                    // Get average of upper limit and previous guess.
                    // Same as above, but we use Math.ceil() because we want to
                    // be able to get the highest possible value, 1024.
                    this.guess = Math.ceil((this.guess + this.maxGuess) / 2);
                    break;
            }
            return this.guess;
        }
    }

}
