//     Backbone.js 1.1.2
//     (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org
!function(t,e){// Set up Backbone appropriately for the environment. Start with AMD.
if("function"==typeof define&&define.amd)define(["underscore","jquery","exports"],function(i,n,s){// Export global even in AMD case in case this script is loaded with
// others that may still expect a global Backbone.
t.Backbone=e(t,s,i,n)});else if("undefined"!=typeof exports){var i=require("underscore");e(t,exports,i)}else t.Backbone=e(t,{},t._,t.jQuery||t.Zepto||t.ender||t.$)}(this,function(t,e,i,n){// Initial Setup
// -------------
// Save the previous value of the `Backbone` variable, so that it can be
// restored later on, if `noConflict` is used.
{var s=t.Backbone,r=[],a=(r.push,r.slice);r.splice}// Current version of the library. Keep in sync with `package.json`.
e.VERSION="1.1.2",// For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
// the `$` variable.
e.$=n,// Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
// to its previous owner. Returns a reference to this Backbone object.
e.noConflict=function(){return t.Backbone=s,this},// Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
// will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
// set a `X-Http-Method-Override` header.
e.emulateHTTP=!1,// Turn on `emulateJSON` to support legacy servers that can't deal with direct
// `application/json` requests ... will encode the body as
// `application/x-www-form-urlencoded` instead and will send the model in a
// form param named `model`.
e.emulateJSON=!1;// Backbone.Events
// ---------------
// A module that can be mixed in to *any object* in order to provide it with
// custom events. You may bind with `on` or remove with `off` callback
// functions to an event; `trigger`-ing an event fires all callbacks in
// succession.
//
//     var object = {};
//     _.extend(object, Backbone.Events);
//     object.on('expand', function(){ alert('expanded'); });
//     object.trigger('expand');
//
var o=e.Events={// Bind an event to a `callback` function. Passing `"all"` will bind
// the callback to all events fired.
on:function(t,e,i){if(!u(this,"on",t,[e,i])||!e)return this;this._events||(this._events={});var n=this._events[t]||(this._events[t]=[]);return n.push({callback:e,context:i,ctx:i||this}),this},// Bind an event to only be triggered a single time. After the first time
// the callback is invoked, it will be removed.
once:function(t,e,n){if(!u(this,"once",t,[e,n])||!e)return this;var s=this,r=i.once(function(){s.off(t,r),e.apply(this,arguments)});return r._callback=e,this.on(t,r,n)},// Remove one or many callbacks. If `context` is null, removes all
// callbacks with that function. If `callback` is null, removes all
// callbacks for the event. If `name` is null, removes all bound
// callbacks for all events.
off:function(t,e,n){var s,r,a,o,h,c,l,d;if(!this._events||!u(this,"off",t,[e,n]))return this;if(!t&&!e&&!n)return this._events=void 0,this;for(o=t?[t]:i.keys(this._events),h=0,c=o.length;c>h;h++)if(t=o[h],a=this._events[t]){if(this._events[t]=s=[],e||n)for(l=0,d=a.length;d>l;l++)r=a[l],(e&&e!==r.callback&&e!==r.callback._callback||n&&n!==r.context)&&s.push(r);s.length||delete this._events[t]}return this},// Trigger one or many events, firing all bound callbacks. Callbacks are
// passed the same arguments as `trigger` is, apart from the event name
// (unless you're listening on `"all"`, which will cause your callback to
// receive the true name of the event as the first argument).
trigger:function(t){if(!this._events)return this;var e=a.call(arguments,1);if(!u(this,"trigger",t,e))return this;var i=this._events[t],n=this._events.all;return i&&c(i,e),n&&c(n,arguments),this},// Tell this object to stop listening to either specific events ... or
// to every object it's currently listening to.
stopListening:function(t,e,n){var s=this._listeningTo;if(!s)return this;var r=!e&&!n;n||"object"!=typeof e||(n=this),t&&((s={})[t._listenId]=t);for(var a in s)t=s[a],t.off(e,n,this),(r||i.isEmpty(t._events))&&delete this._listeningTo[a];return this}},h=/\s+/,u=function(t,e,i,n){if(!i)return!0;// Handle event maps.
if("object"==typeof i){for(var s in i)t[e].apply(t,[s,i[s]].concat(n));return!1}// Handle space separated event names.
if(h.test(i)){for(var r=i.split(h),a=0,o=r.length;o>a;a++)t[e].apply(t,[r[a]].concat(n));return!1}return!0},c=function(t,e){var i,n=-1,s=t.length,r=e[0],a=e[1],o=e[2];switch(e.length){case 0:for(;++n<s;)(i=t[n]).callback.call(i.ctx);return;case 1:for(;++n<s;)(i=t[n]).callback.call(i.ctx,r);return;case 2:for(;++n<s;)(i=t[n]).callback.call(i.ctx,r,a);return;case 3:for(;++n<s;)(i=t[n]).callback.call(i.ctx,r,a,o);return;default:for(;++n<s;)(i=t[n]).callback.apply(i.ctx,e);return}},l={listenTo:"on",listenToOnce:"once"};// Inversion-of-control versions of `on` and `once`. Tell *this* object to
// listen to an event in another object ... keeping track of what it's
// listening to.
i.each(l,function(t,e){o[e]=function(e,n,s){var r=this._listeningTo||(this._listeningTo={}),a=e._listenId||(e._listenId=i.uniqueId("l"));return r[a]=e,s||"object"!=typeof n||(s=this),e[t](n,s,this),this}}),// Aliases for backwards compatibility.
o.bind=o.on,o.unbind=o.off,// Allow the `Backbone` object to serve as a global event bus, for folks who
// want global "pubsub" in a convenient place.
i.extend(e,o);// Backbone.Model
// --------------
// Backbone **Models** are the basic data object in the framework --
// frequently representing a row in a table in a database on your server.
// A discrete chunk of data and a bunch of useful, related methods for
// performing computations and transformations on that data.
// Create a new model with the specified attributes. A client id (`cid`)
// is automatically generated and assigned for you.
var d=e.Model=function(t,e){var n=t||{};e||(e={}),this.cid=i.uniqueId("c"),this.attributes={},e.collection&&(this.collection=e.collection),e.parse&&(n=this.parse(n,e)||{}),n=i.defaults({},n,i.result(this,"defaults")),this.set(n,e),this.changed={},this.initialize.apply(this,arguments)};// Attach all inheritable methods to the Model prototype.
i.extend(d.prototype,o,{// A hash of attributes whose current and previous value differ.
changed:null,// The value returned during the last failed validation.
validationError:null,// The default name for the JSON `id` attribute is `"id"`. MongoDB and
// CouchDB users may want to set this to `"_id"`.
idAttribute:"id",// Initialize is an empty function by default. Override it with your own
// initialization logic.
initialize:function(){},// Return a copy of the model's `attributes` object.
toJSON:function(){return i.clone(this.attributes)},// Proxy `Backbone.sync` by default -- but override this if you need
// custom syncing semantics for *this* particular model.
sync:function(){return e.sync.apply(this,arguments)},// Get the value of an attribute.
get:function(t){return this.attributes[t]},// Get the HTML-escaped value of an attribute.
escape:function(t){return i.escape(this.get(t))},// Returns `true` if the attribute contains a value that is not null
// or undefined.
has:function(t){return null!=this.get(t)},// Set a hash of model attributes on the object, firing `"change"`. This is
// the core primitive operation of a model, updating the data and notifying
// anyone who needs to know about the change in state. The heart of the beast.
set:function(t,e,n){var s,r,a,o,h,u,c,l;if(null==t)return this;// Run validation.
if(// Handle both `"key", value` and `{key: value}` -style arguments.
"object"==typeof t?(r=t,n=e):(r={})[t]=e,n||(n={}),!this._validate(r,n))return!1;// Extract attributes and options.
a=n.unset,h=n.silent,o=[],u=this._changing,this._changing=!0,u||(this._previousAttributes=i.clone(this.attributes),this.changed={}),l=this.attributes,c=this._previousAttributes,// Check for changes of `id`.
this.idAttribute in r&&(this.id=r[this.idAttribute]);// For each `set` attribute, update or delete the current value.
for(s in r)e=r[s],i.isEqual(l[s],e)||o.push(s),i.isEqual(c[s],e)?delete this.changed[s]:this.changed[s]=e,a?delete l[s]:l[s]=e;// Trigger all relevant attribute changes.
if(!h){o.length&&(this._pending=n);for(var d=0,f=o.length;f>d;d++)this.trigger("change:"+o[d],this,l[o[d]],n)}// You might be wondering why there's a `while` loop here. Changes can
// be recursively nested within `"change"` events.
if(u)return this;if(!h)for(;this._pending;)n=this._pending,this._pending=!1,this.trigger("change",this,n);return this._pending=!1,this._changing=!1,this},// Remove an attribute from the model, firing `"change"`. `unset` is a noop
// if the attribute doesn't exist.
unset:function(t,e){return this.set(t,void 0,i.extend({},e,{unset:!0}))},// Clear all attributes on the model, firing `"change"`.
clear:function(t){var e={};for(var n in this.attributes)e[n]=void 0;return this.set(e,i.extend({},t,{unset:!0}))},// Determine if the model has changed since the last `"change"` event.
// If you specify an attribute name, determine if that attribute has changed.
hasChanged:function(t){return null==t?!i.isEmpty(this.changed):i.has(this.changed,t)},// Return an object containing all the attributes that have changed, or
// false if there are no changed attributes. Useful for determining what
// parts of a view need to be updated and/or what attributes need to be
// persisted to the server. Unset attributes will be set to undefined.
// You can also pass an attributes object to diff against the model,
// determining if there *would be* a change.
changedAttributes:function(t){if(!t)return this.hasChanged()?i.clone(this.changed):!1;var e,n=!1,s=this._changing?this._previousAttributes:this.attributes;for(var r in t)i.isEqual(s[r],e=t[r])||((n||(n={}))[r]=e);return n},// Get the previous value of an attribute, recorded at the time the last
// `"change"` event was fired.
previous:function(t){return null!=t&&this._previousAttributes?this._previousAttributes[t]:null},// Get all of the attributes of the model at the time of the previous
// `"change"` event.
previousAttributes:function(){return i.clone(this._previousAttributes)},// Fetch the model from the server. If the server's representation of the
// model differs from its current attributes, they will be overridden,
// triggering a `"change"` event.
fetch:function(t){t=t?i.clone(t):{},void 0===t.parse&&(t.parse=!0);var e=this,n=t.success;return t.success=function(i){return e.set(e.parse(i,t),t)?(n&&n(e,i,t),void e.trigger("sync",e,i,t)):!1},U(this,t),this.sync("read",this,t)},// Set a hash of model attributes, and sync the model to the server.
// If the server returns an attributes hash that differs, the model's
// state will be `set` again.
save:function(t,e,n){var s,r,a,o=this.attributes;// If we're not waiting and attributes exist, save acts as
// `set(attr).save(null, opts)` with validation. Otherwise, check if
// the model will be valid when the attributes, if any, are set.
if(// Handle both `"key", value` and `{key: value}` -style arguments.
null==t||"object"==typeof t?(s=t,n=e):(s={})[t]=e,n=i.extend({validate:!0},n),s&&!n.wait){if(!this.set(s,n))return!1}else if(!this._validate(s,n))return!1;// Set temporary attributes if `{wait: true}`.
s&&n.wait&&(this.attributes=i.extend({},o,s)),// After a successful server-side save, the client is (optionally)
// updated with the server-side state.
void 0===n.parse&&(n.parse=!0);var h=this,u=n.success;// Restore attributes.
return n.success=function(t){// Ensure attributes are restored during synchronous saves.
h.attributes=o;var e=h.parse(t,n);return n.wait&&(e=i.extend(s||{},e)),i.isObject(e)&&!h.set(e,n)?!1:(u&&u(h,t,n),void h.trigger("sync",h,t,n))},U(this,n),r=this.isNew()?"create":n.patch?"patch":"update","patch"===r&&(n.attrs=s),a=this.sync(r,this,n),s&&n.wait&&(this.attributes=o),a},// Destroy this model on the server if it was already persisted.
// Optimistically removes the model from its collection, if it has one.
// If `wait: true` is passed, waits for the server to respond before removal.
destroy:function(t){t=t?i.clone(t):{};var e=this,n=t.success,s=function(){e.trigger("destroy",e,e.collection,t)};if(t.success=function(i){(t.wait||e.isNew())&&s(),n&&n(e,i,t),e.isNew()||e.trigger("sync",e,i,t)},this.isNew())return t.success(),!1;U(this,t);var r=this.sync("delete",this,t);return t.wait||s(),r},// Default URL for the model's representation on the server -- if you're
// using Backbone's restful methods, override this to change the endpoint
// that will be called.
url:function(){var t=i.result(this,"urlRoot")||i.result(this.collection,"url")||j();return this.isNew()?t:t.replace(/([^\/])$/,"$1/")+encodeURIComponent(this.id)},// **parse** converts a response into the hash of attributes to be `set` on
// the model. The default implementation is just to pass the response along.
parse:function(t){return t},// Create a new model with identical attributes to this one.
clone:function(){return new this.constructor(this.attributes)},// A model is new if it has never been saved to the server, and lacks an id.
isNew:function(){return!this.has(this.idAttribute)},// Check if the model is currently in a valid state.
isValid:function(t){return this._validate({},i.extend(t||{},{validate:!0}))},// Run validation against the next complete set of model attributes,
// returning `true` if all is well. Otherwise, fire an `"invalid"` event.
_validate:function(t,e){if(!e.validate||!this.validate)return!0;t=i.extend({},this.attributes,t);var n=this.validationError=this.validate(t,e)||null;return n?(this.trigger("invalid",this,n,i.extend(e,{validationError:n})),!1):!0}});// Underscore methods that we want to implement on the Model.
var f=["keys","values","pairs","invert","pick","omit"];// Mix in each Underscore method as a proxy to `Model#attributes`.
i.each(f,function(t){d.prototype[t]=function(){var e=a.call(arguments);return e.unshift(this.attributes),i[t].apply(i,e)}});// Backbone.Collection
// -------------------
// If models tend to represent a single row of data, a Backbone Collection is
// more analagous to a table full of data ... or a small slice or page of that
// table, or a collection of rows that belong together for a particular reason
// -- all of the messages in this particular folder, all of the documents
// belonging to this particular author, and so on. Collections maintain
// indexes of their models, both in order, and for lookup by `id`.
// Create a new **Collection**, perhaps to contain a specific type of `model`.
// If a `comparator` is specified, the Collection will maintain
// its models in sort order, as they're added and removed.
var p=e.Collection=function(t,e){e||(e={}),e.model&&(this.model=e.model),void 0!==e.comparator&&(this.comparator=e.comparator),this._reset(),this.initialize.apply(this,arguments),t&&this.reset(t,i.extend({silent:!0},e))},g={add:!0,remove:!0,merge:!0},v={add:!0,remove:!1};// Define the Collection's inheritable methods.
i.extend(p.prototype,o,{// The default model for a collection is just a **Backbone.Model**.
// This should be overridden in most cases.
model:d,// Initialize is an empty function by default. Override it with your own
// initialization logic.
initialize:function(){},// The JSON representation of a Collection is an array of the
// models' attributes.
toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},// Proxy `Backbone.sync` by default.
sync:function(){return e.sync.apply(this,arguments)},// Add a model, or list of models to the set.
add:function(t,e){return this.set(t,i.extend({merge:!1},e,v))},// Remove a model, or a list of models from the set.
remove:function(t,e){var n=!i.isArray(t);t=n?[t]:i.clone(t),e||(e={});var s,r,a,o;for(s=0,r=t.length;r>s;s++)o=t[s]=this.get(t[s]),o&&(delete this._byId[o.id],delete this._byId[o.cid],a=this.indexOf(o),this.models.splice(a,1),this.length--,e.silent||(e.index=a,o.trigger("remove",o,this,e)),this._removeReference(o,e));return n?t[0]:t},// Update a collection by `set`-ing a new list of models, adding new ones,
// removing models that are no longer present, and merging models that
// already exist in the collection, as necessary. Similar to **Model#set**,
// the core operation for updating the data contained by the collection.
set:function(t,e){e=i.defaults({},e,g),e.parse&&(t=this.parse(t,e));var n=!i.isArray(t);t=n?t?[t]:[]:i.clone(t);var s,r,a,o,h,u,c,l=e.at,f=this.model,p=this.comparator&&null==l&&e.sort!==!1,v=i.isString(this.comparator)?this.comparator:null,m=[],y=[],_={},b=e.add,w=e.merge,x=e.remove,E=!p&&b&&x?[]:!1;// Turn bare objects into model references, and prevent invalid models
// from being added.
for(s=0,r=t.length;r>s;s++){// If a duplicate is found, prevent it from being added and
// optionally merge it into the existing model.
if(h=t[s]||{},a=h instanceof d?o=h:h[f.prototype.idAttribute||"id"],u=this.get(a))x&&(_[u.cid]=!0),w&&(h=h===o?o.attributes:h,e.parse&&(h=u.parse(h,e)),u.set(h,e),p&&!c&&u.hasChanged(v)&&(c=!0)),t[s]=u;else if(b){if(o=t[s]=this._prepareModel(h,e),!o)continue;m.push(o),this._addReference(o,e)}// Do not add multiple models with the same `id`.
o=u||o,!E||!o.isNew()&&_[o.id]||E.push(o),_[o.id]=!0}// Remove nonexistent models if appropriate.
if(x){for(s=0,r=this.length;r>s;++s)_[(o=this.models[s]).cid]||y.push(o);y.length&&this.remove(y,e)}// See if sorting is needed, update `length` and splice in new models.
if(m.length||E&&E.length)if(p&&(c=!0),this.length+=m.length,null!=l)for(s=0,r=m.length;r>s;s++)this.models.splice(l+s,0,m[s]);else{E&&(this.models.length=0);var k=E||m;for(s=0,r=k.length;r>s;s++)this.models.push(k[s])}// Unless silenced, it's time to fire all appropriate add/sort events.
if(// Silently sort the collection if appropriate.
c&&this.sort({silent:!0}),!e.silent){for(s=0,r=m.length;r>s;s++)(o=m[s]).trigger("add",o,this,e);(c||E&&E.length)&&this.trigger("sort",this,e)}// Return the added (or merged) model (or models).
return n?t[0]:t},// When you have more items than you want to add or remove individually,
// you can reset the entire set with a new list of models, without firing
// any granular `add` or `remove` events. Fires `reset` when finished.
// Useful for bulk operations and optimizations.
reset:function(t,e){e||(e={});for(var n=0,s=this.models.length;s>n;n++)this._removeReference(this.models[n],e);return e.previousModels=this.models,this._reset(),t=this.add(t,i.extend({silent:!0},e)),e.silent||this.trigger("reset",this,e),t},// Add a model to the end of the collection.
push:function(t,e){return this.add(t,i.extend({at:this.length},e))},// Remove a model from the end of the collection.
pop:function(t){var e=this.at(this.length-1);return this.remove(e,t),e},// Add a model to the beginning of the collection.
unshift:function(t,e){return this.add(t,i.extend({at:0},e))},// Remove a model from the beginning of the collection.
shift:function(t){var e=this.at(0);return this.remove(e,t),e},// Slice out a sub-array of models from the collection.
slice:function(){return a.apply(this.models,arguments)},// Get a model from the set by id.
get:function(t){return null==t?void 0:this._byId[t]||this._byId[t.id]||this._byId[t.cid]},// Get the model at the given index.
at:function(t){return this.models[t]},// Return models with matching attributes. Useful for simple cases of
// `filter`.
where:function(t,e){return i.isEmpty(t)?e?void 0:[]:this[e?"find":"filter"](function(e){for(var i in t)if(t[i]!==e.get(i))return!1;return!0})},// Return the first model with matching attributes. Useful for simple cases
// of `find`.
findWhere:function(t){return this.where(t,!0)},// Force the collection to re-sort itself. You don't need to call this under
// normal circumstances, as the set will maintain sort order as each item
// is added.
sort:function(t){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");// Run sort based on type of `comparator`.
return t||(t={}),i.isString(this.comparator)||1===this.comparator.length?this.models=this.sortBy(this.comparator,this):this.models.sort(i.bind(this.comparator,this)),t.silent||this.trigger("sort",this,t),this},// Pluck an attribute from each model in the collection.
pluck:function(t){return i.invoke(this.models,"get",t)},// Fetch the default set of models for this collection, resetting the
// collection when they arrive. If `reset: true` is passed, the response
// data will be passed through the `reset` method instead of `set`.
fetch:function(t){t=t?i.clone(t):{},void 0===t.parse&&(t.parse=!0);var e=t.success,n=this;return t.success=function(i){var s=t.reset?"reset":"set";n[s](i,t),e&&e(n,i,t),n.trigger("sync",n,i,t)},U(this,t),this.sync("read",this,t)},// Create a new instance of a model in this collection. Add the model to the
// collection immediately, unless `wait: true` is passed, in which case we
// wait for the server to agree.
create:function(t,e){if(e=e?i.clone(e):{},!(t=this._prepareModel(t,e)))return!1;e.wait||this.add(t,e);var n=this,s=e.success;return e.success=function(t,i){e.wait&&n.add(t,e),s&&s(t,i,e)},t.save(null,e),t},// **parse** converts a response into a list of models to be added to the
// collection. The default implementation is just to pass it through.
parse:function(t){return t},// Create a new collection with an identical list of models as this one.
clone:function(){return new this.constructor(this.models)},// Private method to reset all internal state. Called when the collection
// is first initialized or reset.
_reset:function(){this.length=0,this.models=[],this._byId={}},// Prepare a hash of attributes (or other model) to be added to this
// collection.
_prepareModel:function(t,e){if(t instanceof d)return t;e=e?i.clone(e):{},e.collection=this;var n=new this.model(t,e);return n.validationError?(this.trigger("invalid",this,n.validationError,e),!1):n},// Internal method to create a model's ties to a collection.
_addReference:function(t){this._byId[t.cid]=t,null!=t.id&&(this._byId[t.id]=t),t.collection||(t.collection=this),t.on("all",this._onModelEvent,this)},// Internal method to sever a model's ties to a collection.
_removeReference:function(t){this===t.collection&&delete t.collection,t.off("all",this._onModelEvent,this)},// Internal method called every time a model in the set fires an event.
// Sets need to update their indexes when models change ids. All other
// events simply proxy through. "add" and "remove" events that originate
// in other collections are ignored.
_onModelEvent:function(t,e,i,n){("add"!==t&&"remove"!==t||i===this)&&("destroy"===t&&this.remove(e,n),e&&t==="change:"+e.idAttribute&&(delete this._byId[e.previous(e.idAttribute)],null!=e.id&&(this._byId[e.id]=e)),this.trigger.apply(this,arguments))}});// Underscore methods that we want to implement on the Collection.
// 90% of the core usefulness of Backbone Collections is actually implemented
// right here:
var m=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample"];// Mix in each Underscore method as a proxy to `Collection#models`.
i.each(m,function(t){p.prototype[t]=function(){var e=a.call(arguments);return e.unshift(this.models),i[t].apply(i,e)}});// Underscore methods that take a property name as an argument.
var y=["groupBy","countBy","sortBy","indexBy"];// Use attributes instead of properties.
i.each(y,function(t){p.prototype[t]=function(e,n){var s=i.isFunction(e)?e:function(t){return t.get(e)};return i[t](this.models,s,n)}});// Backbone.View
// -------------
// Backbone Views are almost more convention than they are actual code. A View
// is simply a JavaScript object that represents a logical chunk of UI in the
// DOM. This might be a single item, an entire list, a sidebar or panel, or
// even the surrounding frame which wraps your whole app. Defining a chunk of
// UI as a **View** allows you to define your DOM events declaratively, without
// having to worry about render order ... and makes it easy for the view to
// react to specific changes in the state of your models.
// Creating a Backbone.View creates its initial element outside of the DOM,
// if an existing element is not provided...
var _=e.View=function(t){this.cid=i.uniqueId("view"),t||(t={}),i.extend(this,i.pick(t,w)),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()},b=/^(\S+)\s*(.*)$/,w=["model","collection","el","id","attributes","className","tagName","events"];// Set up all inheritable **Backbone.View** properties and methods.
i.extend(_.prototype,o,{// The default `tagName` of a View's element is `"div"`.
tagName:"div",// jQuery delegate for element lookup, scoped to DOM elements within the
// current view. This should be preferred to global lookups where possible.
$:function(t){return this.$el.find(t)},// Initialize is an empty function by default. Override it with your own
// initialization logic.
initialize:function(){},// **render** is the core function that your view should override, in order
// to populate its element (`this.el`), with the appropriate HTML. The
// convention is for **render** to always return `this`.
render:function(){return this},// Remove this view by taking the element out of the DOM, and removing any
// applicable Backbone.Events listeners.
remove:function(){return this.$el.remove(),this.stopListening(),this},// Change the view's element (`this.el` property), including event
// re-delegation.
setElement:function(t,i){return this.$el&&this.undelegateEvents(),this.$el=t instanceof e.$?t:e.$(t),this.el=this.$el[0],i!==!1&&this.delegateEvents(),this},// Set callbacks, where `this.events` is a hash of
//
// *{"event selector": "callback"}*
//
//     {
//       'mousedown .title':  'edit',
//       'click .button':     'save',
//       'click .open':       function(e) { ... }
//     }
//
// pairs. Callbacks will be bound to the view, with `this` set properly.
// Uses event delegation for efficiency.
// Omitting the selector binds the event to `this.el`.
// This only works for delegate-able events: not `focus`, `blur`, and
// not `change`, `submit`, and `reset` in Internet Explorer.
delegateEvents:function(t){if(!t&&!(t=i.result(this,"events")))return this;this.undelegateEvents();for(var e in t){var n=t[e];if(i.isFunction(n)||(n=this[t[e]]),n){var s=e.match(b),r=s[1],a=s[2];n=i.bind(n,this),r+=".delegateEvents"+this.cid,""===a?this.$el.on(r,n):this.$el.on(r,a,n)}}return this},// Clears all callbacks previously bound to the view with `delegateEvents`.
// You usually don't need to use this, but may wish to if you have multiple
// Backbone views attached to the same DOM element.
undelegateEvents:function(){return this.$el.off(".delegateEvents"+this.cid),this},// Ensure that the View has a DOM element to render into.
// If `this.el` is a string, pass it through `$()`, take the first
// matching element, and re-assign it to `el`. Otherwise, create
// an element from the `id`, `className` and `tagName` properties.
_ensureElement:function(){if(this.el)this.setElement(i.result(this,"el"),!1);else{var t=i.extend({},i.result(this,"attributes"));this.id&&(t.id=i.result(this,"id")),this.className&&(t["class"]=i.result(this,"className"));var n=e.$("<"+i.result(this,"tagName")+">").attr(t);this.setElement(n,!1)}}}),// Backbone.sync
// -------------
// Override this function to change the manner in which Backbone persists
// models to the server. You will be passed the type of request, and the
// model in question. By default, makes a RESTful Ajax request
// to the model's `url()`. Some possible customizations could be:
//
// * Use `setTimeout` to batch rapid-fire updates into a single request.
// * Send up the models as XML instead of JSON.
// * Persist models via WebSockets instead of Ajax.
//
// Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
// as `POST`, with a `_method` parameter containing the true HTTP method,
// as well as all requests with the body as `application/x-www-form-urlencoded`
// instead of `application/json` with the model in a param named `model`.
// Useful when interfacing with server-side languages like **PHP** that make
// it difficult to read the body of `PUT` requests.
e.sync=function(t,n,s){var r=E[t];// Default options, unless specified.
i.defaults(s||(s={}),{emulateHTTP:e.emulateHTTP,emulateJSON:e.emulateJSON});// Default JSON-request options.
var a={type:r,dataType:"json"};// For older servers, emulate HTTP by mimicking the HTTP method with `_method`
// And an `X-HTTP-Method-Override` header.
if(// Ensure that we have a URL.
s.url||(a.url=i.result(n,"url")||j()),// Ensure that we have the appropriate request data.
null!=s.data||!n||"create"!==t&&"update"!==t&&"patch"!==t||(a.contentType="application/json",a.data=JSON.stringify(s.attrs||n.toJSON(s))),// For older servers, emulate JSON by encoding the request into an HTML-form.
s.emulateJSON&&(a.contentType="application/x-www-form-urlencoded",a.data=a.data?{model:a.data}:{}),s.emulateHTTP&&("PUT"===r||"DELETE"===r||"PATCH"===r)){a.type="POST",s.emulateJSON&&(a.data._method=r);var o=s.beforeSend;s.beforeSend=function(t){return t.setRequestHeader("X-HTTP-Method-Override",r),o?o.apply(this,arguments):void 0}}// Don't process data on a non-GET request.
"GET"===a.type||s.emulateJSON||(a.processData=!1),// If we're sending a `PATCH` request, and we're in an old Internet Explorer
// that still has ActiveX enabled by default, override jQuery to use that
// for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
"PATCH"===a.type&&x&&(a.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")});// Make the request, allowing the user to override any Ajax options.
var h=s.xhr=e.ajax(i.extend(a,s));return n.trigger("request",n,h,s),h};var x=!("undefined"==typeof window||!window.ActiveXObject||window.XMLHttpRequest&&(new XMLHttpRequest).dispatchEvent),E={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};// Set the default implementation of `Backbone.ajax` to proxy through to `$`.
// Override this if you'd like to use a different library.
e.ajax=function(){return e.$.ajax.apply(e.$,arguments)};// Backbone.Router
// ---------------
// Routers map faux-URLs to actions, and fire events when routes are
// matched. Creating a new one sets its `routes` hash, if not set statically.
var k=e.Router=function(t){t||(t={}),t.routes&&(this.routes=t.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},T=/\((.*?)\)/g,$=/(\(\?)?:\w+/g,S=/\*\w+/g,H=/[\-{}\[\]+?.,\\\^$|#\s]/g;// Set up all inheritable **Backbone.Router** properties and methods.
i.extend(k.prototype,o,{// Initialize is an empty function by default. Override it with your own
// initialization logic.
initialize:function(){},// Manually bind a single named route to a callback. For example:
//
//     this.route('search/:query/p:num', 'search', function(query, num) {
//       ...
//     });
//
route:function(t,n,s){i.isRegExp(t)||(t=this._routeToRegExp(t)),i.isFunction(n)&&(s=n,n=""),s||(s=this[n]);var r=this;return e.history.route(t,function(i){var a=r._extractParameters(t,i);r.execute(s,a),r.trigger.apply(r,["route:"+n].concat(a)),r.trigger("route",n,a),e.history.trigger("route",r,n,a)}),this},// Execute a route handler with the provided parameters.  This is an
// excellent place to do pre-route setup or post-route cleanup.
execute:function(t,e){t&&t.apply(this,e)},// Simple proxy to `Backbone.history` to save a fragment into the history.
navigate:function(t,i){return e.history.navigate(t,i),this},// Bind all defined routes to `Backbone.history`. We have to reverse the
// order of the routes here to support behavior where the most general
// routes can be defined at the bottom of the route map.
_bindRoutes:function(){if(this.routes){this.routes=i.result(this,"routes");for(var t,e=i.keys(this.routes);null!=(t=e.pop());)this.route(t,this.routes[t])}},// Convert a route string into a regular expression, suitable for matching
// against the current location hash.
_routeToRegExp:function(t){return t=t.replace(H,"\\$&").replace(T,"(?:$1)?").replace($,function(t,e){return e?t:"([^/?]+)"}).replace(S,"([^?]*?)"),new RegExp("^"+t+"(?:\\?([\\s\\S]*))?$")},// Given a route, and a URL fragment that it matches, return the array of
// extracted decoded parameters. Empty or unmatched parameters will be
// treated as `null` to normalize cross-browser behavior.
_extractParameters:function(t,e){var n=t.exec(e).slice(1);return i.map(n,function(t,e){// Don't decode the search params.
// Don't decode the search params.
return e===n.length-1?t||null:t?decodeURIComponent(t):null})}});// Backbone.History
// ----------------
// Handles cross-browser history management, based on either
// [pushState](http://diveintohtml5.info/history.html) and real URLs, or
// [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
// and URL fragments. If the browser supports neither (old IE, natch),
// falls back to polling.
var A=e.History=function(){this.handlers=[],i.bindAll(this,"checkUrl"),// Ensure that `History` can be used outside of the browser.
"undefined"!=typeof window&&(this.location=window.location,this.history=window.history)},I=/^[#\/]|\s+$/g,N=/^\/+|\/+$/g,R=/msie [\w.]+/,O=/\/$/,P=/#.*$/;// Has the history handling already been started?
A.started=!1,// Set up all inheritable **Backbone.History** properties and methods.
i.extend(A.prototype,o,{// The default interval to poll for hash changes, if necessary, is
// twenty times a second.
interval:50,// Are we at the app root?
atRoot:function(){return this.location.pathname.replace(/[^\/]$/,"$&/")===this.root},// Gets the true hash value. Cannot use location.hash directly due to bug
// in Firefox where location.hash will always be decoded.
getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},// Get the cross-browser normalized URL fragment, either from the URL,
// the hash, or the override.
getFragment:function(t,e){if(null==t)if(this._hasPushState||!this._wantsHashChange||e){t=decodeURI(this.location.pathname+this.location.search);var i=this.root.replace(O,"");t.indexOf(i)||(t=t.slice(i.length))}else t=this.getHash();return t.replace(I,"")},// Start the hash change handling, returning `true` if the current URL matches
// an existing route, and `false` otherwise.
start:function(t){if(A.started)throw new Error("Backbone.history has already been started");A.started=!0,// Figure out the initial configuration. Do we need an iframe?
// Is pushState desired ... is it available?
this.options=i.extend({root:"/"},this.options,t),this.root=this.options.root,this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var n=this.getFragment(),s=document.documentMode,r=R.exec(navigator.userAgent.toLowerCase())&&(!s||7>=s);if(// Normalize root to always include a leading and trailing slash.
this.root=("/"+this.root+"/").replace(N,"/"),r&&this._wantsHashChange){var a=e.$('<iframe src="javascript:0" tabindex="-1">');this.iframe=a.hide().appendTo("body")[0].contentWindow,this.navigate(n)}// Depending on whether we're using pushState or hashes, and whether
// 'onhashchange' is supported, determine how we check the URL state.
this._hasPushState?e.$(window).on("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!r?e.$(window).on("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),// Determine if we need to change the base url, for a pushState link
// opened by a non-pushState browser.
this.fragment=n;var o=this.location;// Transition from hashChange to pushState or vice versa if both are
// requested.
if(this._wantsHashChange&&this._wantsPushState){// If we've started off with a route from a `pushState`-enabled
// browser, but we're currently in a browser that doesn't support it...
if(!this._hasPushState&&!this.atRoot())// Return immediately as browser will do redirect to new url
return this.fragment=this.getFragment(null,!0),this.location.replace(this.root+"#"+this.fragment),!0;this._hasPushState&&this.atRoot()&&o.hash&&(this.fragment=this.getHash().replace(I,""),this.history.replaceState({},document.title,this.root+this.fragment))}return this.options.silent?void 0:this.loadUrl()},// Disable Backbone.history, perhaps temporarily. Not useful in a real app,
// but possibly useful for unit testing Routers.
stop:function(){e.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl),this._checkUrlInterval&&clearInterval(this._checkUrlInterval),A.started=!1},// Add a route to be tested when the fragment changes. Routes added later
// may override previous routes.
route:function(t,e){this.handlers.unshift({route:t,callback:e})},// Checks the current URL to see if it has changed, and if it has,
// calls `loadUrl`, normalizing across the hidden iframe.
checkUrl:function(){var t=this.getFragment();return t===this.fragment&&this.iframe&&(t=this.getFragment(this.getHash(this.iframe))),t===this.fragment?!1:(this.iframe&&this.navigate(t),void this.loadUrl())},// Attempt to load the current URL fragment. If a route succeeds with a
// match, returns `true`. If no defined routes matches the fragment,
// returns `false`.
loadUrl:function(t){return t=this.fragment=this.getFragment(t),i.any(this.handlers,function(e){return e.route.test(t)?(e.callback(t),!0):void 0})},// Save a fragment into the hash history, or replace the URL state if the
// 'replace' option is passed. You are responsible for properly URL-encoding
// the fragment in advance.
//
// The options object can contain `trigger: true` if you wish to have the
// route callback be fired (not usually desirable), or `replace: true`, if
// you wish to modify the current URL without adding an entry to the history.
navigate:function(t,e){if(!A.started)return!1;e&&e!==!0||(e={trigger:!!e});var i=this.root+(t=this.getFragment(t||""));if(// Strip the hash for matching.
t=t.replace(P,""),this.fragment!==t){// If pushState is available, we use it to set the fragment as a real URL.
if(this.fragment=t,// Don't include a trailing slash on the root.
""===t&&"/"!==i&&(i=i.slice(0,-1)),this._hasPushState)this.history[e.replace?"replaceState":"pushState"]({},document.title,i);else{if(!this._wantsHashChange)return this.location.assign(i);this._updateHash(this.location,t,e.replace),this.iframe&&t!==this.getFragment(this.getHash(this.iframe))&&(// Opening and closing the iframe tricks IE7 and earlier to push a
// history entry on hash-tag change.  When replace is true, we don't
// want this.
e.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,t,e.replace))}return e.trigger?this.loadUrl(t):void 0}},// Update the hash location, either replacing the current entry, or adding
// a new one to the browser history.
_updateHash:function(t,e,i){if(i){var n=t.href.replace(/(javascript:|#).*$/,"");t.replace(n+"#"+e)}else// Some browsers require that `hash` contains a leading #.
t.hash="#"+e}}),// Create the default Backbone.history.
e.history=new A;// Helpers
// -------
// Helper function to correctly set up the prototype chain, for subclasses.
// Similar to `goog.inherits`, but uses a hash of prototype properties and
// class properties to be extended.
var C=function(t,e){var n,s=this;// The constructor function for the new subclass is either defined by you
// (the "constructor" property in your `extend` definition), or defaulted
// by us to simply call the parent's constructor.
n=t&&i.has(t,"constructor")?t.constructor:function(){return s.apply(this,arguments)},// Add static properties to the constructor function, if supplied.
i.extend(n,s,e);// Set the prototype chain to inherit from `parent`, without calling
// `parent`'s constructor function.
var r=function(){this.constructor=n};// Add prototype properties (instance properties) to the subclass,
// if supplied.
// Set a convenience property in case the parent's prototype is needed
// later.
return r.prototype=s.prototype,n.prototype=new r,t&&i.extend(n.prototype,t),n.__super__=s.prototype,n};// Set up inheritance for the model, collection, router, view and history.
d.extend=p.extend=k.extend=_.extend=A.extend=C;// Throw an error when a URL is needed, and none is supplied.
var j=function(){throw new Error('A "url" property or function must be specified')},U=function(t,e){var i=e.error;e.error=function(n){i&&i(t,n,e),t.trigger("error",t,n,e)}};return e});