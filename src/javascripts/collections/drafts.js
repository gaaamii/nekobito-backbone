// javascripts/collections/drafts.js

define([
  'underscore',
  'backbone',
  'backbone_localStorage',
  'models/draft'
], function(_, Backbone, Storage, Draft){

  var DraftsCollection = Backbone.Collection.extend({
  
    model: Draft,
  
    localStorage: new Storage('DraftsCollection')

  });

  return new DraftsCollection();

});
