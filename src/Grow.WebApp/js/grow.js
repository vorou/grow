var DashboardView = Backbone.View.extend({
    el: '.dashboard',

    render: function() {
        console.log('render fired');
    },

    events: {
        "click button.add-line": "addLine"
    },
    addLine: function(ev) {
        var $button = $(ev.currentTarget);
        $button.hide();
        this.$el.append('<input type="text" class="form-control" placeholder="name" />');
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
    console.log("on home fired");
})
Backbone.history.start();
