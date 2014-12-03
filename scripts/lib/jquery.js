/*!
 * jQuery JavaScript Library v2.1.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:11Z
 */
!function(e,t){"object"==typeof module&&"object"==typeof module.exports?// For CommonJS and CommonJS-like environments where a proper window is present,
// execute the factory and get jQuery
// For environments that do not inherently posses a window with a document
// (such as Node.js), expose a jQuery-making factory as module.exports
// This accentuates the need for the creation of a real window
// e.g. var jQuery = require("jquery")(window);
// See ticket #14549 for more info
module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(e,t){function n(e){var t=e.length,n=Z.type(e);return"function"===n||Z.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e}// Implement the identical functionality for filter and not
function r(e,t,n){if(Z.isFunction(t))return Z.grep(e,function(e,r){/* jshint -W018 */
return!!t.call(e,r,e)!==n});if(t.nodeType)return Z.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(at.test(t))return Z.filter(t,e,n);t=Z.filter(t,e)}return Z.grep(e,function(e){return U.call(t,e)>=0!==n})}function i(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}// Convert String-formatted options into Object-formatted ones and store in cache
function o(e){var t=ht[e]={};return Z.each(e.match(dt)||[],function(e,n){t[n]=!0}),t}/**
 * The ready event handler and self cleanup method
 */
function s(){J.removeEventListener("DOMContentLoaded",s,!1),e.removeEventListener("load",s,!1),Z.ready()}function a(){// Support: Android < 4,
// Old WebKit does not have Object.preventExtensions/freeze method,
// return new empty object instead with no [[set]] accessor
Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=Z.expando+Math.random()}function u(e,t,n){var r;// If nothing was found internally, try to fetch any
// data from the HTML5 data-* attribute
if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(bt,"-$1").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:// Only convert to a number if it doesn't change the string
+n+""===n?+n:xt.test(n)?Z.parseJSON(n):n}catch(i){}// Make sure we set the data so it isn't changed later
yt.set(e,t,n)}else n=void 0;return n}function l(){return!0}function c(){return!1}function f(){try{return J.activeElement}catch(e){}}// Support: 1.x compatibility
// Manipulating tables requires a tbody
function p(e,t){return Z.nodeName(e,"table")&&Z.nodeName(11!==t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}// Replace/restore the type attribute of script elements for safe DOM manipulation
function d(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function h(e){var t=Pt.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}// Mark scripts as having already been evaluated
function g(e,t){for(var n=0,r=e.length;r>n;n++)vt.set(e[n],"globalEval",!t||vt.get(t[n],"globalEval"))}function m(e,t){var n,r,i,o,s,a,u,l;if(1===t.nodeType){// 1. Copy private data: events, handlers, etc.
if(vt.hasData(e)&&(o=vt.access(e),s=vt.set(t,o),l=o.events)){delete s.handle,s.events={};for(i in l)for(n=0,r=l[i].length;r>n;n++)Z.event.add(t,i,l[i][n])}// 2. Copy user data
yt.hasData(e)&&(a=yt.access(e),u=Z.extend({},a),yt.set(t,u))}}function v(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];return void 0===t||t&&Z.nodeName(e,t)?Z.merge([e],n):n}// Support: IE >= 9
function y(e,t){var n=t.nodeName.toLowerCase();// Fails to persist the checked state of a cloned checkbox or radio button.
"input"===n&&Nt.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function x(t,n){var r,i=Z(n.createElement(t)).appendTo(n.body),// getDefaultComputedStyle might be reliably used only on attached element
o=e.getDefaultComputedStyle&&(r=e.getDefaultComputedStyle(i[0]))?// Use of this method is a temporary fix (more like optmization) until something better comes along,
// since it was removed from specification and supported only in FF
r.display:Z.css(i[0],"display");// We don't have any data stored on the element,
// so use "detach" method as fast way to get rid of the element
return i.detach(),o}/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function b(e){var t=J,n=$t[e];// If the simple way fails, read from inside an iframe
// Use the already-created iframe if possible
// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
// Support: IE
// Store the correct default display
return n||(n=x(e,t),"none"!==n&&n||(Wt=(Wt||Z("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement),t=Wt[0].contentDocument,t.write(),t.close(),n=x(e,t),Wt.detach()),$t[e]=n),n}function w(e,t,n){var r,i,o,s,a=e.style;// Support: IE9
// getPropertyValue is only needed for .css('filter') in IE9, see #12537
// Support: iOS < 6
// A tribute to the "awesome hack by Dean Edwards"
// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
// Remember the original values
// Put in the new values to get a computed value out
// Revert the changed values
// Support: IE
// IE returns zIndex value as an integer.
return n=n||_t(e),n&&(s=n.getPropertyValue(t)||n[t]),n&&(""!==s||Z.contains(e.ownerDocument,e)||(s=Z.style(e,t)),It.test(s)&&Bt.test(t)&&(r=a.width,i=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=s,s=n.width,a.width=r,a.minWidth=i,a.maxWidth=o)),void 0!==s?s+"":s}function T(e,t){// Define the hook, we'll check on the first run if it's really needed.
return{get:function(){// Hook not needed (or it's not possible to use it due to missing dependency),
// remove it.
// Since there are no other hooks for marginRight, remove the whole object.
return e()?void delete this.get:(this.get=t).apply(this,arguments)}}}// return a css property mapped to a potentially vendor prefixed property
function C(e,t){// shortcut for names that are not vendor prefixed
if(t in e)return t;for(// check for vendor prefixed names
var n=t[0].toUpperCase()+t.slice(1),r=t,i=Gt.length;i--;)if(t=Gt[i]+n,t in e)return t;return r}function N(e,t,n){var r=Xt.exec(t);// Guard against undefined "subtract", e.g., when used as in cssHooks
return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function k(e,t,n,r,i){for(var o=n===(r?"border":"content")?// If we already have the right measurement, avoid augmentation
4:// Otherwise initialize for horizontal or vertical properties
"width"===t?1:0,s=0;4>o;o+=2)// both box models exclude margin, so add it if we want it
"margin"===n&&(s+=Z.css(e,n+Tt[o],!0,i)),r?(// border-box includes padding, so remove it if we want content
"content"===n&&(s-=Z.css(e,"padding"+Tt[o],!0,i)),// at this point, extra isn't border nor margin, so remove border
"margin"!==n&&(s-=Z.css(e,"border"+Tt[o]+"Width",!0,i))):(// at this point, extra isn't content, so add padding
s+=Z.css(e,"padding"+Tt[o],!0,i),// at this point, extra isn't content nor padding, so add border
"padding"!==n&&(s+=Z.css(e,"border"+Tt[o]+"Width",!0,i)));return s}function E(e,t,n){// Start with offset property, which is equivalent to the border-box value
var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=_t(e),s="border-box"===Z.css(e,"boxSizing",!1,o);// some non-html elements return undefined for offsetWidth, so check for null/undefined
// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
if(0>=i||null==i){// Computed unit is not pixels. Stop here and return.
if(// Fall back to computed then uncomputed css if necessary
i=w(e,t,o),(0>i||null==i)&&(i=e.style[t]),It.test(i))return i;// we need the check for style in case a browser which returns unreliable values
// for getComputedStyle silently falls back to the reliable elem.style
r=s&&(Q.boxSizingReliable()||i===e.style[t]),// Normalize "", auto, and prepare for extra
i=parseFloat(i)||0}// use the active box-sizing model to add/subtract irrelevant styles
return i+k(e,t,n||(s?"border":"content"),r,o)+"px"}function S(e,t){for(var n,r,i,o=[],s=0,a=e.length;a>s;s++)r=e[s],r.style&&(o[s]=vt.get(r,"olddisplay"),n=r.style.display,t?(// Reset the inline display of this element to learn if it is
// being hidden by cascaded rules or not
o[s]||"none"!==n||(r.style.display=""),// Set elements which have been overridden with display: none
// in a stylesheet to whatever the default browser style is
// for such an element
""===r.style.display&&Ct(r)&&(o[s]=vt.access(r,"olddisplay",b(r.nodeName)))):(i=Ct(r),"none"===n&&i||vt.set(r,"olddisplay",i?n:Z.css(r,"display"))));// Set the display of most of the elements in a second loop
// to avoid the constant reflow
for(s=0;a>s;s++)r=e[s],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[s]||"":"none"));return e}function j(e,t,n,r,i){return new j.prototype.init(e,t,n,r,i)}// Animations created synchronously will run synchronously
function D(){return setTimeout(function(){Qt=void 0}),Qt=Z.now()}// Generate parameters to create a standard animation
function A(e,t){var n,r=0,i={height:e};for(// if we include width, step value is 1 to do all cssExpand values,
// if we don't include width, step value is 2 to skip over Left and Right
t=t?1:0;4>r;r+=2-t)n=Tt[r],i["margin"+n]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function L(e,t,n){for(var r,i=(nn[t]||[]).concat(nn["*"]),o=0,s=i.length;s>o;o++)if(r=i[o].call(n,t,e))// we're done with this property
return r}function q(e,t,n){/* jshint validthis: true */
var r,i,o,s,a,u,l,c,f=this,p={},d=e.style,h=e.nodeType&&Ct(e),g=vt.get(e,"fxshow");// handle queue: false promises
n.queue||(a=Z._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,u=a.empty.fire,a.empty.fire=function(){a.unqueued||u()}),a.unqueued++,f.always(function(){// doing this makes sure that the complete handler will be called
// before this completes
f.always(function(){a.unqueued--,Z.queue(e,"fx").length||a.empty.fire()})})),// height/width overflow pass
1===e.nodeType&&("height"in t||"width"in t)&&(// Make sure that nothing sneaks out
// Record all 3 overflow attributes because IE9-10 do not
// change the overflow attribute when overflowX and
// overflowY are set to the same value
n.overflow=[d.overflow,d.overflowX,d.overflowY],// Set display property to inline-block for height/width
// animations on inline elements that are having width/height animated
l=Z.css(e,"display"),// Test default display if display is currently "none"
c="none"===l?vt.get(e,"olddisplay")||b(e.nodeName):l,"inline"===c&&"none"===Z.css(e,"float")&&(d.display="inline-block")),n.overflow&&(d.overflow="hidden",f.always(function(){d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2]}));// show/hide pass
for(r in t)if(i=t[r],Kt.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(h?"hide":"show")){// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
if("show"!==i||!g||void 0===g[r])continue;h=!0}p[r]=g&&g[r]||Z.style(e,r)}else l=void 0;if(Z.isEmptyObject(p))"inline"===("none"===l?b(e.nodeName):l)&&(d.display=l);else{g?"hidden"in g&&(h=g.hidden):g=vt.access(e,"fxshow",{}),// store state if its toggle - enables .stop().toggle() to "reverse"
o&&(g.hidden=!h),h?Z(e).show():f.done(function(){Z(e).hide()}),f.done(function(){var t;vt.remove(e,"fxshow");for(t in p)Z.style(e,t,p[t])});for(r in p)s=L(h?g[r]:0,r,f),r in g||(g[r]=s.start,h&&(s.end=s.start,s.start="width"===r||"height"===r?1:0))}}function H(e,t){var n,r,i,o,s;// camelCase, specialEasing and expand cssHook pass
for(n in e)if(r=Z.camelCase(n),i=t[r],o=e[n],Z.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),s=Z.cssHooks[r],s&&"expand"in s){o=s.expand(o),delete e[r];// not quite $.extend, this wont overwrite keys already present.
// also - reusing 'index' from above because we have the correct "name"
for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function O(e,t,n){var r,i,o=0,s=tn.length,a=Z.Deferred().always(function(){// don't match elem in the :animated selector
delete u.elem}),u=function(){if(i)return!1;for(var t=Qt||D(),n=Math.max(0,l.startTime+l.duration-t),// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
r=n/l.duration||0,o=1-r,s=0,u=l.tweens.length;u>s;s++)l.tweens[s].run(o);return a.notifyWith(e,[l,o,n]),1>o&&u?n:(a.resolveWith(e,[l]),!1)},l=a.promise({elem:e,props:Z.extend({},t),opts:Z.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Qt||D(),duration:n.duration,tweens:[],createTween:function(t,n){var r=Z.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,// if we are going to the end, we want to run all the tweens
// otherwise we skip this part
r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);// resolve when we played the last frame
// otherwise, reject
return t?a.resolveWith(e,[l,t]):a.rejectWith(e,[l,t]),this}}),c=l.props;for(H(c,l.opts.specialEasing);s>o;o++)if(r=tn[o].call(l,e,c,l.opts))return r;// attach callbacks from options
return Z.map(c,L,l),Z.isFunction(l.opts.start)&&l.opts.start.call(e,l),Z.fx.timer(Z.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function F(e){// dataTypeExpression is optional and defaults to "*"
return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(dt)||[];if(Z.isFunction(n))// For each dataType in the dataTypeExpression
for(;r=o[i++];)// Prepend if requested
"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}// Base inspection function for prefilters and transports
function P(e,t,n,r){function i(a){var u;return o[a]=!0,Z.each(e[a]||[],function(e,a){var l=a(t,n,r);return"string"!=typeof l||s||o[l]?s?!(u=l):void 0:(t.dataTypes.unshift(l),i(l),!1)}),u}var o={},s=e===Tn;return i(t.dataTypes[0])||!o["*"]&&i("*")}// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function M(e,t){var n,r,i=Z.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&Z.extend(!0,e,r),e}/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function R(e,t,n){// Remove auto dataType and get content-type in the process
for(var r,i,o,s,a=e.contents,u=e.dataTypes;"*"===u[0];)u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));// Check if we're dealing with a known content-type
if(r)for(i in a)if(a[i]&&a[i].test(r)){u.unshift(i);break}// Check to see if we have a response for the expected dataType
if(u[0]in n)o=u[0];else{// Try convertible dataTypes
for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}s||(s=i)}// Or just use first one
o=o||s}// If we found a dataType
// We add the dataType to the list if needed
// and return the corresponding response
// If we found a dataType
// We add the dataType to the list if needed
// and return the corresponding response
return o?(o!==u[0]&&u.unshift(o),n[o]):void 0}/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function W(e,t,n,r){var i,o,s,a,u,l={},// Work with a copy of dataTypes in case we need to modify it for conversion
c=e.dataTypes.slice();// Create converters map with lowercased keys
if(c[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s];// Convert to each sequential dataType
for(o=c.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),// Apply the dataFilter if provided
!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())// There's only work to do if current dataType is non-auto
if("*"===o)o=u;else if("*"!==u&&u!==o){// If none found, seek a pair
if(// Seek a direct converter
s=l[u+" "+o]||l["* "+o],!s)for(i in l)if(// If conv2 outputs current
a=i.split(" "),a[1]===o&&(// If prev can be converted to accepted input
s=l[u+" "+a[0]]||l["* "+a[0]])){// Condense equivalence converters
s===!0?s=l[i]:l[i]!==!0&&(o=a[0],c.unshift(a[1]));break}// Apply converter (if not an equivalence)
if(s!==!0)// Unless errors are allowed to bubble, catch and return them
if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(f){return{state:"parsererror",error:s?f:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}function $(e,t,n,r){var i;if(Z.isArray(t))// Serialize array item.
Z.each(t,function(t,i){n||En.test(e)?// Treat each array item as a scalar.
r(e,i):// Item is non-scalar (array or object), encode its numeric index.
$(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==Z.type(t))// Serialize scalar item.
r(e,t);else// Serialize object item.
for(i in t)$(e+"["+i+"]",t[i],n,r)}/**
 * Gets a window from an element
 */
function B(e){return Z.isWindow(e)?e:9===e.nodeType&&e.defaultView}// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//
var I=[],_=I.slice,z=I.concat,X=I.push,U=I.indexOf,V={},Y=V.toString,G=V.hasOwnProperty,Q={},// Use the correct document accordingly with window argument (sandbox)
J=e.document,K="2.1.1",// Define a local copy of jQuery
Z=function(e,t){// The jQuery object is actually just the init constructor 'enhanced'
// Need init if jQuery is called (just allow error to be thrown if not included)
return new Z.fn.init(e,t)},// Support: Android<4.1
// Make sure we trim BOM and NBSP
et=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,// Matches dashed string for camelizing
tt=/^-ms-/,nt=/-([\da-z])/gi,// Used by jQuery.camelCase as callback to replace()
rt=function(e,t){return t.toUpperCase()};Z.fn=Z.prototype={// The current version of jQuery being used
jquery:K,constructor:Z,// Start with an empty selector
selector:"",// The default length of a jQuery object is 0
length:0,toArray:function(){return _.call(this)},// Get the Nth element in the matched element set OR
// Get the whole matched element set as a clean array
get:function(e){// Return just the one element from the set
// Return all the elements in a clean array
return null!=e?0>e?this[e+this.length]:this[e]:_.call(this)},// Take an array of elements and push it onto the stack
// (returning the new matched element set)
pushStack:function(e){// Build a new jQuery matched element set
var t=Z.merge(this.constructor(),e);// Return the newly-formed element set
// Add the old object onto the stack (as a reference)
return t.prevObject=this,t.context=this.context,t},// Execute a callback for every element in the matched set.
// (You can seed the arguments with an array of args, but this is
// only used internally.)
each:function(e,t){return Z.each(this,e,t)},map:function(e){return this.pushStack(Z.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(_.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},end:function(){return this.prevObject||this.constructor(null)},// For internal use only.
// Behaves like an Array's method, not like a jQuery method.
push:X,sort:I.sort,splice:I.splice},Z.extend=Z.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,u=arguments.length,l=!1;for(// Handle a deep copy situation
"boolean"==typeof s&&(l=s,// skip the boolean and the target
s=arguments[a]||{},a++),// Handle case when target is a string or something (possible in deep copy)
"object"==typeof s||Z.isFunction(s)||(s={}),// extend jQuery itself if only one argument is passed
a===u&&(s=this,a--);u>a;a++)// Only deal with non-null/undefined values
if(null!=(e=arguments[a]))// Extend the base object
for(t in e)n=s[t],r=e[t],// Prevent never-ending loop
s!==r&&(// Recurse if we're merging plain objects or arrays
l&&r&&(Z.isPlainObject(r)||(i=Z.isArray(r)))?(i?(i=!1,o=n&&Z.isArray(n)?n:[]):o=n&&Z.isPlainObject(n)?n:{},// Never move original objects, clone them
s[t]=Z.extend(l,o,r)):void 0!==r&&(s[t]=r));// Return the modified object
return s},Z.extend({// Unique for each copy of jQuery on the page
expando:"jQuery"+(K+Math.random()).replace(/\D/g,""),// Assume jQuery is ready without the ready module
isReady:!0,error:function(e){throw new Error(e)},noop:function(){},// See test/unit/core.js for details concerning isFunction.
// Since version 1.3, DOM methods and functions like alert
// aren't supported. They return false on IE (#2968).
isFunction:function(e){return"function"===Z.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){// parseFloat NaNs numeric-cast false positives (null|true|false|"")
// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
// subtraction forces infinities to NaN
return!Z.isArray(e)&&e-parseFloat(e)>=0},isPlainObject:function(e){// Not plain objects:
// - Any object or value whose internal [[Class]] property is not "[object Object]"
// - DOM nodes
// - window
// Not plain objects:
// - Any object or value whose internal [[Class]] property is not "[object Object]"
// - DOM nodes
// - window
return"object"!==Z.type(e)||e.nodeType||Z.isWindow(e)?!1:e.constructor&&!G.call(e.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?V[Y.call(e)]||"object":typeof e},// Evaluates a script in a global context
globalEval:function(e){var t,n=eval;e=Z.trim(e),e&&(// If the code includes a valid, prologue position
// strict mode pragma, execute code by injecting a
// script tag into the document.
1===e.indexOf("use strict")?(t=J.createElement("script"),t.text=e,J.head.appendChild(t).parentNode.removeChild(t)):// Otherwise, avoid the DOM node creation, insertion
// and removal by using an indirect global eval
n(e))},// Convert dashed to camelCase; used by the css and data modules
// Microsoft forgot to hump their vendor prefix (#9572)
camelCase:function(e){return e.replace(tt,"ms-").replace(nt,rt)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},// args is for internal usage only
each:function(e,t,r){var i,o=0,s=e.length,a=n(e);if(r){if(a)for(;s>o&&(i=t.apply(e[o],r),i!==!1);o++);else for(o in e)if(i=t.apply(e[o],r),i===!1)break}else if(a)for(;s>o&&(i=t.call(e[o],o,e[o]),i!==!1);o++);else for(o in e)if(i=t.call(e[o],o,e[o]),i===!1)break;return e},// Support: Android<4.1
trim:function(e){return null==e?"":(e+"").replace(et,"")},// results is for internal usage only
makeArray:function(e,t){var r=t||[];return null!=e&&(n(Object(e))?Z.merge(r,"string"==typeof e?[e]:e):X.call(r,e)),r},inArray:function(e,t,n){return null==t?-1:U.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;n>r;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){// Go through the array, only saving the items
// that pass the validator function
for(var r,i=[],o=0,s=e.length,a=!n;s>o;o++)r=!t(e[o],o),r!==a&&i.push(e[o]);return i},// arg is for internal usage only
map:function(e,t,r){var i,o=0,s=e.length,a=n(e),u=[];// Go through the array, translating each of the items to their new values
if(a)for(;s>o;o++)i=t(e[o],o,r),null!=i&&u.push(i);else for(o in e)i=t(e[o],o,r),null!=i&&u.push(i);// Flatten any nested arrays
return z.apply([],u)},// A global GUID counter for objects
guid:1,// Bind a function to a context, optionally partially applying any
// arguments.
proxy:function(e,t){var n,r,i;// Quick check to determine if target is callable, in the spec
// this throws a TypeError, but we will just return undefined.
// Quick check to determine if target is callable, in the spec
// this throws a TypeError, but we will just return undefined.
// Simulated bind
// Set the guid of unique handler to the same of original handler, so it can be removed
return"string"==typeof t&&(n=e[t],t=e,e=n),Z.isFunction(e)?(r=_.call(arguments,2),i=function(){return e.apply(t||this,r.concat(_.call(arguments)))},i.guid=e.guid=e.guid||Z.guid++,i):void 0},now:Date.now,// jQuery.support is not used in Core but other projects attach their
// properties to it so it needs to exist.
support:Q}),// Populate the class2type map
Z.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){V["[object "+t+"]"]=t.toLowerCase()});var it=/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
function(e){function t(e,t,n,r){var i,o,s,a,// QSA vars
u,l,f,d,h,g;if((t?t.ownerDocument||t:$)!==q&&L(t),t=t||q,n=n||[],!e||"string"!=typeof e)return n;if(1!==(a=t.nodeType)&&9!==a)return[];if(O&&!r){// Shortcuts
if(i=yt.exec(e))// Speed-up: Sizzle("#ID")
if(s=i[1]){if(9===a){// Check parentNode to catch when Blackberry 4.6 returns
// nodes that are no longer in the document (jQuery #6963)
if(o=t.getElementById(s),!o||!o.parentNode)return n;// Handle the case where IE, Opera, and Webkit return items
// by name instead of ID
if(o.id===s)return n.push(o),n}else// Context is not a document
if(t.ownerDocument&&(o=t.ownerDocument.getElementById(s))&&R(t,o)&&o.id===s)return n.push(o),n}else{if(i[2])return Z.apply(n,t.getElementsByTagName(e)),n;if((s=i[3])&&w.getElementsByClassName&&t.getElementsByClassName)return Z.apply(n,t.getElementsByClassName(s)),n}// QSA path
if(w.qsa&&(!F||!F.test(e))){// qSA works strangely on Element-rooted queries
// We can work around this by specifying an extra ID on the root
// and working up from there (Thanks to Andrew Dupont for the technique)
// IE 8 doesn't work on object elements
if(d=f=W,h=t,g=9===a&&e,1===a&&"object"!==t.nodeName.toLowerCase()){for(l=k(e),(f=t.getAttribute("id"))?d=f.replace(bt,"\\$&"):t.setAttribute("id",d),d="[id='"+d+"'] ",u=l.length;u--;)l[u]=d+p(l[u]);h=xt.test(e)&&c(t.parentNode)||t,g=l.join(",")}if(g)try{return Z.apply(n,h.querySelectorAll(g)),n}catch(m){}finally{f||t.removeAttribute("id")}}}// All others
return S(e.replace(ut,"$1"),t,n,r)}/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function n(){function e(n,r){// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
// Only keep the most recent entries
return t.push(n+" ")>T.cacheLength&&delete e[t.shift()],e[n+" "]=r}var t=[];return e}/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function r(e){return e[W]=!0,e}/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function i(e){var t=q.createElement("div");try{return!!e(t)}catch(n){return!1}finally{// Remove from its parent by default
t.parentNode&&t.parentNode.removeChild(t),// release memory in IE
t=null}}/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function o(e,t){for(var n=e.split("|"),r=e.length;r--;)T.attrHandle[n[r]]=t}/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function s(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||Y)-(~e.sourceIndex||Y);// Use IE sourceIndex if available on both nodes
if(r)return r;// Check if b follows a
if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function a(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function u(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function l(e){return r(function(t){return t=+t,r(function(n,r){// Match elements found at the specified indexes
for(var i,o=e([],n.length,t),s=o.length;s--;)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))})})}/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function c(e){return e&&typeof e.getElementsByTagName!==V&&e}// Easy API for creating new setFilters
function f(){}function p(e){for(var t=0,n=e.length,r="";n>t;t++)r+=e[t].value;return r}function d(e,t,n){var r=t.dir,i=n&&"parentNode"===r,o=I++;// Check against closest ancestor/preceding element
// Check against all ancestor/preceding elements
return t.first?function(t,n,o){for(;t=t[r];)if(1===t.nodeType||i)return e(t,n,o)}:function(t,n,s){var a,u,l=[B,o];// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
if(s){for(;t=t[r];)if((1===t.nodeType||i)&&e(t,n,s))return!0}else for(;t=t[r];)if(1===t.nodeType||i){if(u=t[W]||(t[W]={}),(a=u[r])&&a[0]===B&&a[1]===o)// Assign to newCache so results back-propagate to previous elements
return l[2]=a[2];// A match means we're done; a fail means we have to keep checking
if(// Reuse newcache so results back-propagate to previous elements
u[r]=l,l[2]=e(t,n,s))return!0}}}function h(e){return e.length>1?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}function g(e,n,r){for(var i=0,o=n.length;o>i;i++)t(e,n[i],r);return r}function m(e,t,n,r,i){for(var o,s=[],a=0,u=e.length,l=null!=t;u>a;a++)(o=e[a])&&(!n||n(o,r,i))&&(s.push(o),l&&t.push(a));return s}function v(e,t,n,i,o,s){return i&&!i[W]&&(i=v(i)),o&&!o[W]&&(o=v(o,s)),r(function(r,s,a,u){var l,c,f,p=[],d=[],h=s.length,// Get initial elements from seed or context
v=r||g(t||"*",a.nodeType?[a]:a,[]),// Prefilter to get matcher input, preserving a map for seed-results synchronization
y=!e||!r&&t?v:m(v,p,e,a,u),x=n?// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
o||(r?e:h||i)?// ...intermediate processing is necessary
[]:// ...otherwise use results directly
s:y;// Apply postFilter
if(// Find primary matches
n&&n(y,x,a,u),i)for(l=m(x,d),i(l,[],a,u),// Un-match failing elements by moving them back to matcherIn
c=l.length;c--;)(f=l[c])&&(x[d[c]]=!(y[d[c]]=f));if(r){if(o||e){if(o){for(// Get the final matcherOut by condensing this intermediate into postFinder contexts
l=[],c=x.length;c--;)(f=x[c])&&// Restore matcherIn since elem is not yet a final match
l.push(y[c]=f);o(null,x=[],l,u)}for(// Move matched elements from seed to results to keep them synchronized
c=x.length;c--;)(f=x[c])&&(l=o?tt.call(r,f):p[c])>-1&&(r[l]=!(s[l]=f))}}else x=m(x===s?x.splice(h,x.length):x),o?o(null,s,x,u):Z.apply(s,x)})}function y(e){for(var t,n,r,i=e.length,o=T.relative[e[0].type],s=o||T.relative[" "],a=o?1:0,// The foundational matcher ensures that elements are reachable from top-level context(s)
u=d(function(e){return e===t},s,!0),l=d(function(e){return tt.call(t,e)>-1},s,!0),c=[function(e,n,r){return!o&&(r||n!==j)||((t=n).nodeType?u(e,n,r):l(e,n,r))}];i>a;a++)if(n=T.relative[e[a].type])c=[d(h(c),n)];else{// Return special upon seeing a positional matcher
if(n=T.filter[e[a].type].apply(null,e[a].matches),n[W]){for(// Find the next relative operator (if any) for proper handling
r=++a;i>r&&!T.relative[e[r].type];r++);// If the preceding token was a descendant combinator, insert an implicit any-element `*`
return v(a>1&&h(c),a>1&&p(e.slice(0,a-1).concat({value:" "===e[a-2].type?"*":""})).replace(ut,"$1"),n,r>a&&y(e.slice(a,r)),i>r&&y(e=e.slice(r)),i>r&&p(e))}c.push(n)}return h(c)}function x(e,n){var i=n.length>0,o=e.length>0,s=function(r,s,a,u,l){var c,f,p,d=0,h="0",g=r&&[],v=[],y=j,// We must always have either seed elements or outermost context
x=r||o&&T.find.TAG("*",l),// Use integer dirruns iff this is the outermost matcher
b=B+=null==y?1:Math.random()||.1,w=x.length;// Add elements passing elementMatchers directly to results
// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
// Support: IE<9, Safari
// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
for(l&&(j=s!==q&&s);h!==w&&null!=(c=x[h]);h++){if(o&&c){for(f=0;p=e[f++];)if(p(c,s,a)){u.push(c);break}l&&(B=b)}// Track unmatched elements for set filters
i&&(// They will have gone through all possible matchers
(c=!p&&c)&&d--,// Lengthen the array for every element, matched or not
r&&g.push(c))}if(// Apply set filters to unmatched elements
d+=h,i&&h!==d){for(f=0;p=n[f++];)p(g,v,s,a);if(r){// Reintegrate element matches to eliminate the need for sorting
if(d>0)for(;h--;)g[h]||v[h]||(v[h]=J.call(u));// Discard index placeholder values to get only actual matches
v=m(v)}// Add matches to results
Z.apply(u,v),// Seedless set matches succeeding multiple successful matchers stipulate sorting
l&&!r&&v.length>0&&d+n.length>1&&t.uniqueSort(u)}// Override manipulation of globals by nested matchers
return l&&(B=b,j=y),g};return i?r(s):s}var b,w,T,C,N,k,E,S,j,D,A,// Local document vars
L,q,H,O,F,P,M,R,// Instance-specific data
W="sizzle"+-new Date,$=e.document,B=0,I=0,_=n(),z=n(),X=n(),U=function(e,t){return e===t&&(A=!0),0},// General-purpose constants
V="undefined",Y=1<<31,// Instance methods
G={}.hasOwnProperty,Q=[],J=Q.pop,K=Q.push,Z=Q.push,et=Q.slice,// Use a stripped-down indexOf if we can't use a native one
tt=Q.indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(this[t]===e)return t;return-1},nt="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",// Regular expressions
// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
rt="[\\x20\\t\\r\\n\\f]",// http://www.w3.org/TR/css3-syntax/#characters
it="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",// Loosely modeled on CSS identifier characters
// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
ot=it.replace("w","w#"),// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
st="\\["+rt+"*("+it+")(?:"+rt+// Operator (capture 2)
"*([*^$|!~]?=)"+rt+// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+ot+"))|)"+rt+"*\\]",at=":("+it+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+st+")*)|.*)\\)|)",// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
ut=new RegExp("^"+rt+"+|((?:^|[^\\\\])(?:\\\\.)*)"+rt+"+$","g"),lt=new RegExp("^"+rt+"*,"+rt+"*"),ct=new RegExp("^"+rt+"*([>+~]|"+rt+")"+rt+"*"),ft=new RegExp("="+rt+"*([^\\]'\"]*?)"+rt+"*\\]","g"),pt=new RegExp(at),dt=new RegExp("^"+ot+"$"),ht={ID:new RegExp("^#("+it+")"),CLASS:new RegExp("^\\.("+it+")"),TAG:new RegExp("^("+it.replace("w","w*")+")"),ATTR:new RegExp("^"+st),PSEUDO:new RegExp("^"+at),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+rt+"*(even|odd|(([+-]|)(\\d*)n|)"+rt+"*(?:([+-]|)"+rt+"*(\\d+)|))"+rt+"*\\)|)","i"),bool:new RegExp("^(?:"+nt+")$","i"),// For use in libraries implementing .is()
// We use this for POS matching in `select`
needsContext:new RegExp("^"+rt+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+rt+"*((?:-\\d)?\\d*)"+rt+"*\\)|)(?=[^-]|$)","i")},gt=/^(?:input|select|textarea|button)$/i,mt=/^h\d$/i,vt=/^[^{]+\{\s*\[native \w/,// Easily-parseable/retrievable ID or TAG or CLASS selectors
yt=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,xt=/[+~]/,bt=/'|\\/g,// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
wt=new RegExp("\\\\([\\da-f]{1,6}"+rt+"?|("+rt+")|.)","ig"),Tt=function(e,t,n){var r="0x"+t-65536;// NaN means non-codepoint
// Support: Firefox<24
// Workaround erroneous numeric interpretation of +"0x"
// BMP codepoint
// Supplemental Plane codepoint (surrogate pair)
return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)};// Optimize for push.apply( _, NodeList )
try{Z.apply(Q=et.call($.childNodes),$.childNodes),// Support: Android<4.0
// Detect silently failing push.apply
Q[$.childNodes.length].nodeType}catch(Ct){Z={apply:Q.length?// Leverage slice if possible
function(e,t){K.apply(e,et.call(t))}:// Support: IE<9
// Otherwise append directly
function(e,t){// Can't trust NodeList.length
for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}// Expose support vars for convenience
w=t.support={},/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
N=t.isXML=function(e){// documentElement is verified for cases where it doesn't yet exist
// (such as loading iframes in IE - #4833)
var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
L=t.setDocument=function(e){var t,n=e?e.ownerDocument||e:$,r=n.defaultView;// If no document and documentElement is available, return
// If no document and documentElement is available, return
// Set our document
// Support tests
// Support: IE>8
// If iframe document is assigned to "document" variable and if iframe has been reloaded,
// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
// IE6-8 do not support the defaultView property so parent will be undefined
// IE11 does not have attachEvent, so all must suffer
/* Attributes
	---------------------------------------------------------------------- */
// Support: IE<8
// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
/* getElement(s)By*
	---------------------------------------------------------------------- */
// Check if getElementsByTagName("*") returns only elements
// Check if getElementsByClassName can be trusted
// Support: IE<10
// Check if getElementById returns elements by name
// The broken getElementById methods don't pick up programatically-set names,
// so use a roundabout getElementsByName test
// ID find and filter
// Support: IE6/7
// getElementById is not reliable as a find shortcut
// Tag
// Class
/* QSA/matchesSelector
	---------------------------------------------------------------------- */
// QSA and matchesSelector support
// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
// qSa(:focus) reports false when true (Chrome 21)
// We allow this because of a bug in IE8/9 that throws an error
// whenever `document.activeElement` is accessed on an iframe
// So, we allow :focus to pass through QSA all the time to avoid the IE error
// See http://bugs.jquery.com/ticket/13378
// Build QSA regex
// Regex strategy adopted from Diego Perini
/* Contains
	---------------------------------------------------------------------- */
// Element contains another
// Purposefully does not implement inclusive descendent
// As in, an element does not contain itself
/* Sorting
	---------------------------------------------------------------------- */
// Document order sorting
return n!==q&&9===n.nodeType&&n.documentElement?(q=n,H=n.documentElement,O=!N(n),r&&r!==r.top&&(r.addEventListener?r.addEventListener("unload",function(){L()},!1):r.attachEvent&&r.attachEvent("onunload",function(){L()})),w.attributes=i(function(e){return e.className="i",!e.getAttribute("className")}),w.getElementsByTagName=i(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),w.getElementsByClassName=vt.test(n.getElementsByClassName)&&i(function(e){// Support: Opera<10
// Catch gEBCN failure to find non-leading classes
// Support: Safari<4
// Catch class over-caching
return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),w.getById=i(function(e){return H.appendChild(e).id=W,!n.getElementsByName||!n.getElementsByName(W).length}),w.getById?(T.find.ID=function(e,t){if(typeof t.getElementById!==V&&O){var n=t.getElementById(e);// Check parentNode to catch when Blackberry 4.6 returns
// nodes that are no longer in the document #6963
return n&&n.parentNode?[n]:[]}},T.filter.ID=function(e){var t=e.replace(wt,Tt);return function(e){return e.getAttribute("id")===t}}):(delete T.find.ID,T.filter.ID=function(e){var t=e.replace(wt,Tt);return function(e){var n=typeof e.getAttributeNode!==V&&e.getAttributeNode("id");return n&&n.value===t}}),T.find.TAG=w.getElementsByTagName?function(e,t){return typeof t.getElementsByTagName!==V?t.getElementsByTagName(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);// Filter out possible comments
if("*"===e){for(;n=o[i++];)1===n.nodeType&&r.push(n);return r}return o},T.find.CLASS=w.getElementsByClassName&&function(e,t){return typeof t.getElementsByClassName!==V&&O?t.getElementsByClassName(e):void 0},P=[],F=[],(w.qsa=vt.test(n.querySelectorAll))&&(i(function(e){// Select is set to empty string on purpose
// This is to test IE's treatment of not explicitly
// setting a boolean content attribute,
// since its presence should be enough
// http://bugs.jquery.com/ticket/12359
e.innerHTML="<select msallowclip=''><option selected=''></option></select>",// Support: IE8, Opera 11-12.16
// Nothing should be selected when empty strings follow ^= or $= or *=
// The test attribute must be unknown in Opera but "safe" for WinRT
// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
e.querySelectorAll("[msallowclip^='']").length&&F.push("[*^$]="+rt+"*(?:''|\"\")"),// Support: IE8
// Boolean attributes and "value" are not treated correctly
e.querySelectorAll("[selected]").length||F.push("\\["+rt+"*(?:value|"+nt+")"),// Webkit/Opera - :checked should return selected option elements
// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
// IE8 throws error here and will not see later tests
e.querySelectorAll(":checked").length||F.push(":checked")}),i(function(e){// Support: Windows 8 Native Apps
// The type and name attributes are restricted during .innerHTML assignment
var t=n.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),// Support: IE8
// Enforce case-sensitivity of name attribute
e.querySelectorAll("[name=d]").length&&F.push("name"+rt+"*[*^$|!~]?="),// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
// IE8 throws error here and will not see later tests
e.querySelectorAll(":enabled").length||F.push(":enabled",":disabled"),// Opera 10-11 does not throw on post-comma invalid pseudos
e.querySelectorAll("*,:x"),F.push(",.*:")})),(w.matchesSelector=vt.test(M=H.matches||H.webkitMatchesSelector||H.mozMatchesSelector||H.oMatchesSelector||H.msMatchesSelector))&&i(function(e){// Check to see if it's possible to do matchesSelector
// on a disconnected node (IE 9)
w.disconnectedMatch=M.call(e,"div"),// This should fail with an exception
// Gecko does not error, returns false instead
M.call(e,"[s!='']:x"),P.push("!=",at)}),F=F.length&&new RegExp(F.join("|")),P=P.length&&new RegExp(P.join("|")),t=vt.test(H.compareDocumentPosition),R=t||vt.test(H.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},U=t?function(e,t){// Flag for duplicate removal
if(e===t)return A=!0,0;// Sort on method existence if only one input has compareDocumentPosition
var r=!e.compareDocumentPosition-!t.compareDocumentPosition;// Calculate position if both inputs belong to the same document
// Otherwise we know they are disconnected
// Disconnected nodes
// Choose the first element that is related to our preferred document
return r?r:(r=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1,1&r||!w.sortDetached&&t.compareDocumentPosition(e)===r?e===n||e.ownerDocument===$&&R($,e)?-1:t===n||t.ownerDocument===$&&R($,t)?1:D?tt.call(D,e)-tt.call(D,t):0:4&r?-1:1)}:function(e,t){// Exit early if the nodes are identical
if(e===t)return A=!0,0;var r,i=0,o=e.parentNode,a=t.parentNode,u=[e],l=[t];// Parentless nodes are either documents or disconnected
if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:D?tt.call(D,e)-tt.call(D,t):0;if(o===a)return s(e,t);for(// Otherwise we need full lists of their ancestors for comparison
r=e;r=r.parentNode;)u.unshift(r);for(r=t;r=r.parentNode;)l.unshift(r);// Walk down the tree looking for a discrepancy
for(;u[i]===l[i];)i++;// Do a sibling check if the nodes have a common ancestor
// Otherwise nodes in our document sort first
return i?s(u[i],l[i]):u[i]===$?-1:l[i]===$?1:0},n):q},t.matches=function(e,n){return t(e,null,null,n)},t.matchesSelector=function(e,n){if(// Set document vars if needed
(e.ownerDocument||e)!==q&&L(e),// Make sure that attribute selectors are quoted
n=n.replace(ft,"='$1']"),!(!w.matchesSelector||!O||P&&P.test(n)||F&&F.test(n)))try{var r=M.call(e,n);// IE 9's matchesSelector returns false on disconnected nodes
if(r||w.disconnectedMatch||// As well, disconnected nodes are said to be in a document
// fragment in IE 9
e.document&&11!==e.document.nodeType)return r}catch(i){}return t(n,q,null,[e]).length>0},t.contains=function(e,t){// Set document vars if needed
return(e.ownerDocument||e)!==q&&L(e),R(e,t)},t.attr=function(e,t){// Set document vars if needed
(e.ownerDocument||e)!==q&&L(e);var n=T.attrHandle[t.toLowerCase()],// Don't get fooled by Object.prototype properties (jQuery #13807)
r=n&&G.call(T.attrHandle,t.toLowerCase())?n(e,t,!O):void 0;return void 0!==r?r:w.attributes||!O?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},t.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
t.uniqueSort=function(e){var t,n=[],r=0,i=0;if(// Unless we *know* we can detect duplicates, assume their presence
A=!w.detectDuplicates,D=!w.sortStable&&e.slice(0),e.sort(U),A){for(;t=e[i++];)t===e[i]&&(r=n.push(i));for(;r--;)e.splice(n[r],1)}// Clear input after sorting to release objects
// See https://github.com/jquery/sizzle/pull/225
return D=null,e},/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
C=t.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){// Use textContent for elements
// innerText usage removed for consistency of new lines (jQuery #11153)
if("string"==typeof e.textContent)return e.textContent;// Traverse its children
for(e=e.firstChild;e;e=e.nextSibling)n+=C(e)}else if(3===i||4===i)return e.nodeValue}else// If no nodeType, this is expected to be an array
for(;t=e[r++];)// Do not traverse comment nodes
n+=C(t);// Do not include comment or processing instruction nodes
return n},T=t.selectors={// Can be adjusted by the user
cacheLength:50,createPseudo:r,match:ht,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){// Move the given value to match[3] whether quoted or unquoted
return e[1]=e[1].replace(wt,Tt),e[3]=(e[3]||e[4]||e[5]||"").replace(wt,Tt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
// nth-* requires argument
// numeric x and y parameters for Expr.filter.CHILD
// remember that false/true cast respectively to 0/1
return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||t.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&t.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];// Accept quoted arguments as-is
// Get excess from tokenize (recursively)
// advance to the next closing parenthesis
// excess is a negative index
return ht.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&pt.test(n)&&(t=k(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(wt,Tt).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=_[e+" "];return t||(t=new RegExp("(^|"+rt+")"+e+"("+rt+"|$)"))&&_(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==V&&e.getAttribute("class")||"")})},ATTR:function(e,n,r){return function(i){var o=t.attr(i,e);return null==o?"!="===n:n?(o+="","="===n?o===r:"!="===n?o!==r:"^="===n?r&&0===o.indexOf(r):"*="===n?r&&o.indexOf(r)>-1:"$="===n?r&&o.slice(-r.length)===r:"~="===n?(" "+o+" ").indexOf(r)>-1:"|="===n?o===r||o.slice(0,r.length+1)===r+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;// Shortcut for :nth-*(n)
return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,f,p,d,h,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,v=a&&t.nodeName.toLowerCase(),y=!u&&!a;if(m){// :(first|last|only)-(child|of-type)
if(o){for(;g;){for(f=t;f=f[g];)if(a?f.nodeName.toLowerCase()===v:1===f.nodeType)return!1;// Reverse direction for :only-* (if we haven't yet done so)
h=g="only"===e&&!h&&"nextSibling"}return!0}// non-xml :nth-child(...) stores cache data on `parent`
if(h=[s?m.firstChild:m.lastChild],s&&y){for(// Seek `elem` from a previously-cached index
c=m[W]||(m[W]={}),l=c[e]||[],d=l[0]===B&&l[1],p=l[0]===B&&l[2],f=d&&m.childNodes[d];f=++d&&f&&f[g]||(// Fallback to seeking `elem` from the start
p=d=0)||h.pop();)// When found, cache indexes on `parent` and break
if(1===f.nodeType&&++p&&f===t){c[e]=[B,d,p];break}}else if(y&&(l=(t[W]||(t[W]={}))[e])&&l[0]===B)p=l[1];else// Use the same loop as above to seek `elem` from the start
for(;(f=++d&&f&&f[g]||(p=d=0)||h.pop())&&((a?f.nodeName.toLowerCase()!==v:1!==f.nodeType)||!++p||(// Cache the index of each encountered element
y&&((f[W]||(f[W]={}))[e]=[B,p]),f!==t)););// Incorporate the offset, then check against cycle size
return p-=i,p===r||p%r===0&&p/r>=0}}},PSEUDO:function(e,n){// pseudo-class names are case-insensitive
// http://www.w3.org/TR/selectors/#pseudo-classes
// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
// Remember that setFilters inherits from pseudos
var i,o=T.pseudos[e]||T.setFilters[e.toLowerCase()]||t.error("unsupported pseudo: "+e);// The user may use createPseudo to indicate that
// arguments are needed to create the filter function
// just as Sizzle does
// The user may use createPseudo to indicate that
// arguments are needed to create the filter function
// just as Sizzle does
// But maintain support for old signatures
return o[W]?o(n):o.length>1?(i=[e,e,"",n],T.setFilters.hasOwnProperty(e.toLowerCase())?r(function(e,t){for(var r,i=o(e,n),s=i.length;s--;)r=tt.call(e,i[s]),e[r]=!(t[r]=i[s])}):function(e){return o(e,0,i)}):o}},pseudos:{// Potentially complex pseudos
not:r(function(e){// Trim the selector passed to compile
// to avoid treating leading and trailing
// spaces as combinators
var t=[],n=[],i=E(e.replace(ut,"$1"));return i[W]?r(function(e,t,n,r){// Match elements unmatched by `matcher`
for(var o,s=i(e,null,r,[]),a=e.length;a--;)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,r,o){return t[0]=e,i(t,null,o,n),!n.pop()}}),has:r(function(e){return function(n){return t(e,n).length>0}}),contains:r(function(e){return function(t){return(t.textContent||t.innerText||C(t)).indexOf(e)>-1}}),// "Whether an element is represented by a :lang() selector
// is based solely on the element's language value
// being equal to the identifier C,
// or beginning with the identifier C immediately followed by "-".
// The matching of C against the element's language value is performed case-insensitively.
// The identifier C does not have to be a valid language name."
// http://www.w3.org/TR/selectors/#lang-pseudo
lang:r(function(e){// lang value must be a valid identifier
return dt.test(e||"")||t.error("unsupported lang: "+e),e=e.replace(wt,Tt).toLowerCase(),function(t){var n;do if(n=O?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),// Miscellaneous
target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===H},focus:function(e){return e===q.activeElement&&(!q.hasFocus||q.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},// Boolean properties
enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){// In CSS3, :checked should return both checked and selected elements
// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){// Accessing this property makes selected-by-default
// options in Safari work properly
return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},// Contents
empty:function(e){// http://www.w3.org/TR/selectors/#empty-pseudo
// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
//   but not by others (comment: 8; processing instruction: 7; etc.)
// nodeType < 6 works because attributes (2) do not appear as children
for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!T.pseudos.empty(e)},// Element/input types
header:function(e){return mt.test(e.nodeName)},input:function(e){return gt.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;// Support: IE<8
// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},// Position-in-collection
first:l(function(){return[0]}),last:l(function(e,t){return[t-1]}),eq:l(function(e,t,n){return[0>n?n+t:n]}),even:l(function(e,t){for(var n=0;t>n;n+=2)e.push(n);return e}),odd:l(function(e,t){for(var n=1;t>n;n+=2)e.push(n);return e}),lt:l(function(e,t,n){for(var r=0>n?n+t:n;--r>=0;)e.push(r);return e}),gt:l(function(e,t,n){for(var r=0>n?n+t:n;++r<t;)e.push(r);return e})}},T.pseudos.nth=T.pseudos.eq;// Add button/input type pseudos
for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})T.pseudos[b]=a(b);for(b in{submit:!0,reset:!0})T.pseudos[b]=u(b);/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
// One-time assignments
// Sort stability
// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
// Initialize against the default document
// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
// Support: IE<9
// Use defaultValue in place of getAttribute("value")
// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
return f.prototype=T.filters=T.pseudos,T.setFilters=new f,k=t.tokenize=function(e,n){var r,i,o,s,a,u,l,c=z[e+" "];if(c)return n?0:c.slice(0);for(a=e,u=[],l=T.preFilter;a;){// Comma and first run
(!r||(i=lt.exec(a)))&&(i&&(// Don't consume trailing commas as valid
a=a.slice(i[0].length)||a),u.push(o=[])),r=!1,// Combinators
(i=ct.exec(a))&&(r=i.shift(),o.push({value:r,// Cast descendant combinators to space
type:i[0].replace(ut," ")}),a=a.slice(r.length));// Filters
for(s in T.filter)!(i=ht[s].exec(a))||l[s]&&!(i=l[s](i))||(r=i.shift(),o.push({value:r,type:s,matches:i}),a=a.slice(r.length));if(!r)break}// Return the length of the invalid excess
// if we're just parsing
// Otherwise, throw an error or return tokens
// Cache the tokens
return n?a.length:a?t.error(e):z(e,u).slice(0)},E=t.compile=function(e,t){var n,r=[],i=[],o=X[e+" "];if(!o){for(// Generate a function of recursive functions that can be used to check each element
t||(t=k(e)),n=t.length;n--;)o=y(t[n]),o[W]?r.push(o):i.push(o);// Cache the compiled function
o=X(e,x(i,r)),// Save selector and tokenization
o.selector=e}return o},S=t.select=function(e,t,n,r){var i,o,s,a,u,l="function"==typeof e&&e,f=!r&&k(e=l.selector||e);// Try to minimize operations if there is no seed and only one group
if(n=n||[],1===f.length){if(// Take a shortcut and set the context if the root selector is an ID
o=f[0]=f[0].slice(0),o.length>2&&"ID"===(s=o[0]).type&&w.getById&&9===t.nodeType&&O&&T.relative[o[1].type]){if(t=(T.find.ID(s.matches[0].replace(wt,Tt),t)||[])[0],!t)return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}for(// Fetch a seed set for right-to-left matching
i=ht.needsContext.test(e)?0:o.length;i--&&(s=o[i],!T.relative[a=s.type]);)if((u=T.find[a])&&(r=u(s.matches[0].replace(wt,Tt),xt.test(o[0].type)&&c(t.parentNode)||t))){if(// If seed is empty or no tokens remain, we can return early
o.splice(i,1),e=r.length&&p(o),!e)return Z.apply(n,r),n;break}}// Compile and execute a filtering function if one is not provided
// Provide `match` to avoid retokenization if we modified the selector above
return(l||E(e,f))(r,t,!O,n,xt.test(e)&&c(t.parentNode)||t),n},w.sortStable=W.split("").sort(U).join("")===W,w.detectDuplicates=!!A,L(),w.sortDetached=i(function(e){// Should return 1, but returns 4 (following)
return 1&e.compareDocumentPosition(q.createElement("div"))}),i(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||o("type|href|height|width",function(e,t,n){return n?void 0:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),w.attributes&&i(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||o("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?void 0:e.defaultValue}),i(function(e){return null==e.getAttribute("disabled")})||o(nt,function(e,t,n){var r;return n?void 0:e[t]===!0?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),t}(e);Z.find=it,Z.expr=it.selectors,Z.expr[":"]=Z.expr.pseudos,Z.unique=it.uniqueSort,Z.text=it.getText,Z.isXMLDoc=it.isXML,Z.contains=it.contains;var ot=Z.expr.match.needsContext,st=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,at=/^.[^:#\[\.,]*$/;Z.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?Z.find.matchesSelector(r,e)?[r]:[]:Z.find.matches(e,Z.grep(t,function(e){return 1===e.nodeType}))},Z.fn.extend({find:function(e){var t,n=this.length,r=[],i=this;if("string"!=typeof e)return this.pushStack(Z(e).filter(function(){for(t=0;n>t;t++)if(Z.contains(i[t],this))return!0}));for(t=0;n>t;t++)Z.find(e,i[t],r);// Needed because $( selector, context ) becomes $( context ).find( selector )
return r=this.pushStack(n>1?Z.unique(r):r),r.selector=this.selector?this.selector+" "+e:e,r},filter:function(e){return this.pushStack(r(this,e||[],!1))},not:function(e){return this.pushStack(r(this,e||[],!0))},is:function(e){// If this is a positional/relative selector, check membership in the returned set
// so $("p:first").is("p:last") won't return true for a doc with two "p".
return!!r(this,"string"==typeof e&&ot.test(e)?Z(e):e||[],!1).length}});// Initialize a jQuery object
// A central reference to the root jQuery(document)
var ut,// A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
// Strict HTML recognition (#11290: must start with <)
lt=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,ct=Z.fn.init=function(e,t){var n,r;// HANDLE: $(""), $(null), $(undefined), $(false)
if(!e)return this;// Handle HTML strings
if("string"==typeof e){// Match html or make sure no context is specified for #id
if(// Assume that strings that start and end with <> are HTML and skip the regex check
n="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:lt.exec(e),!n||!n[1]&&t)return!t||t.jquery?(t||ut).find(e):this.constructor(t).find(e);// HANDLE: $(html) -> $(array)
if(n[1]){// HANDLE: $(html, props)
if(t=t instanceof Z?t[0]:t,// scripts is true for back-compat
// Intentionally let the error be thrown if parseHTML is not present
Z.merge(this,Z.parseHTML(n[1],t&&t.nodeType?t.ownerDocument||t:J,!0)),st.test(n[1])&&Z.isPlainObject(t))for(n in t)// Properties of context are called as methods if possible
Z.isFunction(this[n])?this[n](t[n]):this.attr(n,t[n]);return this}// Check parentNode to catch when Blackberry 4.6 returns
// nodes that are no longer in the document #6963
// Inject the element directly into the jQuery object
return r=J.getElementById(n[2]),r&&r.parentNode&&(this.length=1,this[0]=r),this.context=J,this.selector=e,this}// Execute immediately if ready is not present
return e.nodeType?(this.context=this[0]=e,this.length=1,this):Z.isFunction(e)?"undefined"!=typeof ut.ready?ut.ready(e):e(Z):(void 0!==e.selector&&(this.selector=e.selector,this.context=e.context),Z.makeArray(e,this))};// Give the init function the jQuery prototype for later instantiation
ct.prototype=Z.fn,// Initialize central reference
ut=Z(J);var ft=/^(?:parents|prev(?:Until|All))/,// methods guaranteed to produce a unique set when starting from a unique set
pt={children:!0,contents:!0,next:!0,prev:!0};Z.extend({dir:function(e,t,n){for(var r=[],i=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(i&&Z(e).is(n))break;r.push(e)}return r},sibling:function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}}),Z.fn.extend({has:function(e){var t=Z(e,this),n=t.length;return this.filter(function(){for(var e=0;n>e;e++)if(Z.contains(this,t[e]))return!0})},closest:function(e,t){for(var n,r=0,i=this.length,o=[],s=ot.test(e)||"string"!=typeof e?Z(e,t||this.context):0;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)// Always skip document fragments
if(n.nodeType<11&&(s?s.index(n)>-1:// Don't pass non-elements to Sizzle
1===n.nodeType&&Z.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?Z.unique(o):o)},// Determine the position of an element within
// the matched set of elements
index:function(e){// No argument, return index in parent
// No argument, return index in parent
// index in selector
// If it receives a jQuery object, the first element is used
return e?"string"==typeof e?U.call(Z(e),this[0]):U.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(Z.unique(Z.merge(this.get(),Z(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),Z.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return Z.dir(e,"parentNode")},parentsUntil:function(e,t,n){return Z.dir(e,"parentNode",n)},next:function(e){return i(e,"nextSibling")},prev:function(e){return i(e,"previousSibling")},nextAll:function(e){return Z.dir(e,"nextSibling")},prevAll:function(e){return Z.dir(e,"previousSibling")},nextUntil:function(e,t,n){return Z.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return Z.dir(e,"previousSibling",n)},siblings:function(e){return Z.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return Z.sibling(e.firstChild)},contents:function(e){return e.contentDocument||Z.merge([],e.childNodes)}},function(e,t){Z.fn[e]=function(n,r){var i=Z.map(this,t,n);// Remove duplicates
// Reverse order for parents* and prev-derivatives
return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=Z.filter(r,i)),this.length>1&&(pt[e]||Z.unique(i),ft.test(e)&&i.reverse()),this.pushStack(i)}});var dt=/\S+/g,ht={};/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
Z.Callbacks=function(e){// Convert options from String-formatted to Object-formatted if needed
// (we check in cache first)
e="string"==typeof e?ht[e]||o(e):Z.extend({},e);var// Last fire value (for non-forgettable lists)
t,// Flag to know if list was already fired
n,// Flag to know if list is currently firing
r,// First callback to fire (used internally by add and fireWith)
i,// End of the loop when firing
s,// Index of currently firing callback (modified by remove if needed)
a,// Actual callback list
u=[],// Stack of fire calls for repeatable lists
l=!e.once&&[],// Fire callbacks
c=function(o){for(t=e.memory&&o,n=!0,a=i||0,i=0,s=u.length,r=!0;u&&s>a;a++)if(u[a].apply(o[0],o[1])===!1&&e.stopOnFalse){t=!1;// To prevent further calls using add
break}r=!1,u&&(l?l.length&&c(l.shift()):t?u=[]:f.disable())},// Actual Callbacks object
f={// Add a callback or a collection of callbacks to the list
add:function(){if(u){// First, we save the current length
var n=u.length;!function o(t){Z.each(t,function(t,n){var r=Z.type(n);"function"===r?e.unique&&f.has(n)||u.push(n):n&&n.length&&"string"!==r&&// Inspect recursively
o(n)})}(arguments),// Do we need to add the callbacks to the
// current firing batch?
r?s=u.length:t&&(i=n,c(t))}return this},// Remove a callback from the list
remove:function(){return u&&Z.each(arguments,function(e,t){for(var n;(n=Z.inArray(t,u,n))>-1;)u.splice(n,1),// Handle firing indexes
r&&(s>=n&&s--,a>=n&&a--)}),this},// Check if a given callback is in the list.
// If no argument is given, return whether or not list has callbacks attached.
has:function(e){return e?Z.inArray(e,u)>-1:!(!u||!u.length)},// Remove all callbacks from the list
empty:function(){return u=[],s=0,this},// Have the list do nothing anymore
disable:function(){return u=l=t=void 0,this},// Is it disabled?
disabled:function(){return!u},// Lock the list in its current state
lock:function(){return l=void 0,t||f.disable(),this},// Is it locked?
locked:function(){return!l},// Call all callbacks with the given context and arguments
fireWith:function(e,t){return!u||n&&!l||(t=t||[],t=[e,t.slice?t.slice():t],r?l.push(t):c(t)),this},// Call all the callbacks with the given arguments
fire:function(){return f.fireWith(this,arguments),this},// To know if the callbacks have already been called at least once
fired:function(){return!!n}};return f},Z.extend({Deferred:function(e){var t=[// action, add listener, listener list, final state
["resolve","done",Z.Callbacks("once memory"),"resolved"],["reject","fail",Z.Callbacks("once memory"),"rejected"],["notify","progress",Z.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return Z.Deferred(function(n){Z.each(t,function(t,o){var s=Z.isFunction(e[t])&&e[t];// deferred[ done | fail | progress ] for forwarding actions to newDefer
i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&Z.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[o[0]+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},// Get a promise for this deferred
// If obj is provided, the promise aspect is added to the object
promise:function(e){return null!=e?Z.extend(e,r):r}},i={};// All done!
// Keep pipe for back-compat
// Add list-specific methods
// Make the deferred a promise
// Call given func if any
return r.pipe=r.then,Z.each(t,function(e,o){var s=o[2],a=o[3];// promise[ done | fail | progress ] = list.add
r[o[1]]=s.add,// Handle state
a&&s.add(function(){// state = [ resolved | rejected ]
n=a},t[1^e][2].disable,t[2][2].lock),// deferred[ resolve | reject | notify ]
i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=s.fireWith}),r.promise(i),e&&e.call(i,i),i},// Deferred helper
when:function(e){var t,n,r,i=0,o=_.call(arguments),s=o.length,// the count of uncompleted subordinates
a=1!==s||e&&Z.isFunction(e.promise)?s:0,// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
u=1===a?e:Z.Deferred(),// Update function for both resolve and progress values
l=function(e,n,r){return function(i){n[e]=this,r[e]=arguments.length>1?_.call(arguments):i,r===t?u.notifyWith(n,r):--a||u.resolveWith(n,r)}};// add listeners to Deferred subordinates; treat others as resolved
if(s>1)for(t=new Array(s),n=new Array(s),r=new Array(s);s>i;i++)o[i]&&Z.isFunction(o[i].promise)?o[i].promise().done(l(i,r,o)).fail(u.reject).progress(l(i,n,t)):--a;// if we're not waiting on anything, resolve the master
return a||u.resolveWith(r,o),u.promise()}});// The deferred used on DOM ready
var gt;Z.fn.ready=function(e){// Add the callback
return Z.ready.promise().done(e),this},Z.extend({// Is the DOM ready to be used? Set to true once it occurs.
isReady:!1,// A counter to track how many items to wait for before
// the ready event fires. See #6781
readyWait:1,// Hold (or release) the ready event
holdReady:function(e){e?Z.readyWait++:Z.ready(!0)},// Handle when the DOM is ready
ready:function(e){// Abort if there are pending holds or we're already ready
(e===!0?--Z.readyWait:Z.isReady)||(// Remember that the DOM is ready
Z.isReady=!0,// If a normal DOM Ready event fired, decrement, and wait if need be
e!==!0&&--Z.readyWait>0||(// If there are functions bound, to execute
gt.resolveWith(J,[Z]),// Trigger any bound ready events
Z.fn.triggerHandler&&(Z(J).triggerHandler("ready"),Z(J).off("ready"))))}}),Z.ready.promise=function(t){// Catch cases where $(document).ready() is called after the browser event has already occurred.
// we once tried to use readyState "interactive" here, but it caused issues like the one
// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
// Handle it asynchronously to allow scripts the opportunity to delay ready
// Use the handy event callback
// A fallback to window.onload, that will always work
return gt||(gt=Z.Deferred(),"complete"===J.readyState?setTimeout(Z.ready):(J.addEventListener("DOMContentLoaded",s,!1),e.addEventListener("load",s,!1))),gt.promise(t)},// Kick off the DOM ready check even if the user does not
Z.ready.promise();// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var mt=Z.access=function(e,t,n,r,i,o,s){var a=0,u=e.length,l=null==n;// Sets many values
if("object"===Z.type(n)){i=!0;for(a in n)Z.access(e,t,a,n[a],!0,o,s)}else if(void 0!==r&&(i=!0,Z.isFunction(r)||(s=!0),l&&(// Bulk operations run against the entire set
s?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(Z(e),n)})),t))for(;u>a;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)));// Gets
return i?e:l?t.call(e):u?t(e[0],n):o};/**
 * Determines whether an object can have data
 */
Z.acceptData=function(e){// Accepts only:
//  - Node
//    - Node.ELEMENT_NODE
//    - Node.DOCUMENT_NODE
//  - Object
//    - Any
/* jshint -W018 */
return 1===e.nodeType||9===e.nodeType||!+e.nodeType},a.uid=1,a.accepts=Z.acceptData,a.prototype={key:function(e){// We can accept data for non-element nodes in modern browsers,
// but we should not, see #8335.
// Always return the key for a frozen object.
if(!a.accepts(e))return 0;var t={},// Check if the owner object already has a cache key
n=e[this.expando];// If not, create one
if(!n){n=a.uid++;// Secure it in a non-enumerable, non-writable property
try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(r){t[this.expando]=n,Z.extend(e,t)}}// Ensure the cache object
return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var r,// There may be an unlock assigned to this node,
// if there is no entry for this "owner", create one inline
// and set the unlock as though an owner entry had always existed
i=this.key(e),o=this.cache[i];// Handle: [ owner, key, value ] args
if("string"==typeof t)o[t]=n;else// Fresh assignments by object are shallow copied
if(Z.isEmptyObject(o))Z.extend(this.cache[i],t);else for(r in t)o[r]=t[r];return o},get:function(e,t){// Either a valid cache is found, or will be created.
// New caches will be created and the unlock returned,
// allowing direct access to the newly created
// empty data object. A valid owner object must be provided.
var n=this.cache[this.key(e)];return void 0===t?n:n[t]},access:function(e,t,n){var r;// In cases where either:
//
//   1. No key was specified
//   2. A string key was specified, but no value provided
//
// Take the "read" path and allow the get method to determine
// which value to return, respectively either:
//
//   1. The entire cache object
//   2. The data stored at the key
//
// In cases where either:
//
//   1. No key was specified
//   2. A string key was specified, but no value provided
//
// Take the "read" path and allow the get method to determine
// which value to return, respectively either:
//
//   1. The entire cache object
//   2. The data stored at the key
//
// [*]When the key is not a string, or both a key and value
// are specified, set or extend (existing objects) with either:
//
//   1. An object of properties
//   2. A key and value
//
return void 0===t||t&&"string"==typeof t&&void 0===n?(r=this.get(e,t),void 0!==r?r:this.get(e,Z.camelCase(t))):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r,i,o=this.key(e),s=this.cache[o];if(void 0===t)this.cache[o]={};else{// Support array or space separated string of keys
Z.isArray(t)?// If "name" is an array of keys...
// When data is initially created, via ("key", "val") signature,
// keys will be converted to camelCase.
// Since there is no way to tell _how_ a key was added, remove
// both plain key and camelCase key. #12786
// This will only penalize the array argument path.
r=t.concat(t.map(Z.camelCase)):(i=Z.camelCase(t),// Try the string as a key before any manipulation
t in s?r=[t,i]:(// If a key with the spaces exists, use it.
// Otherwise, create an array by matching non-whitespace
r=i,r=r in s?[r]:r.match(dt)||[])),n=r.length;for(;n--;)delete s[r[n]]}},hasData:function(e){return!Z.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]]}};var vt=new a,yt=new a,xt=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,bt=/([A-Z])/g;Z.extend({hasData:function(e){return yt.hasData(e)||vt.hasData(e)},data:function(e,t,n){return yt.access(e,t,n)},removeData:function(e,t){yt.remove(e,t)},// TODO: Now that all calls to _data and _removeData have been replaced
// with direct calls to data_priv methods, these can be deprecated.
_data:function(e,t,n){return vt.access(e,t,n)},_removeData:function(e,t){vt.remove(e,t)}}),Z.fn.extend({data:function(e,t){var n,r,i,o=this[0],s=o&&o.attributes;// Gets all values
if(void 0===e){if(this.length&&(i=yt.get(o),1===o.nodeType&&!vt.get(o,"hasDataAttrs"))){for(n=s.length;n--;)// Support: IE11+
// The attrs elements can be null (#14894)
s[n]&&(r=s[n].name,0===r.indexOf("data-")&&(r=Z.camelCase(r.slice(5)),u(o,r,i[r])));vt.set(o,"hasDataAttrs",!0)}return i}// Sets multiple values
// Sets multiple values
return"object"==typeof e?this.each(function(){yt.set(this,e)}):mt(this,function(t){var n,r=Z.camelCase(e);// The calling jQuery object (element matches) is not empty
// (and therefore has an element appears at this[ 0 ]) and the
// `value` parameter was not undefined. An empty jQuery object
// will result in `undefined` for elem = this[ 0 ] which will
// throw an exception if an attempt to read a data cache is made.
if(o&&void 0===t){if(// Attempt to get data from the cache
// with the key as-is
n=yt.get(o,e),void 0!==n)return n;if(// Attempt to get data from the cache
// with the key camelized
n=yt.get(o,r),void 0!==n)return n;if(// Attempt to "discover" the data in
// HTML5 custom data-* attrs
n=u(o,r,void 0),void 0!==n)return n}else// Set the data...
this.each(function(){// First, attempt to store a copy or reference of any
// data that might've been store with a camelCased key.
var n=yt.get(this,r);// For HTML5 data-* attribute interop, we have to
// store property names with dashes in a camelCase form.
// This might not apply to all properties...*
yt.set(this,r,t),// *... In the case of properties that might _actually_
// have dashes, we need to also store a copy of that
// unchanged property.
-1!==e.indexOf("-")&&void 0!==n&&yt.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){yt.remove(this,e)})}}),Z.extend({queue:function(e,t,n){var r;// Speed up dequeue by getting out quickly if this is just a lookup
return e?(t=(t||"fx")+"queue",r=vt.get(e,t),n&&(!r||Z.isArray(n)?r=vt.access(e,t,Z.makeArray(n)):r.push(n)),r||[]):void 0},dequeue:function(e,t){t=t||"fx";var n=Z.queue(e,t),r=n.length,i=n.shift(),o=Z._queueHooks(e,t),s=function(){Z.dequeue(e,t)};// If the fx queue is dequeued, always remove the progress sentinel
"inprogress"===i&&(i=n.shift(),r--),i&&(// Add a progress sentinel to prevent the fx queue from being
// automatically dequeued
"fx"===t&&n.unshift("inprogress"),// clear up the last queue stop function
delete o.stop,i.call(e,s,o)),!r&&o&&o.empty.fire()},// not intended for public consumption - generates a queueHooks object, or returns the current one
_queueHooks:function(e,t){var n=t+"queueHooks";return vt.get(e,n)||vt.access(e,n,{empty:Z.Callbacks("once memory").add(function(){vt.remove(e,[t+"queue",n])})})}}),Z.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?Z.queue(this[0],e):void 0===t?this:this.each(function(){var n=Z.queue(this,e,t);// ensure a hooks for this queue
Z._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&Z.dequeue(this,e)})},dequeue:function(e){return this.each(function(){Z.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},// Get a promise resolved when queues of a certain type
// are emptied (fx is the type by default)
promise:function(e,t){var n,r=1,i=Z.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";s--;)n=vt.get(o[s],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(a));return a(),i.promise(t)}});var wt=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Tt=["Top","Right","Bottom","Left"],Ct=function(e,t){// isHidden might be called from jQuery#filter function;
// in that case, element will be second argument
return e=t||e,"none"===Z.css(e,"display")||!Z.contains(e.ownerDocument,e)},Nt=/^(?:checkbox|radio)$/i;!function(){var e=J.createDocumentFragment(),t=e.appendChild(J.createElement("div")),n=J.createElement("input");// #11217 - WebKit loses check when the name is after the checked attribute
// Support: Windows Web Apps (WWA)
// `name` and `type` need .setAttribute for WWA
n.setAttribute("type","radio"),n.setAttribute("checked","checked"),n.setAttribute("name","t"),t.appendChild(n),// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
// old WebKit doesn't clone checked state correctly in fragments
Q.checkClone=t.cloneNode(!0).cloneNode(!0).lastChild.checked,// Make sure textarea (and checkbox) defaultValue is properly cloned
// Support: IE9-IE11+
t.innerHTML="<textarea>x</textarea>",Q.noCloneChecked=!!t.cloneNode(!0).lastChild.defaultValue}();var kt="undefined";Q.focusinBubbles="onfocusin"in e;var Et=/^key/,St=/^(?:mouse|pointer|contextmenu)|click/,jt=/^(?:focusinfocus|focusoutblur)$/,Dt=/^([^.]*)(?:\.(.+)|)$/;/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
Z.event={global:{},add:function(e,t,n,r,i){var o,s,a,u,l,c,f,p,d,h,g,m=vt.get(e);// Don't attach events to noData or text/comment nodes (but allow plain objects)
if(m)for(// Caller can pass in an object of custom data in lieu of the handler
n.handler&&(o=n,n=o.handler,i=o.selector),// Make sure that the handler has a unique ID, used to find/remove it later
n.guid||(n.guid=Z.guid++),// Init the element's event structure and main handler, if this is the first
(u=m.events)||(u=m.events={}),(s=m.handle)||(s=m.handle=function(t){// Discard the second event of a jQuery.event.trigger() and
// when an event is called after a page has unloaded
return typeof Z!==kt&&Z.event.triggered!==t.type?Z.event.dispatch.apply(e,arguments):void 0}),// Handle multiple events separated by a space
t=(t||"").match(dt)||[""],l=t.length;l--;)a=Dt.exec(t[l])||[],d=g=a[1],h=(a[2]||"").split(".").sort(),// There *must* be a type, no attaching namespace-only handlers
d&&(// If event changes its type, use the special event handlers for the changed type
f=Z.event.special[d]||{},// If selector defined, determine special event api type, otherwise given type
d=(i?f.delegateType:f.bindType)||d,// Update special based on newly reset type
f=Z.event.special[d]||{},// handleObj is passed to all event handlers
c=Z.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&Z.expr.match.needsContext.test(i),namespace:h.join(".")},o),// Init the event handler queue if we're the first
(p=u[d])||(p=u[d]=[],p.delegateCount=0,// Only use addEventListener if the special events handler returns false
f.setup&&f.setup.call(e,r,h,s)!==!1||e.addEventListener&&e.addEventListener(d,s,!1)),f.add&&(f.add.call(e,c),c.handler.guid||(c.handler.guid=n.guid)),// Add to the element's handler list, delegates in front
i?p.splice(p.delegateCount++,0,c):p.push(c),// Keep track of which events have ever been used, for event optimization
Z.event.global[d]=!0)},// Detach an event or set of events from an element
remove:function(e,t,n,r,i){var o,s,a,u,l,c,f,p,d,h,g,m=vt.hasData(e)&&vt.get(e);if(m&&(u=m.events)){for(// Once for each type.namespace in types; type may be omitted
t=(t||"").match(dt)||[""],l=t.length;l--;)// Unbind all events (on this namespace, if provided) for the element
if(a=Dt.exec(t[l])||[],d=g=a[1],h=(a[2]||"").split(".").sort(),d){for(f=Z.event.special[d]||{},d=(r?f.delegateType:f.bindType)||d,p=u[d]||[],a=a[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),// Remove matching events
s=o=p.length;o--;)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||a&&!a.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));// Remove generic event handler if we removed something and no more handlers exist
// (avoids potential for endless recursion during removal of special event handlers)
s&&!p.length&&(f.teardown&&f.teardown.call(e,h,m.handle)!==!1||Z.removeEvent(e,d,m.handle),delete u[d])}else for(d in u)Z.event.remove(e,d+t[l],n,r,!0);// Remove the expando if it's no longer used
Z.isEmptyObject(u)&&(delete m.handle,vt.remove(e,"events"))}},trigger:function(t,n,r,i){var o,s,a,u,l,c,f,p=[r||J],d=G.call(t,"type")?t.type:t,h=G.call(t,"namespace")?t.namespace.split("."):[];// Don't do events on text and comment nodes
if(s=a=r=r||J,3!==r.nodeType&&8!==r.nodeType&&!jt.test(d+Z.event.triggered)&&(d.indexOf(".")>=0&&(// Namespaced trigger; create a regexp to match event type in handle()
h=d.split("."),d=h.shift(),h.sort()),l=d.indexOf(":")<0&&"on"+d,// Caller can pass in a jQuery.Event object, Object, or just an event type string
t=t[Z.expando]?t:new Z.Event(d,"object"==typeof t&&t),// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
t.isTrigger=i?2:3,t.namespace=h.join("."),t.namespace_re=t.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,// Clean up the event in case it is being reused
t.result=void 0,t.target||(t.target=r),// Clone any incoming data and prepend the event, creating the handler arg list
n=null==n?[t]:Z.makeArray(n,[t]),// Allow special events to draw outside the lines
f=Z.event.special[d]||{},i||!f.trigger||f.trigger.apply(r,n)!==!1)){// Determine event propagation path in advance, per W3C events spec (#9951)
// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
if(!i&&!f.noBubble&&!Z.isWindow(r)){for(u=f.delegateType||d,jt.test(u+d)||(s=s.parentNode);s;s=s.parentNode)p.push(s),a=s;// Only add window if we got to document (e.g., not plain obj or detached DOM)
a===(r.ownerDocument||J)&&p.push(a.defaultView||a.parentWindow||e)}for(// Fire handlers on the event path
o=0;(s=p[o++])&&!t.isPropagationStopped();)t.type=o>1?u:f.bindType||d,// jQuery handler
c=(vt.get(s,"events")||{})[t.type]&&vt.get(s,"handle"),c&&c.apply(s,n),// Native handler
c=l&&s[l],c&&c.apply&&Z.acceptData(s)&&(t.result=c.apply(s,n),t.result===!1&&t.preventDefault());// If nobody prevented the default action, do it now
// Call a native DOM method on the target with the same name name as the event.
// Don't do default actions on window, that's where global variables be (#6170)
// Don't re-trigger an onFOO event when we call its FOO() method
// Prevent re-triggering of the same event, since we already bubbled it above
return t.type=d,i||t.isDefaultPrevented()||f._default&&f._default.apply(p.pop(),n)!==!1||!Z.acceptData(r)||l&&Z.isFunction(r[d])&&!Z.isWindow(r)&&(a=r[l],a&&(r[l]=null),Z.event.triggered=d,r[d](),Z.event.triggered=void 0,a&&(r[l]=a)),t.result}},dispatch:function(e){// Make a writable jQuery.Event from the native event object
e=Z.event.fix(e);var t,n,r,i,o,s=[],a=_.call(arguments),u=(vt.get(this,"events")||{})[e.type]||[],l=Z.event.special[e.type]||{};// Call the preDispatch hook for the mapped type, and let it bail if desired
if(// Use the fix-ed jQuery.Event rather than the (read-only) native event
a[0]=e,e.delegateTarget=this,!l.preDispatch||l.preDispatch.call(this,e)!==!1){for(// Determine handlers
s=Z.event.handlers.call(this,e,u),// Run delegates first; they may want to stop propagation beneath us
t=0;(i=s[t++])&&!e.isPropagationStopped();)for(e.currentTarget=i.elem,n=0;(o=i.handlers[n++])&&!e.isImmediatePropagationStopped();)// Triggered event must either 1) have no namespace, or
// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
(!e.namespace_re||e.namespace_re.test(o.namespace))&&(e.handleObj=o,e.data=o.data,r=((Z.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a),void 0!==r&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()));// Call the postDispatch hook for the mapped type
return l.postDispatch&&l.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,o,s=[],a=t.delegateCount,u=e.target;// Find delegate handlers
// Black-hole SVG <use> instance trees (#13180)
// Avoid non-left-click bubbling in Firefox (#3861)
if(a&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!==this;u=u.parentNode||this)// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
if(u.disabled!==!0||"click"!==e.type){for(r=[],n=0;a>n;n++)o=t[n],// Don't conflict with Object.prototype properties (#13203)
i=o.selector+" ",void 0===r[i]&&(r[i]=o.needsContext?Z(i,this).index(u)>=0:Z.find(i,this,null,[u]).length),r[i]&&r.push(o);r.length&&s.push({elem:u,handlers:r})}// Add the remaining (directly-bound) handlers
return a<t.length&&s.push({elem:this,handlers:t.slice(a)}),s},// Includes some event props shared by KeyEvent and MouseEvent
props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){// Add which for key events
return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,o=t.button;// Calculate pageX/Y if missing and clientX/Y available
// Add which for click: 1 === left; 2 === middle; 3 === right
// Note: button is not normalized, so don't use it
return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||J,r=n.documentElement,i=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),e.which||void 0===o||(e.which=1&o?1:2&o?3:4&o?2:0),e}},fix:function(e){if(e[Z.expando])return e;// Create a writable copy of the event object and normalize some properties
var t,n,r,i=e.type,o=e,s=this.fixHooks[i];for(s||(this.fixHooks[i]=s=St.test(i)?this.mouseHooks:Et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new Z.Event(o),t=r.length;t--;)n=r[t],e[n]=o[n];// Support: Cordova 2.5 (WebKit) (#13255)
// All events should have a target; Cordova deviceready doesn't
// Support: Safari 6.0+, Chrome < 28
// Target should not be a text node (#504, #13143)
return e.target||(e.target=J),3===e.target.nodeType&&(e.target=e.target.parentNode),s.filter?s.filter(e,o):e},special:{load:{// Prevent triggered image.load events from bubbling to window.load
noBubble:!0},focus:{// Fire native event if possible so blur/focus sequence is correct
trigger:function(){return this!==f()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===f()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{// For checkbox, fire native event so checked state will be right
trigger:function(){return"checkbox"===this.type&&this.click&&Z.nodeName(this,"input")?(this.click(),!1):void 0},// For cross-browser consistency, don't fire native .click() on links
_default:function(e){return Z.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){// Support: Firefox 20+
// Firefox doesn't alert if the returnValue field is not set.
void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){// Piggyback on a donor event to simulate a different one.
// Fake originalEvent to avoid donor's stopPropagation, but if the
// simulated event prevents default then we do the same on the donor.
var i=Z.extend(new Z.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?Z.event.trigger(i,null,t):Z.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},Z.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},Z.Event=function(e,t){// Allow instantiation without the 'new' keyword
// Allow instantiation without the 'new' keyword
// Event object
// Events bubbling up the document may have been marked as prevented
// by a handler lower down the tree; reflect the correct value.
// Support: Android < 4.0
// Put explicitly provided properties onto the event object
// Create a timestamp if incoming event doesn't have one
// Mark it as fixed
return this instanceof Z.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&e.returnValue===!1?l:c):this.type=e,t&&Z.extend(this,t),this.timeStamp=e&&e.timeStamp||Z.now(),void(this[Z.expando]=!0)):new Z.Event(e,t)},// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
Z.Event.prototype={isDefaultPrevented:c,isPropagationStopped:c,isImmediatePropagationStopped:c,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=l,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=l,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=l,e&&e.stopImmediatePropagation&&e.stopImmediatePropagation(),this.stopPropagation()}},// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
Z.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){Z.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;// For mousenter/leave call the handler if related is outside the target.
// NB: No relatedTarget if the mouse left/entered the browser window
return(!i||i!==r&&!Z.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
Q.focusinBubbles||Z.each({focus:"focusin",blur:"focusout"},function(e,t){// Attach a single capturing handler on the document while someone wants focusin/focusout
var n=function(e){Z.event.simulate(t,e.target,Z.event.fix(e),!0)};Z.event.special[t]={setup:function(){var r=this.ownerDocument||this,i=vt.access(r,t);i||r.addEventListener(e,n,!0),vt.access(r,t,(i||0)+1)},teardown:function(){var r=this.ownerDocument||this,i=vt.access(r,t)-1;i?vt.access(r,t,i):(r.removeEventListener(e,n,!0),vt.remove(r,t))}}}),Z.fn.extend({on:function(e,t,n,r,/*INTERNAL*/i){var o,s;// Types can be a map of types/handlers
if("object"==typeof e){// ( types-Object, selector, data )
"string"!=typeof t&&(// ( types-Object, data )
n=n||t,t=void 0);for(s in e)this.on(s,t,n,e[s],i);return this}if(null==n&&null==r?(// ( types, fn )
r=t,n=t=void 0):null==r&&("string"==typeof t?(// ( types, selector, fn )
r=n,n=void 0):(// ( types, data, fn )
r=n,n=t,t=void 0)),r===!1)r=c;else if(!r)return this;// Use same guid so caller can remove using origFn
return 1===i&&(o=r,r=function(e){// Can use an empty set, since event contains the info
return Z().off(e),o.apply(this,arguments)},r.guid=o.guid||(o.guid=Z.guid++)),this.each(function(){Z.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)// ( event )  dispatched jQuery.Event
return r=e.handleObj,Z(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){// ( types-object [, selector] )
for(i in e)this.off(i,t,e[i]);return this}// ( types [, fn] )
return(t===!1||"function"==typeof t)&&(n=t,t=void 0),n===!1&&(n=c),this.each(function(){Z.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){Z.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?Z.event.trigger(e,t,n,!0):void 0}});var At=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Lt=/<([\w:]+)/,qt=/<|&#?\w+;/,Ht=/<(?:script|style|link)/i,// checked="checked" or checked
Ot=/checked\s*(?:[^=]|=\s*.checked.)/i,Ft=/^$|\/(?:java|ecma)script/i,Pt=/^true\/(.*)/,Mt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,// We have to close these tags to support XHTML (#13200)
Rt={// Support: IE 9
option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};// Support: IE 9
Rt.optgroup=Rt.option,Rt.tbody=Rt.tfoot=Rt.colgroup=Rt.caption=Rt.thead,Rt.th=Rt.td,Z.extend({clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),u=Z.contains(e.ownerDocument,e);// Support: IE >= 9
// Fix Cloning issues
if(!(Q.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||Z.isXMLDoc(e)))for(// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
s=v(a),o=v(e),r=0,i=o.length;i>r;r++)y(o[r],s[r]);// Copy the events from the original to the clone
if(t)if(n)for(o=o||v(e),s=s||v(a),r=0,i=o.length;i>r;r++)m(o[r],s[r]);else m(e,a);// Return the cloned set
// Preserve script evaluation history
return s=v(a,"script"),s.length>0&&g(s,!u&&v(e,"script")),a},buildFragment:function(e,t,n,r){for(var i,o,s,a,u,l,c=t.createDocumentFragment(),f=[],p=0,d=e.length;d>p;p++)if(i=e[p],i||0===i)// Add nodes directly
if("object"===Z.type(i))// Support: QtWebKit
// jQuery.merge because push.apply(_, arraylike) throws
Z.merge(f,i.nodeType?[i]:i);else if(qt.test(i)){for(o=o||c.appendChild(t.createElement("div")),// Deserialize a standard representation
s=(Lt.exec(i)||["",""])[1].toLowerCase(),a=Rt[s]||Rt._default,o.innerHTML=a[1]+i.replace(At,"<$1></$2>")+a[2],// Descend through wrappers to the right content
l=a[0];l--;)o=o.lastChild;// Support: QtWebKit
// jQuery.merge because push.apply(_, arraylike) throws
Z.merge(f,o.childNodes),// Remember the top-level container
o=c.firstChild,// Fixes #12346
// Support: Webkit, IE
o.textContent=""}else f.push(t.createTextNode(i));for(// Remove wrapper from fragment
c.textContent="",p=0;i=f[p++];)// #4087 - If origin and destination elements are the same, and this is
// that element, do not do anything
if((!r||-1===Z.inArray(i,r))&&(u=Z.contains(i.ownerDocument,i),// Append to fragment
o=v(c.appendChild(i),"script"),// Preserve script evaluation history
u&&g(o),n))for(l=0;i=o[l++];)Ft.test(i.type||"")&&n.push(i);return c},cleanData:function(e){for(var t,n,r,i,o=Z.event.special,s=0;void 0!==(n=e[s]);s++){if(Z.acceptData(n)&&(i=n[vt.expando],i&&(t=vt.cache[i]))){if(t.events)for(r in t.events)o[r]?Z.event.remove(n,r):Z.removeEvent(n,r,t.handle);vt.cache[i]&&// Discard any remaining `private` data
delete vt.cache[i]}// Discard any remaining `user` data
delete yt.cache[n[yt.expando]]}}}),Z.fn.extend({text:function(e){return mt(this,function(e){return void 0===e?Z.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=e)})},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=p(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=p(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){for(var n,r=e?Z.filter(e,this):this,i=0;null!=(n=r[i]);i++)t||1!==n.nodeType||Z.cleanData(v(n)),n.parentNode&&(t&&Z.contains(n.ownerDocument,n)&&g(v(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(// Prevent memory leaks
Z.cleanData(v(e,!1)),// Remove any remaining nodes
e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return Z.clone(this,e,t)})},html:function(e){return mt(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;// See if we can take a shortcut and just use innerHTML
if("string"==typeof e&&!Ht.test(e)&&!Rt[(Lt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(At,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},// Remove element nodes and prevent memory leaks
1===t.nodeType&&(Z.cleanData(v(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=arguments[0];// Force removal if there was no new content (e.g., from empty arguments)
// Make the changes, replacing each context element with the new content
return this.domManip(arguments,function(t){e=this.parentNode,Z.cleanData(v(this)),e&&e.replaceChild(t,this)}),e&&(e.length||e.nodeType)?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t){// Flatten any nested arrays
e=z.apply([],e);var n,r,i,o,s,a,u=0,l=this.length,c=this,f=l-1,p=e[0],g=Z.isFunction(p);// We can't cloneNode fragments that contain checked, in WebKit
if(g||l>1&&"string"==typeof p&&!Q.checkClone&&Ot.test(p))return this.each(function(n){var r=c.eq(n);g&&(e[0]=p.call(this,n,r.html())),r.domManip(e,t)});if(l&&(n=Z.buildFragment(e,this[0].ownerDocument,!1,this),r=n.firstChild,1===n.childNodes.length&&(n=r),r)){// Use the original fragment for the last item instead of the first because it can end up
// being emptied incorrectly in certain situations (#8070).
for(i=Z.map(v(n,"script"),d),o=i.length;l>u;u++)s=n,u!==f&&(s=Z.clone(s,!0,!0),// Keep references to cloned scripts for later restoration
o&&// Support: QtWebKit
// jQuery.merge because push.apply(_, arraylike) throws
Z.merge(i,v(s,"script"))),t.call(this[u],s,u);if(o)// Evaluate executable scripts on first document insertion
for(a=i[i.length-1].ownerDocument,// Reenable scripts
Z.map(i,h),u=0;o>u;u++)s=i[u],Ft.test(s.type||"")&&!vt.access(s,"globalEval")&&Z.contains(a,s)&&(s.src?// Optional AJAX dependency, but won't run scripts if not present
Z._evalUrl&&Z._evalUrl(s.src):Z.globalEval(s.textContent.replace(Mt,"")))}return this}}),Z.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){Z.fn[e]=function(e){for(var n,r=[],i=Z(e),o=i.length-1,s=0;o>=s;s++)n=s===o?this:this.clone(!0),Z(i[s])[t](n),// Support: QtWebKit
// .get() because push.apply(_, arraylike) throws
X.apply(r,n.get());return this.pushStack(r)}});var Wt,$t={},Bt=/^margin/,It=new RegExp("^("+wt+")(?!px)[a-z%]+$","i"),_t=function(e){return e.ownerDocument.defaultView.getComputedStyle(e,null)};!function(){// Executing both pixelPosition & boxSizingReliable tests require only one layout
// so they're executed at the same time to save the second computation.
function t(){s.style.cssText=// Support: Firefox<29, Android 2.3
// Vendor-prefix box-sizing
"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",s.innerHTML="",i.appendChild(o);var t=e.getComputedStyle(s,null);n="1%"!==t.top,r="4px"===t.width,i.removeChild(o)}var n,r,i=J.documentElement,o=J.createElement("div"),s=J.createElement("div");s.style&&(s.style.backgroundClip="content-box",s.cloneNode(!0).style.backgroundClip="",Q.clearCloneStyle="content-box"===s.style.backgroundClip,o.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",o.appendChild(s),// Support: node.js jsdom
// Don't assume that getComputedStyle is a property of the global object
e.getComputedStyle&&Z.extend(Q,{pixelPosition:function(){// This test is executed only once but we still do memoizing
// since we can use the boxSizingReliable pre-computing.
// No need to check if the test was already performed, though.
return t(),n},boxSizingReliable:function(){return null==r&&t(),r},reliableMarginRight:function(){// Support: Android 2.3
// Check if div with explicit width and no margin-right incorrectly
// gets computed margin-right based on width of container. (#3333)
// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
// This support function is only executed once so no memoizing is needed.
var t,n=s.appendChild(J.createElement("div"));// Reset CSS: box-sizing; display; margin; border; padding
// Support: Firefox<29, Android 2.3
// Vendor-prefix box-sizing
return n.style.cssText=s.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",n.style.marginRight=n.style.width="0",s.style.width="1px",i.appendChild(o),t=!parseFloat(e.getComputedStyle(n,null).marginRight),i.removeChild(o),t}}))}(),// A method for quickly swapping in/out CSS properties to get correct calculations.
Z.swap=function(e,t,n,r){var i,o,s={};// Remember the old values, and insert the new ones
for(o in t)s[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);// Revert the old values
for(o in t)e.style[o]=s[o];return i};var// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
zt=/^(none|table(?!-c[ea]).+)/,Xt=new RegExp("^("+wt+")(.*)$","i"),Ut=new RegExp("^([+-])=("+wt+")","i"),Vt={position:"absolute",visibility:"hidden",display:"block"},Yt={letterSpacing:"0",fontWeight:"400"},Gt=["Webkit","O","Moz","ms"];Z.extend({// Add in style property hooks for overriding the default
// behavior of getting and setting a style property
cssHooks:{opacity:{get:function(e,t){if(t){// We should always get a number back from opacity
var n=w(e,"opacity");return""===n?"1":n}}}},// Don't automatically add "px" to these possibly-unitless properties
cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},// Add in properties whose names you wish to fix before
// setting or getting the value
cssProps:{// normalize float css property
"float":"cssFloat"},// Get and set the style property on a DOM Node
style:function(e,t,n,r){// Don't set styles on text and comment nodes
if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){// Make sure that we're working with the right name
var i,o,s,a=Z.camelCase(t),u=e.style;// Check if we're setting a value
// gets hook for the prefixed version
// followed by the unprefixed version
// Check if we're setting a value
// If a hook was provided get the non-computed value from there
// convert relative number strings (+= or -=) to relative numbers. #7345
// Fixes bug #9237
// Make sure that null and NaN values aren't set. See: #7116
// If a number was passed in, add 'px' to the (except for certain CSS properties)
// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
// but it would mean to define eight (for every problematic property) identical functions
// If a hook was provided, use that value, otherwise just set the specified value
return t=Z.cssProps[a]||(Z.cssProps[a]=C(u,a)),s=Z.cssHooks[t]||Z.cssHooks[a],void 0===n?s&&"get"in s&&void 0!==(i=s.get(e,!1,r))?i:u[t]:(o=typeof n,"string"===o&&(i=Ut.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(Z.css(e,t)),o="number"),null!=n&&n===n&&("number"!==o||Z.cssNumber[a]||(n+="px"),Q.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),s&&"set"in s&&void 0===(n=s.set(e,n,r))||(u[t]=n)),void 0)}},css:function(e,t,n,r){var i,o,s,a=Z.camelCase(t);// Return, converting to number if forced or a qualifier was provided and val looks numeric
// Make sure that we're working with the right name
// gets hook for the prefixed version
// followed by the unprefixed version
// If a hook was provided get the computed value from there
// Otherwise, if a way to get the computed value exists, use that
//convert "normal" to computed value
// Return, converting to number if forced or a qualifier was provided and val looks numeric
return t=Z.cssProps[a]||(Z.cssProps[a]=C(e.style,a)),s=Z.cssHooks[t]||Z.cssHooks[a],s&&"get"in s&&(i=s.get(e,!0,n)),void 0===i&&(i=w(e,t,r)),"normal"===i&&t in Yt&&(i=Yt[t]),""===n||n?(o=parseFloat(i),n===!0||Z.isNumeric(o)?o||0:i):i}}),Z.each(["height","width"],function(e,t){Z.cssHooks[t]={get:function(e,n,r){return n?zt.test(Z.css(e,"display"))&&0===e.offsetWidth?Z.swap(e,Vt,function(){return E(e,t,r)}):E(e,t,r):void 0},set:function(e,n,r){var i=r&&_t(e);return N(e,n,r?k(e,t,r,"border-box"===Z.css(e,"boxSizing",!1,i),i):0)}}}),// Support: Android 2.3
Z.cssHooks.marginRight=T(Q.reliableMarginRight,function(e,t){return t?Z.swap(e,{display:"inline-block"},w,[e,"marginRight"]):void 0}),// These hooks are used by animate to expand properties
Z.each({margin:"",padding:"",border:"Width"},function(e,t){Z.cssHooks[e+t]={expand:function(n){for(var r=0,i={},// assumes a single number if not a string
o="string"==typeof n?n.split(" "):[n];4>r;r++)i[e+Tt[r]+t]=o[r]||o[r-2]||o[0];return i}},Bt.test(e)||(Z.cssHooks[e+t].set=N)}),Z.fn.extend({css:function(e,t){return mt(this,function(e,t,n){var r,i,o={},s=0;if(Z.isArray(t)){for(r=_t(e),i=t.length;i>s;s++)o[t[s]]=Z.css(e,t[s],!1,r);return o}return void 0!==n?Z.style(e,t,n):Z.css(e,t)},e,t,arguments.length>1)},show:function(){return S(this,!0)},hide:function(){return S(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){Ct(this)?Z(this).show():Z(this).hide()})}}),Z.Tween=j,j.prototype={constructor:j,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(Z.cssNumber[n]?"":"px")},cur:function(){var e=j.propHooks[this.prop];return e&&e.get?e.get(this):j.propHooks._default.get(this)},run:function(e){var t,n=j.propHooks[this.prop];return this.pos=t=this.options.duration?Z.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):j.propHooks._default.set(this),this}},j.prototype.init.prototype=j.prototype,j.propHooks={_default:{get:function(e){var t;// passing an empty string as a 3rd parameter to .css will automatically
// attempt a parseFloat and fallback to a string if the parse fails
// so, simple values such as "10px" are parsed to Float.
// complex values such as "rotate(1rad)" are returned as is.
return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=Z.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){// use step hook for back compat - use cssHook if its there - use .style if its
// available and use plain properties where available
Z.fx.step[e.prop]?Z.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[Z.cssProps[e.prop]]||Z.cssHooks[e.prop])?Z.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},// Support: IE9
// Panic based approach to setting things on disconnected nodes
j.propHooks.scrollTop=j.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},Z.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},Z.fx=j.prototype.init,// Back Compat <1.8 extension point
Z.fx.step={};var Qt,Jt,Kt=/^(?:toggle|show|hide)$/,Zt=new RegExp("^(?:([+-])=|)("+wt+")([a-z%]*)$","i"),en=/queueHooks$/,tn=[q],nn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Zt.exec(t),o=i&&i[3]||(Z.cssNumber[e]?"":"px"),// Starting value computation is required for potential unit mismatches
s=(Z.cssNumber[e]||"px"!==o&&+r)&&Zt.exec(Z.css(n.elem,e)),a=1,u=20;if(s&&s[3]!==o){// Trust units reported by jQuery.css
o=o||s[3],// Make sure we update the tween properties later on
i=i||[],// Iteratively approximate from a nonzero starting point
s=+r||1;do// If previous iteration zeroed out, double until we get *something*
// Use a string for doubling factor so we don't accidentally see scale as unchanged below
a=a||".5",// Adjust and apply
s/=a,Z.style(n.elem,e,s+o);while(a!==(a=n.cur()/r)&&1!==a&&--u)}// Update tween properties
// If a +=/-= token was provided, we're doing a relative animation
return i&&(s=n.start=+s||+r||0,n.unit=o,n.end=i[1]?s+(i[1]+1)*i[2]:+i[2]),n}]};Z.Animation=Z.extend(O,{tweener:function(e,t){Z.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");for(var n,r=0,i=e.length;i>r;r++)n=e[r],nn[n]=nn[n]||[],nn[n].unshift(t)},prefilter:function(e,t){t?tn.unshift(e):tn.push(e)}}),Z.speed=function(e,t,n){var r=e&&"object"==typeof e?Z.extend({},e):{complete:n||!n&&t||Z.isFunction(e)&&e,duration:e,easing:n&&t||t&&!Z.isFunction(t)&&t};// normalize opt.queue - true/undefined/null -> "fx"
// Queueing
return r.duration=Z.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in Z.fx.speeds?Z.fx.speeds[r.duration]:Z.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){Z.isFunction(r.old)&&r.old.call(this),r.queue&&Z.dequeue(this,r.queue)},r},Z.fn.extend({fadeTo:function(e,t,n,r){// show any hidden elements after setting opacity to 0
return this.filter(Ct).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=Z.isEmptyObject(e),o=Z.speed(t,n,r),s=function(){// Operate on a copy of prop so per-property easing won't be lost
var t=O(this,Z.extend({},e),o);// Empty animations, or finishing resolves immediately
(i||vt.get(this,"finish"))&&t.stop(!0)};return s.finish=s,i||o.queue===!1?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=Z.timers,s=vt.get(this);if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&en.test(i)&&r(s[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));// start the next in the queue if the last step wasn't forced
// timers currently will call their complete callbacks, which will dequeue
// but only if they were gotoEnd
(t||!n)&&Z.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=vt.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=Z.timers,s=r?r.length:0;// look for any active animations, and finish them
for(// enable finishing flag on private data
n.finish=!0,// empty the queue first
Z.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));// look for any animations in the old queue and finish them
for(t=0;s>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);// turn off finishing flag
delete n.finish})}}),Z.each(["toggle","show","hide"],function(e,t){var n=Z.fn[t];Z.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(A(t,!0),e,r,i)}}),// Generate shortcuts for custom animations
Z.each({slideDown:A("show"),slideUp:A("hide"),slideToggle:A("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){Z.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),Z.timers=[],Z.fx.tick=function(){var e,t=0,n=Z.timers;for(Qt=Z.now();t<n.length;t++)e=n[t],// Checks the timer has not already been removed
e()||n[t]!==e||n.splice(t--,1);n.length||Z.fx.stop(),Qt=void 0},Z.fx.timer=function(e){Z.timers.push(e),e()?Z.fx.start():Z.timers.pop()},Z.fx.interval=13,Z.fx.start=function(){Jt||(Jt=setInterval(Z.fx.tick,Z.fx.interval))},Z.fx.stop=function(){clearInterval(Jt),Jt=null},Z.fx.speeds={slow:600,fast:200,// Default speed
_default:400},// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
Z.fn.delay=function(e,t){return e=Z.fx?Z.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},function(){var e=J.createElement("input"),t=J.createElement("select"),n=t.appendChild(J.createElement("option"));e.type="checkbox",// Support: iOS 5.1, Android 4.x, Android 2.3
// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
Q.checkOn=""!==e.value,// Must access the parent to make an option select properly
// Support: IE9, IE10
Q.optSelected=n.selected,// Make sure that the options inside disabled selects aren't marked as disabled
// (WebKit marks them as disabled)
t.disabled=!0,Q.optDisabled=!n.disabled,// Check if an input maintains its value after becoming a radio
// Support: IE9, IE10
e=J.createElement("input"),e.value="t",e.type="radio",Q.radioValue="t"===e.value}();var rn,on,sn=Z.expr.attrHandle;Z.fn.extend({attr:function(e,t){return mt(this,Z.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){Z.removeAttr(this,e)})}}),Z.extend({attr:function(e,t,n){var r,i,o=e.nodeType;// don't get/set attributes on text, comment and attribute nodes
if(e&&3!==o&&8!==o&&2!==o)// Fallback to prop when attributes are not supported
// Fallback to prop when attributes are not supported
// All attributes are lowercase
// Grab necessary hook if one is defined
return typeof e.getAttribute===kt?Z.prop(e,t,n):(1===o&&Z.isXMLDoc(e)||(t=t.toLowerCase(),r=Z.attrHooks[t]||(Z.expr.match.bool.test(t)?on:rn)),void 0===n?r&&"get"in r&&null!==(i=r.get(e,t))?i:(i=Z.find.attr(e,t),null==i?void 0:i):null!==n?r&&"set"in r&&void 0!==(i=r.set(e,n,t))?i:(e.setAttribute(t,n+""),n):void Z.removeAttr(e,t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(dt);if(o&&1===e.nodeType)for(;n=o[i++];)r=Z.propFix[n]||n,// Boolean attributes get special treatment (#10870)
Z.expr.match.bool.test(n)&&(// Set corresponding property to false
e[r]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!Q.radioValue&&"radio"===t&&Z.nodeName(e,"input")){// Setting the type on a radio button after the value resets the value in IE6-9
// Reset value to default in case type is set after value during creation
var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}}}),// Hooks for boolean attributes
on={set:function(e,t,n){// Remove boolean attributes when set to false
return t===!1?Z.removeAttr(e,n):e.setAttribute(n,n),n}},Z.each(Z.expr.match.bool.source.match(/\w+/g),function(e,t){var n=sn[t]||Z.find.attr;sn[t]=function(e,t,r){var i,o;// Avoid an infinite loop by temporarily removing this function from the getter
return r||(o=sn[t],sn[t]=i,i=null!=n(e,t,r)?t.toLowerCase():null,sn[t]=o),i}});var an=/^(?:input|select|textarea|button)$/i;Z.fn.extend({prop:function(e,t){return mt(this,Z.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[Z.propFix[e]||e]})}}),Z.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,i,o,s=e.nodeType;// don't get/set properties on text, comment and attribute nodes
if(e&&3!==s&&8!==s&&2!==s)// Fix name and attach hooks
return o=1!==s||!Z.isXMLDoc(e),o&&(t=Z.propFix[t]||t,i=Z.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||an.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
Q.optSelected||(Z.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),Z.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){Z.propFix[this.toLowerCase()]=this});var un=/[\t\r\n\f]/g;Z.fn.extend({addClass:function(e){var t,n,r,i,o,s,a="string"==typeof e&&e,u=0,l=this.length;if(Z.isFunction(e))return this.each(function(t){Z(this).addClass(e.call(this,t,this.className))});if(a)for(// The disjunction here is for better compressibility (see removeClass)
t=(e||"").match(dt)||[];l>u;u++)if(n=this[u],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(un," "):" ")){for(o=0;i=t[o++];)r.indexOf(" "+i+" ")<0&&(r+=i+" ");// only assign if different to avoid unneeded rendering.
s=Z.trim(r),n.className!==s&&(n.className=s)}return this},removeClass:function(e){var t,n,r,i,o,s,a=0===arguments.length||"string"==typeof e&&e,u=0,l=this.length;if(Z.isFunction(e))return this.each(function(t){Z(this).removeClass(e.call(this,t,this.className))});if(a)for(t=(e||"").match(dt)||[];l>u;u++)if(n=this[u],// This expression is here for better compressibility (see addClass)
r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(un," "):"")){for(o=0;i=t[o++];)// Remove *all* instances
for(;r.indexOf(" "+i+" ")>=0;)r=r.replace(" "+i+" "," ");// only assign if different to avoid unneeded rendering.
s=e?Z.trim(r):"",n.className!==s&&(n.className=s)}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):this.each(Z.isFunction(e)?function(n){Z(this).toggleClass(e.call(this,n,this.className,t),t)}:function(){if("string"===n)for(// toggle individual class names
var t,r=0,i=Z(this),o=e.match(dt)||[];t=o[r++];)// check each className given, space separated list
i.hasClass(t)?i.removeClass(t):i.addClass(t);else(n===kt||"boolean"===n)&&(this.className&&// store className if set
vt.set(this,"__className__",this.className),// If the element has a class name or if we're passed "false",
// then remove the whole classname (if there was one, the above saved it).
// Otherwise bring back whatever was previously saved (if anything),
// falling back to the empty string if nothing was stored.
this.className=this.className||e===!1?"":vt.get(this,"__className__")||"")})},hasClass:function(e){for(var t=" "+e+" ",n=0,r=this.length;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(un," ").indexOf(t)>=0)return!0;return!1}});var ln=/\r/g;Z.fn.extend({val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=Z.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,Z(this).val()):e,// Treat null/undefined as ""; convert numbers to string
null==i?i="":"number"==typeof i?i+="":Z.isArray(i)&&(i=Z.map(i,function(e){return null==e?"":e+""})),t=Z.valHooks[this.type]||Z.valHooks[this.nodeName.toLowerCase()],// If set returns undefined, fall back to normal setting
t&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))});if(i)// handle most common string cases
// handle cases where value is null/undef or number
return t=Z.valHooks[i.type]||Z.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:(n=i.value,"string"==typeof n?n.replace(ln,""):null==n?"":n)}}}),Z.extend({valHooks:{option:{get:function(e){var t=Z.find.attr(e,"value");// Support: IE10-11+
// option.text throws exceptions (#14686, #14858)
return null!=t?t:Z.trim(Z.text(e))}},select:{get:function(e){// Loop through all the selected options
for(var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,s=o?null:[],a=o?i+1:r.length,u=0>i?a:o?i:0;a>u;u++)// IE6-9 doesn't update selected after form reset (#2551)
if(n=r[u],!(!n.selected&&u!==i||(// Don't return options that are disabled or in a disabled optgroup
Q.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&Z.nodeName(n.parentNode,"optgroup"))){// We don't need an array for one selects
if(// Get the specific value for the option
t=Z(n).val(),o)return t;// Multi-Selects return an array
s.push(t)}return s},set:function(e,t){for(var n,r,i=e.options,o=Z.makeArray(t),s=i.length;s--;)r=i[s],(r.selected=Z.inArray(r.value,o)>=0)&&(n=!0);// force browsers to behave consistently when non-matching value is set
return n||(e.selectedIndex=-1),o}}}}),// Radios and checkboxes getter/setter
Z.each(["radio","checkbox"],function(){Z.valHooks[this]={set:function(e,t){return Z.isArray(t)?e.checked=Z.inArray(Z(e).val(),t)>=0:void 0}},Q.checkOn||(Z.valHooks[this].get=function(e){// Support: Webkit
// "" is returned instead of "on" if a value isn't specified
return null===e.getAttribute("value")?"on":e.value})}),// Return jQuery for attributes-only inclusion
Z.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){// Handle event binding
Z.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),Z.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){// ( namespace ) or ( selector, types [, fn] )
return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var cn=Z.now(),fn=/\?/;// Support: Android 2.3
// Workaround failure to string-cast null input
Z.parseJSON=function(e){return JSON.parse(e+"")},// Cross-browser xml parsing
Z.parseXML=function(e){var t,n;if(!e||"string"!=typeof e)return null;// Support: IE9
try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(r){t=void 0}return(!t||t.getElementsByTagName("parsererror").length)&&Z.error("Invalid XML: "+e),t};var// Document location
pn,dn,hn=/#.*$/,gn=/([?&])_=[^&]*/,mn=/^(.*?):[ \t]*([^\r\n]*)$/gm,// #7653, #8125, #8152: local protocol detection
vn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,yn=/^(?:GET|HEAD)$/,xn=/^\/\//,bn=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
wn={},/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
Tn={},// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
Cn="*/".concat("*");// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try{dn=location.href}catch(Nn){// Use the href attribute of an A element
// since IE will modify it given document.location
dn=J.createElement("a"),dn.href="",dn=dn.href}// Segment location into parts
pn=bn.exec(dn.toLowerCase())||[],Z.extend({// Counter for holding the number of active queries
active:0,// Last-Modified header cache for next request
lastModified:{},etag:{},ajaxSettings:{url:dn,type:"GET",isLocal:vn.test(pn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/
accepts:{"*":Cn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},// Data converters
// Keys separate source (or catchall "*") and destination types with a single space
converters:{// Convert anything to text
"* text":String,// Text to html (true = no transformation)
"text html":!0,// Evaluate text as a json expression
"text json":Z.parseJSON,// Parse text as xml
"text xml":Z.parseXML},// For options that shouldn't be deep extended:
// you can add your own custom options here if
// and when you create one that shouldn't be
// deep extended (see ajaxExtend)
flatOptions:{url:!0,context:!0}},// Creates a full fledged settings object into target
// with both ajaxSettings and settings fields.
// If target is omitted, writes into ajaxSettings.
ajaxSetup:function(e,t){// Building a settings object
// Extending ajaxSettings
return t?M(M(e,Z.ajaxSettings),t):M(Z.ajaxSettings,e)},ajaxPrefilter:F(wn),ajaxTransport:F(Tn),// Main method
ajax:function(e,t){// Callback for when everything is done
function n(e,t,n,s){var u,c,v,y,b,T=t;// Called once
2!==x&&(// State is "done" now
x=2,// Clear timeout if it exists
a&&clearTimeout(a),// Dereference transport for early garbage collection
// (no matter how long the jqXHR object will be used)
r=void 0,// Cache response headers
o=s||"",// Set readyState
w.readyState=e>0?4:0,// Determine if successful
u=e>=200&&300>e||304===e,// Get response data
n&&(y=R(f,w,n)),// Convert no matter what (that way responseXXX fields are always set)
y=W(f,y,w,u),// If successful, handle type chaining
u?(// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
f.ifModified&&(b=w.getResponseHeader("Last-Modified"),b&&(Z.lastModified[i]=b),b=w.getResponseHeader("etag"),b&&(Z.etag[i]=b)),// if no content
204===e||"HEAD"===f.type?T="nocontent":304===e?T="notmodified":(T=y.state,c=y.data,v=y.error,u=!v)):(// We extract error from statusText
// then normalize statusText and status for non-aborts
v=T,(e||!T)&&(T="error",0>e&&(e=0))),// Set data for the fake xhr object
w.status=e,w.statusText=(t||T)+"",// Success/Error
u?h.resolveWith(p,[c,T,w]):h.rejectWith(p,[w,T,v]),// Status-dependent callbacks
w.statusCode(m),m=void 0,l&&d.trigger(u?"ajaxSuccess":"ajaxError",[w,f,u?c:v]),// Complete
g.fireWith(p,[w,T]),l&&(d.trigger("ajaxComplete",[w,f]),// Handle the global AJAX counter
--Z.active||Z.event.trigger("ajaxStop")))}// If url is an object, simulate pre-1.5 signature
"object"==typeof e&&(t=e,e=void 0),// Force options to be an object
t=t||{};var r,// URL without anti-cache param
i,// Response headers
o,s,// timeout handle
a,// Cross-domain detection vars
u,// To know if global events are to be dispatched
l,// Loop variable
c,// Create the final options object
f=Z.ajaxSetup({},t),// Callbacks context
p=f.context||f,// Context for global events is callbackContext if it is a DOM node or jQuery collection
d=f.context&&(p.nodeType||p.jquery)?Z(p):Z.event,// Deferreds
h=Z.Deferred(),g=Z.Callbacks("once memory"),// Status-dependent callbacks
m=f.statusCode||{},// Headers (they are sent all at once)
v={},y={},// The jqXHR state
x=0,// Default abort message
b="canceled",// Fake xhr
w={readyState:0,// Builds headers hashtable if needed
getResponseHeader:function(e){var t;if(2===x){if(!s)for(s={};t=mn.exec(o);)s[t[1].toLowerCase()]=t[2];t=s[e.toLowerCase()]}return null==t?null:t},// Raw string
getAllResponseHeaders:function(){return 2===x?o:null},// Caches the header
setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=y[n]=y[n]||e,v[e]=t),this},// Overrides response content-type header
overrideMimeType:function(e){return x||(f.mimeType=e),this},// Status-dependent callbacks
statusCode:function(e){var t;if(e)if(2>x)for(t in e)// Lazy-add the new callback in a way that preserves old ones
m[t]=[m[t],e[t]];else// Execute the appropriate callbacks
w.always(e[w.status]);return this},// Cancel the request
abort:function(e){var t=e||b;return r&&r.abort(t),n(0,t),this}};// If request was aborted inside a prefilter, stop there
if(// Attach deferreds
h.promise(w).complete=g.add,w.success=w.done,w.error=w.fail,// Remove hash character (#7531: and string promotion)
// Add protocol if not provided (prefilters might expect it)
// Handle falsy url in the settings object (#10093: consistency with old signature)
// We also use the url parameter if available
f.url=((e||f.url||dn)+"").replace(hn,"").replace(xn,pn[1]+"//"),// Alias method option to type as per ticket #12004
f.type=t.method||t.type||f.method||f.type,// Extract dataTypes list
f.dataTypes=Z.trim(f.dataType||"*").toLowerCase().match(dt)||[""],// A cross-domain request is in order when we have a protocol:host:port mismatch
null==f.crossDomain&&(u=bn.exec(f.url.toLowerCase()),f.crossDomain=!(!u||u[1]===pn[1]&&u[2]===pn[2]&&(u[3]||("http:"===u[1]?"80":"443"))===(pn[3]||("http:"===pn[1]?"80":"443")))),// Convert data if not already a string
f.data&&f.processData&&"string"!=typeof f.data&&(f.data=Z.param(f.data,f.traditional)),// Apply prefilters
P(wn,f,t,w),2===x)return w;// We can fire global events as of now if asked to
l=f.global,// Watch for a new set of requests
l&&0===Z.active++&&Z.event.trigger("ajaxStart"),// Uppercase the type
f.type=f.type.toUpperCase(),// Determine if request has content
f.hasContent=!yn.test(f.type),// Save the URL in case we're toying with the If-Modified-Since
// and/or If-None-Match header later on
i=f.url,// More options handling for requests with no content
f.hasContent||(// If data is available, append data to url
f.data&&(i=f.url+=(fn.test(i)?"&":"?")+f.data,// #9682: remove data so that it's not used in an eventual retry
delete f.data),// Add anti-cache in url if needed
f.cache===!1&&(f.url=gn.test(i)?// If there is already a '_' parameter, set its value
i.replace(gn,"$1_="+cn++):// Otherwise add one to the end
i+(fn.test(i)?"&":"?")+"_="+cn++)),// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
f.ifModified&&(Z.lastModified[i]&&w.setRequestHeader("If-Modified-Since",Z.lastModified[i]),Z.etag[i]&&w.setRequestHeader("If-None-Match",Z.etag[i])),// Set the correct header, if data is being sent
(f.data&&f.hasContent&&f.contentType!==!1||t.contentType)&&w.setRequestHeader("Content-Type",f.contentType),// Set the Accepts header for the server, depending on the dataType
w.setRequestHeader("Accept",f.dataTypes[0]&&f.accepts[f.dataTypes[0]]?f.accepts[f.dataTypes[0]]+("*"!==f.dataTypes[0]?", "+Cn+"; q=0.01":""):f.accepts["*"]);// Check for headers option
for(c in f.headers)w.setRequestHeader(c,f.headers[c]);// Allow custom headers/mimetypes and early abort
if(f.beforeSend&&(f.beforeSend.call(p,w,f)===!1||2===x))// Abort if not done already and return
return w.abort();// aborting is no longer a cancellation
b="abort";// Install callbacks on deferreds
for(c in{success:1,error:1,complete:1})w[c](f[c]);// If no transport, we auto-abort
if(// Get transport
r=P(Tn,f,t,w)){w.readyState=1,// Send global event
l&&d.trigger("ajaxSend",[w,f]),// Timeout
f.async&&f.timeout>0&&(a=setTimeout(function(){w.abort("timeout")},f.timeout));try{x=1,r.send(v,n)}catch(T){// Propagate exception as error if not done
if(!(2>x))throw T;n(-1,T)}}else n(-1,"No Transport");return w},getJSON:function(e,t,n){return Z.get(e,t,n,"json")},getScript:function(e,t){return Z.get(e,void 0,t,"script")}}),Z.each(["get","post"],function(e,t){Z[t]=function(e,n,r,i){// shift arguments if data argument was omitted
return Z.isFunction(n)&&(i=i||r,r=n,n=void 0),Z.ajax({url:e,type:t,dataType:i,data:n,success:r})}}),// Attach a bunch of functions for handling common AJAX events
Z.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){Z.fn[t]=function(e){return this.on(t,e)}}),Z._evalUrl=function(e){return Z.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},Z.fn.extend({wrapAll:function(e){var t;// The elements to wrap the target around
return Z.isFunction(e)?this.each(function(t){Z(this).wrapAll(e.call(this,t))}):(this[0]&&(t=Z(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild;return e}).append(this)),this)},wrapInner:function(e){return this.each(Z.isFunction(e)?function(t){Z(this).wrapInner(e.call(this,t))}:function(){var t=Z(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=Z.isFunction(e);return this.each(function(n){Z(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){Z.nodeName(this,"body")||Z(this).replaceWith(this.childNodes)}).end()}}),Z.expr.filters.hidden=function(e){// Support: Opera <= 12.12
// Opera reports offsetWidths and offsetHeights less than zero on some elements
return e.offsetWidth<=0&&e.offsetHeight<=0},Z.expr.filters.visible=function(e){return!Z.expr.filters.hidden(e)};var kn=/%20/g,En=/\[\]$/,Sn=/\r?\n/g,jn=/^(?:submit|button|image|reset|file)$/i,Dn=/^(?:input|select|textarea|keygen)/i;// Serialize an array of form elements or a set of
// key/values into a query string
Z.param=function(e,t){var n,r=[],i=function(e,t){// If value is a function, invoke it and return its value
t=Z.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};// If an array was passed in, assume that it is an array of form elements.
if(// Set traditional to true for jQuery <= 1.3.2 behavior.
void 0===t&&(t=Z.ajaxSettings&&Z.ajaxSettings.traditional),Z.isArray(e)||e.jquery&&!Z.isPlainObject(e))// Serialize the form elements
Z.each(e,function(){i(this.name,this.value)});else// If traditional, encode the "old" way (the way 1.3.2 or older
// did it), otherwise encode params recursively.
for(n in e)$(n,e[n],t,i);// Return the resulting serialization
return r.join("&").replace(kn,"+")},Z.fn.extend({serialize:function(){return Z.param(this.serializeArray())},serializeArray:function(){return this.map(function(){// Can add propHook for "elements" to filter or add form elements
var e=Z.prop(this,"elements");return e?Z.makeArray(e):this}).filter(function(){var e=this.type;// Use .is( ":disabled" ) so that fieldset[disabled] works
return this.name&&!Z(this).is(":disabled")&&Dn.test(this.nodeName)&&!jn.test(e)&&(this.checked||!Nt.test(e))}).map(function(e,t){var n=Z(this).val();return null==n?null:Z.isArray(n)?Z.map(n,function(e){return{name:t.name,value:e.replace(Sn,"\r\n")}}):{name:t.name,value:n.replace(Sn,"\r\n")}}).get()}}),Z.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var An=0,Ln={},qn={// file protocol always yields status code 0, assume 200
0:200,// Support: IE9
// #1450: sometimes IE returns 1223 when it should be 204
1223:204},Hn=Z.ajaxSettings.xhr();// Support: IE9
// Open requests must be manually aborted on unload (#5280)
e.ActiveXObject&&Z(e).on("unload",function(){for(var e in Ln)Ln[e]()}),Q.cors=!!Hn&&"withCredentials"in Hn,Q.ajax=Hn=!!Hn,Z.ajaxTransport(function(e){var t;// Cross domain only allowed if supported through XMLHttpRequest
// Cross domain only allowed if supported through XMLHttpRequest
return Q.cors||Hn&&!e.crossDomain?{send:function(n,r){var i,o=e.xhr(),s=++An;// Apply custom fields if provided
if(o.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)o[i]=e.xhrFields[i];// Override mime type if needed
e.mimeType&&o.overrideMimeType&&o.overrideMimeType(e.mimeType),// X-Requested-With header
// For cross-domain requests, seeing as conditions for a preflight are
// akin to a jigsaw puzzle, we simply never set it to be sure.
// (it can always be set on a per-request basis or even using ajaxSetup)
// For same-domain requests, won't change header if already provided.
e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");// Set headers
for(i in n)o.setRequestHeader(i,n[i]);// Callback
t=function(e){return function(){t&&(delete Ln[s],t=o.onload=o.onerror=null,"abort"===e?o.abort():"error"===e?r(// file: protocol always yields status 0; see #8605, #14207
o.status,o.statusText):r(qn[o.status]||o.status,o.statusText,// Support: IE9
// Accessing binary-data responseText throws an exception
// (#11426)
"string"==typeof o.responseText?{text:o.responseText}:void 0,o.getAllResponseHeaders()))}},// Listen to events
o.onload=t(),o.onerror=t("error"),// Create the abort callback
t=Ln[s]=t("abort");try{// Do send the request (this may raise an exception)
o.send(e.hasContent&&e.data||null)}catch(a){// #14683: Only rethrow if this hasn't been notified as an error yet
if(t)throw a}},abort:function(){t&&t()}}:void 0}),// Install script dataType
Z.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return Z.globalEval(e),e}}}),// Handle cache's special case and crossDomain
Z.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),// Bind script tag hack transport
Z.ajaxTransport("script",function(e){// This transport only deals with cross domain requests
if(e.crossDomain){var t,n;return{send:function(r,i){t=Z("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),J.head.appendChild(t[0])},abort:function(){n&&n()}}}});var On=[],Fn=/(=)\?(?=&|$)|\?\?/;// Default jsonp settings
Z.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=On.pop()||Z.expando+"_"+cn++;return this[e]=!0,e}}),// Detect, normalize options and install callbacks for jsonp requests
Z.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,s,a=t.jsonp!==!1&&(Fn.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&Fn.test(t.data)&&"data");// Handle iff the expected data type is "jsonp" or we have a parameter to set
// Handle iff the expected data type is "jsonp" or we have a parameter to set
// Get callback name, remembering preexisting value associated with it
// Insert callback into url or form data
// Use data converter to retrieve json after script execution
// force json dataType
// Install callback
// Clean-up function (fires after converters)
return a||"jsonp"===t.dataTypes[0]?(i=t.jsonpCallback=Z.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(Fn,"$1"+i):t.jsonp!==!1&&(t.url+=(fn.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return s||Z.error(i+" was not called"),s[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){s=arguments},r.always(function(){// Restore preexisting value
e[i]=o,// Save back as free
t[i]&&(// make sure that re-using the options doesn't screw things around
t.jsonpCallback=n.jsonpCallback,// save the callback name for future use
On.push(i)),// Call if it was a function and we have a response
s&&Z.isFunction(o)&&o(s[0]),s=o=void 0}),"script"):void 0}),// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
Z.parseHTML=function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||J;var r=st.exec(e),i=!n&&[];// Single tag
// Single tag
return r?[t.createElement(r[1])]:(r=Z.buildFragment([e],t,i),i&&i.length&&Z(i).remove(),Z.merge([],r.childNodes))};// Keep a copy of the old load method
var Pn=Z.fn.load;/**
 * Load a url into a page
 */
Z.fn.load=function(e,t,n){if("string"!=typeof e&&Pn)return Pn.apply(this,arguments);var r,i,o,s=this,a=e.indexOf(" ");// If it's a function
// We assume that it's the callback
// If we have elements to modify, make the request
return a>=0&&(r=Z.trim(e.slice(a)),e=e.slice(0,a)),Z.isFunction(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),s.length>0&&Z.ajax({url:e,// if "type" variable is undefined, then "GET" method will be used
type:i,dataType:"html",data:t}).done(function(e){// Save response for use in complete callback
o=arguments,s.html(r?// If a selector was specified, locate the right elements in a dummy div
// Exclude scripts to avoid IE 'Permission Denied' errors
Z("<div>").append(Z.parseHTML(e)).find(r):// Otherwise use the full result
e)}).complete(n&&function(e,t){s.each(n,o||[e.responseText,t,e])}),this},Z.expr.filters.animated=function(e){return Z.grep(Z.timers,function(t){return e===t.elem}).length};var Mn=e.document.documentElement;Z.offset={setOffset:function(e,t,n){var r,i,o,s,a,u,l,c=Z.css(e,"position"),f=Z(e),p={};// Set position first, in-case top/left are set even on static elem
"static"===c&&(e.style.position="relative"),a=f.offset(),o=Z.css(e,"top"),u=Z.css(e,"left"),l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1,// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
l?(r=f.position(),s=r.top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(u)||0),Z.isFunction(t)&&(t=t.call(e,n,a)),null!=t.top&&(p.top=t.top-a.top+s),null!=t.left&&(p.left=t.left-a.left+i),"using"in t?t.using.call(e,p):f.css(p)}},Z.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){Z.offset.setOffset(this,e,t)});var t,n,r=this[0],i={top:0,left:0},o=r&&r.ownerDocument;if(o)// Make sure it's not a disconnected DOM node
// Make sure it's not a disconnected DOM node
// If we don't have gBCR, just use 0,0 rather than error
// BlackBerry 5, iOS 3 (original iPhone)
return t=o.documentElement,Z.contains(t,r)?(typeof r.getBoundingClientRect!==kt&&(i=r.getBoundingClientRect()),n=B(o),{top:i.top+n.pageYOffset-t.clientTop,left:i.left+n.pageXOffset-t.clientLeft}):i},position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};// Subtract parent offsets and element margins
// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
// We assume that getBoundingClientRect is available when computed position is fixed
// Get *real* offsetParent
// Get correct offsets
// Add offsetParent borders
return"fixed"===Z.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),Z.nodeName(e[0],"html")||(r=e.offset()),r.top+=Z.css(e[0],"borderTopWidth",!0),r.left+=Z.css(e[0],"borderLeftWidth",!0)),{top:t.top-r.top-Z.css(n,"marginTop",!0),left:t.left-r.left-Z.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent||Mn;e&&!Z.nodeName(e,"html")&&"static"===Z.css(e,"position");)e=e.offsetParent;return e||Mn})}}),// Create scrollLeft and scrollTop methods
Z.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){var r="pageYOffset"===n;Z.fn[t]=function(i){return mt(this,function(t,i,o){var s=B(t);return void 0===o?s?s[n]:t[i]:void(s?s.scrollTo(r?e.pageXOffset:o,r?o:e.pageYOffset):t[i]=o)},t,i,arguments.length,null)}}),// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
Z.each(["top","left"],function(e,t){Z.cssHooks[t]=T(Q.pixelPosition,function(e,n){return n?(n=w(e,t),It.test(n)?Z(e).position()[t]+"px":n):void 0})}),// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
Z.each({Height:"height",Width:"width"},function(e,t){Z.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){// margin is only for outerHeight, outerWidth
Z.fn[r]=function(r,i){var o=arguments.length&&(n||"boolean"!=typeof r),s=n||(r===!0||i===!0?"margin":"border");return mt(this,function(t,n,r){var i;// Get document width or height
// Get width or height on the element, requesting but not forcing parseFloat
// Set width or height on the element
return Z.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):void 0===r?Z.css(t,n,s):Z.style(t,n,r,s)},t,o?r:void 0,o,null)}})}),// The number of elements contained in the matched element set
Z.fn.size=function(){return this.length},Z.fn.andSelf=Z.fn.addBack,// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
"function"==typeof define&&define.amd&&define("jquery",[],function(){return Z});var// Map over jQuery in case of overwrite
Rn=e.jQuery,// Map over the $ in case of overwrite
Wn=e.$;// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
return Z.noConflict=function(t){return e.$===Z&&(e.$=Wn),t&&e.jQuery===Z&&(e.jQuery=Rn),Z},typeof t===kt&&(e.jQuery=e.$=Z),Z});