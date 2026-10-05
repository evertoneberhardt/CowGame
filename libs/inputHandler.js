export class InputHandler {
    constructor() {
        this.keysUp = { key: null, value: false };
        this.keysJustPressed = { key: null, type: null, value: false };
        this.keys = {};
        this.touchs = {};
        this.mouseButtons = {};
        this.mousePosition = { x: 0, y: 0 };
        this.inputqueue = [];
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.addEventListener("keydown", this.handlerKeyDown.bind(this));
        document.addEventListener("keyup", this.handlerKeyUp.bind(this));
        document.addEventListener("mousedown", this.handlerMouseDown.bind(this));
        document.addEventListener("mouseup", this.handlerMouseUp.bind(this));
        document.addEventListener("mousemove", this.handlerMouseMove.bind(this));
        document.addEventListener("blur", this.resetInputState.bind(this));
        
    }

    handlerKeyDown(e) {
        if (!this.keys[e.code]) {
            this.keys[e.code] = true;
            this.inputqueue.push({ type: "keydown", code: e.code });
        }
        
        this.keysUp.key = e.code;
        this.keysUp.value = false;

        this.keysJustPressed[e.code] = { key: e.code, keyDown: true, keyUp: false };
        
    }

    handlerKeyUp(e) {
        this.keys[e.code] = false;
        this.inputqueue.push({ type: "keyup", code: e.code });
        this.keysUp.key = e.code;
        this.keysUp.value = true;
        this.keysJustPressed[e.code] = { key: e.code, keyDown: true, keyUp: true };
    }

    handlerMouseDown(e) {
        this.mouseButtons[e.button] = true;
        this.mousePosition = { x: e.clientX, y: e.clientY };
        this.inputqueue.push(
            { type: "mousedown", button: e.button, x: e.clientX, y: e.clientY });
    }

    handlerMouseUp(e) {
        this.mouseButtons[e.button] = false;
        this.mousePosition = { x: e.clientX, y: e.clientY };
        this.inputqueue.push(
            { type: "mouseup", button: e.button, x: e.clientX, y: e.clientY });
    }

    handlerMouseMove(e) {
        this.mousePosition = { x: e.clientX, y: e.clientY };
        this.inputqueue.push({ type: "mousemove", x: e.clientX, y: e.clientY });
    }

    resetInputState() {
        for (const key in this.keys) {
            this.keys[key] = false;
        }
        for (const key in this.keysUp) {
            this.keysUp[key] = false;
        }
        for (const key in this.isKeyJustPressed) {
            tthis.keysJustPressed[key].keyDown = false;
            this.keysJustPressed[key].keyUp = false;
        }
        for (const button in this.mouseButtons) {
            this.mouseButtons[button] = false;
        }
        this.inputqueue = [];
    }

    isKeyDown(keyCode) {
        return !!this.keys[keyCode]
    }

    isKeyUp(keyCode) {
        if (this.keysUp.key == keyCode && this.keysUp.value) {
            this.keysUp.value = false;
            return true
        }
        return false;
    }

    isKeyJustPressed(keyCode) {
        if (this.keysJustPressed[keyCode] === undefined) {
            return false;
        }
        if (keyCode == this.keysJustPressed[keyCode].key && 
            this.keysJustPressed[keyCode].keyDown && 
            this.keysJustPressed[keyCode].keyUp) {
            this.keysJustPressed[keyCode].keyDown = false;
            this.keysJustPressed[keyCode].keyUp = false;
            return true;
        }
        return false;
    }

    isMouseButtonDown(buttonCode) {
        return !!this.mouseButtons[buttonCode];
    }

    getMousePosition() {
        return { ...this.mousePosition }; 
    }

    getAxis(negativeAction, positiveAction) {
        if (this.isKeyDown(negativeAction) && !this.isKeyDown(positiveAction)) {
            return -1;
        } else if (!this.isKeyDown(negativeAction) && this.isKeyDown(positiveAction)) {
            return 1;
        } else {
            return 0;
        }
    }

}

export const Input = new InputHandler();        
