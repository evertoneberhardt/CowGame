import { Animation } from "../../libs/animation.js";
import { Sound } from "../../libs/sound.js";
import { center, ctx } from "../game/canvas.js";
import { Globals } from "../game/globals.js";
import { degToRad } from "../utils/utils.js";

export class Ovni {
    constructor() {
        this.point = 0;
        this.x = 0;
        this.y = 0;
        this.width = 48;
        this.height = 88;
        this.angle = 0;
        this.speed = 10;
        this.radius = Globals.radius + this.height - 6;
        this.image = document.getElementById('sprite-sheet');
        this.anim = new Animation();
        this.grid = this.anim.newGrid(this.width, this.height, this.width * 24, this.height * 2, 0, 58);
        this.animations = {}
        this.animations.orbiting = this.anim.newAnimation(this.grid('0-3', 0), 8, true);
        this.animations.abducting = this.anim.newAnimation(this.grid('0-23', 1), 8, false);
        this.animation = this.animations.orbting;
        this.lastState = 0;
        this.STATES = { ORBITING: 0, ABDUCTING: 1 };
        this.state = 0
        this.chanceState(this.STATES.ORBITING);
        // Sound.loadSound("orbiting", "../../assets/sounds/game/ufo.ogg");
    }

    chanceState(newState) {
        this.lastState = this.state;
        this.state = newState;
    }

    positiveAngle() {
        if (this.angle < 0) {
            return (this.angle + 360);
        }

        return this.angle;
    }

    update(deltaTime) {
        const volume = Globals.getSfxVolume();
        switch (this.state) {
            case this.STATES.ORBITING:
                this.speed = 10;
                this.animation = this.animations.orbiting;
                if (!Sound.isPlaying("orbiting")) {
                    Sound.playSound("orbiting", true, volume, "game");
                }
                // Sound.playSound("orbiting", true, Globals.getSfxVolume(), "game");
                break;
            case this.STATES.ABDUCTING:
                this.speed = 1;
                this.animation = this.animations.abducting
                if (this.animation.isFinished()) {
                    this.chanceState(this.STATES.ORBITING);
                }
                break;
        }

        this.angle += this.speed * deltaTime;
        this.angle = this.angle % 360;
        this.animation.update(deltaTime);
    }

    draw() {
        ctx.save();
        ctx.translate(center.x, center.y);
        ctx.scale(Globals.scale, Globals.scale);
        ctx.rotate(degToRad(this.angle));
        this.animation.draw(ctx, this.image, -(this.width / 2), -this.radius);
        ctx.restore();
    }

}