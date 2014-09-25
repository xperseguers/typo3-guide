<?php
namespace Tx\Guide\Domain\Repository;

use Symfony\Component\Yaml\Yaml;

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

/**
 * The repository for guides
 */
class GuideRepository extends \TYPO3\CMS\Extbase\Persistence\Repository {

	/**
	 * @var \TYPO3\CMS\Core\Cache\CacheManager
	 * @inject
	 */
	protected $cacheManager = NULL;

	/**
	 * @var \TYPO3\CMS\Core\Package\PackageManager
	 * @inject
	 */
	protected $packageManager = NULL;

	/**
	 * @var \TYPO3\CMS\Lang\LanguageService
	 * @inject
	 */
	protected $languageService = NULL;

	/**
	 * Returns a localised variant of all guides
	 *
	 * @return array
	 * @throws \TYPO3\CMS\Core\Cache\Exception\InvalidDataException
	 * @throws \TYPO3\CMS\Core\Cache\Exception\NoSuchCacheException
	 */
	public function findAll() {
		/** @var \TYPO3\CMS\core\Cache\Frontend\PhpFrontend $cache */
		$cache = $this->cacheManager->getCache('tx_guide_guides');

		if (!empty($GLOBALS['BE_USER']->uc['lang'])) {
			$language = $GLOBALS['BE_USER']->uc['lang'];
		} else {
			$language = 'default';
		}

		$guides = $cache->requireOnce($language);
		if ($guides === FALSE) {
			$guides = $this->getDefaultLanguage();
			if ($language !== 'default') {
				$guides = $this->translate($guides);
				$cache->set($language, 'return $data = '. var_export($guides, TRUE) . ';');
			}
		}

		return $guides;
	}

	/**
	 * Translate the guides array
	 *
	 * @param array $guides The array of guides
	 * @return array
	 */
	protected function translate(array $guides) {

		foreach ($guides as $guide) {
			$guide['title'] = $this->languageService->sL($guide['title']);
			$guide['description'] = $this->languageService->sL($guide['description']);
			foreach ($guide['steps'] as $step) {
				$step['title'] = $this->languageService->sL($step['title']);
				$step['text'] = $this->languageService->sL($step['text']);
			}
		}

		return $guides;
	}

	/**
	 * Returns
	 *
	 * @return array
	 * @throws \TYPO3\CMS\Core\Cache\Exception\InvalidDataException
	 * @throws \TYPO3\CMS\Core\Cache\Exception\NoSuchCacheException
	 */
	protected function getDefaultLanguage() {
		/** @var \TYPO3\CMS\core\Cache\Frontend\PhpFrontend $cache */
		$cache = $this->cacheManager->getCache('tx_guide_guides');

		$guides = $cache->requireOnce('default');
		if ($guides === FALSE) {
			$guides = $this->readAllGuides();
			$cache->set('default', 'return $data = '. var_export($guides, TRUE) . ';');
		}

		return $guides;
	}

	/**
	 * Goes through all extensions and returns a combined array of all yaml file contents.
	 *
	 * @return array
	 */
	protected function readAllGuides() {
		$allGuides = array();

		$packages = $this->packageManager->getActivePackages();

		foreach ($packages as $package) {
			$guideFile = $package->getDocumentationPath() . 'Guide.yml';
			if (file_exists($guideFile)) {
				$file = file_get_contents($guideFile);
				$guides = Yaml::parse($file);
				$allGuides = array_merge_recursive($allGuides, $guides);
			}
		}

		return $allGuides;
	}
}