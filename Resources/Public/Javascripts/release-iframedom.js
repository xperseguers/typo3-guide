// for each iframe the DOM needs to be passed to the parent
// use name of the iframe to pass into var iframeID
// insert JS to each BE frame

parent.childGetElementById = function (iframeID){
	return document.getElementById(iframeID);
}
parent.childLoaded();