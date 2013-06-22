var SubmitTrainedNetView = Backbone.View.extend({
  //model: Result
  status: 'notSaved',

  events: {
    "submit": "submitTrainedNetButton",
  },

  initialize: function(){
    this.model.on('sync',this.updateStatus, this);
  },

  submitTrainedNetButton: function(event){
    event.preventDefault();
    this.status = 'saving';
    var name = this.$el.find('.netNameInput').val();
    this.render();

    this.model.postResult(name);

    console.log('submitting function!');
  },

  updateStatus: function(){
    if(!this.model.isNew()){
      var self = this;
      setTimeout(function(){
        self.status = 'saved';
        self.render();
      }, 1000);
    } else {
      this.status = 'error';
    }
    this.render();
  },

  render: function() {
    console.log('this.status: ', this.status);
    if(this.status === 'notSaved'){
      this.$el.html('<form class="form-inline">' +
                        '<input required type="text" class="netNameInput" placeholder="Trained Net Name">' +
                      '<button type="submit" class="btn">Save to Server</button>' +
                    '</form>'
      );
    } else if(this.status === 'saving'){
      this.$el.html('Saving');
    } else if(this.status === 'saved'){
      var domain = window.location.host
      var path = '#'+ this.model.get('name') + '/' + this.model.id
      this.$el.html('Saved! This is the link to your run: <a href="'+ path +'">'+ domain + '/' + path + '</a>');
    } else if(this.status === 'error'){
      this.$el.html('<form class="form-inline">' +
                        '<input required type="text" class="netNameInput" placeholder="Trained Net Name">' +
                      '<button type="submit" class="btn">Could not save, try a different name!</button>' +
                    '</form>'
      );
      console.log('this.model.get("error"): ', this.model.get('error'));
    }
    this.$el.removeClass('hide');
    return this;
  }
});