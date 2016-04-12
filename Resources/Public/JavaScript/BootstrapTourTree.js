/**
 * TYPO3 Guided tour trough the page tree
 */
define(['jquery', 'TYPO3/CMS/Guide/BootstrapTour', 'TYPO3/CMS/Guide/BootstrapTourController'], function (jQuery) {
	
	/**
	 * initialize function
	 * */
	return function () {

		// Instance the tour
		if(typeof(Tour) != 'undefined') {
			
			// Only process, is case of using a frame
			if(window.top === window.self) {
				if (typeof(top.TYPO3.Guide.Tours.Tree) == 'undefined') {
					top.TYPO3.Guide.Tours.Tree = new Tour({
						name: 'tree',
						storage: top.TYPO3.Guide.storage,
						debug: top.TYPO3.Guide.debug,
						template: top.TYPO3.Guide.getTemplate(),
						steps: [
							{
								element: 'div.x-tree-root-node:first',
								title: TYPO3.lang['tx_guide_tour_tree_general.title'],
								content: TYPO3.lang['tx_guide_tour_tree_general.description'],
								placement: 'bottom'
							},
							{
								element: "#typo3-pagetree-topPanel-button-newNode",
								title: TYPO3.lang['tx_guide_tour_tree_new_node.title'],
								content: TYPO3.lang['tx_guide_tour_tree_new_node.description'],
								placement: 'bottom'
							},
							{
								element: "#typo3-pagetree-topPanel-button-filter",
								title: TYPO3.lang['tx_guide_tour_tree_filter.title'],
								content: TYPO3.lang['tx_guide_tour_tree_filter.description'],
								placement: 'bottom'
							},
							{
								element: "#typo3-pagetree-topPanel-button-refresh",
								title: TYPO3.lang['tx_guide_tour_tree_refresh.title'],
								content: TYPO3.lang['tx_guide_tour_tree_refresh.description'],
								placement: 'bottom'
							},
							{
								element: '.icon-actions-document-view',
								title: 'View webpage',
								content: 'Click this button for displaying the webpage in a new tab.<br /><br /><span class="text-inf">Click on <i>End tour</i> in order to get back to the guides startpage.</span>',
								onNext: function() {
									// End this tour
									top.TYPO3.Guide.Tours.Tree.end();
									// Jump into the Page module
									top.TYPO3.Guide.startTour('ViewModule', 0);
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
					top.TYPO3.Guide.Tours.Tree.init();
					// Set the module key
					top.TYPO3.Guide.Tours.Tree.moduleId = 'core';
					// Frame where the guide should be run
					top.TYPO3.Guide.Tours.Tree.frame = 'top';
					// Start the tour
					//top.TYPO3.Guide.Tours.Tree.start();
				}
			}
			
		}
	}();
});