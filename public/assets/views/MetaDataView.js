var MetaDataView = Backbone.View.extend({

  el: '#meta-data-work',

  show: true,

  events: {
    "input #csvInput": "massageCsvButton",
    "propertychange #csvInput": "massageCsvButton",
    "click #massageCsvButton": "massageCsvButton",
    "click tbody": "parseTableClick"
  },

  initialize: function() {
    self = this;
    this.model.on('all', function(){
      self.render();
    });
  },

  massageCsvButton: function(){
    this.model.csvToMetaData();
  },

  parseTableClick: function(event){
    var idArray = event.target.id.split('-');
    var type = idArray[0];
    var index = idArray[1];
    if(type !== undefined && index !== undefined){
      this.model.updateMetaData(type, index);
    }
    // self.render();  //should update automatically
  },

  render: function() {
    this.template = $("#meta-data-work-template").html();
    this.$el.html(_.template(this.template, {'metaHash': this.model.get('metaHash')}));
    console.log('meta table rendered');
    return this;
  }
});