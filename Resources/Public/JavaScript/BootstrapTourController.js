/**
 * TYPO3 Guided tour controller
 */
define(['jquery', 'TYPO3/CMS/Guide/ExtendedBootstrapTour', 'TYPO3/CMS/Lang/Lang'], function (jQuery) {

	// Init the Guide Container
	top.TYPO3.Guide = top.TYPO3.Guide || {};



	/**
	 * Default template for each steps
	 * @type {string}
	 */
	top.TYPO3.Guide.getTemplate = function() {
		return '<div class=\'popover tour\'>'
		+ '<div class=\'arrow\'></div>'
		+ '<h3 class=\'popover-title\'></h3>'
		+ '<div class=\'popover-content\'></div>'
		+ '<div class=\'popover-navigation\'>'
		+ '<button class=\'btn btn-default\' data-role=\'prev\'>« ' + TYPO3.lang['tx_guide_tour.previous'] + '</button>'
		+ '<span data-role=\'separator\' class=\'separator\'></span>'
		+ '<button class=\'btn btn-default\' data-role=\'next\'>' + TYPO3.lang['tx_guide_tour.next'] + ' »</button>'
		+ '<button class=\'btn btn-default\' data-role=\'end\'>' + TYPO3.lang['tx_guide_tour.end_tour'] + '</button>'
		+ '<p class=\'dont-show-again\'><input type=\'checkbox\' data-role=\'show-again\'"> ' + TYPO3.lang['tx_guide_tour.show_again'] + '</p>'
		+ '</div>'
		+ '</div>';
	};


	top.TYPO3.Guide.getAvailableTour = function () {
		//return;
		jQuery.each(top.TYPO3.Guide.Tours, function(key, value) {
			console.log(key, value);
		});
	};


	top.TYPO3.Guide.ajaxTest = function () {

		jQuery.ajax({
			dataType: 'json',
			url: TYPO3.settings.ajaxUrls['GuideController::ajaxRequest'],
			data:  {
				cmd: 'setCurrentStep',
				stepNo: 123,
				tour: 'PageModule'
			},
			success: function (result) {
				console.log(result);
			}, 
			error: function (result) {

			}
		});

		jQuery.ajax({
			dataType: 'json',
			url: TYPO3.settings.ajaxUrls['GuideController::ajaxRequest'],
			data:  {
				cmd: 'disableTour',
				tour: 'PageModule'
			},
			success: function (result) {
				console.log(result);
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
	top.TYPO3.Guide.startTour = function (tourName, jumpToPage) {
		console.log('startTour: ', tourName, ', on page: ', jumpToPage);

		if(typeof(top.TYPO3.Guide.Tours[tourName]) != 'undefined') {
			
			console.log('Tour found: ', top.TYPO3.Guide.Tours[tourName], ', you\'re currently in module: ', top.TYPO3ModuleMenu.loadedModule);
			
			if(top.TYPO3.Guide.Tours[tourName].moduleId == 'core') {
				top.TYPO3.Guide.Tours[tourName].start();
			}
			// Jump to module, in case of it isn't already loaded
			else if(top.TYPO3ModuleMenu.loadedModule != top.TYPO3.Guide.Tours[tourName].moduleId) {
				console.log('jump to: ', top.TYPO3.Guide.Tours[tourName].moduleId);
				top.jump('', top.TYPO3.Guide.Tours[tourName].moduleId, '', jumpToPage);
			}
		}

		
		
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
	
	
	/**
	 * initialize function
	 * */
	return function () {

		console.log(TYPO3.lang['tx_guide_tour.previous']);
		
		// Instance the tour
		if(typeof(Tour) != 'undefined') {
			// Init tours container
			top.TYPO3.Guide.Tours = top.TYPO3.Guide.Tours || {};

			// The storage system you want to use. Could be the objects window.localStorage, window.sessionStorage or your own object.
			// You can set this option as false to disable storage persistence (the tour starts from beginning every time the page is loaded).
			top.TYPO3.Guide.storage = false;
			// Set this option to true to have some useful information printed in the console.
			top.TYPO3.Guide.debug = true;
			
			if(window.top !== window.self) {
				console.log('frame');

				if(typeof(top.TYPO3.Guide.Tours.Main) == 'undefined') {

					console.log('defining top.TYPO3.Guide.Tours.Main');

					top.TYPO3.Guide.Tours.Main = new Tour({
						// This option is used to build the name of the storage item where the tour state is stored. 
						// // The name should contain only alphanumerics, underscores and hyphens. 
						// // You can initialize several tours with different names in the same page and application.
						name: 'Main',
						storage: top.TYPO3.Guide.storage,
						debug: top.TYPO3.Guide.debug,
						template: top.TYPO3.Guide.getTemplate(),
						steps: [
							{
								element: '.typo3-aboutmodules-inner-docbody',
								title: 'Welcome to TYPO3 backend',
								content: 'This tour will show you how the guided tour could work.<br />'
								+'This text of a step can also contain html markup, for <i>highlighting</i> <b>important</b> things.'
								+' ' + top.TYPO3.Guide.getAvailableTour(),
								placement: 'top',
								// Function to execute right after the step is shown. It overrides the global onShown option.

								onShow: function() {

									//top.TYPO3.Guide.getAvailableTour();
								},

								onShown: function() {

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
						name: 'Menu',
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
	
});