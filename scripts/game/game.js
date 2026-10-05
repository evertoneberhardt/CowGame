import { Barn } from "../entities/barn.js";
import { Cow } from "../entities/cow.js";
import { Ovni } from "../entities/ovni.js";
import { Planet } from "../entities/planet.js";
import { Player } from "../entities/player.js";
import { Hud } from "../hud/hud.js";
import { isColliding } from "../utils/utils.js";
// import { canvas, center, ctx } from "./canvas.js";

const planet = new Planet();
const barn = new Barn();
const player = new Player();
const ovni = new Ovni();
let cows = [];

function createNew(object, amt, angle) {
    for (let i = 0; i < amt; i++) {
        cows.push(new object(angle));
    }
    // return new object();
}

createNew(Cow, 10);

export function game(deltaTime) {
    planet.update(deltaTime);
    barn.update(deltaTime);
    player.update(deltaTime);
    ovni.update(deltaTime);

    planet.draw();
    barn.draw();
    player.draw();

    cows.forEach((cow, index) => {
        cow.update(deltaTime);
        cow.draw();

        if (isColliding(player, cow) && player.canPickUp) {
            player.canPickUp = false;
            player.isHoldingTheCow = true;
            cows.splice(index, 1);
        }

        if (ovni.positiveAngle() >= cow.positiveAngle() &&
            ovni.positiveAngle() <= cow.positiveAngle() + 2) {
            cows.splice(index, 1);
            ovni.chanceState(ovni.STATES.ABDUCTING);
            ovni.point++;
        }

    });
    if (player.canDrop) {
        if (isColliding(player, barn)) {
            barn.changeState(barn.STATES.DROP);
            player.point += 1;
        } else {
            createNew(Cow, 1, player.angle + (18 * player.flip));
        }
        player.canDrop = false;
        player.isHoldingTheCow = false;
    }

    if (isColliding(player, barn) && player.isHoldingTheCow) {
        barn.changeState(barn.STATES.COLLIDING);
    } else if (barn.state != barn.STATES.DROP) {
        barn.changeState(barn.STATES.NORMAL);
    }

    ovni.draw();

    Hud.drawPlayerPoints(player.point);
    Hud.drawOvniPoints(ovni.point);
    
}
