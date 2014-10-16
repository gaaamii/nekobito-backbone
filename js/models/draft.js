// js/models/draft.js

var app = app || {};

app.Draft = Backbone.Model.extend({

  // Draft
  // title: String
  // body: String
  
  // モデルが永続化されるときに呼び出される。
  validate: function(attrs) {

    if(!attrs.title) {
      return "タイトルを入力してください。";
    } else if(!attrs.body) {
      return "本文を入力してください。";
    }

  },

  initialize: function() {

    this.on({
      "invalid": this.printError
    });

  },

  printError: function(model, error) {
    console.log(error); 
  }

});
