// js/views/draft.js

var app = app || {};

app.DraftView = Backbone.View.extend({

  tagName: 'li',

  className: 'draft-item',

  template: _.template( $('#draft-template').html() ),

  initialize: function() {
    this.$el.attr("data-id", this.model.get("id"));
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
    $("#body").val(body);
    $("#preview-title").html(title);
    $("#preview-body").html(marked(body));
  },

  render: function() {
    // <li class="draft-item">タイトル</li>
    this.$el.html( this.template( this.model.attributes ) );
    return this;
  },

});
