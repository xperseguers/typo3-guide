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
                     * function that will be executed shown the current step will be shown
                     */
                    show      :   current.show,

                    shown      :   current.shown,


                    /**
                     * function parameters to jump to another tour and step
                     */
                    nextStep    :   current.next,

                    /**
                     *
                     */
                    showArrow   :   current.showArrow != 'false',


                    /**
                     * Events which will be executed onHide
                     */
                    hide        :   current.hide
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
                 * Function to execute right shown each step is shown.
                 * @param tour
                 */
                onShow:     function(tour) {

                    var stepIndex = tour.getCurrentStep();
                    if(stepIndex != null) {
                        var step = tour.getStep(stepIndex + 1);

                        if(typeof step !== "undefined" && typeof step.show !== "undefined") {
                            tour._options.handleEvents(step.show, 'onShow', tour, step);
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
                        .animate({ 'opacity': '1'}, 500);

                    var stepIndex = tour.getCurrentStep();
                    if(stepIndex != null) {

                        var step = tour.getStep(stepIndex);
                        // Hide Arrow if needed
                        if(!step.showArrow) {
                            console.log("hide the arrow");
                            jQuery('.tour-' + tour.getName() + '.tour-' + tour.getName() + '-' + tour.getCurrentStep() + '> .arrow').hide();
                        }

                        // Handle requirements which are executed shown the step is shown
                        if(typeof step.shown !== "undefined") {
                            tour._options.handleEvents(step.shown, 'onShown', tour, step);
                        }
                    }
                },

                onHide:     function(tour) {
                    var stepIndex = tour.getCurrentStep();
                    if(stepIndex != null) {

                        var step = tour.getStep(stepIndex);

                        // Handle requirements which are executed before the step is shown
                        if(typeof step.before !== "undefined") {
                            tour._options.handleEvents(step.hide, 'onHide', tour, step);
                        }

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

                                console.log("Disable Tour", result);
                                top.TYPO3.Guide.TourData[tour._options.name].disabled = true;
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

                        if(typeof newTour !== "undefined") {
                            if (newTour.moduleName !== 'core') {
                                if(top.TYPO3.ModuleMenu.App.loadedModule != newTour.moduleName) {
                                    console.log('jump to: ', newTour.moduleName);
                                    tour.end();
                                    top.jump('', newTour.moduleName, '', 0);
                                    return;
                                }
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

                handleEvents: function(events, eventType, tour, step) {
                    console.log("Handle Events for " + eventType);
                    if(typeof events !== "undefined" ) {
                        jQuery.each(events, function(key, data) {
                            switch(key) {
                                case 'addClass':
                                    console.log("Execute add class");
                                    jQuery(data.selector).addClass(data.class);
                                    break;
                                case 'removeClass':
                                    console.log("Execute remove class");
                                    jQuery(data.selector).removeClass(data.class);
                                    break;
                                case 'openSelectBox':
                                    var selectBox = jQuery(data.selector);
                                    console.log('OPEN: ', selectBox);

                                    if (document.createEvent) {
                                        var event = document.createEvent("MouseEvents");
                                        event.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                                        selectBox[0].dispatchEvent(event);
                                    } else if (element.fireEvent) {
                                        selectBox[0].fireEvent("onmousedown");
                                    }
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
                            console.log('SET STEP: ', result);
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
                processedTours.push(this.parseTour(current));
            }
        };
        return TourParser;
});