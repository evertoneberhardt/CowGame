import { Input } from "./libs/inputHandler.js";
import { Sound } from "./libs/sound.js";
import * as canvas from "./scripts/game/canvas.js";
import { game } from "./scripts/game/game.js";
import { Globals } from "./scripts/game/globals.js";
import { loadData } from "./scripts/game/storage.js";
import { options, pause, start } from "./scripts/ui/ui.js";

let lastTime = 0;


function init() {
    loadData();
    Sound.init();
    Sound.loadSound("orbiting", "./assets/sounds/game/ufo.ogg");
    Sound.loadSound("cow_01", "./assets/sounds/game/cow_01.ogg");
    Sound.loadSound("cow_02", "./assets/sounds/game/cow_02.ogg");
    Sound.loadSound("cow_03", "./assets/sounds/game/cow_03.ogg");
    Sound.loadSound("click", "./assets/sounds/ui/click.wav");
    
    const loading = document.getElementById("loading");
    canvas.resizeCanvas(canvas.width, canvas.height);
    loading.style.visibility = 'hidden';
    Globals.changeState(Globals.STATES.START);
    requestAnimationFrame(gameLoop);
}


function gameLoop(timeStamp) {
    canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    const deltaTime = (timeStamp - lastTime) / 1000;

    canvas.ctx.fillStyle = "skyblue";
    canvas.ctx.fillRect(0, 0, canvas.canvas.width, canvas.canvas.height);

    switch (Globals.state) {
        case Globals.STATES.START:
            start();
            break;
        case Globals.STATES.GAME:
            if (Input.isKeyJustPressed("KeyP")) {
                Sound.stopGroup("game");
                Globals.changeState(Globals.STATES.PAUSE);
            }
            
            game(deltaTime);
            
            break;
        case Globals.STATES.PAUSE:
            pause();
            break;
        case Globals.STATES.OPTIONS:
            options();
            break;
    }

    
    // canvas.ctx.beginPath();
    // canvas.ctx.strokeStyle = "red";
    // canvas.ctx.moveTo(0, (canvas.canvas.height / 2));
    // canvas.ctx.lineTo(canvas.canvas.width, (canvas.canvas.height / 2));
    // canvas.ctx.moveTo((canvas.canvas.width / 2), 0);
    // canvas.ctx.lineTo((canvas.canvas.width / 2), canvas.canvas.height);
    // canvas.ctx.stroke();
    // canvas.ctx.closePath();

    lastTime = timeStamp;
    requestAnimationFrame(gameLoop);
}

window.addEventListener("load", init);