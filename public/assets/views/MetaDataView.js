var MetaDataView = Backbone.View.extend({

  el: '#meta-data-work',

  show: false,

  events: {
    "click tbody": "parseTableClick",
    "click #normalizeRawData": "normalizeRawData",
  },

  initialize: function() {
    this.model.on('all:metaHash', function(){
      this.show = true;
      this.render();
    },this);
    this.render();
  },

  normalizeRawData: function(){
    console.log('normalizing data');
    this.model.normalizeData();
    console.log('done normalizing data')
  },

  parseTableClick: function(event){
    var idArray = event.target.id.split('-');
    var type = idArray[0];
    var index = idArray[1];
    if(type !== undefined && index !== undefined){
      this.model.updateMetaData(type, index);
    }
  },

  render: function() {
    if(this.show === true){
      this.template = $("#meta-data-work-template").html();
      this.$el.html(_.template(this.template, {'metaHash': this.model.get('metaHash')}));
    } else {
      this.$el.html('<h3>Massage The Data</h3>');
    }
    console.log('meta table rendered');
    return this;
  }
});