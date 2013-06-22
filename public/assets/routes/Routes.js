var Router = Backbone.Router.extend({
  routes:{
    '': function(){
      // homePage();
      $('#router-home').removeClass('hide');
      $('#router-trained-model').addClass('hide');
      console.log('router running');
      //hide other
    },
    'model/:name/:id': function(name, id){
      $('#router-home').addClass('hide');
      $('#router-trained-model').removeClass('hide');
      var resultFromServer = new Result({id: id});
      resultFromServer.urlRoot = 'data_sets';
      resultFromServer.fetch({
        success: function(){
          console.log('pull in data from server', JSON.stringify(resultFromServer));
          new UserInput({model: resultFromServer, el: $('#router-trained-model')}).render();
          // var prediction = resultFromServer.predict({});
          //hide home
        }
      });
    }
  }

});

