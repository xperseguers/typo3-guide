<?php
if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}
if (TYPO3_MODE === 'BE') {
	/**
	 * Registers a Backend Module
	 */
	\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerModule(
		'Tx.' . $_EXTKEY,
		'help',		// Make module a submodule of 'help'
		'guide',	// Submodule key
		'',			// Position
		array(
			'Guide' => 'list,ajaxRequest',
		),
		array(
			'access' => 'user,group',
			'iconIdentifier' => 'module-guide',
			'labels' => 'LLL:EXT:' . $_EXTKEY . '/Resources/Private/Language/locallang_guide.xlf',
		)
	);
}
// Register module icon
$iconRegistry = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Imaging\IconRegistry::class);
$iconRegistry->registerIcon(
	'module-guide',
	\TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
	array(
		'source' => 'EXT:guide/ext_icon.svg'
	)
);