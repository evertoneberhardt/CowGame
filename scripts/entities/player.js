import { Animation } from "../../libs/animation.js";
import { Input } from "../../libs/inputHandler.js";
import { center, ctx } from "../game/canvas.js";
import { Globals } from "../game/globals.js";
import { degToRad } from "../utils/utils.js";

export class Player {
    constructor() {
        this.canPickUp = false;
        this.isHoldingTheCow = false;
        this.canDrop = false;
        this.point = 0;
        this.x = 0;
        this.y = 0;
        this.width = 18;
        this.height = 46;
        this.radius = Globals.radius + this.height;
        this.angle = 0;
        this.speed = 1;
        this.flip = 1;
        this.anim = new Animation();
        this.image = document.getElementById('sprite-sheet');
        this.grid = this.anim.newGrid(this.width, this.height, this.width * 14, this.height, 192, 58);
        this.animations = {}
        this.animations.idle = this.anim.newAnimation(this.grid('0-0', 0), 1, true);
        this.animations.idleWithCow = this.anim.newAnimation(this.grid('7-13', 0), 6, true);
        this.animations.run = this.anim.newAnimation(this.grid('1-3', 0), 6, true);
        this.animations.runWithCow = this.anim.newAnimation(this.grid('4-6', 0), 6, true);

        this.animation = this.animations.idle;
        this.lastState = 0;
        this.STATES = {
            IDLE: 0,
            IDLE_WITH_COW: 1,
            RUN: 2,
            RUN_WITH_COW: 3
        }

        this.state = 0;

        this.changeState(this.STATES.IDLE);
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
        const direction = Input.getAxis("KeyA", "KeyD");
        if (Input.isKeyJustPressed("Space")) {
            if (!this.isHoldingTheCow) {
                this.canPickUp = true;
            } else if (this.isHoldingTheCow) {
                this.canPickUp = false;
                this.canDrop = true;
            }

        }

        if (direction != 0) {
            this.flip = direction;
            this.changeState(this.STATES.RUN);
        } else {
            this.changeState(this.STATES.IDLE);
        }

        switch (this.state) {
            case this.STATES.IDLE:
                if (this.isHoldingTheCow) {
                    this.animation = this.animations.idleWithCow;
                } else {
                    this.animation = this.animations.idle;
                }
                this.speed = 1;
                break;
            case this.STATES.RUN:
                if (this.isHoldingTheCow) {
                    this.animation = this.animations.runWithCow;
                } else {
                    this.animation = this.animations.run;
                }
                this.speed = 30 * this.flip;
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
        this.animation.draw(ctx, this.image, -(this.width / 2), -this.radius, this.flip);
        // ctx.fillStyle = 'orange';
        // ctx.fillRect(-9, -122, 18, 46);
        ctx.restore();
    }
}