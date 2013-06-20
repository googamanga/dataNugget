var Router = Backbone.Router.extend({
  routes:{
    '': function(){
      // homePage();
      console.log('router running');
      //hide other
    },
    'model/:id': function(id){
      var resultFromServer = new Result({id: 'id'});
      resultFromServer.fetch({
        success: function(){
          console.log('pull in data from server')
          // var prediction = resultFromServer.predict({});
          //hide home
        }
      });
    }
  }
});