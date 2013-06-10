var NormalizedView = Backbone.View.extend({

  el: '#normalized-data',

  show: false,

  active: 1,

  events: {
    "click #trainOnData": "trainOnData",
  },

  initialize: function() {
    this.model.on('all:normalizedCsvData', function(event){
      this.show = true;
      this.render();
    },this);
    this.render();
  },

  trainOnData: function(event){
    event.preventDefault();
    this.model.trainOnData();
  },

  render: function() {
    if(this.show === true){
      this.template = $("#normalized-csv-template").html();
      this.$el.html(_.template(this.template, {
        data: {
          normalizedCsvData: this.model.get('normalizedCsvData'),
          active: this.active,
          metaHash: this.model.get('metaHash')
        }
      }));
    } else {
      this.$el.html('<h3>Normalized Data</h3>');
    }
    console.log('meta table rendered');
    return this;
  }
});