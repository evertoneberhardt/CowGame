class Timer {
    constructor(delay, autoStart, oneShot) {
        this.delay = delay * 1000;
        this.autoStart = autoStart || false;
        this.oneShot = oneShot || false;
        this.timerId = null;
        this.timeout = false;
        
        if (this.autoStart) {
            this.start();
        }
    }

    start() {

        if (this.timerId) {
            return;
        }

        if (this.oneShot) {
            this.timerId = setTimeout(() => {
                this.timeout = true;
                this.stop();
            }, this.delay);
        } else {
            this.timerId = setInterval(() => {
                this.timeout = true;
            }, this.delay);
        }

    }

    stop() {
        if (this.timerId) {
            if (this.oneShot) {
                clearTimeout(this.timerId);
            } else {
                clearInterval(this.timerId);
            }

            this.timerId = null;
        }
    }

    onTimeout() {
        if (this.timeout) {
            this.timeout = false;
            return true;
        }
        return false;
    }
}

export { Timer };
