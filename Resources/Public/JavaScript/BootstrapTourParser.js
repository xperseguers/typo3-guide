/**
 * this module provide the functionality to parse a json string from the TYPO3 Backend to a valid tour configuration
 */
define(['jquery'], function (jQuery) {


        var TourParser = function() {

        };

        /**
         * Parse json notation to steps
         * @param unprocessedSteps
         */
        TourParser.prototype.parseSteps = function(unprocessedSteps) {
            var steps = [];

            if(typeof unprocessedSteps === "undefined") return steps;

            for( var i = 0; i < unprocessedSteps.length; i++ ) {
                var current = unprocessedSteps[i];
                steps.push({

                    /**
                     * a identifier that add the ability jump to this step
                     */
                    id          :   current.id,

                    /**
                     * the element jQuery selector to that the popover will be attached
                     */
                    element     :   current.selector,

                    /**
                     * the title of the popover
                     */
                    title       :   current.title,

                    /**
                     * The content of the popover
                     */
                    content     :   current.content,

                    /**
                     * placement of the popover
                     *
                     * for example: top, bottom, left, right
                     */
                    placement   :   current.placement,

                    /**
                     * function that will be executed before the current step will be shown
                     */
                    before      :   current.show,


                    /**
                     * function parameters to jump to another tour and step
                     */
                    nextStep    :   current.next
                })
            }

            return steps;
        };

        TourParser.prototype.parseTour = function(current) {

            return new Tour({
                /**
                 * the module name which is used for requirement checks
                 */
                name:     current.name,

                /**
                 * the module id that is used for requirement checks
                 */
                moduleId:     current.moduleName,

                /**
                 *
                 */
                template: top.TYPO3.Guide.getTemplate(),

                /**
                 *
                 */
                storage: false,

                orphan: true,

                /**
                 * Function to execute when the tour starts.
                 *
                 * Here we check for the prerequirements
                 * @param tour
                 */
                onStart:    function(tour) {
                    console.log(tour);
                    if (tour._options.moduleId != 'core') {
                        if(top.TYPO3ModuleMenu.loadedModule != tour._options.moduleId) {
                            console.log('jump to: ', tour._options.moduleId);
                            top.jump('', tour._options.moduleId, '', 0);
                        }
                    }
                },

                /**
                 * Function to execute right before each step is shown.
                 * @param tour
                 */
                onShow:     function(tour) {


                    var stepIndex = tour.getCurrentStep();


                    if(stepIndex != null) {
                        var step = tour.getStep(stepIndex);


                        if(typeof step.before !== "undefined") {
                            tour._options.handleRequirements(tour, step);
                        }

                        tour._options.sendStatus(tour);
                    }


                },

                /**
                 * Function to execute right after the step is shown.
                 * @param tour
                 */
                onShown:    function(tour) {
                    jQuery('.tour-' + tour.getName() + '.tour-' + tour.getName() + '-' + tour.getCurrentStep() )
                        .animate({ 'marginTop': '20px'}, 1000);

                    var stepIndex = tour.getCurrentStep();


                    if(stepIndex != null) {
                        var step = tour.getStep(stepIndex);


                        if(typeof step.before !== "undefined") {
                            tour._options.handleRequirements(tour, step);
                        }

                        tour._options.sendStatus(tour);
                    }


                },

                /**
                 * Function to execute when the tour ends.
                 * @param tour
                 */
                onEnd:      function(tour) {
                    var $popover = jQuery('.popover.tour');

                    if ($popover.find('[data-role=show-again]').is(':checked')) {

                        jQuery.ajax({
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

                    console.log(typeof step.nextStep !== "undefined", tour);

                    if(typeof step.nextStep !== "undefined") {
                        var tour = step.nextStep.tour;
                        var stepId = step.nextStep.step;

                        top.TYPO3.Guide.startTourWithStep(tour, stepId);
                    }
                },

                steps : this.parseSteps(current.steps),

                handleRequirements: function(tour, step) {
                    console.log(step.before);
                    if(typeof step.before !== "undefined" ) {
                        jQuery.each(step.before, function(key, data) {
                            switch(key) {
                                case 'addClass':
                                    jQuery(data.selector).addClass(data.class);
                                    break;
                            }
                        });

                    }
                },

                sendStatus: function(tour) {
                    jQuery.ajax({
                        dataType: 'json',
                        url: TYPO3.settings.ajaxUrls['GuideController::ajaxRequest'],
                        data: {
                            cmd: 'setStepNo',
                            tour: tour.getName(),
                            stepNo: tour.getCurrentStep()
                        },
                        success: function (result) {
                           // console.log(result);
                        },
                        error: function (result) {
                            console.error('Upps, an error occured. Message was: ' + result);
                        }
                    });
                }

            });
        };

        TourParser.prototype.parse = function(unprocessedTours) {

            var processedTours = [];

            for (var i = 0; i < unprocessedTours.length; i++) {
                var current = unprocessedTours[i];
                processedTours.push( this.parseTour(current) );
            }

        };

        return TourParser;

});