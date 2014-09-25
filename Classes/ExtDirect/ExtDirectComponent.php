<?php

namespace Tx\Guide\ExtDirect;
class ExtDirectComponent {

	public function diesdas () {
		
		$config = \Symfony\Component\Yaml\Yaml::parse(
			TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath('guide').'Documentation/Guide.yml'
		);

		return \json_encode($config);
	}
}