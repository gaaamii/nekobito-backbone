// js/app.js

// configure RequireJS
require.config({
  paths: {
    jquery: "lib/jquery.min",
    underscore: "lib/underscore-min",
    backbone: "lib/backbone-min",
    backbone_localStorage: "lib/backbone.localStorage-min",
    marked: "lib/marked"
  }
});

require(['views/app'], function(AppView) {

  new AppView();

});
