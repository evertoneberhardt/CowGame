import { drawText } from "../scripts/utils/drawText.js";
import { clamp } from "../scripts/utils/utils.js";
import { Input } from "./inputHandler.js";

const imageButtons = document.getElementById("sprite-sheet");

export class Button {
    constructor(x, y, text, callback) {
        this._x = x;
        this._y = y;
        this.sx = 486;
        this.sy = 0;
        this.width = 64;
        this.height = 16;
        this.text = { x: this._x + 40, y: this._y + 4, text: text };
        this.callback = callback;
        this.selected = false;
        this.pressed = 1;
    }

    set x(value) {
        this._x = value;
        
    }

    set y(value) {
        this._y = value;

    }

    update() {
        this.text.x = this._x + 40;
        this.text.y = this._y + 4;
        
        if (this.selected) {
            if (Input.isKeyDown("Enter")) {
                this.pressed = 2;
            } else {
                this.pressed = 1;
            }

            if (this.pressed == 1) {
                this.text.y = this._y + 6;
            } else if (this.pressed == 2) {
                this.text.y = this._y + 7;
            }

            if (Input.isKeyUp("Enter")) {
                if (typeof this.callback == 'function') {
                    this.callback();
                }
            }
        } else {
            this.text.y = this._y + 4;
        }
        
    }

    draw(ctx) {
        this.update();
        ctx.drawImage(
            imageButtons,
            this.sx,
            this.sy + this.height * this.selected * this.pressed,
            this.width,
            this.height,
            this._x,
            this._y,
            this.width,
            this.height
        );
        drawText.drawText(this.text.x, this.text.y, this.text.text, "darkShadow");
    }
}

export class SliderButton {
    constructor(x, y, barWidth, barHeight, barColor, value, callback) {
        this._x = x;
        this._y = y;
        this.sx = 310;
        this.sy = 104;
        this.value = value || 1;
        this.width = barWidth
        this.height = barHeight
        this.barWidth = (barWidth - 8) * this.value;
        this.barHeight = barHeight;
        this.barColor = barColor;
        this.callback = callback;
        this.button = { x: this._x + ((this.width - 8) * this.value), y: this._y - 4, width: 8, height: 16 };
    }

    get getValue() { return this.value }

    set x(value) {
        this._x = value;
        this.button.x = this._x + this.barWidth;
    }

    set y(value) {
        this._y = value;
        this.button.y = this._y - 4;
    }

    update() {
        if (this.selected) {
            if (Input.isKeyDown("ArrowLeft")) {
                this.barWidth -= 1;
                this.updateBar();
            }

            if (Input.isKeyDown("ArrowRight")) {
                this.barWidth += 1;
                this.updateBar();
            }

            if (Input.isKeyUp("ArrowLeft") || Input.isKeyUp("ArrowRight")) {
                if (typeof this.callback == 'function') {
                    this.callback();
                }
            }
        }
    }

    updateBar() {
        this.barWidth = clamp(this.barWidth, 0, (this.width - 8));
        this.button.x = this._x + this.barWidth;
        this.value = parseFloat(clamp(this.barWidth / (this.width - 8), 0, 1).toFixed(2));
    }

    draw(ctx) {
        this.update();
        if (this.selected) {
            ctx.strokeStyle = "dimgrey";
            ctx.strokeRect(this._x - 4, this._y - 4, this.width + 8, this.height + 8);
        }

        ctx.fillStyle = this.barColor;
        ctx.fillRect(this._x, this._y, this.barWidth, this.height);

        ctx.drawImage(
            imageButtons,
            this.sx,
            this.sy,
            this.button.width,
            this.button.height,
            this.button.x,
            this.button.y,
            this.button.width,
            this.button.height
        );
    }
}

export class CheckButton {
    constructor(x, y, value, callback) {
        this._x = x;
        this._y = y;
        this.sx = 240;
        this.sy = 104;
        this.width = 34;
        this.height = 15;
        this.value = value | false;
        this.callback = callback;
    }

    get getValue() { return this.value }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    set x(value) {
        this._x = value;
    }

    set y(value) {
        this._y = value;
    }

    update() {
        if (this.selected) {
            if (Input.isKeyUp("Enter")) {
                this.value = !this.value;
                if (typeof this.callback == 'function') {
                    this.callback();
                }
            }

        }
    }

    draw(ctx) {
        this.update();
        if (this.selected) {
            ctx.strokeStyle = "dimgrey";
            ctx.strokeRect(this._x - 12, this._y - 2, this.width + 24, this.height + 4);
        }
        ctx.drawImage(
            imageButtons,
            this.sx,
            this.sy + (this.height * this.value),
            this.width,
            this.height,
            this._x,
            this._y,
            this.width,
            this.height
        );
    }
}

export class Buttons {
    constructor() {
        this.index = 0;
        this.buttons = [];
    }

    add(button) {
        this.buttons.push(button);
    }

    update() {
        this.buttons[this.index].selected = true;
        if (Input.isKeyUp("ArrowDown")) {
            if (this.index < this.buttons.length - 1) {
                this.index++;
            } else {
                this.index = 0;
            }
        }
        if (Input.isKeyUp("ArrowUp")) {
            if (this.index > 0) {
                this.index--;
            } else {
                this.index = this.buttons.length - 1;
            }
        }
    }

    draw(ctx) {
        this.update();
        this.buttons.forEach((button, index) => {
            if (index != this.index) {
                button.selected = false;
            }
            button.draw(ctx);
        });
    }
}
