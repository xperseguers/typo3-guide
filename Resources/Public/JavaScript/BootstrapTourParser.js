/**
 * this module provide the functionality to parse a json string from the TYPO3 Backend to a valid tour configuration
 */
define([], function () {
    return (function() {

        var TourParser = function() {

        };

        /**
         * Parse json notation to steps
         * @param unprocessedSteps
         */
        TourParser.prototype.parseSteps = function(unprocessedSteps) {
            var steps = [];

            for( var i = 0; i < unprocessedSteps.length; i++ ) {
                var current = unprocessedSteps[i];
                steps.push({
                    element     :   current.selector,
                    title       :   current.title,
                    content     :   current.content,
                    placement   :   current.placement,
                    before      :   current.before
                })
            }
        };

        TourParser.prototype.parse = function(unprocessedTours) {

            var processedTours = [];

            for (var i = 0; i < unprocessedTours.length; i++) {
                var current = unprocessedTours[i];
                processedTours.push( new Tour({
                    /**
                     * the module name which is used for requirement checks
                     */
                    module:     current.module,

                    /**
                     * the module id that is used for requirement checks
                     */
                    moduleId:   current.moduleId,
                    /**
                     * Function to execute when the tour starts.
                     *
                     * Here we check for the prerequirements
                     * @param tour
                     */
                    onStart:    function(tour) {
                        if(top.TYPO3ModuleMenu.loadedModule != tour.moduleId) {
                            console.log('jump to: ', tour.moduleId);
                            top.jump('', tour.moduleId, '', 0);
                        }
                    },

                    /**
                     * Function to execute right before each step is shown.
                     * @param tour
                     */
                    onShow:     function(tour) {

                    },

                    /**
                     * Function to execute right after the step is shown.
                     * @param tour
                     */
                    onShown:    function(tour) {
                        jQuery('.tour-' + tour.getName() + '.tour-' + tour.getName() + '-' + tour.getCurrentStep() )
                            .animate({ 'marginTop': '20px'}, 1000);
                    },

                    /**
                     * Function to execute when the tour ends.
                     * @param tour
                     */
                    onEnd:      function(tour) {
                        var $popover = $('.popover.tour');

                        if ($popover.find('[data-role=show-again]').is(':checked')) {

                            $.ajax({
                                dataType: 'json',
                                url: TYPO3.settings.ajaxUrls['GuideController::ajaxRequest'],
                                data: {
                                    cmd: 'disableTour',
                                    tour: tour.getName(),
                                    stepNo: tour.getCurrentStep()
                                },
                                success: function (result) {
                                    console.log(result);
                                },
                                error: function (result) {
                                    console.error('Upps, an error occured. Message was: ' + result);
                                }
                            });
                        }
                    },

                    /**
                     * Function to execute when next step is called.
                     * @param tour
                     */
                    onNext:     function(tour) {
                        var stepIndex = tour.getCurrentStep();
                        var step = tour.getStep(stepIndex);

                        if(typeof step.requirements !== "undefined") {
                            tour.handleRequirements(tour, step);
                        }
                    },

                    steps : this.parseSteps(current.steps),

                    handleRequirements: function(tour, step) {

                    }

                }));
            }

        };

        return TourParser;
    })();
});