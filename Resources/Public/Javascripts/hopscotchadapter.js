// 					$.ajax({
// 						url: dialog.url,
// 						dataType: 'json',
// 						success: function(data) {
// 							if (data.hasErrors) {
// 								TYPO3.Flashmessage.display(
// 									TYPO3.Severity.error,
// 									TYPO3.l10n.localize('downloadExtension.updateExtension.error'),
// 									data.errorMessage,
// 									15
// 								);
// 							} else {
// 								TYPO3.Flashmessage.display(
// 									TYPO3.Severity.information,
// 									TYPO3.l10n.localize('extensionList.updateFlashMessage.title'),
// 									TYPO3.l10n.localize('extensionList.updateFlashMessage.message').replace(/\{0\}/g, data.extension),
// 									15
// 								);
// 							}
// 							$('.typo3-extension-manager').unmask();
// 						},
// 						error: function(jqXHR, textStatus, errorThrown) {
// 							// Create an error message with diagnosis info.
// 							var errorMessage = textStatus + '(' + errorThrown + '): ' + jqXHR.responseText;

// 							TYPO3.Flashmessage.display(
// 								TYPO3.Severity.error,
// 								TYPO3.l10n.localize('downloadExtension.updateExtension.error'),
// 								errorMessage,
// 								15
// 							);
// 							$('.typo3-extension-manager').unmask();
// 						}
// 					});

// mod.php?M=help_GuideGuide&moduleToken=00c225f7a700b7081435d1768dc9697424bdf73b&tx_guide_help_guideguide%5Bformat%5D=json

//language
//title: TYPO3.l10n.localize('extensionList.removalConfirmation.title')

// TEST JSON ARRAY

// {"steps":[ {element: STRING, placement: INT, title: STRING, content: STRING, exit: INT}, {...}, ... ]}
// var text = '{ "testtour" : [' +
// '{ "element":"John" , "placement":"Doe" , "":"" , "":"" , "":""},' +
// '{ "firstName":"Anna" , "lastName":"Smith" },' +
// '{ "firstName":"Peter" , "lastName":"Jones" } ]}';





// window.addEventListener('load', function(){
//     document.getElementById('ext-gen57').addEventListener('load', function(){

//         // (function($) {

//         //     var test = $('#ext-gen57').contents().find('body').attr('class');
//         //     console.log(test); //element-tt_content-170
            
//         //     var tour = {
//         //         id: "testrun",
//         //         steps: [
                    
//         //             {
//         //                 target: 'element-tt_content-170',
//         //                 placement: "bottom",
//         //                 title: "TYPO3 BODY",
//         //                 content: "This is the BODY."
//         //             }
//         //         ]
//         //     };

//         //     // Start the tour! - once DOM is loaded completly
//         //     hopscotch.endTour(true); //clear session cookie        
//         //     hopscotch.startTour(tour);
            
//         // })(TYPO3.jQuery);
//     });
// });