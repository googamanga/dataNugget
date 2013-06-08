var MetaDataView = Backbone.View.extend({

  el: '#meta-data-work',

  show: true,

  events: {
    "input #csvInput": "massageCsvButton",
    "propertychange #csvInput": "massageCsvButton",
    "click #massageCsvButton": "massageCsvButton"
  },

  initialize: function() {
    this.render();
  },

  massageCsvButton: function(){
    this.model.csvToMetaData();
  },

  render: function() {
    this.template = $("#meta-data-work-template").html();
    this.$el.html(_.template(this.template, {'raw_csv_data': this.model.get('raw_csv_data')}));
    return this;
  }
});