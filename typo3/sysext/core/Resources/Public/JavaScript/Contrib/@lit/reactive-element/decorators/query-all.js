import{desc as t}from"@lit/reactive-element/decorators/base.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let e;function r(r){return(n,o)=>t(n,o,{get(){return(this.renderRoot??(e??=document.createDocumentFragment())).querySelectorAll(r)}})}export{r as queryAll};
