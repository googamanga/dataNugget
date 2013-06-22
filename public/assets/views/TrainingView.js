var ProgressView = Backbone.View.extend({
  el: '.progress',

  template: _.template('<div class="bar" style="width:<%= completed %>%"></div>'),

  completed: 0,

  initialize: function(){
    this.model.on('all:trainerMessage', function(){
      this.onMessage(this.model.get('trainerMessage'));  // turn off for debugger
      // this.$el.removeClass('hide');
      // this.render();
    },this);
  },
  onMessage : function(event) {
    this.workerData = JSON.parse(event.data);
    if(this.workerData.type == 'progress') {
      console.log('error: ' + this.workerData.error);
      this.completed = 100 * this.workerData.iterations / this.model.get('metaHash').trainer.parameters.iterations;
    } else if(this.workerData.type == 'result') {
      this.completed = 100;
      console.log('training done!');
      this.model.createResultModel(this.workerData.net);
    }
    this.$el.removeClass('hide');
    this.render();
  },
  render: function(){
    this.$el.find('.bar').css("width", this.completed + "%");
  }
});

var InternalTrainingViews = Backbone.View.extend({
  el: '#internal_training_views',

  resultViews: [],

  initialize: function(){
    this.listenTo(this.model.get('results'), 'add', function(model){
      this.render(model);
    },this);
  },
  render: function(model){
    this.$el.removeClass('hide');
    //crete viewId
    var viewId = 'view-' + model.get('viewId');
    //add empty div to results container
    var $resultEl = $("<div id='"+ viewId + "'></div>");
    $resultEl.addClass('hide');
    //assign div to new View
    this.$el.append($resultEl);
    //instantiate new view
    this.resultViews.push(new ResultView({model: model,  el: $resultEl}));
  }
});

var ResultView = Backbone.View.extend({
  initialize: function(){
    this.render();
  },
  render: function(){
    this.$el.removeClass('hide');

    if(clientData.get('results').length > 1 ){
      this.$el.append('<hr size="20px">');
    }
    this.$el.append('<div class="sampleData hide"></div>');
    this.sampleData = new SampleData({model: this.model, el: this.$('.sampleData')}).render();

    this.$el.append('<div class="userInput hide"></div>');
    this.userInput = new UserInput({model: this.model, el: this.$('.userInput')}).render();

    this.$el.append('<div class="submitTrainedNet hide"></div>');
    this.submitTrainedNetView = new SubmitTrainedNetView({model: this.model, el: this.$('.submitTrainedNet')}).render();

    // this.$el.append('<div class="functionView hide"></div>');DOES NOT WORK
    // this.functionView = new FunctionView({model: this.model, el: this.$('.functionView')}).render();DOES NOT WORK
  }
});

var SampleData = Backbone.View.extend({
  render: function(){

    // $textarea = $('<textarea rows="10">');
    // $textarea.text(this.model.get('realOutput'));
    // $textarea.addClass('span11');

    // this.$el.append($textarea);
    // this.$el.removeClass('hide');
    return this;
  }
});

var UserInput = Backbone.View.extend({

  events: {
    'submit': 'submitHandler'
  },

  initialize: function(){

    this.template =  $("#input-user-template").html();

    this.model.on('change:targetOutputRealValue', function(){
      this.render();
    },this);
  },

  submitHandler: function(event) {
    // Stops the form from submitting and refreshing the page
    event.preventDefault();

    var input = {};
    var elements = this.$el.find('input').toArray();
    for(var i = 0; i < elements.length; i++){
      input[elements[i].className] = elements[i].value;
    }
    this.model.update(input);
  },

  render: function(){
    // window.resultModel = this.model;
    this.$el.empty();
    var $readyHtml = $(_.template(this.template, {
      metaHash: this.model.get('metaHash'),
      model: this.model,
    }));

    this.$el.append('<p>Please insert all of your input values and then hit enter</p>');
    this.$el.append('<p>The average difference during sampling for this neural network is: <strong>' +
     Math.round(this.model.attributes.averageRealDiff * 100) / 100 +'</strong> units in the <strong>'+
     this.model.get('metaHash').colNameArray[this.model.get('metaHash').target].name +'</strong> column</p>');
    this.$el.append($readyHtml);
    this.$el.removeClass('hide');

  }
});

var FunctionView = Backbone.View.extend({  // NOT USED
  render: function(){
    this.$el.removeClass('hide');
    this.$el.append("<p>Feel free to copy this javascript function to calculate your inputs anywhere!</p>");
    this.$el.append("<pre>" + this.model.get('net').toFunction().toString() + "</pre>");
  }
});


