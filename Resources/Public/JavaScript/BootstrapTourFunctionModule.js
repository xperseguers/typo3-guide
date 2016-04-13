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
									element: '.module-docheader:first',
									title: 'Function module',
									content: 'The function module can be used for... Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
									'placement': 'bottom'
								},
								{
									element: 'select[name=\'WebFuncJumpMenu\']:first',
									title: 'Module menu',
									content: 'In this select box you \'re able to switch between the different avaiable functions. Depending on your system configuration there could be more or less functions.',
									'placement': 'right',
									'onShown': function () {
										var selectBox = jQuery('select[name=\'WebFuncJumpMenu\']:first');
										console.log('OPEN: ', selectBox);

										if (document.createEvent) {
											var event = document.createEvent("MouseEvents");
											event.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
											selectBox[0].dispatchEvent(event);
										} else if (element.fireEvent) {
											selectBox[0].fireEvent("onmousedown");
										}

										//selectBox.trigger('mousedown');
									}
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
									content: 'Click this button for displaying the webpage in a new tab.',
									'placement': 'bottom'
								},
								{
									element: '.typo3-docheader-pagePath',
									title: 'Current path path',
									content: 'Here you see on which page you\'re currently working on.',
									'placement': 'bottom'
								},
								{
									element: '.icon-actions-system-shortcut-new',
									title: 'Create a shortcut',
									content: 'Click this button for creating a shortcut to this page.',
									'placement': 'bottom'
								},
								{
									element: '.icon-actions-system-help-open',
									title: 'Show help',
									content: 'Click this button for showing the help for this page.',
									//onEnd: function() {
									//	top.TYPO3.Guide.openGuideModule();
									//},
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