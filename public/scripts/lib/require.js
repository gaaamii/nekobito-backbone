/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.22 Copyright (c) 2010-2015, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */
var requirejs,require,define;!function(global){function isFunction(e){return"[object Function]"===ostring.call(e)}function isArray(e){return"[object Array]"===ostring.call(e)}/**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
function each(e,t){if(e){var r;for(r=0;r<e.length&&(!e[r]||!t(e[r],r,e));r+=1);}}/**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
function eachReverse(e,t){if(e){var r;for(r=e.length-1;r>-1&&(!e[r]||!t(e[r],r,e));r-=1);}}function hasProp(e,t){return hasOwn.call(e,t)}function getOwn(e,t){return hasProp(e,t)&&e[t]}/**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
function eachProp(e,t){var r;for(r in e)if(hasProp(e,r)&&t(e[r],r))break}/**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
function mixin(e,t,r,i){return t&&eachProp(t,function(t,n){!r&&hasProp(e,n)||(!i||"object"!=typeof t||!t||isArray(t)||isFunction(t)||t instanceof RegExp?e[n]=t:(e[n]||(e[n]={}),mixin(e[n],t,r,i)))}),e}
//Similar to Function.prototype.bind, but the 'this' object is specified
//first, since it is easier to read/figure out what 'this' will be.
function bind(e,t){return function(){return t.apply(e,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(e){throw e}
//Allow getting a global that is expressed in
//dot notation, like 'a.b.c'.
function getGlobal(e){if(!e)return e;var t=global;return each(e.split("."),function(e){t=t[e]}),t}/**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
function makeError(e,t,r,i){var n=new Error(t+"\nhttp://requirejs.org/docs/errors.html#"+e);return n.requireType=e,n.requireModules=i,r&&(n.originalError=r),n}function newContext(e){/**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
function t(e){var t,r;for(t=0;t<e.length;t++)if(r=e[t],"."===r)e.splice(t,1),t-=1;else if(".."===r){
// If at the start, or previous value is still ..,
// keep them so that when converted to a path it may
// still work when converted to a path, even though
// as an ID it is less than ideal. In larger point
// releases, may be better to just kick out an error.
if(0===t||1===t&&".."===e[2]||".."===e[t-1])continue;t>0&&(e.splice(t-1,2),t-=2)}}/**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
function r(e,r,i){var n,o,a,s,u,c,d,p,f,l,h,m,g=r&&r.split("/"),v=w.map,x=v&&v["*"];
//Apply map config if available.
if(
//Adjust any relative paths.
e&&(e=e.split("/"),d=e.length-1,
// If wanting node ID compatibility, strip .js from end
// of IDs. Have to do this here, and not in nameToUrl
// because node allows either .js or non .js to map
// to same file.
w.nodeIdCompat&&jsSuffixRegExp.test(e[d])&&(e[d]=e[d].replace(jsSuffixRegExp,"")),
// Starts with a '.' so need the baseName
"."===e[0].charAt(0)&&g&&(
//Convert baseName to array, and lop off the last part,
//so that . matches that 'directory' and not name of the baseName's
//module. For instance, baseName of 'one/two/three', maps to
//'one/two/three.js', but we want the directory, 'one/two' for
//this normalization.
m=g.slice(0,g.length-1),e=m.concat(e)),t(e),e=e.join("/")),i&&v&&(g||x)){a=e.split("/");e:for(s=a.length;s>0;s-=1){if(c=a.slice(0,s).join("/"),g)
//Find the longest baseName segment match in the config.
//So, do joins on the biggest to smallest lengths of baseParts.
for(u=g.length;u>0;u-=1)
//baseName segment has config, find if it has one for
//this name.
if(o=getOwn(v,g.slice(0,u).join("/")),o&&(o=getOwn(o,c))){
//Match, update name to the new value.
p=o,f=s;break e}
//Check for a star map match, but just hold on to it,
//if there is a shorter segment match later in a matching
//config, then favor over this star map.
!l&&x&&getOwn(x,c)&&(l=getOwn(x,c),h=s)}!p&&l&&(p=l,f=h),p&&(a.splice(0,f,p),e=a.join("/"))}
// If the name points to a package's name, use
// the package main instead.
return n=getOwn(w.pkgs,e),n?n:e}function i(e){isBrowser&&each(scripts(),function(t){if(t.getAttribute("data-requiremodule")===e&&t.getAttribute("data-requirecontext")===q.contextName)return t.parentNode.removeChild(t),!0})}function n(e){var t=getOwn(w.paths,e);if(t&&isArray(t)&&t.length>1)
//Pop off the first array value, since it failed, and
//retry
//Custom require that does not do map translation, since
//ID is "absolute", already mapped/resolved.
return t.shift(),q.require.undef(e),q.makeRequire(null,{skipMap:!0})([e]),!0}
//Turns a plugin!resource to [plugin, resource]
//with the plugin being undefined if the name
//did not have a plugin prefix.
function o(e){var t,r=e?e.indexOf("!"):-1;return r>-1&&(t=e.substring(0,r),e=e.substring(r+1,e.length)),[t,e]}/**
         * Creates a module mapping that includes plugin prefix, module
         * name, and path. If parentModuleMap is provided it will
         * also normalize the name via require.normalize()
         *
         * @param {String} name the module name
         * @param {String} [parentModuleMap] parent module map
         * for the module name, used to resolve relative names.
         * @param {Boolean} isNormalized: is the ID already normalized.
         * This is true if this call is done for a define() module ID.
         * @param {Boolean} applyMap: apply the map config to the ID.
         * Should only be true if this map is for a dependency.
         *
         * @returns {Object}
         */
function a(e,t,i,n){var a,s,u,c,d=null,p=t?t.name:null,f=e,l=!0,h="";
//If no name, then it means it is a require call, generate an
//internal name.
//Account for relative paths if there is a base name.
//Plugin is loaded, use its normalize method.
//A regular module.
//Normalized name may be a plugin ID due to map config
//application in normalize. The map config values must
//already be normalized, so do not need to redo that part.
//If the id is a plugin id that cannot be determined if it needs
//normalization, stamp it with a unique ID so two matching relative
//ids that may conflict can be separate.
return e||(l=!1,e="_@r"+(A+=1)),c=o(e),d=c[0],e=c[1],d&&(d=r(d,p,n),s=getOwn(j,d)),e&&(d?h=s&&s.normalize?s.normalize(e,function(e){return r(e,p,n)}):e.indexOf("!")===-1?r(e,p,n):e:(h=r(e,p,n),c=o(h),d=c[0],h=c[1],i=!0,a=q.nameToUrl(h))),u=!d||s||i?"":"_unnormalized"+(T+=1),{prefix:d,name:h,parentMap:t,unnormalized:!!u,url:a,originalName:f,isDefine:l,id:(d?d+"!"+h:h)+u}}function s(e){var t=e.id,r=getOwn(S,t);return r||(r=S[t]=new q.Module(e)),r}function u(e,t,r){var i=e.id,n=getOwn(S,i);!hasProp(j,i)||n&&!n.defineEmitComplete?(n=s(e),n.error&&"error"===t?r(n.error):n.on(t,r)):"defined"===t&&r(j[i])}function c(e,t){var r=e.requireModules,i=!1;t?t(e):(each(r,function(t){var r=getOwn(S,t);r&&(
//Set error on module, so it skips timeout checks.
r.error=e,r.events.error&&(i=!0,r.emit("error",e)))}),i||req.onError(e))}/**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
function d(){
//Push all the globalDefQueue items into the context's defQueue
globalDefQueue.length&&(each(globalDefQueue,function(e){var t=e[0];"string"==typeof t&&(q.defQueueMap[t]=!0),O.push(e)}),globalDefQueue=[])}function p(e){
//Clean up machinery used for waiting modules.
delete S[e],delete k[e]}function f(e,t,r){var i=e.map.id;e.error?e.emit("error",e.error):(t[i]=!0,each(e.depMaps,function(i,n){var o=i.id,a=getOwn(S,o);
//Only force things that have not completed
//being defined, so still in the registry,
//and only if it has not been matched up
//in the module already.
!a||e.depMatched[n]||r[o]||(getOwn(t,o)?(e.defineDep(n,j[o]),e.check()):f(a,t,r))}),r[i]=!0)}function l(){var e,t,r=1e3*w.waitSeconds,
//It is possible to disable the wait interval by using waitSeconds of 0.
o=r&&q.startTime+r<(new Date).getTime(),a=[],s=[],u=!1,d=!0;
//Do not bother if this call was a result of a cycle break.
if(!x){if(x=!0,
//Figure out the state of all the modules.
eachProp(k,function(e){var r=e.map,c=r.id;
//Skip things that are not enabled or in error state.
if(e.enabled&&(r.isDefine||s.push(e),!e.error))
//If the module should be executed, and it has not
//been inited and time is up, remember it.
if(!e.inited&&o)n(c)?(t=!0,u=!0):(a.push(c),i(c));else if(!e.inited&&e.fetched&&r.isDefine&&(u=!0,!r.prefix))
//No reason to keep looking for unfinished
//loading. If the only stillLoading is a
//plugin resource though, keep going,
//because it may be that a plugin resource
//is waiting on a non-plugin cycle.
return d=!1}),o&&a.length)
//If wait time expired, throw error of unloaded modules.
return e=makeError("timeout","Load timeout for modules: "+a,null,a),e.contextName=q.contextName,c(e);
//Not expired, check for a cycle.
d&&each(s,function(e){f(e,{},{})}),
//If still waiting on loads, and the waiting load is something
//other than a plugin resource, or there are still outstanding
//scripts, then just try back later.
o&&!t||!u||!isBrowser&&!isWebWorker||y||(y=setTimeout(function(){y=0,l()},50)),x=!1}}function h(e){
//Skip modules already defined.
hasProp(j,e[0])||s(a(e[0],null,!0)).init(e[1],e[2])}function m(e,t,r,i){
//Favor detachEvent because of IE9
//issue, see attachEvent/addEventListener comment elsewhere
//in this file.
e.detachEvent&&!isOpera?
//Probably IE. If not it will throw an error, which will be
//useful to know.
i&&e.detachEvent(i,t):e.removeEventListener(r,t,!1)}/**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
function g(e){
//Using currentTarget instead of target for Firefox 2.0's sake. Not
//all old browsers will be supported, but this one was easy enough
//to support and still makes sense.
var t=e.currentTarget||e.srcElement;
//Remove the listeners once here.
return m(t,q.onScriptLoad,"load","onreadystatechange"),m(t,q.onScriptError,"error"),{node:t,id:t&&t.getAttribute("data-requiremodule")}}function v(){var e;
//Make sure any remaining defQueue items get properly processed.
for(
//Any defined modules in the global queue, intake them now.
d();O.length;){if(e=O.shift(),null===e[0])return c(makeError("mismatch","Mismatched anonymous define() module: "+e[e.length-1]));
//args are id, deps, factory. Should be normalized by the
//define() function.
h(e)}q.defQueueMap={}}var x,b,q,E,y,w={
//Defaults. Do not set a default for map
//config to speed up normalize(), which
//will run faster if there is no default.
waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},S={},
//registry of just enabled modules, to speed
//cycle breaking code when lots of modules
//are registered, but not activated.
k={},M={},O=[],j={},P={},R={},A=1,T=1;return E={require:function(e){return e.require?e.require:e.require=q.makeRequire(e.map)},exports:function(e){if(e.usingExports=!0,e.map.isDefine)return e.exports?j[e.map.id]=e.exports:e.exports=j[e.map.id]={}},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map.url,config:function(){return getOwn(w.config,e.map.id)||{}},exports:e.exports||(e.exports={})}}},b=function(e){this.events=getOwn(M,e.id)||{},this.map=e,this.shim=getOwn(w.shim,e.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},b.prototype={init:function(e,t,r,i){i=i||{},
//Do not do more inits if already done. Can happen if there
//are multiple define calls for the same module. That is not
//a normal, common case, but it is also not unexpected.
this.inited||(this.factory=t,r?
//Register for errors on this module.
this.on("error",r):this.events.error&&(
//If no errback already, but there are error listeners
//on this module, set up an errback to pass to the deps.
r=bind(this,function(e){this.emit("error",e)})),
//Do a copy of the dependency array, so that
//source inputs are not modified. For example
//"shim" deps are passed in here directly, and
//doing a direct modification of the depMaps array
//would affect that config.
this.depMaps=e&&e.slice(0),this.errback=r,
//Indicate this module has be initialized
this.inited=!0,this.ignore=i.ignore,
//Could have option to init this module in enabled mode,
//or could have been previously marked as enabled. However,
//the dependencies are not known until init is called. So
//if enabled previously, now trigger dependencies as enabled.
i.enabled||this.enabled?
//Enable this module and dependencies.
//Will call this.check()
this.enable():this.check())},defineDep:function(e,t){
//Because of cycles, defined callback for a given
//export can be called more than once.
this.depMatched[e]||(this.depMatched[e]=!0,this.depCount-=1,this.depExports[e]=t)},fetch:function(){if(!this.fetched){this.fetched=!0,q.startTime=(new Date).getTime();var e=this.map;
//If the manager is for a plugin managed resource,
//ask the plugin to load it now.
//If the manager is for a plugin managed resource,
//ask the plugin to load it now.
return this.shim?void q.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return e.prefix?this.callPlugin():this.load()})):e.prefix?this.callPlugin():this.load()}},load:function(){var e=this.map.url;
//Regular dependency.
P[e]||(P[e]=!0,q.load(this.map.id,e))},/**
             * Checks if the module is ready to define itself, and if so,
             * define it.
             */
check:function(){if(this.enabled&&!this.enabling){var e,t,r=this.map.id,i=this.depExports,n=this.exports,o=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(
//The factory could trigger another require call
//that would result in checking this module to
//define itself again. If already in the process
//of doing that, skip this work.
this.defining=!0,this.depCount<1&&!this.defined){if(isFunction(o)){try{n=q.execCb(r,o,i,n)}catch(a){e=a}if(
// Favor return value over exports. If node/cjs in play,
// then will not have a return value anyway. Favor
// module.exports assignment over exports object.
this.map.isDefine&&void 0===n&&(t=this.module,t?n=t.exports:this.usingExports&&(
//exports already set the defined value.
n=this.exports)),e){
// If there is an error listener, favor passing
// to that instead of throwing an error. However,
// only do it for define()'d  modules. require
// errbacks should not be called for failures in
// their callbacks (#699). However if a global
// onError is set, use that.
if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)return e.requireMap=this.map,e.requireModules=this.map.isDefine?[this.map.id]:null,e.requireType=this.map.isDefine?"define":"require",c(this.error=e);"undefined"!=typeof console&&console.error?
// Log the error for debugging. If promises could be
// used, this would be different, but making do.
console.error(e):
// Do not want to completely lose the error. While this
// will mess up processing and lead to similar results
// as bug 1440, it at least surfaces the error.
req.onError(e)}}else
//Just a literal value
n=o;if(this.exports=n,this.map.isDefine&&!this.ignore&&(j[r]=n,req.onResourceLoad)){var s=[];each(this.depMaps,function(e){s.push(e.normalizedMap||e)}),req.onResourceLoad(q,this.map,s)}
//Clean up
p(r),this.defined=!0}
//Finished the define stage. Allow calling check again
//to allow define notifications below in the case of a
//cycle.
this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else
// Only fetch if not already in the defQueue.
hasProp(q.defQueueMap,r)||this.fetch()}},callPlugin:function(){var e=this.map,t=e.id,
//Map already normalized the prefix.
i=a(e.prefix);
//Mark this as a dependency for this plugin, so it
//can be traced for cycles.
this.depMaps.push(i),u(i,"defined",bind(this,function(i){var n,o,d,f=getOwn(R,this.map.id),l=this.map.name,h=this.map.parentMap?this.map.parentMap.name:null,m=q.makeRequire(e.parentMap,{enableBuildCallback:!0});
//If current map is not normalized, wait for that
//normalized name to load instead of continuing.
//If current map is not normalized, wait for that
//normalized name to load instead of continuing.
//Normalize the ID if the plugin allows it.
//prefix and name should already be normalized, no need
//for applying map config again either.
//Mark this as a dependency for this plugin, so it
//can be traced for cycles.
//If a paths config, then just load that file instead to
//resolve the plugin, as it is built into that paths layer.
//Allow plugins to load other code without having to know the
//context or how to 'complete' the load.
//Use parentName here since the plugin's name is not reliable,
//could be some weird string with no path that actually wants to
//reference the parentName's path.
return this.map.unnormalized?(i.normalize&&(l=i.normalize(l,function(e){return r(e,h,!0)})||""),o=a(e.prefix+"!"+l,this.map.parentMap),u(o,"defined",bind(this,function(e){this.map.normalizedMap=o,this.init([],function(){return e},null,{enabled:!0,ignore:!0})})),d=getOwn(S,o.id),void(d&&(this.depMaps.push(o),this.events.error&&d.on("error",bind(this,function(e){this.emit("error",e)})),d.enable()))):f?(this.map.url=q.nameToUrl(f),void this.load()):(n=bind(this,function(e){this.init([],function(){return e},null,{enabled:!0})}),n.error=bind(this,function(e){this.inited=!0,this.error=e,e.requireModules=[t],
//Remove temp unnormalized modules for this module,
//since they will never be resolved otherwise now.
eachProp(S,function(e){0===e.map.id.indexOf(t+"_unnormalized")&&p(e.map.id)}),c(e)}),n.fromText=bind(this,function(r,i){/*jslint evil: true */
var o=e.name,u=a(o),d=useInteractive;
//As of 2.1.0, support just passing the text, to reinforce
//fromText only being called once per resource. Still
//support old style of passing moduleName but discard
//that moduleName in favor of the internal ref.
i&&(r=i),
//Turn off interactive script matching for IE for any define
//calls in the text, then turn it back on at the end.
d&&(useInteractive=!1),
//Prime the system by creating a module instance for
//it.
s(u),
//Transfer any config to this other module.
hasProp(w.config,t)&&(w.config[o]=w.config[t]);try{req.exec(r)}catch(p){return c(makeError("fromtexteval","fromText eval for "+t+" failed: "+p,p,[t]))}d&&(useInteractive=!0),
//Mark this as a dependency for the plugin
//resource
this.depMaps.push(u),
//Support anonymous modules.
q.completeLoad(o),
//Bind the value of that module to the value for this
//resource ID.
m([o],n)}),void i.load(e.name,m,n,w))})),q.enable(i,this),this.pluginMaps[i.id]=i},enable:function(){k[this.map.id]=this,this.enabled=!0,
//Set flag mentioning that the module is enabling,
//so that immediate calls to the defined callbacks
//for dependencies do not trigger inadvertent load
//with the depCount still being zero.
this.enabling=!0,
//Enable each dependency
each(this.depMaps,bind(this,function(e,t){var r,i,n;if("string"==typeof e){if(
//Dependency needs to be converted to a depMap
//and wired up to this module.
e=a(e,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[t]=e,n=getOwn(E,e.id))return void(this.depExports[t]=n(this));this.depCount+=1,u(e,"defined",bind(this,function(e){this.undefed||(this.defineDep(t,e),this.check())})),this.errback?u(e,"error",bind(this,this.errback)):this.events.error&&
// No direct errback on this module, but something
// else is listening for errors, so be sure to
// propagate the error correctly.
u(e,"error",bind(this,function(e){this.emit("error",e)}))}r=e.id,i=S[r],
//Skip special modules like 'require', 'exports', 'module'
//Also, don't call enable if it is already enabled,
//important in circular dependency cases.
hasProp(E,r)||!i||i.enabled||q.enable(e,this)})),
//Enable each plugin that is used in
//a dependency
eachProp(this.pluginMaps,bind(this,function(e){var t=getOwn(S,e.id);t&&!t.enabled&&q.enable(e,this)})),this.enabling=!1,this.check()},on:function(e,t){var r=this.events[e];r||(r=this.events[e]=[]),r.push(t)},emit:function(e,t){each(this.events[e],function(e){e(t)}),"error"===e&&
//Now that the error handler was triggered, remove
//the listeners, since this broken Module instance
//can stay around for a while in the registry.
delete this.events[e]}},q={config:w,contextName:e,registry:S,defined:j,urlFetched:P,defQueue:O,defQueueMap:{},Module:b,makeModuleMap:a,nextTick:req.nextTick,onError:c,/**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
configure:function(e){
//Make sure the baseUrl ends in a slash.
e.baseUrl&&"/"!==e.baseUrl.charAt(e.baseUrl.length-1)&&(e.baseUrl+="/");
//Save off the paths since they require special processing,
//they are additive.
var t=w.shim,r={paths:!0,bundles:!0,config:!0,map:!0};eachProp(e,function(e,t){r[t]?(w[t]||(w[t]={}),mixin(w[t],e,!0,!0)):w[t]=e}),
//Reverse map the bundles
e.bundles&&eachProp(e.bundles,function(e,t){each(e,function(e){e!==t&&(R[e]=t)})}),
//Merge shim
e.shim&&(eachProp(e.shim,function(e,r){
//Normalize the structure
isArray(e)&&(e={deps:e}),!e.exports&&!e.init||e.exportsFn||(e.exportsFn=q.makeShimExports(e)),t[r]=e}),w.shim=t),
//Adjust packages if necessary.
e.packages&&each(e.packages,function(e){var t,r;e="string"==typeof e?{name:e}:e,r=e.name,t=e.location,t&&(w.paths[r]=e.location),
//Save pointer to main module ID for pkg name.
//Remove leading dot in main, so main paths are normalized,
//and remove any trailing .js, since different package
//envs have different conventions: some use a module name,
//some use a file name.
w.pkgs[r]=e.name+"/"+(e.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}),
//If there are any "waiting to execute" modules in the registry,
//update the maps for them, since their info, like URLs to load,
//may have changed.
eachProp(S,function(e,t){
//If module already has init called, since it is too
//late to modify them, and ignore unnormalized ones
//since they are transient.
e.inited||e.map.unnormalized||(e.map=a(t,null,!0))}),
//If a deps array or a config callback is specified, then call
//require with those args. This is useful when require is defined as a
//config object before require.js is loaded.
(e.deps||e.callback)&&q.require(e.deps||[],e.callback)},makeShimExports:function(e){function t(){var t;return e.init&&(t=e.init.apply(global,arguments)),t||e.exports&&getGlobal(e.exports)}return t},makeRequire:function(t,n){function o(r,i,u){var d,p,f;
//If require|exports|module are requested, get the
//value for them from the special handlers. Caveat:
//this only works while module is being defined.
//Synchronous access to one module. If require.get is
//available (as in the Node adapter), prefer that.
//Normalize module name, if it contains . or ..
//Grab defines waiting in the global queue.
//Mark all the dependencies as needing to be loaded.
return n.enableBuildCallback&&i&&isFunction(i)&&(i.__requireJsBuild=!0),"string"==typeof r?isFunction(i)?c(makeError("requireargs","Invalid require call"),u):t&&hasProp(E,r)?E[r](S[t.id]):req.get?req.get(q,r,t,o):(p=a(r,t,!1,!0),d=p.id,hasProp(j,d)?j[d]:c(makeError("notloaded",'Module name "'+d+'" has not been loaded yet for context: '+e+(t?"":". Use require([])")))):(v(),q.nextTick(function(){
//Some defines could have been added since the
//require call, collect them.
v(),f=s(a(null,t)),
//Store if map config should be applied to this require
//call for dependencies.
f.skipMap=n.skipMap,f.init(r,i,u,{enabled:!0}),l()}),o)}
//Only allow undef on top level require calls
return n=n||{},mixin(o,{isBrowser:isBrowser,/**
                     * Converts a module name + .extension into an URL path.
                     * *Requires* the use of a module name. It does not support using
                     * plain URLs like nameToUrl.
                     */
toUrl:function(e){var i,n=e.lastIndexOf("."),o=e.split("/")[0],a="."===o||".."===o;
//Have a file extension alias, and it is not the
//dots from a relative path.
return n!==-1&&(!a||n>1)&&(i=e.substring(n,e.length),e=e.substring(0,n)),q.nameToUrl(r(e,t&&t.id,!0),i,!0)},defined:function(e){return hasProp(j,a(e,t,!1,!0).id)},specified:function(e){return e=a(e,t,!1,!0).id,hasProp(j,e)||hasProp(S,e)}}),t||(o.undef=function(e){
//Bind any waiting define() calls to this context,
//fix for #408
d();var r=a(e,t,!0),n=getOwn(S,e);n.undefed=!0,i(e),delete j[e],delete P[r.url],delete M[e],
//Clean queued defines too. Go backwards
//in array so that the splices do not
//mess up the iteration.
eachReverse(O,function(t,r){t[0]===e&&O.splice(r,1)}),delete q.defQueueMap[e],n&&(
//Hold on to listeners in case the
//module will be attempted to be reloaded
//using a different config.
n.events.defined&&(M[e]=n.events),p(e))}),o},/**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. A second arg, parent, the parent module,
             * is passed in for context, when this method is overridden by
             * the optimizer. Not shown here to keep code compact.
             */
enable:function(e){var t=getOwn(S,e.id);t&&s(e).enable()},/**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
completeLoad:function(e){var t,r,i,o=getOwn(w.shim,e)||{},a=o.exports;for(d();O.length;){if(r=O.shift(),null===r[0]){
//If already found an anonymous module and bound it
//to this name, then this is some other anon module
//waiting for its completeLoad to fire.
if(r[0]=e,t)break;t=!0}else r[0]===e&&(
//Found matching define call for this script!
t=!0);h(r)}if(q.defQueueMap={},
//Do this after the cycle of callGetModule in case the result
//of those calls/init calls changes the registry.
i=getOwn(S,e),!t&&!hasProp(j,e)&&i&&!i.inited){if(!(!w.enforceDefine||a&&getGlobal(a)))return n(e)?void 0:c(makeError("nodefine","No define call for "+e,null,[e]));
//A script that does not call define(), so just simulate
//the call for it.
h([e,o.deps||[],o.exportsFn])}l()},/**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
nameToUrl:function(e,t,r){var i,n,o,a,s,u,c,d=getOwn(w.pkgs,e);if(d&&(e=d),c=getOwn(R,e))return q.nameToUrl(c,t,r);
//If a colon is in the URL, it indicates a protocol is used and it is just
//an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
//or ends with .js, then assume the user meant to use an url and not a module id.
//The slash is important for protocol-less URLs as well as full paths.
if(req.jsExtRegExp.test(e))
//Just a plain path, not module name lookup, so just return it.
//Add extension if it is included. This is a bit wonky, only non-.js things pass
//an extension, this method probably needs to be reworked.
s=e+(t||"");else{
//For each module name segment, see if there is a path
//registered for it. Start with most specific name
//and work up from it.
for(
//A module that needs to be converted to a path.
i=w.paths,n=e.split("/"),o=n.length;o>0;o-=1)if(a=n.slice(0,o).join("/"),u=getOwn(i,a)){
//If an array, it means there are a few choices,
//Choose the one that is desired
isArray(u)&&(u=u[0]),n.splice(0,o,u);break}
//Join the path parts together, then figure out if baseUrl is needed.
s=n.join("/"),s+=t||(/^data\:|\?/.test(s)||r?"":".js"),s=("/"===s.charAt(0)||s.match(/^[\w\+\.\-]+:/)?"":w.baseUrl)+s}return w.urlArgs?s+((s.indexOf("?")===-1?"?":"&")+w.urlArgs):s},
//Delegates to req.load. Broken out as a separate function to
//allow overriding in the optimizer.
load:function(e,t){req.load(q,e,t)},/**
             * Executes a module callback function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
execCb:function(e,t,r,i){return t.apply(i,r)},/**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
onScriptLoad:function(e){
//Using currentTarget instead of target for Firefox 2.0's sake. Not
//all old browsers will be supported, but this one was easy enough
//to support and still makes sense.
if("load"===e.type||readyRegExp.test((e.currentTarget||e.srcElement).readyState)){
//Reset interactive script so a script node is not held onto for
//to long.
interactiveScript=null;
//Pull out the name of the module and the context.
var t=g(e);q.completeLoad(t.id)}},/**
             * Callback for script errors.
             */
onScriptError:function(e){var t=g(e);if(!n(t.id)){var r=[];return eachProp(S,function(e,i){0!==i.indexOf("_@r")&&each(e.depMaps,function(e){return e.id===t.id&&r.push(i),!0})}),c(makeError("scripterror",'Script error for "'+t.id+(r.length?'", needed by: '+r.join(", "):'"'),e,[t.id]))}}},q.require=q.makeRequire(),q}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(e){if("interactive"===e.readyState)return interactiveScript=e}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.1.22",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,ap=Array.prototype,isBrowser=!("undefined"==typeof window||"undefined"==typeof navigator||!window.document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,
//PS3 indicates loaded and complete, but need to wait for complete
//specifically. Sequence is 'loading', 'loaded', execution,
// then 'complete'. The UA check is unfortunate, but not sure how
//to feature test w/o causing perf issues.
readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",
//Oh the tragedy, detecting opera. See the usage of isOpera for reason.
isOpera="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if("undefined"==typeof define){if("undefined"!=typeof requirejs){if(isFunction(requirejs))
//Do not overwrite an existing requirejs instance.
return;cfg=requirejs,requirejs=void 0}
//Allow for a require config object
"undefined"==typeof require||isFunction(require)||(
//assume it is a config object.
cfg=require,require=void 0),/**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
req=requirejs=function(e,t,r,i){
//Find the right context, use default
var n,o,a=defContextName;
// Determine if have config object in the call.
// deps is a config object
// Adjust args if there are dependencies
return isArray(e)||"string"==typeof e||(o=e,isArray(t)?(e=t,t=r,r=i):e=[]),o&&o.context&&(a=o.context),n=getOwn(contexts,a),n||(n=contexts[a]=req.s.newContext(a)),o&&n.configure(o),n.require(e,t,r)},/**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
req.config=function(e){return req(e)},/**
     * Execute something after the current tick
     * of the event loop. Override for other envs
     * that have a better solution than setTimeout.
     * @param  {Function} fn function to execute later.
     */
req.nextTick="undefined"!=typeof setTimeout?function(e){setTimeout(e,4)}:function(e){e()},/**
     * Export require as a global, but only if it does not already exist.
     */
require||(require=req),req.version=version,
//Used to filter out dependencies that are already paths.
req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},
//Create default context.
req({}),
//Exports some context-sensitive methods on global require.
each(["toUrl","undef","defined","specified"],function(e){
//Reference from contexts instead of early binding to default context,
//so that during builds, the latest instance of the default context
//with its config gets used.
req[e]=function(){var t=contexts[defContextName];return t.require[e].apply(t,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],
//If BASE tag is in play, using appendChild is a problem for IE6.
//When that browser dies, this can be removed. Details in this jQuery bug:
//http://dev.jquery.com/ticket/2709
baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),/**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
req.onError=defaultOnError,/**
     * Creates the node for the load command. Only used in browser envs.
     */
req.createNode=function(e,t,r){var i=e.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return i.type=e.scriptType||"text/javascript",i.charset="utf-8",i.async=!0,i},/**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
req.load=function(e,t,r){var i,n=e&&e.config||{};if(isBrowser)
//In the browser so use a script tag
//Set up load listener. Test attachEvent first because IE9 has
//a subtle issue in its addEventListener and script onload firings
//that do not match the behavior of all other browsers with
//addEventListener support, which fire the onload event for a
//script right after the script execution. See:
//https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
//UNFORTUNATELY Opera implements attachEvent but does not follow the script
//script execution mode.
//Probably IE. IE (at least 6-8) do not fire
//script onload right after executing the script, so
//we cannot tie the anonymous define call to a name.
//However, IE reports the script as being in 'interactive'
//readyState at the time of the define call.
//For some cache cases in IE 6-8, the script executes before the end
//of the appendChild execution, so to tie an anonymous define
//call to the module name (which is stored on the node), hold on
//to a reference to this node, but clear after the DOM insertion.
return i=req.createNode(n,t,r),n.onNodeCreated&&n.onNodeCreated(i,n,t,r),i.setAttribute("data-requirecontext",e.contextName),i.setAttribute("data-requiremodule",t),!i.attachEvent||i.attachEvent.toString&&i.attachEvent.toString().indexOf("[native code")<0||isOpera?(i.addEventListener("load",e.onScriptLoad,!1),i.addEventListener("error",e.onScriptError,!1)):(useInteractive=!0,i.attachEvent("onreadystatechange",e.onScriptLoad)),i.src=r,currentlyAddingScript=i,baseElement?head.insertBefore(i,baseElement):head.appendChild(i),currentlyAddingScript=null,i;if(isWebWorker)try{
//In a web worker, use importScripts. This is not a very
//efficient use of importScripts, importScripts will block until
//its script is downloaded and evaluated. However, if web workers
//are in play, the expectation is that a build has been done so
//that only one script needs to be loaded anyway. This may need
//to be reevaluated if other use cases become common.
importScripts(r),
//Account for anonymous modules
e.completeLoad(t)}catch(o){e.onError(makeError("importscripts","importScripts failed for "+t+" at "+r,o,[t]))}},
//Look for a data-main script attribute, which could also adjust the baseUrl.
isBrowser&&!cfg.skipDataMain&&
//Figure out baseUrl. Get it from the script tag with require.js in it.
eachReverse(scripts(),function(e){if(
//Set the 'head' where we can append children by
//using the script's parent.
head||(head=e.parentNode),
//Look for a data-main attribute to set main script for the page
//to load. If it is there, the path to data main becomes the
//baseUrl, if it is not already set.
dataMain=e.getAttribute("data-main"))
//Preserve dataMain in case it is a path (i.e. contains '?')
//Set final baseUrl if there is not already an explicit one.
//Pull off the directory of data-main for use as the
//baseUrl.
//Strip off any trailing .js since mainScript is now
//like a module name.
//If mainScript is still a path, fall back to dataMain
//Put the data-main script in the files to load.
return mainScript=dataMain,cfg.baseUrl||(src=mainScript.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0}),/**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
define=function(e,t,r){var i,n;
//Allow for anonymous modules
"string"!=typeof e&&(
//Adjust args appropriately
r=t,t=e,e=null),
//This module may not have dependencies
isArray(t)||(r=t,t=null),
//If no name, and callback is a function, then figure out if it a
//CommonJS thing with dependencies.
!t&&isFunction(r)&&(t=[],
//Remove comments from the callback string,
//look for require calls, and pull them into the dependencies,
//but only if there are function args.
r.length&&(r.toString().replace(commentRegExp,"").replace(cjsRequireRegExp,function(e,r){t.push(r)}),
//May be a CommonJS thing even without require calls, but still
//could use exports, and module. Avoid doing exports and module
//work though if it just needs require.
//REQUIRES the function to expect the CommonJS variables in the
//order listed below.
t=(1===r.length?["require"]:["require","exports","module"]).concat(t))),
//If in IE 6-8 and hit an anonymous define() call, do the interactive
//work.
useInteractive&&(i=currentlyAddingScript||getInteractiveScript(),i&&(e||(e=i.getAttribute("data-requiremodule")),n=contexts[i.getAttribute("data-requirecontext")])),
//Always save off evaluating the def call until the script onload handler.
//This allows multiple modules to be in a file without prematurely
//tracing dependencies, and allows for anonymous module support,
//where the module name is not known until the script onload event
//occurs. If no context, use the global queue, and get it processed
//in the onscript load callback.
n?(n.defQueue.push([e,t,r]),n.defQueueMap[e]=!0):globalDefQueue.push([e,t,r])},define.amd={jQuery:!0},/**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
req.exec=function(text){/*jslint evil: true */
return eval(text)},
//Set up with config info.
req(cfg)}}(this);