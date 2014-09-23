<?php
namespace Tx\Guide\Hooks;

/**
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * Class PreHeaderRenderHook
 * @package Tx\Guide\Hooks
 */
class PreHeaderRenderHook {
	function renderHeader($arguments) {
		/** @var \t3lib_PageRenderer $pageRenderer*/
		$pageRenderer = $arguments['pageRenderer'];

		$css = $pageRenderer->backPath . ExtensionManagementUtility::extRelPath('guide') . 'Resources/Public/Stylesheets/BootstrapTour/bootstrap-tour-standalone.min.css';
		$javascript = $pageRenderer->backPath . ExtensionManagementUtility::extRelPath('guide') . 'Resources/Public/Javascripts/BootstrapTour/bootstrap-tour-standalone.js';

		$pageRenderer->loadJquery();
		$pageRenderer->addCssFile($css);
		$pageRenderer->addJsFile($javascript);

		$paths = array ();

		/*if(t3lib_div::getFileAbsFileName($extConfigs['cssFile'])) {
			$paths['cssFile'] = t3lib_div::getFileAbsFileName($extConfigs['cssFile']);
			$paths = t3lib_div::removePrefixPathFromList($paths,PATH_site);
			$pagerenderer->addCssFile('../' . $paths['cssFile']);
		}*/


	}
} 