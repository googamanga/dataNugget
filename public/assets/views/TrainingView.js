var TrainingView = Backbone.View.extend({

  el: '#training-views',

  show: false,

  completed: 0,

  workerData: {},

  error: null,

  renderCount: 0,

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
            if(indexHash.count === 0){
              indexHash[51] = 51;
            }
            indexHash.count += 1;
          }
        }
        var net = new brain.NeuralNetwork().fromJSON(this.workerData.net);
        var metaHash = this.model.get('metaHash');
        var realDiffSum = 0;
        var normalizedDiffSum = 0;
        var text = "Date: " + Date() + "\n";
        
        for(var index in indexHash){
          if(index === 'count') {continue}
          var sampleInput = this.model.get('normalizedObject')[index].input;
          var output = net.run(sampleInput);
          var targetIndex = metaHash.target;
          var targetKey = metaHash.colNameArray[targetIndex].name;
          var expectedOutput = this.model.get('normalizedObject')[index].output[targetKey];

          //normalized to real
          var realExpectedOutput = metaHash.colNameArray[targetIndex].normalizedToReal(expectedOutput);
          var realGivenOutput = metaHash.colNameArray[targetIndex].normalizedToReal(output[targetKey]);
          var realSampleInput = {};
          debugger
          for(var key in sampleInput){
            realSampleInput[key] = metaHash.colNameArray[metaHash.nameIndexHash[key]].normalizedToReal(sampleInput[key]);
          }

          //calculate diff
          var normalizedDiff = Math.abs(output[targetKey] - expectedOutput);
          var realDiff = Math.abs(realGivenOutput - realExpectedOutput);
          text = text + 'index: ' + index +
                  ' input: ' +JSON.stringify(realSampleInput) +
                  " output: " + JSON.stringify(realExpectedOutput) +
                  " actual output: " + Math.round(realGivenOutput * 100) / 100 +
                  " actual Diff: " + Math.round(realDiff * 100) / 100 +
                  " normalized Diff: " + Math.round(normalizedDiff * 10000) / 100 + "%\n";
          normalizedDiffSum += normalizedDiff;
          realDiffSum += realDiff;

        }
        var averageNormalizedDiff = normalizedDiffSum / indexHash.count;
        var averageRealDiff = realDiffSum / indexHash.count;
        text = "average normalized difference : " + Math.round(averageNormalizedDiff * 10000) / 100 + "%\n" + text;
        text = "average real difference : " + Math.round(averageRealDiff * 100) / 100 + "\n" + text;
        $textarea = $('<textarea rows="10">');
        $textarea.text(text);
        $textarea.addClass('span12');
        // debugger
        $textarea.attr('id', 'normalizedOutput-' + this.renderCount);
        this.renderCount += 1;
        $('#training-view').append($textarea);
      }
    } else {
      $('#training-view .progress').hide();
      $('#check-and-submit').hide();
    }
    console.log('training view rendered');
    return this;
  }
});