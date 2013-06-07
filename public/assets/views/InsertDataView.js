var InsertDataView = Backbone.View.extend({

  el: '#insert-raw-csv',

  show: true,

  // events: {
  //   "click .icon":          "open",
  //   "click .button.edit":   "openEditDialog",
  //   "click .button.delete": "destroy"
  // },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.template = $("#insert-raw-csv-template").html();
    this.$el.html(_.template(this.template, {value: "csv,data,here"}));
    return this;
  }
});