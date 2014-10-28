// js/views/app.js

var app = app || {};

app.AppView = Backbone.View.extend({

  el: 'body',

  initialize: function() {
    // get records from localStorage
    app.drafts.fetch();

    // cache the DOMs
    this.$navigation = $(".navigation");
    this.$sidebar = $("#sidebar");
    this.$draftsList = $("#draftsList");

    this.$title = $("#title");
    this.$body = $("#body");
    this.$notice = $("#notice");

    this.$previewTitle = $("#preview-title");
    this.$previewBody = $("#preview-body");

    // watch the collection
    this.listenTo(app.drafts, "add", this.prependDraft);
    this.listenTo(app.drafts, "destroy", this.refreshDraftId);

    // set the views
    this.prependAllDrafts();
    this.preview();

  },

  events: {
    // Whole 
    "keydown": "reactToKey",
    // Sidebar
    "click .menuBar": "toggleList",
    "click .draft-item": "openDraft",
    // Editor
    "focus #editor": "focusOnEditor",
    "blur #editor": "blurEditor",
    "keyup #editor": "preview",
    "click #saveBtn": "saveDraft",
    "click #deleteBtn": "destroyDraft",
    "click #addBtn": "openBlank"
  },

  // TODO: change function's name
  blurEditor: function() {
    this.$navigation.css("opacity", "1.0");
  },

  focusOnEditor: function() {
    this.hideSidebar();
    this.$navigation.animate({"opacity": "0.3"});
  },

  reactToKey: function(e) {
    if(e.ctrlKey) {
      if(e.keyCode === 83) {
        this.saveDraft();
      } else if(e.keyCode === 76) {
        this.toggleList();
      } else if(e.keyCode === 68) {
        this.destroyDraft();
      } else if(e.keyCode === 78) {
        this.openBlank();
      }
    }
  },

  attachVimLikeKey: function() {
    app.draftIndex = -1;
    var draftItems = this.$draftsList.children();
    var $current = $(draftItems[app.draftIndex]).addClass("selected");
    this.$el.on("keypress", function(e) {
      if(e.keyCode === 106) {
        if(app.draftIndex < draftItems.length -1) {
          $current.removeClass("selected");
          app.draftIndex++;
          $current = $(draftItems[app.draftIndex]).addClass("selected");
        }
      } else if(e.keyCode === 107) {
        if(app.draftIndex >= 0) {
          $current.removeClass("selected");
          app.draftIndex--;
          $current = $(draftItems[app.draftIndex]).addClass("selected");
        }
      } else if(e.keyCode === 111) {
        $current.click();
      }
    });
  },

  detachVimLikeKey: function() {
    this.$draftsList.find(".selected").removeClass("selected");
    this.$el.off("keypress");
  },

  refreshDraftId: function(draftId) {
    app.draftId = draftId || "";
  },

  // Destroy
  destroyDraft: function() {
    if(app.draftId) {
      if(confirm("Are you sure?")) {
        app.drafts.get(app.draftId).destroy();
        this.openBlank();
      }
    } else {
      alert("Not selected.");
    }
  },

  // Open
  openBlank: function() {
    this.hideSidebar();
    this.setDraft("");
    this.preview();
    this.$title.focus();
    this.refreshDraftId();
  },

  openDraft: function(e){
    this.hideSidebar();
    app.draftId = ($(e.target).attr("data-cid"));
  },

  // Sidebar

  showSidebar: function() {
    this.$sidebar.fadeIn(150);
    this.$title.blur();
    this.$body.blur();
    this.attachVimLikeKey();
  },

  hideSidebar: function() {
    this.$sidebar.fadeOut(150, this.detachVimLikeKey());
  },

  prependDraft: function(draft) {
    var view = new app.DraftView({ model: draft });
    this.$draftsList.prepend(view.render().el);
  },

  prependAllDrafts: function() {
    app.drafts.each(this.prependDraft, this);
  },

  // Navigation
  toggleList: function() {
    if(this.$sidebar.css("display") === "block") {
      this.hideSidebar();
    } else {
      this.showSidebar();
    }
  },

  // Preview
  preview: function() {
    this.$previewTitle.html(this.$title.val());
    this.$previewBody.html(marked(this.$body.val()));
  },

  // Get Attributes
  attrsOnEditor: function() {
    return {
      title: this.$title.val().trim(),
      body: this.$body.val()
    };
  },

  // Save
  saveDraft: function() {
    var draft, msg;
    // get the draft
    if (!app.draftId) {
      draft = new app.Draft(this.attrsOnEditor());
    } else {
      draft = app.drafts.get(app.draftId).set(this.attrsOnEditor());
    }
    // validate the draft
    if(draft.isValid()) {
      // create
      app.drafts.create(draft);
      this.refreshDraftId(draft.id);
      msg = "Saved.";
    } else {
      msg = draft.validationError;
    }
    this.notice(msg);
  },

  notice: function(msg) {
    this.$notice
      .text(msg)
      .fadeIn(300)
      .fadeOut(800);
  },

  // Editor
  setDraft: function(draft) {
    if(!draft) {
      this.$title.val("");
      this.$body.val("");
    } else {
      this.$title.val(draft.get('title'));
      this.$body.val(draft.get('body'));
    }
  }

});
