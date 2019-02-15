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
define(["require","exports","jquery","../Router","../Renderable/Severity","../Renderable/ProgressBar","../Renderable/InfoBox","../Renderable/FlashMessage","TYPO3/CMS/Backend/Notification","TYPO3/CMS/Core/SecurityUtility","bootstrap"],function(e,t,r,s,a,i,n,o,d,l){"use strict";return new(function(){function e(){this.selectorModalBody=".t3js-modal-body",this.selectorModuleContent=".t3js-module-content",this.selectorOutputWizardsContainer=".t3js-upgradeWizards-wizards-output",this.selectorOutputDoneContainer=".t3js-upgradeWizards-done-output",this.selectorWizardsBlockingAddsTemplate=".t3js-upgradeWizards-blocking-adds-template",this.selectorWizardsBlockingAddsRows=".t3js-upgradeWizards-blocking-adds-rows",this.selectorWizardsBlockingAddsExecute=".t3js-upgradeWizards-blocking-adds-execute",this.selectorWizardsBlockingCharsetTemplate=".t3js-upgradeWizards-blocking-charset-template",this.selectorWizardsBlockingCharsetFix=".t3js-upgradeWizards-blocking-charset-fix",this.selectorWizardsDoneBodyTemplate=".t3js-upgradeWizards-done-body-template",this.selectorWizardsDoneRows=".t3js-upgradeWizards-done-rows",this.selectorWizardsDoneRowTemplate=".t3js-upgradeWizards-done-row-template table tr",this.selectorWizardsDoneRowMarkUndone=".t3js-upgradeWizards-done-markUndone",this.selectorWizardsDoneRowTitle=".t3js-upgradeWizards-done-title",this.selectorWizardsListTemplate=".t3js-upgradeWizards-list-template",this.selectorWizardsListRows=".t3js-upgradeWizards-list-rows",this.selectorWizardsListRowTemplate=".t3js-upgradeWizards-list-row-template",this.selectorWizardsListRowTitle=".t3js-upgradeWizards-list-row-title",this.selectorWizardsListRowExplanation=".t3js-upgradeWizards-list-row-explanation",this.selectorWizardsListRowExecute=".t3js-upgradeWizards-list-row-execute",this.selectorWizardsInputTemplate=".t3js-upgradeWizards-input",this.selectorWizardsInputTitle=".t3js-upgradeWizards-input-title",this.selectorWizardsInputHtml=".t3js-upgradeWizards-input-html",this.selectorWizardsInputPerform=".t3js-upgradeWizards-input-perform",this.securityUtility=new l}return e.removeLoadingMessage=function(e){e.find(".alert-loading").remove()},e.renderProgressBar=function(e){return i.render(a.loading,e,"")},e.prototype.initialize=function(e){var t=this;this.currentModal=e,this.getData().done(function(){t.doneUpgrades()}),e.on("click",this.selectorWizardsDoneRowMarkUndone,function(e){t.markUndone(e.target.dataset.identifier)}),e.on("click",this.selectorWizardsBlockingCharsetFix,function(e){t.blockingUpgradesDatabaseCharsetFix()}),e.on("click",this.selectorWizardsBlockingAddsExecute,function(e){t.blockingUpgradesDatabaseAddsExecute()}),e.on("click",this.selectorWizardsListRowExecute,function(e){t.wizardInput(e.target.dataset.identifier,e.target.dataset.title)}),e.on("click",this.selectorWizardsInputPerform,function(e){t.wizardExecute(e.target.dataset.identifier,e.target.dataset.title)})},e.prototype.getData=function(){var e=this,t=this.currentModal.find(this.selectorModalBody);return r.ajax({url:s.getUrl("upgradeWizardsGetData"),cache:!1,success:function(r){!0===r.success?(t.empty().append(r.html),e.blockingUpgradesDatabaseCharsetTest()):d.error("Something went wrong")},error:function(e){s.handleAjaxError(e)}})},e.prototype.blockingUpgradesDatabaseCharsetTest=function(){var t=this,a=this.currentModal.find(this.selectorModalBody),i=this.currentModal.find(this.selectorOutputWizardsContainer);i.empty().html(e.renderProgressBar("Checking database charset...")),r.ajax({url:s.getUrl("upgradeWizardsBlockingDatabaseCharsetTest"),cache:!1,success:function(r){e.removeLoadingMessage(i),!0===r.success&&(!0===r.needsUpdate?a.find(t.selectorOutputWizardsContainer).append(a.find(t.selectorWizardsBlockingCharsetTemplate)).clone():t.blockingUpgradesDatabaseAdds())},error:function(e){s.handleAjaxError(e,i)}})},e.prototype.blockingUpgradesDatabaseCharsetFix=function(){var t=r(this.selectorOutputWizardsContainer);t.empty().html(e.renderProgressBar("Setting database charset to UTF-8...")),r.ajax({url:s.getUrl("upgradeWizardsBlockingDatabaseCharsetFix"),cache:!1,success:function(r){if(e.removeLoadingMessage(t),!0===r.success)Array.isArray(r.status)&&r.status.length>0&&r.status.forEach(function(e){var r=n.render(e.severity,e.title,e.message);t.append(r)});else{var s=o.render(a.error,"Something went wrong","");e.removeLoadingMessage(t),t.append(s)}},error:function(e){s.handleAjaxError(e,t)}})},e.prototype.blockingUpgradesDatabaseAdds=function(){var t=this,a=this.currentModal.find(this.selectorModalBody),i=this.currentModal.find(this.selectorOutputWizardsContainer);i.empty().html(e.renderProgressBar("Check for missing mandatory database tables and fields...")),r.ajax({url:s.getUrl("upgradeWizardsBlockingDatabaseAdds"),cache:!1,success:function(r){if(e.removeLoadingMessage(i),!0===r.success)if(!0===r.needsUpdate){var s=a.find(t.selectorWizardsBlockingAddsTemplate).clone();"object"==typeof r.adds.tables&&r.adds.tables.forEach(function(e){var r="Table: "+t.securityUtility.encodeHtml(e.table);s.find(t.selectorWizardsBlockingAddsRows).append(r,"<br>")}),"object"==typeof r.adds.columns&&r.adds.columns.forEach(function(e){var r="Table: "+t.securityUtility.encodeHtml(e.table)+", Field: "+t.securityUtility.encodeHtml(e.field);s.find(t.selectorWizardsBlockingAddsRows).append(r,"<br>")}),"object"==typeof r.adds.indexes&&r.adds.indexes.forEach(function(e){var r="Table: "+t.securityUtility.encodeHtml(e.table)+", Index: "+t.securityUtility.encodeHtml(e.index);s.find(t.selectorWizardsBlockingAddsRows).append(r,"<br>")}),a.find(t.selectorOutputWizardsContainer).append(s)}else t.wizardsList();else d.error("Something went wrong")},error:function(e){s.handleAjaxError(e,i)}})},e.prototype.blockingUpgradesDatabaseAddsExecute=function(){var t=this,i=this.currentModal.find(this.selectorOutputWizardsContainer);i.empty().html(e.renderProgressBar("Adding database tables and fields...")),r.ajax({url:s.getUrl("upgradeWizardsBlockingDatabaseExecute"),cache:!1,success:function(r){if(e.removeLoadingMessage(i),!0===r.success)Array.isArray(r.status)&&r.status.length>0&&(r.status.forEach(function(e){var t=n.render(e.severity,e.title,e.message);i.append(t)}),t.wizardsList());else{var s=o.render(a.error,"Something went wrong","");e.removeLoadingMessage(i),i.append(s)}},error:function(e){s.handleAjaxError(e,i)}})},e.prototype.wizardsList=function(){var t=this,a=this.currentModal.find(this.selectorModalBody),i=this.currentModal.find(this.selectorOutputWizardsContainer);i.append(e.renderProgressBar("Loading upgrade wizards...")),r.ajax({url:s.getUrl("upgradeWizardsList"),cache:!1,success:function(r){e.removeLoadingMessage(i);var s=a.find(t.selectorWizardsListTemplate).clone();if(s.removeClass("t3js-upgradeWizards-list-template"),!0===r.success){var n=0,o=0;Array.isArray(r.wizards)&&r.wizards.length>0&&(o=r.wizards.length,r.wizards.forEach(function(e){if(!0===e.shouldRenderWizard){var r=a.find(t.selectorWizardsListRowTemplate).clone();n+=1,r.removeClass("t3js-upgradeWizards-list-row-template"),r.find(t.selectorWizardsListRowTitle).empty().text(e.title),r.find(t.selectorWizardsListRowExplanation).empty().text(e.explanation),r.find(t.selectorWizardsListRowExecute).attr("data-identifier",e.identifier).attr("data-title",e.title),s.find(t.selectorWizardsListRows).append(r)}}),s.find(t.selectorWizardsListRows+" hr:last").remove());var l=100,c=s.find(".progress-bar");n>0?l=Math.round((o-n)/r.wizards.length*100):c.removeClass("progress-bar-info").addClass("progress-bar-success"),c.removeClass("progress-bar-striped").css("width",l+"%").attr("aria-valuenow",l).find("span").text(l+"%"),a.find(t.selectorOutputWizardsContainer).append(s),t.currentModal.find(t.selectorWizardsDoneRowMarkUndone).prop("disabled",!1)}else d.error("Something went wrong")},error:function(e){s.handleAjaxError(e,i)}})},e.prototype.wizardInput=function(t,a){var i=this,n=this.currentModal.find(this.selectorModuleContent).data("upgrade-wizards-input-token"),d=this.currentModal.find(this.selectorModalBody),l=this.currentModal.find(this.selectorOutputWizardsContainer);l.empty().html(e.renderProgressBar('Loading "'+a+'"...')),d.animate({scrollTop:d.scrollTop()-Math.abs(d.find(".t3js-upgrade-status-section").position().top)},250),r.ajax({url:s.getUrl(),method:"POST",data:{install:{action:"upgradeWizardsInput",token:n,identifier:t}},cache:!1,success:function(e){l.empty();var t=d.find(i.selectorWizardsInputTemplate).clone();t.removeClass("t3js-upgradeWizards-input"),!0===e.success&&(Array.isArray(e.status)&&e.status.forEach(function(e){var t=o.render(e.severity,e.title,e.message);l.append(t)}),e.userInput.wizardHtml.length>0&&t.find(i.selectorWizardsInputHtml).html(e.userInput.wizardHtml),t.find(i.selectorWizardsInputTitle).text(e.userInput.title),t.find(i.selectorWizardsInputPerform).attr("data-identifier",e.userInput.identifier).attr("data-title",e.userInput.title)),d.find(i.selectorOutputWizardsContainer).append(t)},error:function(e){s.handleAjaxError(e,l)}})},e.prototype.wizardExecute=function(t,a){var i=this,o=this.currentModal.find(this.selectorModuleContent).data("upgrade-wizards-execute-token"),l=this.currentModal.find(this.selectorModalBody),c={"install[action]":"upgradeWizardsExecute","install[token]":o,"install[identifier]":t};r(this.currentModal.find(this.selectorOutputWizardsContainer+" form").serializeArray()).each(function(e,t){c[t.name]=t.value});var u=this.currentModal.find(this.selectorOutputWizardsContainer);u.empty().html(e.renderProgressBar('Executing "'+a+'"...')),this.currentModal.find(this.selectorWizardsDoneRowMarkUndone).prop("disabled",!0),r.ajax({method:"POST",data:c,url:s.getUrl(),cache:!1,success:function(e){u.empty(),!0===e.success?(Array.isArray(e.status)&&e.status.forEach(function(e){var t=n.render(e.severity,e.title,e.message);u.append(t)}),i.wizardsList(),l.find(i.selectorOutputDoneContainer).empty(),i.doneUpgrades()):d.error("Something went wrong")},error:function(e){s.handleAjaxError(e,u)}})},e.prototype.doneUpgrades=function(){var t=this,a=this.currentModal.find(this.selectorModalBody),i=a.find(this.selectorOutputDoneContainer);i.empty().html(e.renderProgressBar("Loading executed upgrade wizards...")),r.ajax({url:s.getUrl("upgradeWizardsDoneUpgrades"),cache:!1,success:function(r){if(e.removeLoadingMessage(i),!0===r.success){Array.isArray(r.status)&&r.status.length>0&&r.status.forEach(function(e){var t=n.render(e.severity,e.title,e.message);i.append(t)});var s=a.find(t.selectorWizardsDoneBodyTemplate).clone(),o=s.find(t.selectorWizardsDoneRows),l=!1;Array.isArray(r.wizardsDone)&&r.wizardsDone.length>0&&r.wizardsDone.forEach(function(e){l=!0;var r=a.find(t.selectorWizardsDoneRowTemplate).clone();r.find(t.selectorWizardsDoneRowMarkUndone).attr("data-identifier",e.identifier),r.find(t.selectorWizardsDoneRowTitle).text(e.title),o.append(r)}),Array.isArray(r.rowUpdatersDone)&&r.rowUpdatersDone.length>0&&r.rowUpdatersDone.forEach(function(e){l=!0;var r=a.find(t.selectorWizardsDoneRowTemplate).clone();r.find(t.selectorWizardsDoneRowMarkUndone).attr("data-identifier",e.identifier),r.find(t.selectorWizardsDoneRowTitle).text(e.title),o.append(r)}),l&&(a.find(t.selectorOutputDoneContainer).append(s),t.currentModal.find(t.selectorWizardsDoneRowMarkUndone).prop("disabled",!0))}else d.error("Something went wrong")},error:function(e){s.handleAjaxError(e,i)}})},e.prototype.markUndone=function(t){var a=this,i=this.currentModal.find(this.selectorModuleContent).data("upgrade-wizards-mark-undone-token"),n=this.currentModal.find(this.selectorModalBody),o=this.currentModal.find(this.selectorOutputDoneContainer);o.empty().html(e.renderProgressBar("Marking upgrade wizard as undone...")),r.ajax({url:s.getUrl(),method:"POST",data:{install:{action:"upgradeWizardsMarkUndone",token:i,identifier:t}},cache:!1,success:function(e){o.empty(),n.find(a.selectorOutputDoneContainer).empty(),!0===e.success&&Array.isArray(e.status)?e.status.forEach(function(e){d.success(e.message),a.doneUpgrades(),a.blockingUpgradesDatabaseCharsetTest()}):d.error("Something went wrong")},error:function(e){s.handleAjaxError(e,o)}})},e}())});