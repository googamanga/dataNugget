var SubmitTrainedNetView = Backbone.View.extend({
  //model: Result
  submitted: false,

  events: {
    "submit": "submitTrainedNetButton"
  },

  submitTrainedNetButton: function(event){
    event.preventDefault();
    this.submitted = true;
    var name = this.$el.find('.netNameInput').val();
    this.render();

    this.model.postResult(name);

    console.log('submitting function!');
  },

  render: function() {
    if(!this.submitted){
      this.$el.html('<form class="form-inline">' +
                        '<input required type="text" class="netNameInput" placeholder="Trained Net Name">' +
                      '<button type="submit" class="btn">Save to Server</button>' +
                    '</form>'
      );
    }
    if(this.submitted){
      this.$el.html('Saved!');
    }
    this.$el.removeClass('hide');
    return this;
  }
});