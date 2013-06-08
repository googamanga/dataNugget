var InsertDataView = Backbone.View.extend({

  el: '#insert-raw-csv',

  show: true,

  events: {
    "input #csvInput": "massageCsvButton",
    "propertychange #csvInput": "massageCsvButton"
  },

  initialize: function() {
    this.render();
  },

  massageCsvButton: function(){
    this.model.csvToMetaData();
  },

  render: function() {
    this.template = $("#insert-raw-csv-template").html();
    this.$el.html(_.template(this.template, {'raw_csv_data': this.model.get('raw_csv_data')}));
    return this;
  }
});