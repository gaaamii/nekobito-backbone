// javascripts/collections/drafts.js

define([
  'underscore',
  'backbone',
  /*'backbone_localStorage',*/
  'dropboxdatastore',
  'models/draft'
], function(_, Backbone, /*Store,*/ DropboxDatastore, Draft){

  var DraftsCollection = Backbone.Collection.extend({
  
    model: Draft,
  
    dropboxDatastore: new Backbone.DropboxDatastore('drafts')
    // , localStorage: new Store('drafts-backbone'),

  });

  return new DraftsCollection();

});
