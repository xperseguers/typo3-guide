<?php
namespace Tx\Guide\Utility;


/***************************************************************
 *
 *  Copyright notice
 *
 *  (c) 2014 TYPO3 CMS Team
 *
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/
use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Core\Authentication\BackendUserAuthentication;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Service\TypoScriptService;

/**
 * GuideUtility
 */
class GuideUtility {

	/**
	 * @var \TYPO3\CMS\Extbase\Service\TypoScriptService
	 * @inject
	 */
	protected $typoScriptService;
	
	/**
	 * Registers an Ext.Direct component with access restrictions.
	 *
	 * @param string $tourName Name of the tour
	 * @param string $moduleName Optional: must be <mainmodule> or <mainmodule>_<submodule>
	 * @param string $requireJsModule RequireJs module
	 * @param string $languageLabelFile
	 * @return void
	 */
	public static function registerGuideTour($tourName, $moduleName, $requireJsModule, $languageLabelFile='', $iconIdentifier='', $pageTsFile='')
	{
		$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['Guide']['Tours'][$tourName] = array(
			'name' => $tourName,
			'requireJsModule' => $requireJsModule,
			'moduleName' => $moduleName,
			'languageLabelFile' => $languageLabelFile,
			'iconIdentifier' => $iconIdentifier
		);

		if(trim($pageTsFile) != '') {
			\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig('<INCLUDE_TYPOSCRIPT: source="FILE:' . $pageTsFile . '">');
		}
		

	}

	public function getRegisteredGuideTours()
	{
		$backendUser = $this->getBackendUserAuthentication();
		/**
		 * @todo: check authorization
		 *      check activated
		 */
		$preparedTourData = array();
		if(!empty($GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['Guide']['Tours'])) {
			foreach($GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['Guide']['Tours'] as $tour) {
				
				if(isset($backendUser->uc['moduleData']['guide'][$tour['name']])) {
					$preparedTourData[$tour['name']] = array_merge($tour, $backendUser->uc['moduleData']['guide'][$tour['name']]);
				}
				else {
					$preparedTourData[$tour['name']] = $tour;
				}
				// Generate an id
				$preparedTourData[$tour['name']]['id'] = GeneralUtility::camelCaseToLowerCaseUnderscored($tour['name']);
				$preparedTourData[$tour['name']]['id'] = 'guide-tour-' . str_replace('_', '-', $preparedTourData[$tour['name']]['id']);
			}
		}
		return $preparedTourData;
	}
	
	public function getRegisteredGuideTour($tour) {
		$tours = $this->getRegisteredGuideTours();
		
		// Get steps
		$tours[$tour]['steps'] = array();
		$steps = $this->getBackendUserAuthentication()->getTSConfig(
			'mod.guide.tours.' . $tour . '.steps', BackendUtility::getPagesTSconfig(0)
		);
		if(!empty($steps)) {
			// Be sure the TypoScript service is available
			if(!($this->typoScriptService instanceof  \TYPO3\CMS\Extbase\Service\TypoScriptService)) {
				$this->typoScriptService = GeneralUtility::makeInstance('TYPO3\\CMS\\Extbase\\Service\\TypoScriptService');
			}
			$tours[$tour]['steps'] = $this->typoScriptService->convertTypoScriptArrayToPlainArray($steps['properties']);
		}
		return $tours[$tour];
	}
	
	public function isGuidedTourActivated() {
		return TRUE;
		$backendUser = $this->getBackendUserAuthentication();
		return $backendUser->uc['moduleData']['guide'][$tourName]['disabled'];


		/**
		 * @todo: don't include anything, in case of the user confirmed that he won't restart the guide
		 */
		
		return TRUE;
	}

	/**
	 * @param string $tourName Name of the guided tour
	 * @param bool $disabled 
	 */
	public function setTourDisabled($tourName, $disabled=TRUE) {
		$backendUser = $this->getBackendUserAuthentication();
		if(!isset($backendUser->uc['moduleData']['guide'][$tourName])) {
			$backendUser->uc['moduleData']['guide'][$tourName] = array();
		}
		$backendUser->uc['moduleData']['guide'][$tourName]['disabled'] = $disabled;
		$backendUser->writeUC($backendUser->uc);
		return $backendUser->uc['moduleData']['guide'][$tourName];
	}

	/**
	 * @param string $tourName Name of the guided tour
	 * @param bool $disabled
	 */
	public function setTourStepNo($tourName, $stepNo) {
		$backendUser = $this->getBackendUserAuthentication();
		if(!isset($backendUser->uc['moduleData']['guide'][$tourName])) {
			$backendUser->uc['moduleData']['guide'][$tourName] = array();
		}
		$backendUser->uc['moduleData']['guide'][$tourName]['currentStepNo'] = $stepNo;
		$backendUser->writeUC($backendUser->uc);
		return $backendUser->uc['moduleData']['guide'][$tourName];
	}

	/**
	 * Check if a tour is registered
	 * @param string $tour Name of the guided tour 
	 * @return bool
	 */
	public function tourExists($tour) {
		return isset($GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['Guide']['Tours'][$tour]);
	}
	
	public function getUserConfiguration() {
		$backendUser = $this->getBackendUserAuthentication();
		return $backendUser->uc['moduleData']['guide'];
	}
	
	/**
	 * @return BackendUserAuthentication
	 */
	protected function getBackendUserAuthentication() {
		return $GLOBALS['BE_USER'];
	}
	
}
