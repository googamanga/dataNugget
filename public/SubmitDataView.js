var SubmitDataView = Backbone.View.extend({

  el: '#submit-data-view',

  show: false,

  events: {
    "input #csvInput": "massageCsvButton",
    "propertychange #csvInput": "massageCsvButton",
    "click #massageCsvButton": "massageCsvButton"
  },

  initialize: function() {
    this.render();
  },

  massageCsvButton: function(){
    this.model.set('raw_csv_data', $('#csvInput').val())
    this.model.csvToMetaData();
  },

  render: function() {
    this.template = $("#insert-raw-csv-template").html();
    this.$el.html(_.template(this.template, {'raw_csv_data': this.model.get('raw_csv_data')}));
    console.log('insert-csv rendered');
    return this;
  }
});