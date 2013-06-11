var TrainingView = Backbone.View.extend({

  el: '#training-views',

  show: false,

  completed: 0,

  workerData: {},

  error: null,

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
  },

  onMessage : function(event) {
    this.workerData = JSON.parse(event.data);
    if(this.workerData.type == 'progress') {
      this.completed = 100 * this.workerData.iterations / this.model.get('metaHash').trainer.parameters.iterations;
    } else if(this.workerData.type == 'result') {
      this.completed = 100;
      console.log('training done!');
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
      this.template = $("#training-template").html();
      if(this.completed === 100){
        var indexHash = {};
        indexHash.count = 0;
        var sampleSize = Math.round(this.model.get('metaHash').count * this.model.get('metaHash').sampleRate,1);
        while(indexHash.count < sampleSize){
          var randIndex = Math.floor(Math.random() * this.model.get('metaHash').count)
          if(!indexHash[randIndex]){
            indexHash[randIndex] = randIndex;
            indexHash.count += 1;
          }
        }
        var net = new brain.NeuralNetwork().fromJSON(this.workerData.net);
        var metaHash = this.model.get('metaHash');
        var diffSum = 0;
        var text = "Date: " + Date() + "\n";
        
        for(var index in indexHash){
          if(index === 'count') {continue}
          var sampleInput = this.model.get('normalizedObject')[index].input;
          var output = net.run(sampleInput);
          var targetIndex = metaHash.target;
          var targetKey = metaHash.colNameArray[targetIndex].name;
          var expectedOutput = this.model.get('normalizedObject')[index].output[targetKey];
          var diff = Math.abs(output[targetKey] - expectedOutput);
          text = text + 'index: ' + index +
                  ' input: ' +JSON.stringify(sampleInput) +
                  " output: " + JSON.stringify(expectedOutput) +
                  " actual output: " + output[targetKey] +
                  " diff: " + diff + "\n";
          diffSum += diff;
        }
        debugger
        var averageDiff = diffSum / indexHash.count;
        text = "average Diff: " + averageDiff + "\n" + text;
        $textarea = $('<textarea rows="10">')
        $textarea.text(text);
        $textarea.addClass('span12');
        $('#check-and-submit').before($textarea);
      }
    } else {
      $('#training-view .progress').hide();
      $('#check-and-submit').hide();
    }
    console.log('training view rendered');
    return this;
  }
});