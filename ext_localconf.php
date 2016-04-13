<?php
if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}

if (TYPO3_MODE === 'BE') {
	// Register guided tours
	Tx\Guide\Utility\GuideUtility::registerGuideTour(
		'Topbar',
		'core',
		'TYPO3/CMS/Guide/BootstrapTourPageModule',
		'EXT:' . $_EXTKEY . '/Resources/Private/Language/BootstrapTourPageModule.xlf',
		'module-guide-tour-topbar',
		'EXT:' . $_EXTKEY . '/Configuration/PageTS/Library/Tours/Topbar.pagets'
	);
	Tx\Guide\Utility\GuideUtility::registerGuideTour(
		'Tree',
		'core',
		'TYPO3/CMS/Guide/BootstrapTourPageModule',
		'EXT:' . $_EXTKEY . '/Resources/Private/Language/BootstrapTourPageModule.xlf',
		'module-guide-tour-tree',
		'EXT:' . $_EXTKEY . '/Configuration/PageTS/Library/Tours/Tree.pagets'
	);
	Tx\Guide\Utility\GuideUtility::registerGuideTour(
		'Menu',
		'core',
		'TYPO3/CMS/Guide/BootstrapTourPageModule',
		'EXT:' . $_EXTKEY . '/Resources/Private/Language/BootstrapTourPageModule.xlf',
		'module-guide-tour-menu',
		'EXT:' . $_EXTKEY . '/Configuration/PageTS/Library/Tours/Menu.pagets'
	);
	Tx\Guide\Utility\GuideUtility::registerGuideTour(
		'AboutModule',
		'help_AboutmodulesAboutmodules',
		'TYPO3/CMS/Guide/BootstrapTourPageModule',
		'EXT:' . $_EXTKEY . '/Resources/Private/Language/BootstrapTourPageModule.xlf',
		'module-guide-tour-page-module',
		'EXT:' . $_EXTKEY . '/Configuration/PageTS/Library/Tours/AboutModule.pagets'
	);
	Tx\Guide\Utility\GuideUtility::registerGuideTour(
		'PageModule',
		'web_layout',
		'TYPO3/CMS/Guide/BootstrapTourPageModule',
		'EXT:' . $_EXTKEY . '/Resources/Private/Language/BootstrapTourPageModule.xlf',
		'module-guide-tour-page-module',
		'EXT:' . $_EXTKEY . '/Configuration/PageTS/Library/Tours/PageModule.pagets'
	);
	Tx\Guide\Utility\GuideUtility::registerGuideTour(
		'ViewModule',
		'web_ViewpageView',
		'TYPO3/CMS/Guide/BootstrapTourViewModule',
		'EXT:' . $_EXTKEY . '/Resources/Private/Language/BootstrapTourViewModule.xlf',
		'module-guide-tour-view-module',
		'EXT:' . $_EXTKEY . '/Configuration/PageTS/Library/Tours/ViewModule.pagets'
	);
	
	Tx\Guide\Utility\GuideUtility::registerGuideTour(
		'FunctionModule',
		'web_func',
		'TYPO3/CMS/Guide/BootstrapTourFunctionModule',
		'EXT:' . $_EXTKEY . '/Resources/Private/Language/BootstrapTourFunctionModule.xlf',
		'module-guide-tour-function-module',
		'EXT:' . $_EXTKEY . '/Configuration/PageTS/Library/Tours/FunctionModule.pagets'
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