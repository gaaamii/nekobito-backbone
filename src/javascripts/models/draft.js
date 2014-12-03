// javascripts/models/draft.js

define(['underscore', 'backbone'], function(_, Backbone) {

  var Draft = Backbone.Model.extend({
  
    // Draft
    // title: String
    // body: String
    
    validate: function(attrs) {
  
      if(!attrs.title) {
        return "Title can't be blank.";
      } else if(!attrs.body) {
        return "Body can't be blank.";
      }
  
    }
  
  });

  return Draft;

});
