<?php

declare(strict_types=1);

/*
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

namespace TYPO3\CMS\Core\Tests\Acceptance\Application\InstallTool;

use TYPO3\CMS\Core\Tests\Acceptance\Support\ApplicationTester;
use TYPO3\CMS\Core\Tests\Acceptance\Support\Helper\ModalDialog;

final class UpgradeCest extends AbstractCest
{
    private static string $alertContainerSelector = '#alert-container';

    public function _before(ApplicationTester $I): void
    {
        parent::_before($I);
        $this->logIntoInstallTool($I);
        $I->click('Upgrade');
        $I->see('Upgrade', 'h1');
    }

    public function seeUpgradeCore(ApplicationTester $I, ModalDialog $modalDialog): void
    {
        $I->click('Update Core');
        $modalDialog->canSeeDialog();

        $I->amGoingTo('open the core updater');
        $I->see('TYPO3 CMS core to its latest minor release');
        $I->click('.t3js-modal-close');
    }

    public function seeViewUpgradeDocumentation(ApplicationTester $I, ModalDialog $modalDialog): void
    {
        $versionPanel = '#version-1 .t3js-changelog-list > div:first-child';

        $I->click('View Upgrade Documentation');
        $modalDialog->canSeeDialog();

        $I->amGoingTo('open the view upgrade documentation');
        $I->see('View Upgrade Documentation', ModalDialog::$openedModalSelector);

        $I->amGoingTo('mark an item as read');
        // pick first named version, master might be empty
        $I->click('#heading-1 > h2:nth-child(1) > a:nth-child(1) > strong:nth-child(2)');
        $I->waitForElement('#version-1', 5, ModalDialog::$openedModalSelector);

        $textCurrentFirstPanelHeading = $I->grabTextFrom($versionPanel . ' .panel-heading');

        $I->click($versionPanel . ' a[data-bs-toggle="collapse"]');
        $I->click($versionPanel . ' .t3js-upgradeDocs-markRead');

        $I->dontSee($textCurrentFirstPanelHeading, '#version-1');

        $I->amGoingTo('mark an item as unread');
        $I->executeJS('document.querySelector(".t3js-modal-body").scrollTop = 100000;');
        $I->click('#heading-read');
        $I->waitForElement('#collapseRead', 5, ModalDialog::$openedModalSelector);
        $I->see($textCurrentFirstPanelHeading, '#collapseRead');
        $I->click('#collapseRead .t3js-changelog-list > div:first-child .t3js-upgradeDocs-unmarkRead');
        $I->see($textCurrentFirstPanelHeading, '#version-1');

        $I->click('.t3js-modal-close');
    }

    public function seeCheckTca(ApplicationTester $I, ModalDialog $modalDialog): void
    {
        $I->click('Check TCA');
        $modalDialog->canSeeDialog();
        $I->see('No TCA changes in ext_tables.php files.', ModalDialog::$openedModalSelector);

        $I->click('.t3js-modal-close');
    }

    public function seeCheckForBrokenExtensions(ApplicationTester $I, ModalDialog $modalDialog): void
    {
        $I->click('Check Extension Compatibility');
        $modalDialog->canSeeDialog();
        $I->see('ext_localconf.php of all loaded extensions successfully loaded', ModalDialog::$openedModalSelector);
        $I->see('ext_tables.php of all loaded extensions successfully loaded', ModalDialog::$openedModalSelector);

        $I->amGoingTo('trigger "check extensions"');
        $I->click('Check extensions', ModalDialog::$openedModalButtonContainerSelector);
        $I->wait(1);
        $I->waitForText('ext_localconf.php of all loaded extensions successfully loaded');
        $I->see('ext_localconf.php of all loaded extensions successfully loaded');
        $I->waitForText('ext_tables.php of all loaded extensions successfully loaded');
        $I->see('ext_tables.php of all loaded extensions successfully loaded');

        $I->click('.t3js-modal-close');
    }

    public function seeCheckTcaMigrations(ApplicationTester $I, ModalDialog $modalDialog): void
    {
        $I->click('Check TCA Migrations');
        $modalDialog->canSeeDialog();
        $I->see('Checks whether the current TCA needs migrations and displays the new migration paths which need to be adjusted manually', ModalDialog::$openedModalSelector);

        $I->click('.t3js-modal-close');
    }

    public function seeScanExtensionFiles(ApplicationTester $I, ModalDialog $modalDialog): void
    {
        $buttonText = 'Rescan';

        $I->click('Scan Extension Files');
        $modalDialog->canSeeDialog();
        $I->wait(5);
        $I->click('Extension: styleguide', ModalDialog::$openedModalSelector);
        $I->waitForText($buttonText, 30, ModalDialog::$openedModalSelector);

        // Trigger scan for single extension
        $I->click($buttonText);
        $I->waitForText($buttonText, 30, ModalDialog::$openedModalSelector);

        // We need to ensure that all notifications are gone to avoid click interceptions
        $I->wait(10);

        // Scan all available extensions
        $I->click('Scan all');
        $I->waitForElement('.t3js-extensionscan-finished', 20, ModalDialog::$openedModalSelector);

        // Wait for all flash messages to disappear
        $I->waitForText('Marked not affected files', 30, self::$alertContainerSelector);

        // We need to ensure that all notifications are gone to avoid click interceptions
        $I->wait(10);

        $I->amGoingTo('Close the modal now');
        $I->click('.t3js-modal-close');
        $I->wait(3);

    }
}
