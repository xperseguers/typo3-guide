<?php
namespace Tx\Guide\ViewHelpers;

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

/**
 * Class JsonEncodeViewHelper
 * @package Tx\Guide\ViewHelpers
 */
class JsonEncodeViewHelper extends \TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper {

	/**
	 * Encodes the content as JSON
	 *
	 * @return string
	 */
	public function render() {
		$content = $this->renderChildren();
		return json_encode($content);
	}
}
