// javascripts/collections/drafts.js

define([
  'underscore',
  'backbone',
  'backbone_localStorage',
  'models/draft'
], function(_, Backbone, Store, Draft){

  var DraftsCollection = Backbone.Collection.extend({
  
    model: Draft,
  
    localStorage: new Store('drafts-backbone')
  
  });

  var drafts = new DraftsCollection();
  return drafts;

});
