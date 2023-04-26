import {PromptPlayer} from "./player";
import {Runner} from "./runner";

const runner = new Runner(new PromptPlayer())

runner.run();
