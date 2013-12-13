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
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function() {
            this.$el.html('<input type="text" value="' + this.model.get('value') + '" name="' + this.model.get('name') + '" /> ' + this.model.get('name'));
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