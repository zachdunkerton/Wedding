import {Template} from 'meteor/templating';
import './users.html';
import './addEditUserModal.html';

Template.users.onCreated(function() {
  let template = Template.instance();
  template.subscribe('users');
})
Template.users.helpers({
  authInProcess: function() {
    return Meteor.loggingIn();
  },
  canShow: function() {
    if(Roles.userIsInRole(Meteor.userId(), 'admin'))
    {
      return true;
    }
    else{
      return false;
    }
  },
  routeMain: function(){
  FlowRouter.go('/');
},
  addUsers: function(event){
    var re = new RegExp("^" + Session.get("userSearch"), 'i');
    if(Session.get("userSearch") == "" || Session.get("userSearch") == null){
      return Meteor.users.find();
    }
    else{
      let users = Meteor.users.find(
        {$and:
          [{$or:[{"profile.firstName":re}, {"profile.lastName":re}, {"emails.address":re},]}]});
      return users;
    }
  },
  email: function(event){
    return this.emails[0].address;
  },
  firstName: function(event){
    return this.profile.firstName;
  },
  lastName: function(event){
    return this.profile.lastName;
  },
})

Template.users.events({
'click #test tr': function(){
  Session.set( 'userModal', {rowInfo: this, type: 'edit'} );
  $( '#add-edit-user-modal' ).modal( 'show' );
},
'click .addUser': function(){
  Session.set( 'userModal', {rowInfo: this, type: 'add'} );
  $( '#add-edit-user-modal' ).modal( 'show' );
},
'keyup .search':function(event, template){
  Session.set("userSearch", template.find('.search').value);
}
})
