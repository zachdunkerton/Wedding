Meteor.methods({
  updateUser(firstName, lastName,email, password){
    if(this.userId, 'admin'){
    var theUser = Accounts.findUserByEmail(email);
    if(firstName !=theUser.lastName){
      Meteor.users.update({_id: theUser._id}, {$set:{"profile.firstName":firstName}});
    }
    if(lastName != theUser.lastName){
      Meteor.users.update({_id: theUser._id}, {$set:{"profile.lastName":lastName}});
    }
    if(password){
      Accounts.setPassword(theUser._id, password, false);
    }
  }
  },
  insertUser(firstName, lastName,email, password){
    //if(this.userId){
    let exists = Accounts.findUserByEmail( email );
    if ( !exists ) {
      Accounts.createUser(
        {
          email:email,
          password:password,
          profile:{
          firstName: firstName,
          lastName: lastName,
        }
        }
      );
    } else {
      console.warn( 'Rejected. This item already exists.' );
    }
  //}
  },
  deleteUser(email){
    if(Roles.userIsInRole(this.userId, 'admin')){
    var theUser = Accounts.findUserByEmail(email);
    Meteor.users.remove(theUser._id);
  }
  }
})
