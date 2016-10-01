function IntervalTimer(callback, interval) {
    this.callback = callback;
    this.interval = interval;
    this.timer;

    this.paused = true;
    this.startTime;
    this.endTime;
}

IntervalTimer.prototype.start = function () {
    if (this.paused) {

        this.paused = false;

        // Take care of restart.
        if (this.endTime) {
            var self = this;
            setTimeout(function () {
                self.start();
                self.endTime = null;
            }, this.endTime - this.startTime);

            return true;
        }

        var self = this;
        this.timer = setInterval(function () {
            return self.callback();
        }, this.interval);

        this.startTime = new Date().getTime();
        return true;
    }
    return false;
}

IntervalTimer.prototype.stop = function () {
    if (!this.paused) {
        this.timer = clearTimeout(this.timer);
        this.endDate = new Date().getTime();
        this.paused = true;
        return true;
    }
    return false;
}

IntervalTimer.prototype.destroy = function () {
    if (this.timer) {
        this.timer = clearInterval(this.timer);
        return true;
    }
    return false;
}