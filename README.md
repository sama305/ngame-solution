# The Number Game

## Description 
Welcome to the number game where you need to guess a random generated number. 
The generated number range is **1 to 1024** and a player has a max number of **10 tries**.
You can play the game as a prompt player.

## Task
Your task is to "hack" the game by writing a BotPlayer that always beats the game. 

The game logic is split into 5 files:
- `game.ts`: Encapsulate the game logic
- `player.ts`: Define 2 types of players and encapsulate a player's "next guess" logic 
- `runner.ts`: Orchestrates the communication between the game and the player.
- `run-prompt.ts`: Configures a player as a prompt player and runs the game.
- `run-bot-ts`: Configures a player as a bot player and runs the game.

Within `player.ts` file you should find an "empty" implementation of a BotPlayer:
```typescript
export class BotPlayer implements Player {
   next(prevResult: Result): number {
      return 0; // your code goes here
   }

}
```

The `next(prevResult: Result): number` function is responsible for guessing the next number.
As a parameter it takes in an object representing a previous result if such exists 
(the first time the function is invoked the `prevResult` value will be `undefined`).

There 3 types of classes that represent/extends the `Result` class (see their usage in `PromptPlayer` class)
- Success
- TryAgain
- GameOver

**Hint: Do not overthink it, all types of the `Result` class contain all the info you need to "hack" the game.
You should be only coding within the scope of `BotPlayer` class**

## Background
This is a binary search problem which means the max attemts to guess a number can follow the following formula:
`max_attempts = log2(n)` where `n` is number of possibilities.

Hence, your bot should be able to "hack the game". `log2(1024) = 10`


**Hint: Everytime your bot chooses a number it should eliminate half of the remaining possible numbers**

## Technical
1. To run the game you must have [npm installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-installer-to-install-nodejs-and-npm).
2. This is a [Typescript](https://www.typescriptlang.org/) project

### First Time Setup

1. Install project dependencies
    ```shell
    npm install
    ```

2. Build project (transpiles Typescript to vanilla Javascript)
    ```shell
    npm run build
    ```

### Run The Game

1. Run the game as a "Prompt" player 
    ```shell
    npm run prompt
    ```

2. Run the game as a "Bot" player
    ```shell
    npm run bot
    ```
   
### Building project after new changes have been added
**Important: In order for new changes to take effect you will need to run the build command!**

If you add new dependencies to package.json file, though you should not be needing to, 
you'll need to run the install command!
