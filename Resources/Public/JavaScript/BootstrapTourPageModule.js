/**
 * TYPO3 Guided tour trough the page module
 */
define(['jquery', 'TYPO3/CMS/Guide/BootstrapTour', 'TYPO3/CMS/Guide/BootstrapTourController'], function (jQuery) {
	
	/**
	 * initialize function
	 * */
	return function () {

		// Instance the tour
		if(typeof(Tour) != 'undefined') {
			
			// Only process, is case of using a frame
			if(window.top !== window.self) {
				
				// Module id must be equal
				var thisModuleId = 'web_layout';
				var currentModuleId = top.TYPO3.Guide.getUrlParameterByName('M', window.location.href);

				// Be sure all containers are available
				top.TYPO3.Guide = top.TYPO3.Guide || {};
				top.TYPO3.Guide.Tours = top.TYPO3.Guide.Tours || {};
				if(typeof(top.TYPO3.Guide.Tours.PageModule) == 'undefined') {
					top.TYPO3.Guide.Tours.PageModule = {
						moduleId: thisModuleId,
						frame: 'content',
						_inited: false
					};
				}

				if(currentModuleId == 'web_layout') {
					if(!top.TYPO3.Guide.Tours.PageModule._inited) {

						console.log('defining top.TYPO3.Guide.Tours.PageModule');

						top.TYPO3.Guide.Tours.PageModule = new Tour({
							name: 'page-module',
							storage: top.TYPO3.Guide.storage,
							debug: top.TYPO3.Guide.debug,
							template: top.TYPO3.Guide.getTemplate(),
							steps: [
								{
									element: '.callout-info',
									title: 'Page module',
									content: 'This is the page module. The page module is always related on the current selected page within the page tree.<br />'
											+'Therefore we wants firstly to introduce you the page tree!',
									placement: 'bottom',
									onNext: function() {
										// End this tour
										top.TYPO3.Guide.Tours.PageModule.end();
										// Jump into the Page module
										top.TYPO3.Guide.startTour('Tree', 0);
									}
								},
								{
									element: '.t3-js-jumpMenuBox',
									title: '1 PageModule title',
									content: '1 PageModule content - select the view',
									placement: 'bottom'
								},
								{
									element: "#my-other-element",
									title: '3 PageModule title',
									content: '3 PageModule content'
								}
							]

						});

						// Initialize the tour
						top.TYPO3.Guide.Tours.PageModule.init();

						// Set the module key
						top.TYPO3.Guide.Tours.PageModule.moduleId = thisModuleId;
						// Frame where the guide should be run
						top.TYPO3.Guide.Tours.PageModule.frame = 'content';


						// Start the tour
						top.TYPO3.Guide.Tours.PageModule.start();
					}
					else {
						console.log('Tour PageModule already defined');
					}
				}
			}
			
			
		}
		
	}();
});