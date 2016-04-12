/**
 * TYPO3 Guided tour trough the function module
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
				var thisModuleId = 'web_func';
				var currentModuleId = top.TYPO3.Guide.getUrlParameterByName('M', window.location.href);

				// Be sure all containers are available
				top.TYPO3.Guide = top.TYPO3.Guide || {};
				top.TYPO3.Guide.Tours = top.TYPO3.Guide.Tours || {};
				if(typeof(top.TYPO3.Guide.Tours.FunctionModule) == 'undefined') {
					top.TYPO3.Guide.Tours.FunctionModule = {
						moduleId: thisModuleId,
						frame: 'content',
						_inited: false
					};
				}
				
				if(currentModuleId == 'web_func') {
					if(!top.TYPO3.Guide.Tours.FunctionModule._inited) {

						console.log('defining top.TYPO3.Guide.Tours.FunctionModule');

						top.TYPO3.Guide.Tours.FunctionModule = new Tour({
							name: 'function-module',
							storage: top.TYPO3.Guide.storage,
							debug: top.TYPO3.Guide.debug,
							template: top.TYPO3.Guide.getTemplate(),
							steps: [
								{
									element: '#width',
									title: 'Responsive prefunction',
									content: 'Select a device width for the prefunction area.',
									'placement': 'bottom'
								},
								{
									element: "#resizeable",
									title: 'Webpage preview',
									content: 'This is the preview of you webpage.',
									'placement': 'left'
								},
								{
									element: '.icon-actions-document-view',
									title: 'View webpage',
									content: 'Click this button for displaying the webpage in a new tab.<br /><br /><span class="text-inf">Click on <i>End tour</i> in order to get back to the guides startpage.</span>',
									onEnd: function() {
										top.TYPO3.Guide.startTour('AboutModule', 0);
									},
									'placement': 'bottom'
								}
							]

						});

						// Initialize the tour
						top.TYPO3.Guide.Tours.FunctionModule.init();
						// Set the module key
						top.TYPO3.Guide.Tours.FunctionModule.moduleId = thisModuleId;
						// Frame where the guide should be run
						top.TYPO3.Guide.Tours.FunctionModule.frame = 'content';
						// Start the tour
						top.TYPO3.Guide.Tours.FunctionModule.start();
					}
					else {
						console.log('Tour FunctionModule already defined');
					}
				}
			}
			
			
		}
		
	}();
});