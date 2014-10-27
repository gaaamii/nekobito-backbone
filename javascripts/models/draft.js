// js/models/draft.js

var app = app || {};

app.Draft = Backbone.Model.extend({

  // Draft
  // title: String
  // body: String
  
  validate: function(attrs) {

    if(!attrs.title) {
      return "Title can't be blank.";
    } else if(!attrs.body) {
      return "Body can't be blank.";
    }

  },

  initialize: function() {

    this.on({
      "invalid": this.printError
    });

  },

});
