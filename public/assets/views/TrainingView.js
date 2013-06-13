var TrainingView = Backbone.View.extend({

  el: '#training-views',

  show: false,

  completed: 0,

  workerData: {},

  resultViews: [],

  error: null,

  subViewCount: 0,

  events: {
  },

  initialize: function() {
    this.model.on('all:trainerMessage', function(){
      this.show = true;
      // this.completed = 100; //turn on for debugger
      this.onMessage(this.model.get('trainerMessage'));  // turn off for debugger
      this.render();
    },this);

    this.model.on('all:trainerError', function(){
      this.show = true;
      this.onError(this.model.get('trainerError'));
    },this);
    this.render();

    this.listenTo(this.model.get('results'), 'add', function(model){
      var subView = new ResultView({model: model, id: model.get('viewId')});
      this.resultViews.push(subView);
      this.subViewCount += 1;
    });
  },

  onMessage : function(event) {
    this.workerData = JSON.parse(event.data);
    if(this.workerData.type == 'progress') {
      this.completed = 100 * this.workerData.iterations / this.model.get('metaHash').trainer.parameters.iterations;
    } else if(this.workerData.type == 'result') {
      this.completed = 100;
      // this.render();
      console.log('training done!');
      var subViewId = "result" + this.subViewCount;
      this.model.createResultModel(subViewId, this.workerData.net);
      //wait for add event
    }
  },

  onError : function(event) {//create variable error
    this.error = "error training network: " + event.message;
  },

  render: function() {
    if(this.show === true){
      $('#training-view .progress').show();
      $('#check-and-submit').show();
      $(".bar").css("width", this.completed + "%");
    } else {
      $('#training-view .progress').hide();
    }
    console.log('training view rendered');
    return this;
  }
});

var ResultView = Backbone.View.extend({
  el:'#training-view',

  initialize: function(){
    this.render();
  },

  render: function(){
    $textarea = $('<textarea rows="10">');
    $textarea.text(this.model.get('realOutput'));
    $textarea.addClass('span12');
    var textAreaId = 'sampleOutput-' + this.id;
    $textarea.attr('id', textAreaId);
    this.$el.append($textarea);
    this.template = $("#input-user-template").html();
    $('#' + textAreaId).after(_.template(this.template, {
      metaHash: this.model.get('metaHash'),
      targetRealOutput: this.model.get('text'),
    })); 
  }
});
