// javascripts/views/draft.js

define([
  'jquery',
  'underscore',
  'backbone',
  'marked'
], function($, _, Backbone, marked) {

  var DraftView = Backbone.View.extend({
  
    tagName: 'li',
  
    className: 'draft-item',
  
    template: _.template( $('#draft-template').html() ),
  
    initialize: function() {
      this.$el.attr("data-cid", this.model.cid);
      this.listenTo(this.model, "change:title", this.render);
      this.listenTo(this.model, "destroy", this.remove);
    },
  
    events: {
      "click": "open",
      "destroy": "remove"
    },
  
    open: function() {
      var title = this.model.get("title");
      var body = this.model.get("body");
      $("#title").val(title);
      $("#body").val(body)
      $("#preview-title").html(title);
      $("#preview-body").html(marked(body));
      this.$el.removeClass("selected");
    },
  
    render: function() {
      this.$el.html( this.template( this.model.attributes ) );
      return this;
    }
  
  });

  return DraftView;

});
