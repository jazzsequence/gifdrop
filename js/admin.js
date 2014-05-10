// Generated by CoffeeScript 1.7.1
(function() {
  var $, app,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = window.jQuery;

  app = window.gifDropAdmin = {
    init: function() {
      this.pages = new this.Pages(_.map(this.pageIds, (function(_this) {
        return function(id) {
          return _this.allPages.get(id);
        };
      })(this)));
      this.pagesView = new this.PagesView({
        collection: this.pages
      });
      return this.pagesView.init();
    }
  };

  app.Page = (function(_super) {
    __extends(Page, _super);

    function Page() {
      return Page.__super__.constructor.apply(this, arguments);
    }

    Page.prototype.initialize = function() {
      if (!this.get('title')) {
        return this.set('title', app.allPages.get(this.get('id')).get('title'));
      }
    };

    return Page;

  })(Backbone.Model);

  app.Pages = (function(_super) {
    __extends(Pages, _super);

    function Pages() {
      return Pages.__super__.constructor.apply(this, arguments);
    }

    Pages.prototype.model = app.Page;

    Pages.prototype.initialize = function() {
      return this.listenTo(this, 'removeMe', this.remove);
    };

    return Pages;

  })(Backbone.Collection);

  app.PagesView = (function(_super) {
    __extends(PagesView, _super);

    function PagesView() {
      return PagesView.__super__.constructor.apply(this, arguments);
    }

    PagesView.prototype.template = wp.template('gifdrop-pages');

    PagesView.prototype.initialize = function() {
      this.listenTo(this.collection, 'add', this.addPageView);
      return this.listenTo(this.collection, 'remove', this.selectPrevious);
    };

    PagesView.prototype.addPageView = function(model) {
      return this.views.add('.gifdrop-selections-wrap', new app.PageView({
        model: model
      }));
    };

    PagesView.prototype.selectPrevious = function(model, collection, options) {
      var prev;
      if ((options != null ? options.withKeyboard : void 0) != null) {
        prev = collection.at(_.max([options.index - 1, 0]));
        if (prev) {
          prev.trigger('selectRemoveButton');
        }
      }
      if (!collection.length) {
        return collection.trigger('selectAddNew');
      }
    };

    PagesView.prototype.init = function() {
      this.setSubviews();
      this.render();
      $('.gifdrop-select-pages-section').html(this.el);
      return this.views.ready();
    };

    PagesView.prototype.setSubviews = function() {
      var model, _i, _len, _ref, _results;
      this.views.set('.gifdrop-add-page', new app.PagesViewAdd({
        collection: this.collection
      }));
      this.views.unset('.gifdrop-selections-wrap');
      _ref = this.collection.models;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        model = _ref[_i];
        _results.push(this.addPageView(model));
      }
      return _results;
    };

    return PagesView;

  })(wp.Backbone.View);

  app.PagesViewAdd = (function(_super) {
    __extends(PagesViewAdd, _super);

    function PagesViewAdd() {
      this.handleClickButton = __bind(this.handleClickButton, this);
      return PagesViewAdd.__super__.constructor.apply(this, arguments);
    }

    PagesViewAdd.prototype.template = wp.template('gifdrop-pages-add');

    PagesViewAdd.prototype.events = {
      'keydown select': 'keydownSelect',
      'click button': 'clickButton'
    };

    PagesViewAdd.prototype.initialize = function() {
      this.listenTo(this.collection, 'add remove', this.disableUsedPages);
      return this.listenTo(this.collection, 'selectAddNew', this.selectAddNew);
    };

    PagesViewAdd.prototype.disableUsedPages = function() {
      var onlyUsed, usedPageIds;
      this.dropdownOptions.attr('disabled', false);
      usedPageIds = _.pluck(this.collection.models, 'id');
      onlyUsed = function() {
        return _.contains(usedPageIds, parseInt(this.value, 10));
      };
      return this.dropdownOptions.filter(onlyUsed).attr('disabled', true);
    };

    PagesViewAdd.prototype.keydownSelect = function(e) {
      if (e.which === 13) {
        e.preventDefault();
        return this.clickButton();
      }
    };

    PagesViewAdd.prototype.handleClickButton = function(e) {
      e.preventDefault();
      return this.clickButton();
    };

    PagesViewAdd.prototype.clickButton = function() {
      var id;
      if (this.dropdown.val()) {
        id = parseInt(this.dropdown.val(), 10);
        app.pages.add(app.allPages.get(id));
        this.dropdown.val('');
      }
      return this.dropdown.focus();
    };

    PagesViewAdd.prototype.selectAddNew = function() {
      return this.dropdown.focus();
    };

    PagesViewAdd.prototype.ready = function() {
      this.dropdown = this.$('select');
      this.dropdownOptions = this.dropdown.find('option');
      return this.disableUsedPages();
    };

    return PagesViewAdd;

  })(wp.Backbone.View);

  app.PageView = (function(_super) {
    __extends(PageView, _super);

    function PageView() {
      return PageView.__super__.constructor.apply(this, arguments);
    }

    PageView.prototype.template = wp.template('gifdrop-page');

    PageView.prototype.className = 'gifdrop-selection';

    PageView.prototype.events = {
      'click button': 'clickRemove',
      'keydown button': 'pressRemove'
    };

    PageView.prototype.initialize = function() {
      this.listenTo(this.model, 'remove', this.remove);
      return this.listenTo(this.model, 'selectRemoveButton', this.selectRemoveButton);
    };

    PageView.prototype.selectRemoveButton = function() {
      return this.removeButton.focus();
    };

    PageView.prototype.clickRemove = function(e) {
      e.preventDefault();
      return this.model.trigger('removeMe', this.model);
    };

    PageView.prototype.pressRemove = function(e) {
      if (_.contains([13, 32], e.which)) {
        e.preventDefault();
        return this.model.trigger('removeMe', this.model, {
          withKeyboard: true
        });
      }
    };

    PageView.prototype.prepare = function() {
      return this.model.toJSON();
    };

    PageView.prototype.ready = function() {
      return this.removeButton = this.$('button');
    };

    return PageView;

  })(wp.Backbone.View);

  $(function() {
    return app.init();
  });

}).call(this);
