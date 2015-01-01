// js/app.js

// configure RequireJS
require.config({
  paths: {
    jquery: "lib/jquery",
    underscore: "lib/underscore",
    backbone: "lib/backbone",
    dropbox: 'lib/dropbox-datastore-1.0.0',
    dropboxdatastore: 'lib/backbone.dropboxDatastore',
    backbone_localStorage: "lib/backbone.localStorage",
    marked: "lib/marked",
    bootstrap: "lib/bootstrap.min"
  }
});

require(['views/app'], function(AppView) {
  
  if(location.host === "nekobito.github.io") {
    if(location.protocol !== "https:") {
      location.protocol = "https:";
    }
  }

  // dropbox datastore api key
  APP_KEY = 'sq03i7awejt36wf';

  // set up this app as a dropbox client
  var client = new Dropbox.Client({key: APP_KEY});
  client.authenticate({interactive: false});
  Backbone.DropboxDatastore.client = client;
  
  new AppView();

});
