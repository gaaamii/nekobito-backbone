// js/app.js

// configure RequireJS
require.config({
  paths: {
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    marked: 'lib/marked',
    bootstrap: 'lib/bootstrap.min',
    riot: 'lib/riot'
  }
});

require(['views/app'], function(AppView) {
  riot.mount('app');
});
