$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    options.url = 'http://localhost:7820' + options.url;
});

var Line = Backbone.Model.extend({
    urlRoot: '/lines'
});

var LineList = Backbone.Collection.extend({
    model: Line,
    url: '/lines'
});

var lineList = new LineList();
lineList.fetch({success: function (collection, response, options) {
    console.log(collection);
}});
lineList.on('add', function() {
    dashboardView.render();
});

var DashboardView = Backbone.View.extend({
    el: '.dashboard',

    initialize: function() {
        this.$addButton = this.$el.find('button.add-line');
        this.$newLineName = $('<input type="text" class="new-line-name form-control" placeholder="name" />');
        this.$newLineName.hide();
        this.$el.append(this.$newLineName);

        this.$lines = $('<ul></ul>');
        this.$el.prepend(this.$lines);
    },

    render: function() {
        var self = this;
        self.$lines.empty();
        lineList.forEach(function(line) {
            var $line = $('<li>' + line.get('name') + '</li>');
            self.$lines.append($line);
        });
    },

    events: {
        'click button.add-line': 'enterLineName',
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
        if (event.keyCode == 13) {
            this.hideLineNameInput();
            var line = new Line({
                name: this.$newLineName.val()
            });
            lineList.create(line);
            this.$newLineName.val('');
        }
    }
});

var dashboardView = new DashboardView();

var Router = Backbone.Router.extend({
    routes: {
        "": "home"
    }
});
var router = new Router;
router.on('route:home', function() {
    dashboardView.render();
})
Backbone.history.start();