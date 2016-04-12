<?php
namespace Tx\Guide\Hooks;

/***************************************************************
 *  Copyright notice
 *  (c) 2013 Jo Hasenau <info@cybercraft.de>, Tobias Ferger <tobi@tt36.de>
 *  All rights reserved
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

use TYPO3\CMS\Backend\Clipboard\Clipboard;
use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * Class/Function which adds the necessary ExtJS and pure JS stuff for the grid elements.
 *
 * @author Jo Hasenau <info@cybercraft.de>, Tobias Ferger <tobi@tt36.de>
 * @package TYPO3
 * @subpackage tx_gridelements
 */
class PageRenderer
{

    /**
     * wrapper function called by hook (\TYPO3\CMS\Core\Page\PageRenderer->render-preProcess)
     *
     * @param array $parameters : An array of available parameters
     * @param \TYPO3\CMS\Core\Page\PageRenderer $pageRenderer : The parent object that triggered this hook
     *
     * @return void
     */
    public function addJSCSS($parameters, &$pageRenderer)
    {

		/**
		 * @todo: don't include anything, in case of the user confirmed that he won't restart the guide
		 */
		
		$pageRenderer->loadRequireJsModule('TYPO3/CMS/Guide/BootstrapTour');
		$pageRenderer->loadRequireJsModule('TYPO3/CMS/Guide/BootstrapTourController');
		$pageRenderer->addInlineLanguageLabelFile('EXT:guide/Resources/Private/Language/BootstrapTour.xlf');
		$pageRenderer->loadRequireJsModule('TYPO3/CMS/Guide/BootstrapTourTree');
		$pageRenderer->addInlineLanguageLabelFile('EXT:guide/Resources/Private/Language/BootstrapTourTree.xlf');
		$pageRenderer->loadRequireJsModule('TYPO3/CMS/Guide/BootstrapTourPageModule');
		$pageRenderer->loadRequireJsModule('TYPO3/CMS/Guide/BootstrapTourViewModule');
		$pageRenderer->loadRequireJsModule('TYPO3/CMS/Guide/BootstrapTourFunctionModule');


		$css = $pageRenderer->backPath . ExtensionManagementUtility::extRelPath('guide') . 'Resources/Public/Stylesheets/bootstrap-tour.css';
		$pageRenderer->addCssFile($css, 'stylesheet', 'screen');

		$css = $pageRenderer->backPath . ExtensionManagementUtility::extRelPath('guide') . 'Resources/Public/Stylesheets/bootstrap-tour-custom.css';
		$pageRenderer->addCssFile($css, 'stylesheet', 'screen');
    }

}
