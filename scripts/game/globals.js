import { getData } from "./storage.js";

class Globals {
    static STATES = {
        START: 1,
        GAME: 2,
        PAUSE: 3,
        OPTIONS: 4
    }

    static scale = 1.5;
    static radius = 76;

    static state = Globals.STATES.START;
    static lastState = null;

    static changeState(newState) {
        Globals.lastState = Globals.state;
        Globals.state = newState;
    }

    static getMusicVolume() {
        const data = getData();
        return data.musicVolume;
    }

    static getSfxVolume() {
        const data = getData();
        return data.sfxVolume;
    }
}

export { Globals };
