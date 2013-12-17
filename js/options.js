$(function() {



    var OptionModel = Backbone.Model.extend({
        initialize: function() {
            this.on('change', function(event) {

            });
            this.on("invalid", function(model, error){

            });
        },
        validate: function(attributes) {

        },
    });

    var OptionView = Backbone.View.extend({
        tagName: 'div',
        className: 'option',
        events:{
            'keyup input': 'action'
        },

        template: _.template($("#optionTemplate").html()),

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function() {
            this.$el.html( this.template(this.model.toJSON() ));
            return this;
        },
        action: function(event) {

        }
    });

    var OptionList = Backbone.Collection.extend({
        model: Option
    });

    var App = Backbone.View.extend({
        initialize: function() {
            this.list = $('#options');
            this.listenTo(options, 'change', this.render);

            options.each(function(optionModel) {
                var view = new OptionView({ model: optionModel });
                this.list.append(view.render().el);
            }, this);
        }
    });


    var optionsList = _.compact(_.map(_mns_settings['default'], function(value, name) {
        var option;

        if (!_.isFunction(value)) {
            option = new OptionModel({
                name: name,
                value: value
            });
        }

        return option;
    }));

    var options = new OptionList(optionsList);

    new App();

});