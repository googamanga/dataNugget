var ProgressView = Backbone.View.extend({
  el: '.progress',

  template: _.template('<div class="bar" style="width:<%= completed %>%"></div>'),

  completed: 0,

  initialize: function(){
    this.model.on('all:trainerMessage', function(){
      debugger
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
      console.log('training done!', JSON.stringify(event));
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
      render();
    },this);
  },
  render: function(){
    this.$el.removeClass('hide');
    //crete viewId
    var viewId = 'view-' + model.get('viewId');
    //add empty div to results container
    var $resultEl = $("<div id='"+ viewId + "'></div>");
    //assign div to new View
    this.$el.append($resultEl);
    //instantiate new view
    this.resultViews.push(new ResultView({model: model,  el: $resultEl}));
  }
});

var ResultView = Backbone.View.extend({
  initialize: function(){
    console.log('el is: ', this.el);
  }
});








// var ResultView = Backbone.View.extend({
//   el:'#training-view',

//   initialize: function(){
//     var divId = 'sampleOutput-' + this.id;
//     var $div = $('<div id=' + divId + '></div>');
//     this.$el.append($div);
//     this.$el = $div;

//     $textarea = $('<textarea rows="10">');
//     $textarea.text(this.model.get('realOutput'));
//     $textarea.addClass('span12');
//     this.$el.append($textarea);

//     this.template = $("#input-user-template").html();

//     var self = this;

//     this.$el.on('keypress', 'input', function(event){  //listen to 'enter'
//       if(event.which == 13) {
//         event.preventDefault();
//         var input = {};
//         var elements = self.$el.find('input').toArray();
//         for(var i = 0; i < elements.length; i++){
//           input[elements[i].className] = elements[i].value;
//         }
//         self.model.update(input);
//       }
//     });

//     this.model.on('change:targetOutputRealValue', function(){
//       this.render();
//     },this);
//     this.render();
//   },

//   render: function(){
//     window.resultModel = this.model;
//     this.$el.find('.dynamic-table').remove();
//     this.$el.append(_.template(this.template, {
//       metaHash: this.model.get('metaHash'),
//       model: this.model,
//     })); 
//   }
// });


// var TrainingView = Backbone.View.extend({

//   el: '#training-views',

//   show: false,

//   completed: 0,

//   workerData: {},

//   resultViews: [],

//   error: null,

//   subViewCount: 0,

//   initialize: function() {
//     this.model.on('all:trainerMessage', function(){
//       this.show = true;
//       this.onMessage(this.model.get('trainerMessage'));  // turn off for debugger
//       this.render();
//     },this);

//     this.model.on('all:trainerError', function(){
//       this.show = true;
//       this.onError(this.model.get('trainerError'));
//     },this);
//     this.render();

//     this.listenTo(this.model.get('results'), 'add', function(model){
//       var subView = new ResultView({model: model, id: model.get('viewId')});
//       this.resultViews.push(subView);
//       this.subViewCount += 1;
//     });
//   },

//   onMessage : function(event) {
//     this.workerData = JSON.parse(event.data);
//     if(this.workerData.type == 'progress') {
//       console.log('error: ' + this.workerData.error);
//       this.completed = 100 * this.workerData.iterations / this.model.get('metaHash').trainer.parameters.iterations;
//     } else if(this.workerData.type == 'result') {
//       this.completed = 100;
//       // this.render();
//       console.log('training done!');
//       var subViewId = "result" + this.subViewCount;
//       this.model.createResultModel(subViewId, this.workerData.net);
//       //wait for add event
//     }
//   },

//   onError : function(event) {//create variable error
//     this.error = "error training network: " + event.message;
//   },

//   render: function() {
//     if(this.show === true){
//       $('#training-view .progress').show();
//       $('#check-and-submit').show();
//       $(".bar").css("width", this.completed + "%");
//     } else {
//       $('#training-view .progress').hide();
//     }
//     console.log('training view rendered');
//     return this;
//   }
// });

// var ResultView = Backbone.View.extend({
//   el:'#training-view',

//   initialize: function(){
//     var divId = 'sampleOutput-' + this.id;
//     var $div = $('<div id=' + divId + '></div>');
//     this.$el.append($div);
//     this.$el = $div;

//     $textarea = $('<textarea rows="10">');
//     $textarea.text(this.model.get('realOutput'));
//     $textarea.addClass('span12');
//     this.$el.append($textarea);

//     this.template = $("#input-user-template").html();

//     var self = this;

//     this.$el.on('keypress', 'input', function(event){  //listen to 'enter'
//       if(event.which == 13) {
//         event.preventDefault();
//         var input = {};
//         var elements = self.$el.find('input').toArray();
//         for(var i = 0; i < elements.length; i++){
//           input[elements[i].className] = elements[i].value;
//         }
//         self.model.update(input);
//       }
//     });

//     this.model.on('change:targetOutputRealValue', function(){
//       this.render();
//     },this);
//     this.render();
//   },

//   render: function(){
//     window.resultModel = this.model;
//     this.$el.find('.dynamic-table').remove();
//     this.$el.append(_.template(this.template, {
//       metaHash: this.model.get('metaHash'),
//       model: this.model,
//     })); 
//   }
// });
