// javascripts/collections/drafts.js

define([
  'underscore',
  'backbone',
  'dropboxdatastore',
  'models/draft'
], function(_, Backbone, DropboxDatastore, Draft){

  var DraftsCollection = Backbone.Collection.extend({
  
    model: Draft,
  
    dropboxDatastore: new Backbone.DropboxDatastore('drafts')

  });

  return new DraftsCollection();

});
