// js/app.js

// configure RequireJS
require.config({
  paths: {
    jquery: "lib/jquery",
    underscore: "lib/underscore",
    backbone: "lib/backbone",
    backbone_localStorage: "lib/backbone.localStorage",
    marked: "lib/marked",
    bootstrap: "lib/bootstrap.min"
  }
});

require(['views/app'], function(AppView) {
  
  new AppView();

});
