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
define(["require","exports","jquery","../Router","../Renderable/InfoBox","../Renderable/Severity","TYPO3/CMS/Backend/Notification","bootstrap"],function(e,t,r,n,s,i,o){"use strict";return new(function(){function e(){this.selectorModalBody=".t3js-modal-body",this.selectorExecuteTrigger=".t3js-imageProcessing-execute",this.selectorTestContainer=".t3js-imageProcessing-twinContainer",this.selectorTwinImageTemplate=".t3js-imageProcessing-twinImage-template",this.selectorCommandContainer=".t3js-imageProcessing-command",this.selectorCommandText=".t3js-imageProcessing-command-text",this.selectorTwinImages=".t3js-imageProcessing-images"}return e.prototype.initialize=function(e){var t=this;this.currentModal=e,this.getData(),e.on("click",this.selectorExecuteTrigger,function(e){e.preventDefault(),t.runTests()})},e.prototype.getData=function(){var e=this,t=this.currentModal.find(this.selectorModalBody);r.ajax({url:n.getUrl("imageProcessingGetData"),cache:!1,success:function(r){!0===r.success?(t.empty().append(r.html),e.runTests()):o.error("Something went wrong")},error:function(e){n.handleAjaxError(e,t)}})},e.prototype.runTests=function(){var e=this,t=this.currentModal.find(this.selectorModalBody),o=this.currentModal.find(this.selectorTwinImageTemplate);t.find(this.selectorTestContainer).each(function(a,c){var l=r(c),m=l.data("test"),d=s.render(i.loading,"Loading...","");l.empty().html(d),r.ajax({url:n.getUrl(m),cache:!1,success:function(t){if(!0===t.success){l.empty(),Array.isArray(t.status)&&t.status.forEach(function(e){var t=s.render(c.severity,c.title,c.message);l.append(t)});var r=o.clone();if(r.removeClass("t3js-imageProcessing-twinImage-template"),!0===t.fileExists&&(r.find("img.reference").attr("src",t.referenceFile),r.find("img.result").attr("src",t.outputFile),r.find(e.selectorTwinImages).show()),Array.isArray(t.command)&&t.command.length>0){r.find(e.selectorCommandContainer).show();var n=[];t.command.forEach(function(e){n.push("<strong>Command:</strong>\n"+e[1]),3===e.length&&n.push("<strong>Result:</strong>\n"+e[2])}),r.find(e.selectorCommandText).html(n.join("\n"))}l.append(r)}},error:function(e){n.handleAjaxError(e,t)}})})},e}())});