import { Animation } from "../../libs/animation.js";
import { center, ctx } from "../game/canvas.js";
import { Globals } from "../game/globals.js";
import { degToRad } from "../utils/utils.js";

export class Barn {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 54;
        this.height = 58;
        this.speed = 1;
        this.angle = 0;
        this.radius = Globals.radius + this.height;
        this.image = document.getElementById('sprite-sheet');
        this.anim = new Animation();
        this.grid = this.anim.newGrid(this.width, this.height, this.width * 9, this.height, 0, 0);
        this.animations = {};
        this.animations.normal = this.anim.newAnimation(this.grid('0-0', 0), 1, true);
        this.animations.colliding = this.anim.newAnimation(this.grid('3-8', 0), 6, true);
        this.animations.drop = this.anim.newAnimation(this.grid('0-2', 0), 6, false);

        this.animation = this.animations.normal;

        this.STATES = {
            NORMAL: 0,
            COLLIDING: 1,
            DROP: 2
        }

        this.state = 0;

        this.changeState(this.STATES.NORMAL);

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

        switch (this.state) {
            case this.STATES.NORMAL:
                this.animation = this.animations.normal;
                break;
            case this.STATES.COLLIDING:
                this.animation = this.animations.colliding;
                break;
            case this.STATES.DROP:
                this.animation = this.animations.drop;
                if (this.animation.isFinished()) {
                    this.changeState(this.STATES.NORMAL);
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