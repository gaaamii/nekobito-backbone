// javascripts/views/app.js

define([
  'jquery',
  'underscore',
  'backbone',
  'dropbox',
  'dropboxdatastore',
  'marked',
  'models/draft',
  'collections/drafts',
  'views/draft'
], function($, _, Backbone, Dropbox, Datastore, marked, Draft, Drafts, DraftView) {

  var AppView = Backbone.View.extend({
  
    el: 'body',

    initialize: function() {

      this.client = Backbone.DropboxDatastore.client;

      if (this.client.isAuthenticated()) {
        // get records
        Drafts.fetch();
        var self = this;
        this.$("#syncBtn")
          .html('<i class="fa fa-sign-out"></i>Sign Out')
          .attr("id", "#btn-sign-out")
          .click(function() {
            self.signOut();
          });
      }


      // draft id
      this.draftId = "";
  
      // cache the DOMs
      this.$navigation = $(".navigation");
      this.$sidebar = $("#sidebar");
      this.$draftsList = $("#draftsList");
  
      this.$title = $("#title");
      this.$body = $("#body");
      this.$notice = $("#notice");
  
      this.$preview = $("#preview");
      this.$previewTitle = $("#preview-title");
      this.$previewBody = $("#preview-body");

      // watch the collection
      this.listenTo(Drafts, "add", this.prependDraft);
      this.listenTo(Drafts, "destroy", this.refreshDraftId);
  
      // set the views
      this.prependAllDrafts();
      this.preview();

    },

    signOut: function() {
      this.client.signOut({mustInvalidate: false});
      location.reload();
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
      "click #addBtn": "openBlank",
      "click #syncBtn": "syncDropbox"
    },

    syncDropbox: function() {
      if (!this.client.isAuthenticated()) this.client.authenticate();
    },
  
    // TODO: change function's name
    blurEditor: function() {
      this.$navigation.css("opacity", "1.0");
    },
  
    focusOnEditor: function() {
      this.hideSidebar();
      this.$navigation.animate({"opacity": "0.3"});
    },

    updateCharacters: function() {
      var body = $.trim(this.$body.val());
      console.log(body);
      this.$('#characters').prepend(num);
    },
  
    // TODO: use keymaster.js(https://github.com/madrobby/keymaster)
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
      var draftIndex = -1;
      var draftItems = this.$draftsList.children();
      var $current = $(draftItems[draftIndex]).addClass("selected");
      this.$el.on("keypress", function(e) {
        if(e.keyCode === 106) {
          if(draftIndex < draftItems.length -1) {
            $current.removeClass("selected");
            draftIndex++;
            $current = $(draftItems[draftIndex]).addClass("selected");
          }
        } else if(e.keyCode === 107) {
          if(draftIndex >= 0) {
            $current.removeClass("selected");
            draftIndex--;
            $current = $(draftItems[draftIndex]).addClass("selected");
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
      this.draftId = draftId || "";
    },
  
    // Destroy
    destroyDraft: function() {
      if(this.draftId) {
        if(confirm("Are you sure?")) {
          Drafts.get(this.draftId).destroy();
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
      this.draftId = ($(e.target).attr("data-cid"));
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
      var view = new DraftView({ model: draft });
      this.$draftsList.prepend(view.render().el);
    },
  
    prependAllDrafts: function() {
      Drafts.each(this.prependDraft, this);
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
      var title = $(this.$title.val()
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
      if (!this.draftId) {
        draft = new Draft(this.attrsOnEditor());
      } else {
        draft = Drafts.get(this.draftId).set(this.attrsOnEditor());
      }
      // validate the draft
      if(draft.isValid()) {
        // create
        Drafts.create(draft);
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

  return AppView;

});
