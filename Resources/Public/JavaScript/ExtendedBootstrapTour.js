define(['jquery', 'TYPO3/CMS/Guide/BootstrapTour'], function ($) {


    return (function() {

        /**
         *
         * @returns {string} the name of the tour
         */
        Tour.prototype.getName = function() {
            return this._options.name;
        };

        /**
         * Handles the stopping of an guided tour. This method clears all click and keyup handler, set states and
         * write to database if the user doesn't want that the guided tour will be shown again
         */
        Tour.prototype.end = function () {
            var endHelper, promise;
            endHelper = (function (_this) {
                return function (e) {
                    $(document).off("click.tour-" + _this._options.name);
                    $(document).off("keyup.tour-" + _this._options.name);
                    $(window).off("resize.tour-" + _this._options.name);
                    _this._setState('end', 'yes');
                    _this._inited = false;
                    _this._force = false;
                    _this._clearTimer();
                    _this._setDontShowAgain(_this);
                    if (_this._options.onEnd != null) {
                        return _this._options.onEnd(_this);
                    }
                };
            })(this);
            promise = this.hideStep(this._current);
            return this._callOnPromiseDone(promise, endHelper);
        };

        /**
         * this method handles the possibility that the guided tour dialog
         * doesn't show the next time TYPO3 is entered
         *
         * Check weather the dont show again checkbox is checked. if so send a ajax request to the TYPO3 backend
         * and disable the guided tour functionality for the current user
         *
         * @private {void}
         */
        Tour.prototype._setDontShowAgain = function (_this) {
            var $popover = $('.popover.tour');

            if (this._isDontShowSelected($popover)) {

                $.ajax({
                    dataType: 'json',
                    url: TYPO3.settings.ajaxUrls['GuideController::ajaxRequest'],
                    data: {
                        cmd: 'disableTour',
                        tour: _this.getName(),
                        stepNo: _this.getCurrentStep()
                    },
                    success: function (result) {
                        console.log(result);
                    },
                    error: function (result) {
                        console.error('Upps, an error occured. Message was: ' + result);
                    }
                });
            }
        };

        /**
         * Check weather the dont show again checkbox is checked
         * @param $popover
         * @returns {*|Boolean}
         * @private
         */
        Tour.prototype._isDontShowSelected = function ($popover) {
            return $popover.find('[data-role=show-again]').is(':checked');
        };

        Tour.prototype._findStepById = function(id) {
            var index = -1;

            var current;
            for(var i = 0; i < this._options.steps.length; i++) {
                current = this.getStep(i);

                if(current.id = id) {
                    index = i;
                    break;
                }
            }

            return index;
        };

        Tour.prototype.startWithStep = function(id) {
            var index = this._findStepById(id);

            if(index > -1) {
                this.setCurrentStep(index);
            }

            this.start();
        };

    })();
});