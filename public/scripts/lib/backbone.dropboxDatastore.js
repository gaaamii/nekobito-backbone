!function(t,e){"use strict";"object"==typeof exports&&"function"==typeof require?module.exports=e(require("underscore"),require("backbone")):"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["underscore","backbone"],function(o,n){
// Use global variables if the locals are undefined.
return e(o||t._,n||t.Backbone)}):
// RequireJS isn't being used. Assume underscore and backbone are loaded in <script> tags
e(_,Backbone)}(this,function(t,e){"use strict";
// A simple module to replace `Backbone.sync` to store data
// in Dropbox Datastore.
// Hold reference to Underscore.js and Backbone.js in the closure in order
// to make things work even if they are removed from the global namespace
// Our Store is represented by a single Dropbox.Datastore.Table. Create it
// with a meaningful name. This name should be unique per application.
// Instance methods of DropboxDatastore
// Static methods of DropboxDatastore
// Override 'Backbone.sync' to default to dropboxDatastoreSync,
// the original 'Backbone.sync' is still available in 'Backbone.originalSync'
return e.DropboxDatastore=function(t,e){e=e||{},this.name=t,this.datastoreId=e.datastoreId||"default",this._syncCollection=null},t.extend(e.DropboxDatastore.prototype,e.Events,{syncCollection:function(t){this._syncCollection=t},
// Insert new record to *Dropbox.Datastore.Table*.
create:function(o){var n=t.bind(this._createWithTable,this,o);return this.getTable().then(n).then(e.DropboxDatastore.recordToJson)},
// Update existing record in *Dropbox.Datastore.Table*.
update:function(o){var n=t.bind(this._updateWithTable,this,o);return this.getTable().then(n).then(e.DropboxDatastore.recordToJson)},
// Find record from *Dropbox.Datastore.Table* by id.
find:function(o){var n=t.bind(this._findWithTable,this,o),r=this._throwIfNotFound;return this.getTable().then(n).then(r).then(e.DropboxDatastore.recordToJson)},
// Find all records currently in *Dropbox.Datastore.Table*.
findAll:function(){var e=t.bind(this._findAllWithTable,this);return this.getTable().then(e)},
// Remove record from *Dropbox.Datastore.Table*.
destroy:function(e){var o=t.bind(this._destroyWithTable,this,e);return this.getTable().then(o)},
// lazy table getter
getTable:function(){return this._tablePromise||(this._tablePromise=this._createTablePromise()),this._tablePromise},getStatus:function(){return this._table&&this._table._datastore.getSyncStatus().uploading?"uploading":"synced"},close:function(){this._table&&(this._stopListenToChangeStatus(this._table._datastore),this._stopListenToChangeRecords(this._table._datastore))},_createTablePromise:function(){return e.DropboxDatastore.getDatastore(this.datastoreId).then(t.bind(function(t){var e=t.getTable(this.name);return this._startListenToChangeStatus(t),this._startListenToChangeRecords(t),this._table=e,e},this))},_createWithTable:function(t,e){return e.insert(t.toJSON())},_updateWithTable:function(t,e){var o=this._findWithTable(t,e);return o?o.update(t.toJSON()):o=e.insert(t.toJSON()),o},_findWithTable:function(e,o){var n,r={};if(e.isNew())throw new Error("Cannot fetch data for model without id");return"id"===e.idAttribute?n=o.get(e.id):(r[e.idAttribute]=e.id,n=t.first(o.query(r))),n},_findAllWithTable:function(o){var n=t.map(o.query(),e.DropboxDatastore.recordToJson);return n},_destroyWithTable:function(t,e){var o=this._findWithTable(t,e);return o&&o.deleteRecord(),{}},_throwIfNotFound:function(t){if(!t)throw new Error("Record not found");return t},_startListenToChangeStatus:function(e){this._changeStatusListener=t.bind(this._onChangeStatus,this),e.syncStatusChanged.addListener(this._changeStatusListener)},_startListenToChangeRecords:function(e){this._changeRecordsListener=t.bind(this._onChangeRecords,this),e.recordsChanged.addListener(this._changeRecordsListener)},_stopListenToChangeStatus:function(t){this._changeStatusListener&&(t.syncStatusChanged.removeListener(this._changeStatusListener),delete this._changeStatusListener)},_stopListenToChangeRecords:function(t){this._changeRecordsListener&&(t.recordsChanged.removeListener(this._changeRecordsListener),delete this._changeRecordsListener)},_onChangeStatus:function(){this.trigger("change:status",this.getStatus(),this)},_onChangeRecords:function(o){var n;this._syncCollection&&(n=e.DropboxDatastore.getChangesForTable(this.name,o),
// Update collection deferred to prevent double copy of same model in local collection
t.defer(e.DropboxDatastore.updateCollectionWithChanges,this._syncCollection,n))}}),t.extend(e.DropboxDatastore,{_datastorePromises:{},getDatastore:function(t){var e=this._datastorePromises[t];return e||(e=this._createDatastorePromise(t),this._datastorePromises[t]=e),e},_createDatastorePromise:function(o){var n=e.$.Deferred();return this.getDatastoreManager()._getOrCreateDatastoreByDsid(o,t.bind(function(t,e){t?n.reject(t):n.resolve(e)},this)),n.promise()},getDatastoreManager:function(){return this.getDropboxClient().getDatastoreManager()},getDropboxClient:function(){var t=e.DropboxDatastore.client;if(!t)throw new Error("Client should be defined for Backbone.DropboxDatastore");if(!t.isAuthenticated())throw new Error("Client should be authenticated for Backbone.DropboxDatastore");return t},
// Using to convert returned Dropbox Datastore records to JSON
recordToJson:function(e){return t.extend(e.getFields(),{id:e.getId()})},getChangesForTable:function(o,n){var r={toRemove:[],toAdd:[]};return t.each(n.affectedRecordsForTable(o),function(t){t.isDeleted()?r.toRemove.push(t.getId()):r.toAdd.push(e.DropboxDatastore.recordToJson(t))}),r},updateCollectionWithChanges:function(t,e){t.add(e.toAdd,{merge:!0}),t.remove(e.toRemove)},
// dropboxDatastoreSync delegate to the model or collection's
// *dropboxDatastore* property, which should be an instance of `Backbone.DropboxDatastore`.
sync:function(o,n,r){var s=t.partial(e.DropboxDatastore._callSuccessHandler,n,r);return e.DropboxDatastore._doSyncMethod(n,o).then(s)},_doSyncMethod:function(t,o){var n=e.DropboxDatastore._getStoreFromModel(t);switch(o){case"read":return t instanceof e.Collection?n.findAll():n.find(t);case"create":return n.create(t);case"update":return n.update(t);case"delete":return n.destroy(t);default:throw new Error("Incorrect Sync method")}},_getStoreFromModel:function(t){return t.dropboxDatastore||t.collection.dropboxDatastore},_callSuccessHandler:function(t,o,n){return o&&o.success&&("0.9.10"===e.VERSION?o.success(t,n,o):o.success(n)),n}}),e.originalSync=e.sync,e.getSyncMethod=function(t){return t.dropboxDatastore||t.collection&&t.collection.dropboxDatastore?e.DropboxDatastore.sync:e.originalSync},e.sync=function(t,o,n){return e.getSyncMethod(o).call(this,t,o,n)},e.DropboxDatastore});