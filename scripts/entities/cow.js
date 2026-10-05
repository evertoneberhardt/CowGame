import { Animation } from "../../libs/animation.js";
import { Sound } from "../../libs/sound.js";
import { center, ctx } from "../game/canvas.js";
import { Globals } from "../game/globals.js";
import { Timer } from "../utils/timer.js";
import { degToRad } from "../utils/utils.js";

export class Cow {
    constructor(angle) {
        this.timer = new Timer(Math.floor(Math.random() * 4) + 5, true);
        this.walkDist = new Timer(Math.floor(Math.random() * 3) + 2, false, true);
        this.isChangeTime = false;
        this.rdmState = 0;
        this.x = 0;
        this.y = 0;
        this.width = 18;
        this.height = 18;
        this.angle = angle || Math.floor(Math.random() * 360);
        this.speed = 1;
        this.radius = Globals.radius + this.height;
        this.image = document.getElementById('sprite-sheet');
        this.anim = new Animation();
        this.grid = this.anim.newGrid(this.width, this.height, this.width * 7, this.height * 8, 550, 0);
        this.animations = {};
        this.animations.idle = this.anim.newAnimation(this.grid('0-6', 0), 6, true);
        this.animations.eating = this.anim.newAnimation(this.grid('0-5', 1), 6, true);
        this.animations.walking = this.anim.newAnimation(this.grid('0-3', 2), 6, true);
        this.animation = this.animations.idle;
        this.lastState = 0;
        this.STATES = {
            IDLE: 0,
            EATING: 1,
            WALKING: 2
        }

        this.state = null
        this.changeState(this.STATES.IDLE);
        this.soundIndex = Math.floor(Math.random() * 3);
        this.nameSounds = ["cow_01", "cow_02", "cow_03"];
        // this.sounds = [
        //     { name: "cow_01", src: "../../assets/sounds/game/cow_01.ogg" },
        //     { name: "cow_02", src: "../../assets/sounds/game/cow_02.ogg" },
        //     { name: "cow_03", src: "../../assets/sounds/game/cow_03.ogg" }
        // ]
        // Sound.loadSound(this.sounds[this.soundIndex].name, this.sounds[this.soundIndex].src);

    }

    changeState(newState) {
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
        if (this.timer.onTimeout()) {
            this.isChangeTime = true;
            this.rdmState = Math.floor(Math.random() * 101);
        }

        switch (this.state) {
            case this.STATES.IDLE:
                this.speed = 1;
                this.animation = this.animations.idle;
                if (this.isChangeTime) {
                    this.isChangeTime = false;
                    if (!Sound.isPlaying(this.nameSounds[this.soundIndex])) {
                        Sound.playSound(this.nameSounds[this.soundIndex], false, volume, "game");
                    }
                    if (this.rdmState <= 50) {
                        this.changeState(this.STATES.EATING);
                    } else { 
                        this.changeState(this.STATES.WALKING);
                    }
                }
                break;
            case this.STATES.EATING:
                this.speed = 1;
                this.animation = this.animations.eating;
                if (this.isChangeTime) {
                    this.isChangeTime = false;
                    this.rdmState <= 50 ? this.changeState(this.STATES.WALKING) : this.changeState(this.STATES.IDLE);
                }
                break;
            case this.STATES.WALKING:
                this.walkDist.start();
                this.speed = 8;
                this.animation = this.animations.walking;
                if (this.walkDist.onTimeout()) {
                    this.rdmState <= 50 ? this.changeState(this.STATES.IDLE) : this.changeState(this.STATES.EATING);
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
        this.animation.draw(ctx, this.image, -this.width / 2, -this.radius);
        ctx.restore();

    }

}