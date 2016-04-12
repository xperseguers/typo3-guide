<?php
if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}

if (TYPO3_MODE === 'BE') {
	// Register guided tours
	Tx\Guide\Utility\GuideUtility::registerGuideTour(
		'PageModule',
		'web_layout',
		'TYPO3/CMS/Guide/BootstrapTourPageModule',
		'EXT:' . $_EXTKEY . '/Resources/Private/Language/BootstrapTourPageModule.xlf'
	);
	Tx\Guide\Utility\GuideUtility::registerGuideTour(
		'ViewModule',
		'web_ViewpageView',
		'TYPO3/CMS/Guide/BootstrapTourViewModule',
		'EXT:' . $_EXTKEY . '/Resources/Private/Language/BootstrapTourViewModule.xlf'
	);
	Tx\Guide\Utility\GuideUtility::registerGuideTour(
		'FunctionModule',
		'web_func',
		'TYPO3/CMS/Guide/BootstrapTourFunctionModule',
		'EXT:' . $_EXTKEY . '/Resources/Private/Language/BootstrapTourFunctionModule.xlf'
	);
	
	// Add tour libraries
	$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_pagerenderer.php']['render-preProcess'][] = 
		\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath($_EXTKEY) . 'Classes/Hooks/PageRenderer.php:Tx\\Guide\\Hooks\\PageRenderer->addJSCSS';
	// Add AJAX
	\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerAjaxHandler (
		'GuideController::ajaxRequest',
		'Tx\\Guide\\Controller\\GuideController->ajaxRequest'
	);
}

// Register cache if not already done in a previously loaded extension.
if (!is_array($GLOBALS['TYPO3_CONF_VARS']['SYS']['caching']['cacheConfigurations']['tx_guide_guides'])) {
	$GLOBALS['TYPO3_CONF_VARS']['SYS']['caching']['cacheConfigurations']['tx_guide_guides'] = array(
		'frontend' => 'TYPO3\\CMS\\Core\\Cache\\Frontend\\PhpFrontend',
		'backend' => 'TYPO3\\CMS\\Core\\Cache\\Backend\\SimpleFileBackend',
		'groups' => array('system')
	);
}