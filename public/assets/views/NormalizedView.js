var NormalizedView = Backbone.View.extend({

  el: '#normalized-data',

  show: false,

  active: 1,

  events: {
    "click #normalized_data_nav": "parseTableClick",
    "click #trainOnData": "trainOnData",
  },

  initialize: function() {
    this.model.on('all:normalizedCsvData', function(event){
      this.show = true;
      this.render();
    },this);
    this.render();
  },

  parseTableClick: function(event){
    var idArray = event.target.id.split('-');
    var type = idArray[0];
    var index = idArray[1];
    if(type !== undefined && index !== undefined){
      this.active = index;
      this.render();
    }
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
          metaHash: this.model.get('metaHash'),
          specializedData: this.model.get('specializedData')
        }
      }));
    } else {
      this.$el.html('<h3>Normalized Data</h3>');
    }
    console.log('normalized data rendered');
    return this;
  }
});