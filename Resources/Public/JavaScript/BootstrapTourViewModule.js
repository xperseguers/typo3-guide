/**
 * TYPO3 Guided tour trough the view module
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
				var thisModuleId = 'web_ViewpageView';
				var currentModuleId = top.TYPO3.Guide.getUrlParameterByName('M', window.location.href);

				// Be sure all containers are available
				top.TYPO3.Guide = top.TYPO3.Guide || {};
				top.TYPO3.Guide.Tours = top.TYPO3.Guide.Tours || {};
				if(typeof(top.TYPO3.Guide.Tours.ViewModule) == 'undefined') {
					top.TYPO3.Guide.Tours.ViewModule = {
						moduleId: thisModuleId,
						frame: 'content',
						_inited: false
					};
				}
				
				if(currentModuleId == 'web_ViewpageView') {
					if(!top.TYPO3.Guide.Tours.ViewModule._inited) {

						console.log('defining top.TYPO3.Guide.Tours.ViewModule');

						top.TYPO3.Guide.Tours.ViewModule = new Tour({
							name: 'view-module',
							storage: top.TYPO3.Guide.storage,
							debug: top.TYPO3.Guide.debug,
							template: top.TYPO3.Guide.getTemplate(),
							steps: [
								{
									element: '.module-docheader:first',
									title: 'View module',
									content: 'The view module can be used for... Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
									'placement': 'bottom'
								},
								{
									element: '#width',
									title: 'Responsive preview',
									content: 'Select a device width for the preview area.',
									'placement': 'bottom'
								},
								{
									element: "#resizeable",
									title: 'Webpage preview',
									content: 'This is the preview of you webpage.',
									'placement': 'top'
								},
								{
									element: '.icon-actions-document-view',
									title: 'View webpage',
									content: 'Click this button for displaying the webpage in a new tab.<br /><br /><span class="text-inf">Click on <i>End tour</i> in order to get back to the guides startpage.</span>',
									'placement': 'bottom',
									onNext: function() {
										// End this tour
										top.TYPO3.Guide.Tours.ViewModule.end();
										// Jump into the function module
										top.TYPO3.Guide.startTour('FunctionModule', 1);
									}
								},
								{
									element: "#empty-item-to-reserve-the-next-button",
									title: TYPO3.lang['tx_guide_tour_tree_refresh.title'],
									content: TYPO3.lang['tx_guide_tour_tree_refresh.description'],
									placement: 'bottom'
								}
							]

						});

						// Initialize the tour
						top.TYPO3.Guide.Tours.ViewModule.init();
						// Set the module key
						top.TYPO3.Guide.Tours.ViewModule.moduleId = thisModuleId;
						// Frame where the guide should be run
						top.TYPO3.Guide.Tours.ViewModule.frame = 'content';
						// Start the tour
						top.TYPO3.Guide.Tours.ViewModule.start();
					}
					else {
						console.log('Tour ViewModule already defined');
					}
				}
			}
			
			
		}
		
	}();
});