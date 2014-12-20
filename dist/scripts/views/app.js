define(["jquery","underscore","backbone","dropbox","dropboxdatastore","marked","models/draft","collections/drafts","views/draft"],function(t,e,i,s,r,a,n,d,o){var h=i.View.extend({el:"body",initialize:function(){if(this.client=i.DropboxDatastore.client,this.client.isAuthenticated()){d.fetch();var e=this;this.$("#syncBtn").html('<i class="fa fa-sign-out"></i>Sign Out').attr("id","#btn-sign-out").click(function(){e.signOut()})}this.draftId="",this.$navigation=t(".navigation"),this.$sidebar=t("#sidebar"),this.$draftsList=t("#draftsList"),this.$title=t("#title"),this.$body=t("#body"),this.$notice=t("#notice"),this.$preview=t("#preview"),this.$previewTitle=t("#preview-title"),this.$previewBody=t("#preview-body"),this.listenTo(d,"add",this.prependDraft),this.listenTo(d,"destroy",this.refreshDraftId),this.prependAllDrafts(),this.preview()},signOut:function(){this.client.signOut({mustInvalidate:!1}),location.reload()},events:{keydown:"reactToKey","click .menuBar":"toggleList","click .draft-item":"openDraft","focus #editor":"focusOnEditor","blur #editor":"blurEditor","keyup #editor":"preview","click #saveBtn":"saveDraft","click #deleteBtn":"destroyDraft","click #addBtn":"openBlank","click #syncBtn":"syncDropbox"},syncDropbox:function(){this.client.isAuthenticated()||this.client.authenticate()},blurEditor:function(){this.$navigation.css("opacity","1.0")},focusOnEditor:function(){this.hideSidebar(),this.$navigation.animate({opacity:"0.3"})},updateCharacters:function(){var e=t.trim(this.$body.val());console.log(e),this.$("#characters").prepend(num)},reactToKey:function(t){t.ctrlKey&&(83===t.keyCode?this.saveDraft():76===t.keyCode?this.toggleList():68===t.keyCode?this.destroyDraft():78===t.keyCode&&this.openBlank())},attachVimLikeKey:function(){var e=-1,i=this.$draftsList.children(),s=t(i[e]).addClass("selected");this.$el.on("keypress",function(r){106===r.keyCode?e<i.length-1&&(s.removeClass("selected"),e++,s=t(i[e]).addClass("selected")):107===r.keyCode?e>=0&&(s.removeClass("selected"),e--,s=t(i[e]).addClass("selected")):111===r.keyCode&&s.click()})},detachVimLikeKey:function(){this.$draftsList.find(".selected").removeClass("selected"),this.$el.off("keypress")},refreshDraftId:function(t){this.draftId=t||""},destroyDraft:function(){this.draftId?confirm("Are you sure?")&&(d.get(this.draftId).destroy(),this.openBlank()):alert("Not selected.")},openBlank:function(){this.hideSidebar(),this.setDraft(""),this.preview(),this.$title.focus(),this.refreshDraftId()},openDraft:function(e){this.hideSidebar(),this.draftId=t(e.target).attr("data-cid")},showSidebar:function(){this.$sidebar.fadeIn(150),this.$title.blur(),this.$body.blur(),this.attachVimLikeKey()},hideSidebar:function(){this.$sidebar.fadeOut(150,this.detachVimLikeKey())},prependDraft:function(t){var e=new o({model:t});this.$draftsList.prepend(e.render().el)},prependAllDrafts:function(){d.each(this.prependDraft,this)},toggleList:function(){"block"===this.$sidebar.css("display")?this.hideSidebar():this.showSidebar()},preview:function(){this.$previewTitle.html(this.$title.val()),this.$previewBody.html(a(this.$body.val()))},attrsOnEditor:function(){return{title:this.$title.val().trim(),body:this.$body.val()}},saveDraft:function(){var t,e;t=this.draftId?d.get(this.draftId).set(this.attrsOnEditor()):new n(this.attrsOnEditor()),t.isValid()?(d.create(t),this.refreshDraftId(t.id),e="Saved."):e=t.validationError,this.notice(e)},notice:function(t){this.$notice.text(t).fadeIn(300).fadeOut(800)},setDraft:function(t){t?(this.$title.val(t.get("title")),this.$body.val(t.get("body"))):(this.$title.val(""),this.$body.val(""))}});return h});