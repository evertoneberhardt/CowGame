import { center, ctx } from "../game/canvas.js";
import { Globals } from "../game/globals.js";
export class Planet {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 160;
        this.height = 160;
        this.radius = this.width / 2;
        this.angle = 0;
        this.speed = 1;
    }

    update(deltaTime) {}

    draw() {
        ctx.save();
        ctx.translate(center.x, center.y);
        ctx.scale(Globals.scale, Globals.scale);
        ctx.fillStyle = "darkgreen";
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}
