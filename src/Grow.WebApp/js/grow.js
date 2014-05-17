(function() {
    'use strict';
    $.ajaxPrefilter(function(options) {
        options.url = 'http://localhost:7820' + options.url;
    });
    var Line = Backbone.Model.extend({});
    var LineList = Backbone.Collection.extend({
        model: Line,
        url: '/lines'
    });
    var lineList = new LineList();
    lineList.on('add remove', function() {
        lineListView.render();
    });
    var LineView = Backbone.View.extend({
        className: 'line',

        initialize: function() {
            var source = $("#line-template").html();
            this.template = Handlebars.compile(source);
        },

        events: {
            'click .remove-line': 'removeLine'
        },
        removeLine: function() {
            this.model.destroy();
        },
        render: function() {
            this.$el.append(this.template(this.model.toJSON()));
        }
    });
    var LineListView = Backbone.View.extend({
        el: '.dashboard',
        initialize: function() {
            this.$newLineName = $('.new-line-name');
            this.$newLineName.hide();
            this.$lines = $('.lines');
            this.$addButton = $('.add-line');
            _.bindAll(this, "renderLine");
        },
        renderLine: function(model) {
            var lineView = new LineView({
                model: model
            });
            lineView.render();
            this.$lines.append(lineView.el);
        },
        render: function() {
            this.$lines.empty();
            this.collection.each(this.renderLine);
        },
        events: {
            'click .add-line': 'showLineNameInput',
            'blur input': 'hideLineNameInput',
            'keypress input': 'handleLineNameInputKeypress'
        },
        showLineNameInput: function() {
            this.$addButton.hide();
            this.$newLineName.show();
            this.$newLineName.focus();
        },
        hideLineNameInput: function() {
            this.$newLineName.hide();
            this.$addButton.show();
        },
        handleLineNameInputKeypress: function(event) {
            if (event.keyCode === 13) {
                this.hideLineNameInput();
                var line = new Line({
                    name: this.$newLineName.val()
                });
                lineList.create(line);
                this.$newLineName.val('');
            }
        }
    });
    var lineListView = new LineListView({
        collection: lineList
    });
    var Router = Backbone.Router.extend({
        routes: {
            "": "home"
        }
    });
    var router = new Router();
    router.on('route:home', function() {
        lineList.fetch().done(function() {
            lineListView.render();
        });
    });
    Backbone.history.start();
}());
