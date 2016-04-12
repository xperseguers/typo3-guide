<?php
if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}

if (TYPO3_MODE === 'BE') {
	// Get tour stylesheets
	//$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['typo3/template.php']['preHeaderRenderHook'][] =
	//	'EXT:guide/Classes/Hooks/PreHeaderRenderHook.php:Tx\Guide\Hooks\PreHeaderRenderHook->renderHeader';
	// Get tour javascript
	$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_pagerenderer.php']['render-preProcess'][] = 
		\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath($_EXTKEY) . 'Classes/Hooks/PageRenderer.php:Tx\\Guide\\Hooks\\PageRenderer->addJSCSS';
}

// Register cache if not already done in a previously loaded extension.
if (!is_array($GLOBALS['TYPO3_CONF_VARS']['SYS']['caching']['cacheConfigurations']['tx_guide_guides'])) {
	$GLOBALS['TYPO3_CONF_VARS']['SYS']['caching']['cacheConfigurations']['tx_guide_guides'] = array(
		'frontend' => 'TYPO3\\CMS\\Core\\Cache\\Frontend\\PhpFrontend',
		'backend' => 'TYPO3\\CMS\\Core\\Cache\\Backend\\SimpleFileBackend',
		'groups' => array('system')
	);
}

TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerExtDirectComponent(
    'TYPO3.Guide',
    'Tx\Guide\ExtDirect\ExtDirectComponent'
);
