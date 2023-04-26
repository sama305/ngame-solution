import Prompt from "prompt-sync";

export interface Input {
    next(): number
}

export class PromptInput implements Input {
    private readonly prompt = Prompt();
    next(): number {
        const input = this.prompt(`Your Guess: `);
        const number: number | undefined = parseInt(input);
        if(!number){
            throw new Error(`Input must be a number!`);
        }
        return number
    }

}

export class BotInput implements Input {
    next(): number {
        return 0;
    }

}
