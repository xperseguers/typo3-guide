// TEST JSON ARRAY

//{"steps":[ {element: STRING, placement: INT, title: STRING, content: STRING, exit: INT}, {...}, ... ]}
var jsonobj = '{ "testtour" : [' +
'{ "element":"main|typo3-topbar" , "placement":"bottom" , "title":"TYPO3 BODY" , "content":"This is the BODY." , "exit":"next" },' +
'{ "element":"main|typo3-logo" , "placement":"bottom" , "title":"TYPO3 LOGO" , "content":"This is the LOGO." , "exit":"next" },' +
'{ "element":"#ext-gen57|element-tt_content-170" , "placement":"top" , "title":"TYPO3 IFRAAAAME !" , "content":"This is the iframe which makes TYPO3 so fcking ENTERPRISE." , "exit":"next" },' +
'{ "element":"main|extdd-2" , "placement":"right" , "title":"TYPO3 <strong>Congratulations</strong>!" , "content":"This is the TYPO3 Pagetree, <br /> let\'s do <b>some</b> <i>fancy</i> HTML stuff here." , "exit":"exit" }' +
']}';

// Parse JSON as JavaScript Object
//var jsonobj = JSON.parse(text);
console.log('test');

//Loop JavaScript Object, extract and convert data for use by hopscotch
for(var i=0;i<jsonobj.length;i++){
	var obj = jsonobj[i];

	obj_tourid		= Object.keys(jsonobj)[0];;
	console.log(obj_tourid);
	// obj_elem_split	= obj.element.split('|');	// split element from JSON
	// obj_frame 		= obj_elem_split[0];		// get frame target
	// obj_target		= obj_elem_split[1];		// get object target :: 'target' in hopscotch
	// obj_placement 	= obj.placement;			// 'placement' in hopscotch
	// obj_title 		= obj.title;				// 'title' in hopscotch
	// obj_content		= obj.content;				// 'content' in hopscotch
	// obj_exit		= obj.exit;					// transfer exit options

	
	// obj_frame differentiation
	// if(obj_frame != 'main'){
	// 	// create tourstep and inject to specified iframe
	// } else {
	// 	// create tourstep
	// }

	// // switch through exit options
	// switch (obj_exit) {
	// 	case 'next': 	//goto next step
	// 		break;
	// 	case 'click': 	//click on target for goto next step
	// 		break;
	// 	case 'exit': 	//close tour
	// 		break;
	// 	default: 		//same as next
	// 		break;
	// }


}




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