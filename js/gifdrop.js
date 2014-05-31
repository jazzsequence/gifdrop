(function(){var t,e,i={}.hasOwnProperty,r=function(t,e){function r(){this.constructor=t}for(var o in e)i.call(e,o)&&(t[o]=e[o]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},o=function(t,e){return function(){return t.apply(e,arguments)}};t=window.jQuery,e=window.gifdropApp={init:function(){return this.settings=gifdropSettings,this.$wrapper=t("body > #outer-wrapper"),this.$modal=t("body > #modal"),this.images=new this.Images(_.toArray(this.settings.attachments)),this.modalView=new e.ModalView({collection:this.images}),this.modalView.render(),this.$modal.replaceWith(this.modalView.el),this.modalView.views.ready(),this.view=new this.MainView({collection:this.images}),this.view.render(),this.$wrapper.html(this.view.el),this.view.views.ready(),this.$browser=t(".browser"),this.modalView.listenTo(this.modalView,"modalOpen",function(){return t("body").addClass("modal-open")}),this.modalView.listenTo(this.modalView,"modalClosed",function(){return t("body").removeClass("modal-open"),t("input.search").focus()}),this.initUploads()},initUploads:function(){var t,i,r,o,n;return i=function(t,e){},r=function(t){},t=function(){return alert("error")},o=function(t){var i,r,o,n;return console.log(t),i=t.attributes,r=i.sizes.full,n=i.sizes["full-gif-static"]||r,o={id:t.id,width:r.width,height:r.height,title:i.title,src:r.url,"static":n.url},e.images.add(o,{at:0})},n=new wp.Uploader({container:this.$wrapper,browser:this.$browser,dropzone:this.$wrapper,success:o,error:t,params:{post_id:this.settings.id,provide_full_gif_static:!0},supports:{dragdrop:!0},plupload:{runtimes:"html5",filters:[{title:"Image",extensions:"jpg,jpeg,gif,png"}]}}),n.supports.dragdrop?(n.uploader.bind("BeforeUpload",r),n.uploader.bind("UploadProgress",i)):(n.uploader.destroy(),n=null)},restrictHeight:function(t,e){return e>1.5*t?1.5*t:e},fitTo:function(t,e,i){var r;return r=e/t,[i,Math.round(i*r)]},sync:function(t){return t=_.defaults(t||{},{context:this}),t.data=_.defaults(t.data||{},{action:"gifdrop",post_id:this.settings.id,_ajax_nonce:this.settings.nonce}),wp.ajax.send(t)}},e.View=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return r(e,t),e.prototype.render=function(){var t;return t=e.__super__.render.apply(this,arguments),"function"==typeof this.postRender&&this.postRender(),t},e.prototype.prepare=function(){var t;return null!=(t=this.model)&&"function"==typeof t.toJSON?t.toJSON():void 0},e}(wp.Backbone.View),e.BrowserView=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return r(e,t),e.prototype.className="browser",e}(wp.Backbone.View),e.Image=function(t){function i(){return i.__super__.constructor.apply(this,arguments)}return r(i,t),i.prototype.initialize=function(){var t,i,r;return r=e.fitTo(this.get("width"),this.get("height"),320),i=r[0],t=r[1],this.set({imgWidth:i,divHeight:e.restrictHeight(i,t),imgHeight:t})},i.prototype._sync=function(t,i){return e.sync({context:this,success:i.success,error:i.error,data:t})},i.prototype.sync=function(t,e,i){var r;return"update"===t?(r={subaction:t,model:JSON.stringify(e.toJSON())},this._sync(r,i)):void 0},i}(Backbone.Model),e.ImageContainer=function(t){function i(){return i.__super__.constructor.apply(this,arguments)}return r(i,t),i.prototype.model=e.Image,i}(Backbone.Collection),e.Images=function(t){function i(){return i.__super__.constructor.apply(this,arguments)}return r(i,t),i.prototype.initialize=function(t){var i,r;return i=function(){var i,o,n;for(n=[],i=0,o=t.length;o>i;i++)r=t[i],n.push(new e.Image(r));return n}(),this.filtered=new e.ImageContainer(i),this.listenTo(this.filtered,"change",this.changeMain)},i.prototype.changeMain=function(t){return this.get(t.get("id")).set(t.toJSON())},i.prototype.findGifs=function(t){var e,i,r,o;return t.length>0?(o=_.map(t.split(/[ _-]/),function(t){return t.toLowerCase()}),e=_.last(o),r=this.filter(function(t){var i,r,n;return n=_.map(t.get("title").split(/[ _-]/),function(t){return t.toLowerCase()}),i=function(){var t,i,s;for(s=[],t=0,i=o.length;i>t;t++)r=o[t],s.push(function(t){var i,r,o,s,u,a,p,l,c;for(o=function(){var t,e,i,r;for(i=["s","es","ing"],r=[],t=0,e=i.length;e>t;t++)s=i[t],r.push(new RegExp(s+"$"));return r}(),a=0,l=n.length;l>a;a++){if(u=n[a],i=!1,e===t&&(i=0===u.indexOf(e)),!i)for(i=u===t,p=0,c=o.length;c>p;p++)r=o[p],i||(i=u+s===t),i||(i=u===t+s),i||(i=u.replace(r,"")===t),i||(i=u===t.replace(r,""));if(i)return i}}(r));return s}(),i=_.filter(i,function(t){return t}),i.length===o.length}),i={}):(r=this.models,i={all:!0}),this.filtered.reset(r,i)},i}(e.ImageContainer),e.MainView=function(t){function i(){return i.__super__.constructor.apply(this,arguments)}return r(i,t),i.prototype.className="wrapper",i.prototype.initialize=function(){return this.views.add(new e.ImageNavView({collection:this.collection})),this.views.add(new e.ImagesListView({collection:this.collection})),this.views.add(new e.BrowserView)},i}(e.View),e.ImageNavView=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return r(e,t),e.prototype.className="nav",e.prototype.template=wp.template("nav"),e.prototype.events={"keyup input.search":"search"},e.prototype.lastSearch="",e.prototype.search=function(){return this.collection.findGifs(this.$search.val())},e.prototype.postRender=function(){return this.$search=this.$("input.search")},e.prototype.ready=function(){return this.$search.focus()},e}(e.View),e.ImagesListView=function(i){function n(){return this.masonry=o(this.masonry,this),n.__super__.constructor.apply(this,arguments)}return r(n,i),n.prototype.className="gifs",n.prototype.masonryEnabled=!1,n.prototype.initialize=function(){return this.setSubviews(),this.listenTo(this.collection,"add",this.addNew),this.listenTo(this,"newView",this.animateItemIn),this.listenTo(this.collection.filtered,"reset",this.filterIsotope)},n.prototype.animateItemIn=function(t,e){var i,r;if(r=this.collection.filtered.indexOf(t),i=this.collection.filtered.length-1,this.masonryEnabled)switch(r){case 0:return this.$el.isotope("prepended",e);case i:return this.$el.isotope("appended",e);default:return this.$el.isotope("reloadItems").isotope()}},n.prototype.addNew=function(t,e,i){return this.addView(t,{at:null!=i?i.at:void 0})},n.prototype.addView=function(t,i){var r;return r=new e.ImageListView({model:t}),this.views.add(r,i)},n.prototype.filterIsotope=function(e,i){var r;return t("body").animate({scrollTop:0},200),r=(null!=i?i.all:void 0)?function(){return!0}:function(){return _.contains(_.chain(e.models).map(function(t){return"gif-"+t.get("id")}).value(),t(this).attr("id"))},this.$el.isotope({filter:r})},n.prototype.setSubviews=function(){var t;return t=_.map(this.collection.models,function(t){return new e.ImageListView({model:t})}),this.views.set(t)},n.prototype.ready=function(){return t(function(t){return function(){return t.masonry()}}(this))},n.prototype.masonry=function(){return this.masonryEnabled=!0,this.$el.isotope({layoutMode:"masonry",itemSelector:".gif",sortBy:"original-order",masonry:{columnWidth:320,gutter:0}})},n}(e.View),e.ImageListView=function(t){function i(){return i.__super__.constructor.apply(this,arguments)}return r(i,t),i.prototype.className="gif",i.prototype.template=wp.template("gif"),i.prototype.events={mouseover:"mouseover",mouseout:"mouseout",click:"click"},i.prototype.attributes=function(){return{id:"gif-"+this.model.get("id")}},i.prototype.mouseover=function(){return this.$img.attr({src:this.model.get("src")}),this.unCrop()},i.prototype.mouseout=function(){return this.$img.attr({src:this.model.get("static")}),this.restoreCrop()},i.prototype.click=function(){var t;return t=new e.SingleView({model:this.model}),e.modalView.open(),e.modalView.views.set(t),this.mouseout()},i.prototype.unCrop=function(){var t,e,i;return this.model.get("imgHeight")!==this.model.get("divHeight")?(i=this.model.get("imgWidth")/this.model.get("imgHeight"),e=this.model.get("divHeight")*i,t=this.model.get("imgWidth")-e,this.$el.css({padding:"0 "+t/2+"px"})):void 0},i.prototype.restoreCrop=function(){return this.model.get("imgHeight")!==this.model.get("divHeight")?this.$el.css({padding:0,"z-index":"auto"}):void 0},i.prototype.crop=function(){return this.$el.css({height:""+this.model.get("divHeight")+"px"})},i.prototype.postRender=function(){return this.crop(),this.$img=this.$("> img")},i.prototype.ready=function(){return this.views.parent.trigger("newView",this.model,this.$el)},i}(e.View),e.ModalView=function(e){function i(){return i.__super__.constructor.apply(this,arguments)}return r(i,e),i.prototype.attributes={id:"modal"},i.prototype.events={click:"click"},i.prototype.keyup=function(t){var e,i,r,o;if(27===t.which){for(o=this.views.get(),i=0,r=o.length;r>i;i++)e=o[i],e.trigger("modalClosing:esc");return this.close()}},i.prototype.open=function(){return this.$el.show().addClass("open"),this.trigger("modalOpen")},i.prototype.close=function(){return this.$el.hide().removeClass("open"),this.trigger("modalClosed")},i.prototype.click=function(t){var e,i,r,o;if(this.el===t.target){for(o=this.views.get(),i=0,r=o.length;r>i;i++)e=o[i],e.trigger("modalClosing:click");return this.close()}},i.prototype.ready=function(){return t("body").on("keyup",function(t){return function(e){var i,r,o,n;if(27===e.which){for(n=t.views.get(),r=0,o=n.length;o>r;r++)i=n[r],i.trigger("modalClosing:esc");return t.close()}}}(this))},i}(e.View),e.SingleView=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return r(e,t),e.prototype.template=wp.template("single"),e.prototype.className="modal-content",e.prototype.events={"keyup input":"keyup"},e.prototype.initialize=function(){return this.listenTo(this,"modalClosing:click",this.save)},e.prototype.save=function(){return this.model.set({title:this.$title.val()}),console.log("Saving",this.$title.val()),this.model.save()},e.prototype.keyup=function(t){return 13===t.which&&(this.save(),this.views.parent.close()),27===t.which?(this.$title.val(this.model.get("title")),this.views.parent.close()):void 0},e.prototype.postRender=function(){return this.$title=this.$("input.title")},e.prototype.ready=function(){return this.$title.focus().val(this.$title.val())},e}(e.View)}).call(this);