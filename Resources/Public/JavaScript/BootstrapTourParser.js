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
console.log(unprocessedSteps);
            if(typeof unprocessedSteps === "undefined") return steps;

            jQuery.each( unprocessedSteps, function(key, current) {

	            console.log('process: ', key, current);
	            
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
                    nextStep    :   current.next,

                    /**
                     *
                     */
                    showArrow   :   current.showArrow != 'false',
                })
            });
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

                /**
                 * Function to execute when the tour starts.
                 *
                 * Here we check for the prerequirements
                 * @param tour
                 */
                onStart:    function(tour) {
	                /*
                    console.log(tour);
                    if (tour._options.moduleId != 'core') {
                        if(top.TYPO3.ModuleMenu.App.loadedModule != tour._options.moduleId) {
                            console.log('jump to: ', tour._options.moduleId);
                            top.jump('', tour._options.moduleId, '', 0);
                        }
                    }
                    */
                },

                /**
                 * Function to execute right before each step is shown.
                 * @param tour
                 */
                onShow:     function(tour) {

                    var stepIndex = tour.getCurrentStep();
                    if(stepIndex != null) {
                        var step = tour.getStep(stepIndex);
                        console.log(jQuery(step.element));

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
                        .animate({ 'opacity': '1'}, 750);

                    var stepIndex = tour.getCurrentStep();
                    if(stepIndex != null) {

                        var step = tour.getStep(stepIndex);
                        // Hide Arrow if needed
                        if(!step.showArrow) {
                            console.log("hide the arrow");
                            jQuery('.tour-' + tour.getName() + '.tour-' + tour.getName() + '-' + tour.getCurrentStep() + '> .arrow').hide();
                        }

                        // Handle requirements which are executed before the step is shown
                        if(typeof step.before !== "undefined") {
                            tour._options.handleRequirements(tour, step);
                        }

                        // send the status to the backend
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
                                console.error('Upps, an error occured. Message was: ', result);
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

                    console.log('onNext: ', typeof step.nextStep !== "undefined", tour);

	                // jQuery('#typo3-cms-backend-backend-toolbaritems-usertoolbaritem .dropdown-toggle[href="#"]').dropdown();
	                
                    if(typeof step.nextStep !== "undefined") {

	                    var newTourName = step.nextStep.tour;
	                    var newTour = top.TYPO3.Guide.TourData[step.nextStep.tour];

	                    if (newTour.moduleName !== 'core') {
		                    if(top.TYPO3.ModuleMenu.App.loadedModule != newTour.moduleName) {
			                    console.log('jump to: ', newTour.moduleName);
			                    tour.end();
			                    top.jump('', newTour.moduleName, '', 0);
			                    return;
		                    }
	                    }
	                    
                        var stepId = parseInt(step.nextStep.step, 10);
                        console.log('switch to tour: ', newTourName);
						if(stepId>0) {
							top.TYPO3.Guide.startTourWithStep(newTourName, stepId);
						}
	                    else {
							top.TYPO3.Guide.startTour(newTourName);
						}
                        
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
                                    console.log(jQuery(data.selector));
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
                            console.error('Upps, an error occured. Message was: ', result);
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