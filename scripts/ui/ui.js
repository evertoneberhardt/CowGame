import { Button, Buttons, CheckButton, SliderButton } from "../../libs/buttons2.js";
import { Sound } from "../../libs/sound.js";
import * as canvas from "../game/canvas.js";
import { Globals } from "../game/globals.js";
import { getData, saveData } from "../game/storage.js";

let data = getData();
const bgPanel = document.getElementById("sprite-sheet");

// Sound.loadSound("click", "../../assets/sounds/ui/click.wav");
function playSound() {
    if (!Sound.isPlaying("click")) {
        Sound.playSound("click", false, Globals.getSfxVolume(), "ui");
    }
}

// begin menu start
const panelStart = new Buttons();

const btnStart = new Button(canvas.center.x - 40, canvas.center.y - 21, "START", () => {
    data = getData();
    if (data.fullscreen) {
        canvas.toggleFullScreen();
    }
    playSound();
    Globals.changeState(Globals.STATES.GAME); console.log("enter");

});

const btnOptions = new Button(canvas.center.x - 40, canvas.center.y + 5, "OPTIONS", () => {
    // Sound.playSound("click", false, Globals.getSfxVolume(), "ui");
    playSound();
    Globals.changeState(Globals.STATES.OPTIONS); console.log("options");

});

panelStart.add(btnStart);
panelStart.add(btnOptions);

export function start() {
    canvas.ctx.save();
    canvas.ctx.scale(2, 2);
    canvas.ctx.translate(-canvas.center.x / 2, -canvas.center.y / 2);

    btnStart.x = canvas.center.x - 40;
    btnStart.y = canvas.center.y - 21;
    btnOptions.x = canvas.center.x - 40;
    btnOptions.y = canvas.center.y + 5;
    panelStart.draw(canvas.ctx);

    canvas.ctx.restore();
}
// end menu start

// begin menu options
const panelOptions = new Buttons();

const sliderMusicVolume = new SliderButton(canvas.center.x - 40, canvas.center.y - 36, 80, 8, "red", data.musicVolume, () => { saveData("musicVolume", sliderMusicVolume.getValue) });
const sliderSfxVolume = new SliderButton(canvas.center.x - 40, canvas.center.y - 4, 80, 8, "green", data.sfxVolume, () => { saveData("sfxVolume", sliderSfxVolume.getValue) });
const checkFullscreen = new CheckButton(canvas.center.x - 16, canvas.center.y + 28, data.fullscreen, () => {
    // Sound.playSound("click", false, Globals.getSfxVolume(), "ui");
    playSound();
    saveData("fullscreen", checkFullscreen.getValue);
    if (document.fullscreenElement) {
        canvas.exitFullscreen();
    } else if (!document.fullscreenElement && checkFullscreen.getValue) {
        canvas.toggleFullScreen(); 
    }
});

const btnBack = new Button(canvas.center.x - 40, canvas.center.y + 52, "BACK", () => {
    // Sound.playSound("click", false, Globals.getSfxVolume(), "ui");
    playSound();
    if (Globals.lastState == Globals.STATES.PAUSE) {
        Globals.changeState(Globals.STATES.PAUSE);
    } else {
        Globals.changeState(Globals.STATES.START);
    } 
});

panelOptions.add(sliderMusicVolume);
panelOptions.add(sliderSfxVolume);
panelOptions.add(checkFullscreen);
panelOptions.add(btnBack);



export function options() {
    canvas.ctx.save();
    canvas.ctx.scale(2, 2);
    canvas.ctx.translate(-canvas.center.x / 2, -canvas.center.y / 2);
    canvas.ctx.drawImage(bgPanel, 766, 0, 128, 144, canvas.center.x - 64, canvas.center.y - 72, 128, 144);

    sliderMusicVolume.x = canvas.center.x - 40;
    sliderMusicVolume.y = canvas.center.y - 36;
    sliderSfxVolume.x = canvas.center.x - 40;
    sliderSfxVolume.y = canvas.center.y - 4;
    checkFullscreen.x = canvas.center.x - 16;
    checkFullscreen.y = canvas.center.y + 28;
    btnBack.x = canvas.center.x - 40;
    btnBack.y = canvas.center.y + 52;
    panelOptions.draw(canvas.ctx);

    canvas.ctx.restore();
}
// end menu options

// begin menu pause
const pausePanel = new Buttons();

const btnResume = new Button(canvas.center.x - 40, canvas.center.y - 34, "RESUME", () => { 
    // Sound.togllePause();
    // Sound.playSound("click", false, Globals.getSfxVolume(), "ui");
    playSound();
    Globals.changeState(Globals.STATES.GAME); console.log("resume") 
});

const btnPauseOptions = new Button(canvas.center.x - 40, canvas.center.y - 8, "OPTIONS", () => { 
    // Sound.playSound("click", false, Globals.getSfxVolume(), "ui");
    playSound();
    Globals.changeState(Globals.STATES.OPTIONS); 
});

const btnQuit = new Button(canvas.center.x - 40, canvas.center.y + 18, "QUIT", () => {
    // Sound.playSound("click", false, Globals.getSfxVolume(), "ui"); 
    playSound();
    Globals.changeState(Globals.STATES.START); console.log("quit"); 
});

pausePanel.add(btnResume);
pausePanel.add(btnPauseOptions);
pausePanel.add(btnQuit);

export function pause() {
    
    canvas.ctx.save();
    canvas.ctx.scale(2, 2);
    canvas.ctx.translate(-canvas.center.x / 2, -canvas.center.y / 2);

    btnResume.x = canvas.center.x - 40;
    btnResume.y = canvas.center.y - 34;
    btnPauseOptions.x = canvas.center.x - 40;
    btnPauseOptions.y = canvas.center.y - 8;
    btnQuit.x = canvas.center.x - 40;
    btnQuit.y = canvas.center.y + 18;
    pausePanel.draw(canvas.ctx);

    canvas.ctx.restore();
}
// end menu pause
