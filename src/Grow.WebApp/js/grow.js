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
        'blur input': 'cancelAdding'
    },
    enterLineName: function() {
        this.$addButton.hide();
        this.$newLineName.show();
        this.$newLineName.focus();
    },
    cancelAdding: function(ev) {
        this.$newLineName.hide();
        this.$addButton.show();
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