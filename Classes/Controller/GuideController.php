<?php
namespace Tx\Guide\Controller;


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
 * GuideController
 */
class GuideController extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController {

	/**
	 * guideRepository
	 *
	 * @var \Tx\Guide\Domain\Repository\GuideRepository
	 * @inject
	protected $guideRepository = NULL;
	 */

	/**
	 * action list
	 *
	 * @return void
	 */
	public function listAction() {
		//$guides = $this->guideRepository->findAll();
		//$this->view->assign('guides', $guides);
	}

}
