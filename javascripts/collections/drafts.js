// js/collections/drafts.js

var app = app || {};

app.DraftsCollection = Backbone.Collection.extend({

  model: app.Draft,

  localStorage: new Backbone.LocalStorage('drafts-backbone')

});

app.drafts = new app.DraftsCollection();
