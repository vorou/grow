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
    lineList.fetch();
    lineList.on('add', function() {
        lineListView.render();
    });

    var LineView = Backbone.View.extend({
        className: 'line',
        events: {
            'click .remove-line': 'removeLine'
        },

        removeLine: function() {
            console.log('removeLine fired!');
        },

        render: function() {
            this.$el.append('<div class="line"><button class="btn remove-line"><span class="glyphicon glyphicon-trash"></span></button> <span class="line-name">' + this.model.get('name') + '</span></div>');
        }
    });

    var LineListView = Backbone.View.extend({
        el: '.dashboard',

        initialize: function() {
            this.$addButton = this.$el.find('button.add-line');
            this.$newLineName = $('<input type="text" class="new-line-name form-control" placeholder="name" />');
            this.$newLineName.hide();
            this.$el.append(this.$newLineName);

            this.$lines = $('<div class="lines"></div>');
            this.$el.prepend(this.$lines);

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
            'click .add-line': 'enterLineName',
            'blur input': 'hideLineNameInput',
            'keypress input': 'handleLineNameInputKeypress'
        },
        enterLineName: function() {
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
        lineListView.render();
    });
    Backbone.history.start();
}());