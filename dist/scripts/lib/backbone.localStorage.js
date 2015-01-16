/**
 * Backbone localStorage Adapter
 * Version 1.1.15
 *
 * https://github.com/jeromegn/Backbone.localStorage
 */
!function(e,t){"object"==typeof exports&&"function"==typeof require?module.exports=t(require("backbone")):"function"==typeof define&&define.amd?// AMD. Register as an anonymous module.
define(["backbone"],function(r){// Use global variables if the locals are undefined.
return t(r||e.Backbone)}):t(Backbone)}(this,function(e){// A simple module to replace `Backbone.sync` with *localStorage*-based
// persistence. Models are given GUIDS, and saved into a JSON object. Simple
// as that.
// Generate four random hex digits.
function t(){return(65536*(1+Math.random())|0).toString(16).substring(1)}// Generate a pseudo-GUID by concatenating random hexadecimal.
function r(){return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()}function i(e){return e===Object(e)}function o(e,t){for(var r=e.length;r--;)if(e[r]===t)return!0;return!1}function n(e,t){for(var r in t)e[r]=t[r];return e}function a(e,t){if(null==e)return void 0;var r=e[t];return"function"==typeof r?e[t]():r}// Our Store is represented by a single JS object in *localStorage*. Create it
// with a meaningful name, like the name you'd give a table.
// window.Store is deprectated, use Backbone.LocalStorage instead
// localSync delegate to the model or collection's
// *localStorage* property, which should be an instance of `Store`.
// window.Store.sync and Backbone.localSync is deprecated, use Backbone.LocalStorage.sync instead
// Override 'Backbone.sync' to default to localSync,
// the original 'Backbone.sync' is still available in 'Backbone.ajaxSync'
return e.LocalStorage=window.Store=function(e,t){if(!this.localStorage)throw"Backbone.localStorage: Environment does not support localStorage.";this.name=e,this.serializer=t||{serialize:function(e){return i(e)?JSON.stringify(e):e},// fix for "illegal access" error on Android when JSON.parse is passed null
deserialize:function(e){return e&&JSON.parse(e)}};var r=this.localStorage().getItem(this.name);this.records=r&&r.split(",")||[]},n(e.LocalStorage.prototype,{// Save the current state of the **Store** to *localStorage*.
save:function(){this.localStorage().setItem(this.name,this.records.join(","))},// Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
// have an id of it's own.
create:function(e){return e.id||0===e.id||(e.id=r(),e.set(e.idAttribute,e.id)),this.localStorage().setItem(this._itemName(e.id),this.serializer.serialize(e)),this.records.push(e.id.toString()),this.save(),this.find(e)},// Update a model by replacing its copy in `this.data`.
update:function(e){this.localStorage().setItem(this._itemName(e.id),this.serializer.serialize(e));var t=e.id.toString();return o(this.records,t)||(this.records.push(t),this.save()),this.find(e)},// Retrieve a model from `this.data` by id.
find:function(e){return this.serializer.deserialize(this.localStorage().getItem(this._itemName(e.id)))},// Return the array of all models currently in storage.
findAll:function(){for(var e,t,r=[],i=0;i<this.records.length;i++)e=this.records[i],t=this.serializer.deserialize(this.localStorage().getItem(this._itemName(e))),null!=t&&r.push(t);return r},// Delete a model from `this.data`, returning it.
destroy:function(e){this.localStorage().removeItem(this._itemName(e.id));for(var t=e.id.toString(),r=0;r<this.records.length;r++)this.records[r]===t&&this.records.splice(r,1);return this.save(),e},localStorage:function(){return localStorage},// Clear localStorage for specific collection.
_clear:function(){var e=this.localStorage(),t=new RegExp("^"+this.name+"-");// Remove id-tracking item (e.g., "foo").
e.removeItem(this.name);// Match all data items (e.g., "foo-ID") and remove.
for(var r in e)t.test(r)&&e.removeItem(r);this.records.length=0},// Size of localStorage.
_storageSize:function(){return this.localStorage().length},_itemName:function(e){return this.name+"-"+e}}),e.LocalStorage.sync=window.Store.sync=e.localSync=function(t,r,i){var o,n,s=a(r,"localStorage")||a(r.collection,"localStorage"),c=e.$?e.$.Deferred&&e.$.Deferred():e.Deferred&&e.Deferred();try{switch(t){case"read":o=void 0!=r.id?s.find(r):s.findAll();break;case"create":o=s.create(r);break;case"update":o=s.update(r);break;case"delete":o=s.destroy(r)}}catch(l){n=22===l.code&&0===s._storageSize()?"Private browsing is unsupported":l.message}// add compatibility with $.ajax
// always execute callback for success and error
return o?(i&&i.success&&("0.9.10"===e.VERSION?i.success(r,o,i):i.success(o)),c&&c.resolve(o)):(n=n?n:"Record Not Found",i&&i.error&&("0.9.10"===e.VERSION?i.error(r,n,i):i.error(n)),c&&c.reject(n)),i&&i.complete&&i.complete(o),c&&c.promise()},e.ajaxSync=e.sync,e.getSyncMethod=function(t,r){var i=r&&r.ajaxSync;return!i&&(t.localStorage||t.collection&&t.collection.localStorage)?e.localSync:e.ajaxSync},e.sync=function(t,r,i){return e.getSyncMethod(r,i).apply(this,[t,r,i])},e.LocalStorage});