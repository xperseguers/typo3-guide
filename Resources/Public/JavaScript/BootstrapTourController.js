/**
 * TYPO3 Guided tour controller
 */
define(['jquery', 'TYPO3/CMS/Guide/BootstrapTourParser', 'TYPO3/CMS/Guide/ExtendedBootstrapTour',  'TYPO3/CMS/Lang/Lang'], function (jQuery, BootstrapTourParser) {

	// Init the Guide Container
	top.TYPO3.Guide = top.TYPO3.Guide || {};

	/**
	 * Default template for each steps
	 * @type {string}
	 */
	top.TYPO3.Guide.getTemplate = function() {
		return '<div class="popover tour">'
			+ '<div class="arrow"></div>'
			+ '<h3 class="popover-title"></h3>'
			+ '<div class="popover-content"></div>'
			+ '<div class="popover-navigation">'
			+ '<button class="btn btn-default btn-sm" data-role="prev" id="popover-button-prev">« ' + TYPO3.lang['tx_guide_tour.previous'] + '</button>'
			+ '<span data-role="separator" class="separator"></span>'
			+ '<button class="btn btn-default btn-sm btn-success" data-role="next" id="popover-button-next">' + TYPO3.lang['tx_guide_tour.next'] + ' »</button>'
			+ '<button class="btn btn-default btn-sm btn-danger" data-role="end" id="popover-button-end-tour">' + TYPO3.lang['tx_guide_tour.end_tour'] + '</button>'
			+ '<span data-role="separator" class="separator separator-right"></span>'
			+ '<button class="btn btn-default btn-sm" data-role="tour-overview" id="popover-button-tour-overview" onclick="top.TYPO3.Guide.openGuideModule();return false">' + TYPO3.lang['tx_guide_tour.tour_overview'] + '</button>'
			+ '<p class="dont-show-again"><label for="popover-dont-show-again"><input type="checkbox" data-role="show-again" id="popover-dont-show-again"> ' + TYPO3.lang['tx_guide_tour.show_again'] + '</label></p>'
			+ '</div>'
			+ '</div>';
	};


	top.TYPO3.Guide.getAvailableTour = function () {
		//return;
		jQuery.each(top.TYPO3.Guide.Tours, function(key, value) {
			console.log(key, value);
		});
	};

	top.TYPO3.Guide.enableTour = function (tourName) {
		jQuery.ajax({
			dataType: 'json',
			url: TYPO3.settings.ajaxUrls['GuideController::ajaxRequest'],
			data:  {
				cmd: 'enableTour',
				tour: tourName
			},
			success: function (result) {
				if(typeof(result.cmd.enableTour) != 'undefined') {
					var guideTourItem = jQuery('#' + result.tour.id);
					jQuery('.guide-tour-enable', guideTourItem).addClass('hidden');
					jQuery('.guide-tour-disable', guideTourItem).removeClass('hidden');
				}
			}
		});
	};
	top.TYPO3.Guide.disableTour = function (tourName) {
		jQuery.ajax({
			dataType: 'json',
			url: TYPO3.settings.ajaxUrls['GuideController::ajaxRequest'],
			data:  {
				cmd: 'disableTour',
				tour: tourName
			},
			success: function (result) {
				if(typeof(result.cmd.disableTour) != 'undefined') {
					var guideTourItem = jQuery('#' + result.tour.id);
					jQuery('.guide-tour-enable', guideTourItem).removeClass('hidden');
					jQuery('.guide-tour-disable', guideTourItem).addClass('hidden');

				}
			}
		});
	};
	top.TYPO3.Guide.getTour = function (tourName) {
		jQuery.ajax({
			dataType: 'json',
			url: TYPO3.settings.ajaxUrls['GuideController::ajaxRequest'],
			data:  {
				cmd: 'getTour',
				tour: tourName
			},
			success: function (result) {
				console.log(result);
			}
		});
	};

	top.TYPO3.Guide.ajaxTest = function () {

		jQuery.ajax({
			dataType: 'json',
			url: TYPO3.settings.ajaxUrls['GuideController::ajaxRequest'],
			data:  {
				cmd: 'getTour',
				tour: 'AboutModule'
			},
			success: function (result) {
				console.log(result);
				var tour = new BootstrapTourParser().parseTour(result.tour);
				tour.init();
				tour.start();
			},
			error: function (result) {

			}
		});
	};



	/**
	 * Starts the given tour
	 * @param tourName
	 * @param jumpToPage
	 */
	top.TYPO3.Guide.startTour = function (tourName) {
		top.TYPO3.Guide.Tours[tourName].init();
		top.TYPO3.Guide.Tours[tourName].start();
	};

	top.TYPO3.Guide.startTourWithStep = function(tourName, stepId) {
		top.TYPO3.Guide.Tours[tourName].init();
		top.TYPO3.Guide.Tours[tourName].start();
	};


	top.TYPO3.Guide.getUrlParameterByName = function(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	};

	top.TYPO3.Guide.openGuideModule = function () {
		top.jump('', 'help_GuideGuide', '', 0);
	};

	top.TYPO3.Guide.loadTour = function(tourName) {
		return jQuery.ajax({
			dataType: 'json',
			url: TYPO3.settings.ajaxUrls['GuideController::ajaxRequest'],
			data:  {
				cmd: 'getTour',
				tour: tourName
			},
			success: function (result) {

				if(typeof result.tour !== "undefined" && typeof top.TYPO3.Guide.Tours[tourName] === "undefined") {
					top.TYPO3.Guide.Tours[tourName] = new BootstrapTourParser().parseTour(result.tour);
				}
			},
			error: function (result) {

			}
		});
	};

	return function() {


		var onclickEnableTour = jQuery('a[data-onclick=\'enableTour\']');
		if(onclickEnableTour.length>0) {
			onclickEnableTour.on('click', function() {
				top.TYPO3.Guide.enableTour(jQuery(this).data('tour'));
				return false;
			});
		}
		var onclickDisableTour = jQuery('a[data-onclick=\'disableTour\']');
		if(onclickDisableTour.length>0) {
			onclickDisableTour.on('click', function() {
				top.TYPO3.Guide.disableTour(jQuery(this).data('tour'));
				return false;
			});
		}
		var onclickStartTour = jQuery('a[data-onclick=\'startTour\']');
		if(onclickStartTour.length>0) {
			onclickStartTour.on('click', function() {
				top.TYPO3.Guide.startTour(jQuery(this).data('tour'), jQuery(this).data('step-no'));
				return false;
			});
		}



		var currentModuleId = top.TYPO3.Guide.getUrlParameterByName('M', window.location.href);
		var isLoggedIn =  top.TYPO3.Guide.getUrlParameterByName('token', window.location.href) !== null ||
			top.TYPO3.Guide.getUrlParameterByName('M', window.location.href) !== null;
		console.log(isLoggedIn);
		top.TYPO3.Guide.Tours = top.TYPO3.Guide.Tours || {};

		if(isLoggedIn) {
			jQuery.ajax({
				dataType: 'json',
				url: TYPO3.settings.ajaxUrls['GuideController::ajaxRequest'],
				data:  {
					cmd: 'getTours'
				},
				success: function (result) {
					var moduleName;
					var availableTours = result.tours;

					var deferreds = [];


					jQuery.each(availableTours, function(key, data) {

						if(data.moduleName == 'core' && window.top === window.self) {
							deferreds.push(top.TYPO3.Guide.loadTour(data.name));
						} else if(data.moduleName != 'core' && window.top !== window.self) {
							deferreds.push(top.TYPO3.Guide.loadTour(data.name));
						}

						if(currentModuleId == data.moduleName) {
							moduleName = data.name;
						}
					});

					if( typeof moduleName !== "undefined" ) {

						jQuery.when.apply(jQuery, deferreds).done(function() {
							top.TYPO3.Guide.startTour(moduleName);
						});

					}
				}
			});
		}



	}();

	/**
	 * initialize function
	 *
	return function () {

		console.log(TYPO3.lang['tx_guide_tour.previous']);

		// Instance the tour
		if(typeof(Tour) != 'undefined') {
			// Init tours container
			top.TYPO3.Guide.Tours = top.TYPO3.Guide.Tours || {};


			if(window.top !== window.self) {
				console.log('frame');

				if(typeof(top.TYPO3.Guide.Tours.Main) == 'undefined') {

					console.log('defining top.TYPO3.Guide.Tours.Main');

					top.TYPO3.Guide.Tours.Main = new Tour({
						// This option is used to build the name of the storage item where the tour state is stored.
						// // The name should contain only alphanumerics, underscores and hyphens.
						// // You can initialize several tours with different names in the same page and application.
						name: 'main',
						storage: top.TYPO3.Guide.storage,
						debug: top.TYPO3.Guide.debug,
						template: top.TYPO3.Guide.getTemplate(),
						steps: [
							{
								element: '.typo3-aboutmodules-inner-docbody',
								title: 'Welcome to TYPO3 backend',
								content: 'This tour will show you how the guided tour could work.<br />'
								+'This text of a step can also contain html markup, for <i>highlighting</i> <b>important</b> things.'
								//+' ' + top.TYPO3.Guide.getAvailableTour()
								,
								placement: 'top',
								// Function to execute right after the step is shown. It overrides the global onShown option.

								onShow: function() {

									//top.TYPO3.Guide.getAvailableTour();
								},

								onShown: function() {
									jQuery('.tour-main.tour-main-0').animate({ 'marginTop': '20px'}, 1000);
								},
								onNext: function() {
									console.log('top.TYPO3.Guide.Tours.Main; step 0, onNext');
									// End this tour
									top.TYPO3.Guide.Tours.Main.end();
									// Start menu tour
									//top.TYPO3.Guide.Tours.Menu.start();
									top.TYPO3.Guide.startTour('Menu', 0);
								}
							},
							{
								element: '.typo3-aboutmodules-inner-docbody',
								title: '2 main title',
								content: '2 main content'
							},
							{
								element: "#my-other-element",
								title: '3 main title',
								content: '3 main content'
							}
						]

					});

					// Initialize the tour
					top.TYPO3.Guide.Tours.Main.init();
					// Start the tour
					top.TYPO3.Guide.Tours.Main.start();
				}
				else {
					console.log('Tour main already defined');
				}


			}
			else {
				console.log('no frame');

				if(typeof(top.TYPO3.Guide.Tours.Menu) == 'undefined') {
					console.log('defining top.TYPO3.Guide.Tours.Menu');

					top.TYPO3.Guide.Tours.Menu = new Tour({
						name: 'menu',
						storage: top.TYPO3.Guide.storage,
						debug: top.TYPO3.Guide.debug,
						template: top.TYPO3.Guide.getTemplate(),
						steps: [
							{
								element: '#web_layout',
								title: 'Page module',
								content: 'This is the button which opens the page module.<br />You will use it for editing you content.<br />Click on <i>Next</i> for jumping into the page module.',
								placement: 'right',
								// Function to execute right after the step is shown. It overrides the global onShown option.
								onShown: function() {
									//jQuery('.tour-menu.tour-menu-0').animate({ 'marginRight': '20px'}, 1000);
								},
								onNext: function() {
									console.log('top.TYPO3.Guide.Tours.Menu; step 0, onNext');
									// End this tour
									top.TYPO3.Guide.Tours.Menu.end();

									// Jump into the Page module
									top.TYPO3.Guide.startTour('PageModule', 0);

									// Start menu tour
									//
									//top.TYPO3.Guide.Tours.Main.next();
								//	top.TYPO3.Guide.Tours.Main.restart();
								//	top.TYPO3.Guide.Tours.Main.goTo(1);
								}
							},
							{
								element: '#web_ViewpageView',
								title: 'View module',
								content: 'This is the view module.',
								onNext: function() {
									// End this tour
									top.TYPO3.Guide.Tours.Menu.end();
									// Jump into the Page module
									top.TYPO3.Guide.startTour('ViewModule', 0);
								}
							},
							{
								element: '#web_ViewpageView',
								title: 'View module',
								content: 'This is the view module.'
							}
						]
					});

					// Initialize the tour
					top.TYPO3.Guide.Tours.Menu.init();

					// Set the module key
					top.TYPO3.Guide.Tours.Menu.moduleId = 'core';
					// Frame where the guide should be run
					top.TYPO3.Guide.Tours.Menu.frame = 'top';

					// Start the tour
					// Don't start immediately
					//top.TYPO3.Guide.Tours.Menu.start();
				}
				else {
					console.log('Tour menu already defined');
				}


			}

		}
		else {
			console.log('Tour is undefined');
		}


	}();
	 */
});