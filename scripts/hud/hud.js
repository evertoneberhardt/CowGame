import { center, ctx } from "../game/canvas.js";
import { drawText } from "../utils/drawText.js";

const image = document.getElementById('sprite-sheet');


export class Hud {

    static drawPlayerPoints(points) {
        ctx.save();
        ctx.translate(center.x, 0)
        ctx.scale(2, 2);
        ctx.drawImage(image, 192, 104, 48, 16, - 58, 5, 48, 16);
        drawText.drawText(-20, 10, (points).toString(), "darkShadow");
        ctx.restore();

    }
    static drawOvniPoints(points) {
        ctx.save();
        ctx.translate(center.x, 0)
        ctx.scale(-2, 2);
        ctx.drawImage(image, 192, 120, 48, 16, -58, 5, 48, 16);
        ctx.restore();
        ctx.save();
        ctx.translate(center.x, 0)
        ctx.scale(2, 2);
        drawText.drawText(+20, 10, (points).toString(), "darkShadow");
        ctx.restore();
    }
}