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

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile($_EXTKEY, 'Configuration/TypoScript', 'Guide');

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addLLrefForTCAdescr('tx_guide_domain_model_guide', 'EXT:guide/Resources/Private/Language/locallang_csh_tx_guide_domain_model_guide.xlf');
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::allowTableOnStandardPages('tx_guide_domain_model_guide');
$GLOBALS['TCA']['tx_guide_domain_model_guide'] = array(
	'ctrl' => array(
		'title'	=> 'LLL:EXT:guide/Resources/Private/Language/locallang_db.xlf:tx_guide_domain_model_guide',
		'label' => 'title',
		'tstamp' => 'tstamp',
		'crdate' => 'crdate',
		'cruser_id' => 'cruser_id',
		'dividers2tabs' => TRUE,
		'sortby' => 'sorting',
		'versioningWS' => 2,
		'versioning_followPages' => TRUE,

		'languageField' => 'sys_language_uid',
		'transOrigPointerField' => 'l10n_parent',
		'transOrigDiffSourceField' => 'l10n_diffsource',
		'delete' => 'deleted',
		'enablecolumns' => array(
			'disabled' => 'hidden',
			'starttime' => 'starttime',
			'endtime' => 'endtime',
		),
		'searchFields' => 'title,text,',
		'dynamicConfigFile' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath($_EXTKEY) . 'Configuration/TCA/Guide.php',
		'iconfile' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extRelPath($_EXTKEY) . 'Resources/Public/Icons/tx_guide_domain_model_guide.gif'
	),
);
