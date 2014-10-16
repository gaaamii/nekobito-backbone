// js/views/app.js

var app = app || {};

app.AppView = Backbone.View.extend({

  el: 'body',

  initialize: function() {
    // localStorageのレコードを取得
    app.drafts.fetch();

    // DOMをキャッシュ
    this.$sidebar = $("#sidebar");
    this.$draftsList = $("#draftsList");

    this.$title = $("#title");
    this.$body = $("#body");
    this.$notice = $("#notice");

    this.$previewTitle = $("#preview-title");
    this.$previewBody = $("#preview-body");

    // コレクションを監視
    this.listenTo(app.drafts, "add", this.prependDraft);
    this.listenTo(app.drafts, "all", this.refreshDraftId);

    // ビューをセット
    this.prependAllDrafts();
    this.preview();

    // 選択中のモデルのIDを保持
    this.refreshDraftId();
  },

  events: {
    // Whole 
    "keydown": "reactToKey",
    // Sidebar
    "click .menuBar": "toggleMenu",
    "click .draft-item": "openDraft",
    // Editor
    "focus #editor": "hideSidebar",
    "keyup #editor": "preview",
    "click #saveBtn": "saveDraft",
    "click #deleteBtn": "destroyDraft",
    "click #addBtn": "openBlank"
  },

  reactToKey: function(e) {
    if(e.ctrlKey) {
      if(e.keyCode === 83) {
        this.saveDraft();
      } else if(e.keyCode === 76) {
        this.toggleMenu();
      } else if(e.keyCode === 68) {
        this.destroyDraft();
      } else if(e.keyCode === 78) {
        this.openBlank();
      }
    }
  },

  refreshDraftId: function() {
    if(app.drafts.length != 0) {
      app.draftId = app.drafts.last().id;
    }
  },

  // Destroy
  destroyDraft: function() {
    if(confirm("削除する？")) {
      app.drafts.get(app.draftId).destroy();
      this.openBlank();
    }
  },

  // Open
  openBlank: function() {
    this.hideSidebar();
    this.setDraft("");
    this.preview();
    app.draftId = "";
  },

  openDraft: function(e){
    this.hideSidebar();
    app.draftId = ($(e.target).attr("data-id"));
  },

  // Sidebar
  hideSidebar: function() {
    this.$sidebar.fadeOut(50);
  },

  prependDraft: function(draft) {
    var view = new app.DraftView({ model: draft });
    this.$draftsList.prepend(view.render().el);
  },

  prependAllDrafts: function() {
    app.drafts.each(this.prependDraft, this);
  },

  // Navigation
  toggleMenu: function() {
    this.$sidebar.toggle(50);
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
    if (!app.draftId) {
      app.drafts.create(this.attrsOnEditor());
    } else {
      app.drafts.get(app.draftId).save(this.attrsOnEditor());
    }
    this.notice();
  },

  notice: function() {
    this.$notice.fadeIn("fast", function() {
      $(this).fadeOut("slow");
    });
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
