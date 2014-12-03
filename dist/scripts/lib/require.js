/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.15 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
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
function each(e,t){if(e){var i;for(i=0;i<e.length&&(!e[i]||!t(e[i],i,e));i+=1);}}/**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
function eachReverse(e,t){if(e){var i;for(i=e.length-1;i>-1&&(!e[i]||!t(e[i],i,e));i-=1);}}function hasProp(e,t){return hasOwn.call(e,t)}function getOwn(e,t){return hasProp(e,t)&&e[t]}/**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
function eachProp(e,t){var i;for(i in e)if(hasProp(e,i)&&t(e[i],i))break}/**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
function mixin(e,t,i,r){return t&&eachProp(t,function(t,n){(i||!hasProp(e,n))&&(!r||"object"!=typeof t||!t||isArray(t)||isFunction(t)||t instanceof RegExp?e[n]=t:(e[n]||(e[n]={}),mixin(e[n],t,i,r)))}),e}//Similar to Function.prototype.bind, but the 'this' object is specified
//first, since it is easier to read/figure out what 'this' will be.
function bind(e,t){return function(){return t.apply(e,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(e){throw e}//Allow getting a global that is expressed in
//dot notation, like 'a.b.c'.
function getGlobal(e){if(!e)return e;var t=global;return each(e.split("."),function(e){t=t[e]}),t}/**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
function makeError(e,t,i,r){var n=new Error(t+"\nhttp://requirejs.org/docs/errors.html#"+e);return n.requireType=e,n.requireModules=r,i&&(n.originalError=i),n}function newContext(e){/**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
function t(e){var t,i;for(t=0;t<e.length;t++)if(i=e[t],"."===i)e.splice(t,1),t-=1;else if(".."===i){// If at the start, or previous value is still ..,
// keep them so that when converted to a path it may
// still work when converted to a path, even though
// as an ID it is less than ideal. In larger point
// releases, may be better to just kick out an error.
if(0===t||1==t&&".."===e[2]||".."===e[t-1])continue;t>0&&(e.splice(t-1,2),t-=2)}}/**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
function i(e,i,r){var n,a,o,s,c,u,p,d,f,l,h,m,g=i&&i.split("/"),v=y.map,x=v&&v["*"];//Apply map config if available.
if(//Adjust any relative paths.
e&&(e=e.split("/"),p=e.length-1,// If wanting node ID compatibility, strip .js from end
// of IDs. Have to do this here, and not in nameToUrl
// because node allows either .js or non .js to map
// to same file.
y.nodeIdCompat&&jsSuffixRegExp.test(e[p])&&(e[p]=e[p].replace(jsSuffixRegExp,"")),// Starts with a '.' so need the baseName
"."===e[0].charAt(0)&&g&&(//Convert baseName to array, and lop off the last part,
//so that . matches that 'directory' and not name of the baseName's
//module. For instance, baseName of 'one/two/three', maps to
//'one/two/three.js', but we want the directory, 'one/two' for
//this normalization.
m=g.slice(0,g.length-1),e=m.concat(e)),t(e),e=e.join("/")),r&&v&&(g||x)){o=e.split("/");e:for(s=o.length;s>0;s-=1){if(u=o.slice(0,s).join("/"),g)//Find the longest baseName segment match in the config.
//So, do joins on the biggest to smallest lengths of baseParts.
for(c=g.length;c>0;c-=1)//baseName segment has config, find if it has one for
//this name.
if(a=getOwn(v,g.slice(0,c).join("/")),a&&(a=getOwn(a,u))){//Match, update name to the new value.
d=a,f=s;break e}//Check for a star map match, but just hold on to it,
//if there is a shorter segment match later in a matching
//config, then favor over this star map.
!l&&x&&getOwn(x,u)&&(l=getOwn(x,u),h=s)}!d&&l&&(d=l,f=h),d&&(o.splice(0,f,d),e=o.join("/"))}// If the name points to a package's name, use
// the package main instead.
return n=getOwn(y.pkgs,e),n?n:e}function r(e){isBrowser&&each(scripts(),function(t){return t.getAttribute("data-requiremodule")===e&&t.getAttribute("data-requirecontext")===q.contextName?(t.parentNode.removeChild(t),!0):void 0})}function n(e){var t=getOwn(y.paths,e);//Pop off the first array value, since it failed, and
//retry
//Custom require that does not do map translation, since
//ID is "absolute", already mapped/resolved.
return t&&isArray(t)&&t.length>1?(t.shift(),q.require.undef(e),q.makeRequire(null,{skipMap:!0})([e]),!0):void 0}//Turns a plugin!resource to [plugin, resource]
//with the plugin being undefined if the name
//did not have a plugin prefix.
function a(e){var t,i=e?e.indexOf("!"):-1;return i>-1&&(t=e.substring(0,i),e=e.substring(i+1,e.length)),[t,e]}/**
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
function o(e,t,r,n){var o,s,c,u,p=null,d=t?t.name:null,f=e,l=!0,h="";//If no name, then it means it is a require call, generate an
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
return e||(l=!1,e="_@r"+(A+=1)),u=a(e),p=u[0],e=u[1],p&&(p=i(p,d,n),s=getOwn(j,p)),e&&(p?h=s&&s.normalize?s.normalize(e,function(e){return i(e,d,n)}):-1===e.indexOf("!")?i(e,d,n):e:(h=i(e,d,n),u=a(h),p=u[0],h=u[1],r=!0,o=q.nameToUrl(h))),c=!p||s||r?"":"_unnormalized"+(T+=1),{prefix:p,name:h,parentMap:t,unnormalized:!!c,url:o,originalName:f,isDefine:l,id:(p?p+"!"+h:h)+c}}function s(e){var t=e.id,i=getOwn(S,t);return i||(i=S[t]=new q.Module(e)),i}function c(e,t,i){var r=e.id,n=getOwn(S,r);!hasProp(j,r)||n&&!n.defineEmitComplete?(n=s(e),n.error&&"error"===t?i(n.error):n.on(t,i)):"defined"===t&&i(j[r])}function u(e,t){var i=e.requireModules,r=!1;t?t(e):(each(i,function(t){var i=getOwn(S,t);i&&(//Set error on module, so it skips timeout checks.
i.error=e,i.events.error&&(r=!0,i.emit("error",e)))}),r||req.onError(e))}/**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
function p(){//Push all the globalDefQueue items into the context's defQueue
globalDefQueue.length&&(//Array splice in the values since the context code has a
//local var ref to defQueue, so cannot just reassign the one
//on context.
apsp.apply(M,[M.length,0].concat(globalDefQueue)),globalDefQueue=[])}function d(e){//Clean up machinery used for waiting modules.
delete S[e],delete k[e]}function f(e,t,i){var r=e.map.id;e.error?e.emit("error",e.error):(t[r]=!0,each(e.depMaps,function(r,n){var a=r.id,o=getOwn(S,a);//Only force things that have not completed
//being defined, so still in the registry,
//and only if it has not been matched up
//in the module already.
!o||e.depMatched[n]||i[a]||(getOwn(t,a)?(e.defineDep(n,j[a]),e.check()):f(o,t,i))}),i[r]=!0)}function l(){var e,t,i=1e3*y.waitSeconds,//It is possible to disable the wait interval by using waitSeconds of 0.
a=i&&q.startTime+i<(new Date).getTime(),o=[],s=[],c=!1,p=!0;//Do not bother if this call was a result of a cycle break.
if(!x){if(x=!0,//Figure out the state of all the modules.
eachProp(k,function(e){var i=e.map,u=i.id;//Skip things that are not enabled or in error state.
if(e.enabled&&(i.isDefine||s.push(e),!e.error))//If the module should be executed, and it has not
//been inited and time is up, remember it.
if(!e.inited&&a)n(u)?(t=!0,c=!0):(o.push(u),r(u));else if(!e.inited&&e.fetched&&i.isDefine&&(c=!0,!i.prefix))//No reason to keep looking for unfinished
//loading. If the only stillLoading is a
//plugin resource though, keep going,
//because it may be that a plugin resource
//is waiting on a non-plugin cycle.
return p=!1}),a&&o.length)//If wait time expired, throw error of unloaded modules.
return e=makeError("timeout","Load timeout for modules: "+o,null,o),e.contextName=q.contextName,u(e);//Not expired, check for a cycle.
p&&each(s,function(e){f(e,{},{})}),//If still waiting on loads, and the waiting load is something
//other than a plugin resource, or there are still outstanding
//scripts, then just try back later.
a&&!t||!c||!isBrowser&&!isWebWorker||w||(w=setTimeout(function(){w=0,l()},50)),x=!1}}function h(e){//Skip modules already defined.
hasProp(j,e[0])||s(o(e[0],null,!0)).init(e[1],e[2])}function m(e,t,i,r){//Favor detachEvent because of IE9
//issue, see attachEvent/addEventListener comment elsewhere
//in this file.
e.detachEvent&&!isOpera?//Probably IE. If not it will throw an error, which will be
//useful to know.
r&&e.detachEvent(r,t):e.removeEventListener(i,t,!1)}/**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
function g(e){//Using currentTarget instead of target for Firefox 2.0's sake. Not
//all old browsers will be supported, but this one was easy enough
//to support and still makes sense.
var t=e.currentTarget||e.srcElement;//Remove the listeners once here.
return m(t,q.onScriptLoad,"load","onreadystatechange"),m(t,q.onScriptError,"error"),{node:t,id:t&&t.getAttribute("data-requiremodule")}}function v(){var e;//Make sure any remaining defQueue items get properly processed.
for(//Any defined modules in the global queue, intake them now.
p();M.length;){if(e=M.shift(),null===e[0])return u(makeError("mismatch","Mismatched anonymous define() module: "+e[e.length-1]));//args are id, deps, factory. Should be normalized by the
//define() function.
h(e)}}var x,b,q,E,w,y={//Defaults. Do not set a default for map
//config to speed up normalize(), which
//will run faster if there is no default.
waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},S={},//registry of just enabled modules, to speed
//cycle breaking code when lots of modules
//are registered, but not activated.
k={},O={},M=[],j={},P={},R={},A=1,T=1;return E={require:function(e){return e.require?e.require:e.require=q.makeRequire(e.map)},exports:function(e){return e.usingExports=!0,e.map.isDefine?e.exports?j[e.map.id]=e.exports:e.exports=j[e.map.id]={}:void 0},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map.url,config:function(){return getOwn(y.config,e.map.id)||{}},exports:e.exports||(e.exports={})}}},b=function(e){this.events=getOwn(O,e.id)||{},this.map=e,this.shim=getOwn(y.shim,e.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},b.prototype={init:function(e,t,i,r){r=r||{},//Do not do more inits if already done. Can happen if there
//are multiple define calls for the same module. That is not
//a normal, common case, but it is also not unexpected.
this.inited||(this.factory=t,i?//Register for errors on this module.
this.on("error",i):this.events.error&&(//If no errback already, but there are error listeners
//on this module, set up an errback to pass to the deps.
i=bind(this,function(e){this.emit("error",e)})),//Do a copy of the dependency array, so that
//source inputs are not modified. For example
//"shim" deps are passed in here directly, and
//doing a direct modification of the depMaps array
//would affect that config.
this.depMaps=e&&e.slice(0),this.errback=i,//Indicate this module has be initialized
this.inited=!0,this.ignore=r.ignore,//Could have option to init this module in enabled mode,
//or could have been previously marked as enabled. However,
//the dependencies are not known until init is called. So
//if enabled previously, now trigger dependencies as enabled.
r.enabled||this.enabled?//Enable this module and dependencies.
//Will call this.check()
this.enable():this.check())},defineDep:function(e,t){//Because of cycles, defined callback for a given
//export can be called more than once.
this.depMatched[e]||(this.depMatched[e]=!0,this.depCount-=1,this.depExports[e]=t)},fetch:function(){if(!this.fetched){this.fetched=!0,q.startTime=(new Date).getTime();var e=this.map;//If the manager is for a plugin managed resource,
//ask the plugin to load it now.
//If the manager is for a plugin managed resource,
//ask the plugin to load it now.
return this.shim?void q.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return e.prefix?this.callPlugin():this.load()})):e.prefix?this.callPlugin():this.load()}},load:function(){var e=this.map.url;//Regular dependency.
P[e]||(P[e]=!0,q.load(this.map.id,e))},/**
             * Checks if the module is ready to define itself, and if so,
             * define it.
             */
check:function(){if(this.enabled&&!this.enabling){var e,t,i=this.map.id,r=this.depExports,n=this.exports,a=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(//The factory could trigger another require call
//that would result in checking this module to
//define itself again. If already in the process
//of doing that, skip this work.
this.defining=!0,this.depCount<1&&!this.defined){if(isFunction(a)){//If there is an error listener, favor passing
//to that instead of throwing an error. However,
//only do it for define()'d  modules. require
//errbacks should not be called for failures in
//their callbacks (#699). However if a global
//onError is set, use that.
if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)try{n=q.execCb(i,a,r,n)}catch(o){e=o}else n=q.execCb(i,a,r,n);if(// Favor return value over exports. If node/cjs in play,
// then will not have a return value anyway. Favor
// module.exports assignment over exports object.
this.map.isDefine&&void 0===n&&(t=this.module,t?n=t.exports:this.usingExports&&(//exports already set the defined value.
n=this.exports)),e)return e.requireMap=this.map,e.requireModules=this.map.isDefine?[this.map.id]:null,e.requireType=this.map.isDefine?"define":"require",u(this.error=e)}else//Just a literal value
n=a;this.exports=n,this.map.isDefine&&!this.ignore&&(j[i]=n,req.onResourceLoad&&req.onResourceLoad(q,this.map,this.depMaps)),//Clean up
d(i),this.defined=!0}//Finished the define stage. Allow calling check again
//to allow define notifications below in the case of a
//cycle.
this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var e=this.map,t=e.id,//Map already normalized the prefix.
r=o(e.prefix);//Mark this as a dependency for this plugin, so it
//can be traced for cycles.
this.depMaps.push(r),c(r,"defined",bind(this,function(r){var n,a,p,f=getOwn(R,this.map.id),l=this.map.name,h=this.map.parentMap?this.map.parentMap.name:null,m=q.makeRequire(e.parentMap,{enableBuildCallback:!0});//If current map is not normalized, wait for that
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
return this.map.unnormalized?(r.normalize&&(l=r.normalize(l,function(e){return i(e,h,!0)})||""),a=o(e.prefix+"!"+l,this.map.parentMap),c(a,"defined",bind(this,function(e){this.init([],function(){return e},null,{enabled:!0,ignore:!0})})),p=getOwn(S,a.id),void(p&&(this.depMaps.push(a),this.events.error&&p.on("error",bind(this,function(e){this.emit("error",e)})),p.enable()))):f?(this.map.url=q.nameToUrl(f),void this.load()):(n=bind(this,function(e){this.init([],function(){return e},null,{enabled:!0})}),n.error=bind(this,function(e){this.inited=!0,this.error=e,e.requireModules=[t],//Remove temp unnormalized modules for this module,
//since they will never be resolved otherwise now.
eachProp(S,function(e){0===e.map.id.indexOf(t+"_unnormalized")&&d(e.map.id)}),u(e)}),n.fromText=bind(this,function(i,r){/*jslint evil: true */
var a=e.name,c=o(a),p=useInteractive;//As of 2.1.0, support just passing the text, to reinforce
//fromText only being called once per resource. Still
//support old style of passing moduleName but discard
//that moduleName in favor of the internal ref.
r&&(i=r),//Turn off interactive script matching for IE for any define
//calls in the text, then turn it back on at the end.
p&&(useInteractive=!1),//Prime the system by creating a module instance for
//it.
s(c),//Transfer any config to this other module.
hasProp(y.config,t)&&(y.config[a]=y.config[t]);try{req.exec(i)}catch(d){return u(makeError("fromtexteval","fromText eval for "+t+" failed: "+d,d,[t]))}p&&(useInteractive=!0),//Mark this as a dependency for the plugin
//resource
this.depMaps.push(c),//Support anonymous modules.
q.completeLoad(a),//Bind the value of that module to the value for this
//resource ID.
m([a],n)}),void r.load(e.name,m,n,y))})),q.enable(r,this),this.pluginMaps[r.id]=r},enable:function(){k[this.map.id]=this,this.enabled=!0,//Set flag mentioning that the module is enabling,
//so that immediate calls to the defined callbacks
//for dependencies do not trigger inadvertent load
//with the depCount still being zero.
this.enabling=!0,//Enable each dependency
each(this.depMaps,bind(this,function(e,t){var i,r,n;if("string"==typeof e){if(//Dependency needs to be converted to a depMap
//and wired up to this module.
e=o(e,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[t]=e,n=getOwn(E,e.id))return void(this.depExports[t]=n(this));this.depCount+=1,c(e,"defined",bind(this,function(e){this.defineDep(t,e),this.check()})),this.errback&&c(e,"error",bind(this,this.errback))}i=e.id,r=S[i],//Skip special modules like 'require', 'exports', 'module'
//Also, don't call enable if it is already enabled,
//important in circular dependency cases.
hasProp(E,i)||!r||r.enabled||q.enable(e,this)})),//Enable each plugin that is used in
//a dependency
eachProp(this.pluginMaps,bind(this,function(e){var t=getOwn(S,e.id);t&&!t.enabled&&q.enable(e,this)})),this.enabling=!1,this.check()},on:function(e,t){var i=this.events[e];i||(i=this.events[e]=[]),i.push(t)},emit:function(e,t){each(this.events[e],function(e){e(t)}),"error"===e&&//Now that the error handler was triggered, remove
//the listeners, since this broken Module instance
//can stay around for a while in the registry.
delete this.events[e]}},q={config:y,contextName:e,registry:S,defined:j,urlFetched:P,defQueue:M,Module:b,makeModuleMap:o,nextTick:req.nextTick,onError:u,/**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
configure:function(e){//Make sure the baseUrl ends in a slash.
e.baseUrl&&"/"!==e.baseUrl.charAt(e.baseUrl.length-1)&&(e.baseUrl+="/");//Save off the paths since they require special processing,
//they are additive.
var t=y.shim,i={paths:!0,bundles:!0,config:!0,map:!0};eachProp(e,function(e,t){i[t]?(y[t]||(y[t]={}),mixin(y[t],e,!0,!0)):y[t]=e}),//Reverse map the bundles
e.bundles&&eachProp(e.bundles,function(e,t){each(e,function(e){e!==t&&(R[e]=t)})}),//Merge shim
e.shim&&(eachProp(e.shim,function(e,i){//Normalize the structure
isArray(e)&&(e={deps:e}),!e.exports&&!e.init||e.exportsFn||(e.exportsFn=q.makeShimExports(e)),t[i]=e}),y.shim=t),//Adjust packages if necessary.
e.packages&&each(e.packages,function(e){var t,i;e="string"==typeof e?{name:e}:e,i=e.name,t=e.location,t&&(y.paths[i]=e.location),//Save pointer to main module ID for pkg name.
//Remove leading dot in main, so main paths are normalized,
//and remove any trailing .js, since different package
//envs have different conventions: some use a module name,
//some use a file name.
y.pkgs[i]=e.name+"/"+(e.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}),//If there are any "waiting to execute" modules in the registry,
//update the maps for them, since their info, like URLs to load,
//may have changed.
eachProp(S,function(e,t){//If module already has init called, since it is too
//late to modify them, and ignore unnormalized ones
//since they are transient.
e.inited||e.map.unnormalized||(e.map=o(t))}),//If a deps array or a config callback is specified, then call
//require with those args. This is useful when require is defined as a
//config object before require.js is loaded.
(e.deps||e.callback)&&q.require(e.deps||[],e.callback)},makeShimExports:function(e){function t(){var t;return e.init&&(t=e.init.apply(global,arguments)),t||e.exports&&getGlobal(e.exports)}return t},makeRequire:function(t,n){function a(i,r,c){var p,d,f;//If require|exports|module are requested, get the
//value for them from the special handlers. Caveat:
//this only works while module is being defined.
//Synchronous access to one module. If require.get is
//available (as in the Node adapter), prefer that.
//Normalize module name, if it contains . or ..
//Grab defines waiting in the global queue.
//Mark all the dependencies as needing to be loaded.
return n.enableBuildCallback&&r&&isFunction(r)&&(r.__requireJsBuild=!0),"string"==typeof i?isFunction(r)?u(makeError("requireargs","Invalid require call"),c):t&&hasProp(E,i)?E[i](S[t.id]):req.get?req.get(q,i,t,a):(d=o(i,t,!1,!0),p=d.id,hasProp(j,p)?j[p]:u(makeError("notloaded",'Module name "'+p+'" has not been loaded yet for context: '+e+(t?"":". Use require([])")))):(v(),q.nextTick(function(){//Some defines could have been added since the
//require call, collect them.
v(),f=s(o(null,t)),//Store if map config should be applied to this require
//call for dependencies.
f.skipMap=n.skipMap,f.init(i,r,c,{enabled:!0}),l()}),a)}//Only allow undef on top level require calls
return n=n||{},mixin(a,{isBrowser:isBrowser,/**
                     * Converts a module name + .extension into an URL path.
                     * *Requires* the use of a module name. It does not support using
                     * plain URLs like nameToUrl.
                     */
toUrl:function(e){var r,n=e.lastIndexOf("."),a=e.split("/")[0],o="."===a||".."===a;//Have a file extension alias, and it is not the
//dots from a relative path.
return-1!==n&&(!o||n>1)&&(r=e.substring(n,e.length),e=e.substring(0,n)),q.nameToUrl(i(e,t&&t.id,!0),r,!0)},defined:function(e){return hasProp(j,o(e,t,!1,!0).id)},specified:function(e){return e=o(e,t,!1,!0).id,hasProp(j,e)||hasProp(S,e)}}),t||(a.undef=function(e){//Bind any waiting define() calls to this context,
//fix for #408
p();var i=o(e,t,!0),n=getOwn(S,e);r(e),delete j[e],delete P[i.url],delete O[e],//Clean queued defines too. Go backwards
//in array so that the splices do not
//mess up the iteration.
eachReverse(M,function(t,i){t[0]===e&&M.splice(i,1)}),n&&(//Hold on to listeners in case the
//module will be attempted to be reloaded
//using a different config.
n.events.defined&&(O[e]=n.events),d(e))}),a},/**
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
completeLoad:function(e){var t,i,r,a=getOwn(y.shim,e)||{},o=a.exports;for(p();M.length;){if(i=M.shift(),null===i[0]){//If already found an anonymous module and bound it
//to this name, then this is some other anon module
//waiting for its completeLoad to fire.
if(i[0]=e,t)break;t=!0}else i[0]===e&&(//Found matching define call for this script!
t=!0);h(i)}if(//Do this after the cycle of callGetModule in case the result
//of those calls/init calls changes the registry.
r=getOwn(S,e),!t&&!hasProp(j,e)&&r&&!r.inited){if(!(!y.enforceDefine||o&&getGlobal(o)))return n(e)?void 0:u(makeError("nodefine","No define call for "+e,null,[e]));//A script that does not call define(), so just simulate
//the call for it.
h([e,a.deps||[],a.exportsFn])}l()},/**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
nameToUrl:function(e,t,i){var r,n,a,o,s,c,u,p=getOwn(y.pkgs,e);if(p&&(e=p),u=getOwn(R,e))return q.nameToUrl(u,t,i);//If a colon is in the URL, it indicates a protocol is used and it is just
//an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
//or ends with .js, then assume the user meant to use an url and not a module id.
//The slash is important for protocol-less URLs as well as full paths.
if(req.jsExtRegExp.test(e))//Just a plain path, not module name lookup, so just return it.
//Add extension if it is included. This is a bit wonky, only non-.js things pass
//an extension, this method probably needs to be reworked.
s=e+(t||"");else{//For each module name segment, see if there is a path
//registered for it. Start with most specific name
//and work up from it.
for(//A module that needs to be converted to a path.
r=y.paths,n=e.split("/"),a=n.length;a>0;a-=1)if(o=n.slice(0,a).join("/"),c=getOwn(r,o)){//If an array, it means there are a few choices,
//Choose the one that is desired
isArray(c)&&(c=c[0]),n.splice(0,a,c);break}//Join the path parts together, then figure out if baseUrl is needed.
s=n.join("/"),s+=t||(/^data\:|\?/.test(s)||i?"":".js"),s=("/"===s.charAt(0)||s.match(/^[\w\+\.\-]+:/)?"":y.baseUrl)+s}return y.urlArgs?s+((-1===s.indexOf("?")?"?":"&")+y.urlArgs):s},//Delegates to req.load. Broken out as a separate function to
//allow overriding in the optimizer.
load:function(e,t){req.load(q,e,t)},/**
             * Executes a module callback function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
execCb:function(e,t,i,r){return t.apply(r,i)},/**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
onScriptLoad:function(e){//Using currentTarget instead of target for Firefox 2.0's sake. Not
//all old browsers will be supported, but this one was easy enough
//to support and still makes sense.
if("load"===e.type||readyRegExp.test((e.currentTarget||e.srcElement).readyState)){//Reset interactive script so a script node is not held onto for
//to long.
interactiveScript=null;//Pull out the name of the module and the context.
var t=g(e);q.completeLoad(t.id)}},/**
             * Callback for script errors.
             */
onScriptError:function(e){var t=g(e);return n(t.id)?void 0:u(makeError("scripterror","Script error for: "+t.id,e,[t.id]))}},q.require=q.makeRequire(),q}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(e){return"interactive"===e.readyState?interactiveScript=e:void 0}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.1.15",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,ap=Array.prototype,apsp=ap.splice,isBrowser=!("undefined"==typeof window||"undefined"==typeof navigator||!window.document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,//PS3 indicates loaded and complete, but need to wait for complete
//specifically. Sequence is 'loading', 'loaded', execution,
// then 'complete'. The UA check is unfortunate, but not sure how
//to feature test w/o causing perf issues.
readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",//Oh the tragedy, detecting opera. See the usage of isOpera for reason.
isOpera="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if("undefined"==typeof define){if("undefined"!=typeof requirejs){if(isFunction(requirejs))//Do not overwrite an existing requirejs instance.
return;cfg=requirejs,requirejs=void 0}//Allow for a require config object
"undefined"==typeof require||isFunction(require)||(//assume it is a config object.
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
req=requirejs=function(e,t,i,r){//Find the right context, use default
var n,a,o=defContextName;// Determine if have config object in the call.
// deps is a config object
// Adjust args if there are dependencies
return isArray(e)||"string"==typeof e||(a=e,isArray(t)?(e=t,t=i,i=r):e=[]),a&&a.context&&(o=a.context),n=getOwn(contexts,o),n||(n=contexts[o]=req.s.newContext(o)),a&&n.configure(a),n.require(e,t,i)},/**
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
require||(require=req),req.version=version,//Used to filter out dependencies that are already paths.
req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},//Create default context.
req({}),//Exports some context-sensitive methods on global require.
each(["toUrl","undef","defined","specified"],function(e){//Reference from contexts instead of early binding to default context,
//so that during builds, the latest instance of the default context
//with its config gets used.
req[e]=function(){var t=contexts[defContextName];return t.require[e].apply(t,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],//If BASE tag is in play, using appendChild is a problem for IE6.
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
req.createNode=function(e){var t=e.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return t.type=e.scriptType||"text/javascript",t.charset="utf-8",t.async=!0,t},/**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
req.load=function(e,t,i){var r,n=e&&e.config||{};if(isBrowser)//In the browser so use a script tag
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
return r=req.createNode(n,t,i),r.setAttribute("data-requirecontext",e.contextName),r.setAttribute("data-requiremodule",t),!r.attachEvent||r.attachEvent.toString&&r.attachEvent.toString().indexOf("[native code")<0||isOpera?(r.addEventListener("load",e.onScriptLoad,!1),r.addEventListener("error",e.onScriptError,!1)):(useInteractive=!0,r.attachEvent("onreadystatechange",e.onScriptLoad)),r.src=i,currentlyAddingScript=r,baseElement?head.insertBefore(r,baseElement):head.appendChild(r),currentlyAddingScript=null,r;if(isWebWorker)try{//In a web worker, use importScripts. This is not a very
//efficient use of importScripts, importScripts will block until
//its script is downloaded and evaluated. However, if web workers
//are in play, the expectation that a build has been done so that
//only one script needs to be loaded anyway. This may need to be
//reevaluated if other use cases become common.
importScripts(i),//Account for anonymous modules
e.completeLoad(t)}catch(a){e.onError(makeError("importscripts","importScripts failed for "+t+" at "+i,a,[t]))}},//Look for a data-main script attribute, which could also adjust the baseUrl.
isBrowser&&!cfg.skipDataMain&&//Figure out baseUrl. Get it from the script tag with require.js in it.
eachReverse(scripts(),function(e){//Set the 'head' where we can append children by
//using the script's parent.
//Look for a data-main attribute to set main script for the page
//to load. If it is there, the path to data main becomes the
//baseUrl, if it is not already set.
//Preserve dataMain in case it is a path (i.e. contains '?')
//Set final baseUrl if there is not already an explicit one.
//Pull off the directory of data-main for use as the
//baseUrl.
//Strip off any trailing .js since mainScript is now
//like a module name.
//If mainScript is still a path, fall back to dataMain
//Put the data-main script in the files to load.
return head||(head=e.parentNode),dataMain=e.getAttribute("data-main"),dataMain?(mainScript=dataMain,cfg.baseUrl||(src=mainScript.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0):void 0}),/**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
define=function(e,t,i){var r,n;//Allow for anonymous modules
"string"!=typeof e&&(//Adjust args appropriately
i=t,t=e,e=null),//This module may not have dependencies
isArray(t)||(i=t,t=null),//If no name, and callback is a function, then figure out if it a
//CommonJS thing with dependencies.
!t&&isFunction(i)&&(t=[],//Remove comments from the callback string,
//look for require calls, and pull them into the dependencies,
//but only if there are function args.
i.length&&(i.toString().replace(commentRegExp,"").replace(cjsRequireRegExp,function(e,i){t.push(i)}),//May be a CommonJS thing even without require calls, but still
//could use exports, and module. Avoid doing exports and module
//work though if it just needs require.
//REQUIRES the function to expect the CommonJS variables in the
//order listed below.
t=(1===i.length?["require"]:["require","exports","module"]).concat(t))),//If in IE 6-8 and hit an anonymous define() call, do the interactive
//work.
useInteractive&&(r=currentlyAddingScript||getInteractiveScript(),r&&(e||(e=r.getAttribute("data-requiremodule")),n=contexts[r.getAttribute("data-requirecontext")])),//Always save off evaluating the def call until the script onload handler.
//This allows multiple modules to be in a file without prematurely
//tracing dependencies, and allows for anonymous module support,
//where the module name is not known until the script onload event
//occurs. If no context, use the global queue, and get it processed
//in the onscript load callback.
(n?n.defQueue:globalDefQueue).push([e,t,i])},define.amd={jQuery:!0},/**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
req.exec=function(text){/*jslint evil: true */
return eval(text)},//Set up with config info.
req(cfg)}}(this);