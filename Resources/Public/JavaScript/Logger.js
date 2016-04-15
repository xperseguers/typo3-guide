define([], function () {

    function CustomLogger() {
        this._options = {
            disabled: false
        }
    }

    CustomLogger.prototype.isDisabled = function() {
        return this._options.disabled;
    };

    CustomLogger.prototype.disableLogger = function() {
        this._options.disabled = true;
    };
    CustomLogger.prototype.enableLogger = function() {
        this._options.disabled = false;
    };

    CustomLogger.prototype.log = function(message) {
        if(!this.isDisabled()) {
            console.log(message);
        }
    };

    CustomLogger.prototype.error = function(message) {
        console.error(message);
    };

    return new CustomLogger();

});