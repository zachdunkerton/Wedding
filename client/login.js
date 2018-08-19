Template.login.events({
  'click .loginButton':function(event){
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    Meteor.loginWithPassword(email, password, function(error){
          if(error){
            Bert.alert( 'Username or password incorrect', 'danger' );
          }
          else{
              FlowRouter.go('/guestlist');
              Bert.alert( 'Login Successful', 'success' , 'growl-top-right');
            }
        });
 },
 'keyup':function(event){
   if(event.which==13){
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    Meteor.loginWithPassword(email, password, function(error){
          if(error){
            console.log(error)
            Bert.alert( 'Username or password incorrect', 'danger' );
          }
          else{
              FlowRouter.go('/guestlist');
              Bert.alert( 'Login Successful', 'success' , 'growl-top-right');
            }
        });
     }
 }
});
