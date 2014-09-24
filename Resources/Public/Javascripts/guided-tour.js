//function childLoaded() {var dom = childGetElementById('someid');}

(function($) {

    var tour = {
        id: "testrun",
        steps: [
            
            {
                target: "typo3-topbar",
                placement: "bottom",
                title: "TYPO3 BODY",
                content: "This is the BODY.",
                highlight: false
            },
            {
                target: "live-search-box",
                placement: "left",
                title: "TYPO3 Search",
                content: "This is the pagetree of my page.",
                highlight: true
            },
            {
                target: "typo3-logo",
                placement: "bottom",
                title: "TYPO3 Logo",
                content: "This is the TYPO3 Logo.",
                showPrevButton: true,
                highlight: true
            },
            {
                target: "extdd-2",
                placement: "right",
                title: "TYPO3 <strong>Congratulations</strong>",
                content: "This is the TYPO3 Pagetree, <br /> let's do <b>some</b> <i>fancy</i> HTML stuff here.",
                highlight: true
            },
            {
                target: "ext-gen93",
                placement: "bottom",
                title: "Dings...",
                content: "Bums...",
                highlight: true
            }
        ]
    };

    // Start the tour! - once DOM is loaded completly
    $(window).load(function(){
        hopscotch.endTour(true); //clear session cookie
        hopscotch.startTour(tour);
    });

})(TYPO3.jQuery);