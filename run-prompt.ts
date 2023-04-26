import {PromptPlayer} from "./player";
import {Game} from "./game"

const game = new Game(new PromptPlayer());

game.run();
