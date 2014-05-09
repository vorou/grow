$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    options.url = 'http://localhost:7820' + options.url;
});

var Line = Backbone.Model.extend({
    urlRoot: '/lines'
});

var DashboardView = Backbone.View.extend({
    el: '.dashboard',

    initialize: function() {
        this.$addButton = this.$el.find('button.add-line');
        this.$newLineName = $('<input type="text" class="new-line-name form-control" placeholder="name" />');
        this.$newLineName.hide();
        this.$el.append(this.$newLineName);
    },

    events: {
        'click button.add-line': 'enterLineName',
        'blur input': 'hideLineNameInput',
        'keypress input': 'saveLine'
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
    saveLine: function(event) {
        if (event.keyCode == 13) {
            var line = new Line({
                name: this.$newLineName.val()
            });
            line.save(null, {
                success: function() {
                    dashboardView.hideLineNameInput();
                },
                error: function(model, error) {
                    console.log(model.toJSON());
                    console.log('error.responseText');
                }
            });
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
