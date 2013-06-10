var NormalizedView = Backbone.View.extend({

  el: '#normalized-data',

  show: false,

  events: {
    "click #trainOnData": "trainOnData",
  },

  initialize: function() {
    this.model.on('all:normalize_csv', function(){
      this.show = true;
      this.render();
    },this);
    this.render();
  },

  trainOnData: function(){
    this.model.trainOnData();
  },

  render: function() {
    if(this.show === true){
      this.template = $("#normalized-csv-template").html();
      this.$el.html(_.template(this.template, {'normalize_csv': this.model.get('normalize_csv')}));
    } else {
      this.$el.html('<h3>Normalized Data</h3>');
    }
    console.log('meta table rendered');
    return this;
  }
});