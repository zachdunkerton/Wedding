import './addEditUserModal.html';
import {Template} from 'meteor/templating';
let closeModal = () => {
  $( '#add-edit-user-modal' ).modal( 'hide' );
  $( '.modal-backdrop' ).fadeOut();
};

Template.addEditUserModal.helpers({
  user() {
    let userModal = Session.get( 'userModal' );
    if ( userModal ) {
      return userModal;
    }
  },
  email(){
    let userModal = Session.get( 'userModal' );
    if(userModal){
    if ( userModal.type == 'edit' ||  userModal.type =='editP') {
      return userModal.rowInfo.emails[0].address;
    }
  }
  },
  modalLabel() {
    let userModal = Session.get( 'userModal' );
    if ( userModal ) {
      if(userModal.type == "edit" || userModal.type == "editP"){
        return 'Edit';
      }
      else{
        return 'Add';
      }
    }
  },
  modalType( type ) {
    let userModal = Session.get( 'userModal' );
    if ( userModal ) {
      return userModal.type === type;
    }
  }
  });

Template.addEditUserModal.events({
  'click #submit' ( event, template ) {
    let userModal = Session.get( 'userModal' );
    if(userModal.type == 'edit'){
    var pw1 =template.find( '[name="password1"]' ).value;
    var pw2 =template.find( '[name="password2"]' ).value;
    var email = template.find( '[name="email"]' ).value;
    var fname =  template.find( '[name="fName"]' ).value;
    var lname = template.find( '[name="lName"]' ).value;
    if(pw1 && pw1 != pw2){
      Bert.alert('Passwords do not match', 'danger');
    }
    else{
      Meteor.call('updateUser',
      fname,
      lname,
      email,
      pw1,
      function(error){
        if(error){
          Bert.alert( error.reason, 'danger' );
        }
        else{
          Bert.alert( `User Edited!`, 'success', 'growl-top-right' );
          closeModal();
          template.find( '[name="password1"]' ).value = "";
          template.find( '[name="password2"]' ).value = "";

        }
      }
    )}
  }
  else if(userModal.type == 'add'){
    var pw1 =template.find( '[name="password1"]' ).value;
    var pw2 =template.find( '[name="password2"]' ).value;
    var email = template.find( '[name="email"]' ).value;
    var fname =  template.find( '[name="fName"]' ).value;
    var lname = template.find( '[name="lName"]' ).value;
    if(!pw1 || ! pw2 || !email || !fname || !lname){
      Bert.alert('Please fill out all fields!', 'warning');
    }
    else if(pw1 && pw1 != pw2){
      Bert.alert('Passwords do not match', 'danger');
    }
    else if(email.indexOf("@") == -1){
      Bert.alert('Please enter a valid email', 'danger');
    }
    else{
      Meteor.call('insertUser',
      fname,
      lname,
      email,
      pw1,
      function(error){
        if(error){
          Bert.alert( error.reason, 'danger' );
        }
        else{
          Bert.alert( `User Added!`, 'success', 'growl-top-right' );
          closeModal();
          template.find( '[name="password1"]' ).value = "";
          template.find( '[name="password2"]' ).value = "";
        }
      }
    )}
  }
  },
  'click #delete' ( event, template ) {
    if ( confirm( 'Are you sure? This is permanent.' ) ) {
    Meteor.call('deleteUser',
    template.find( '[name="email"]' ).value,
    function(error){
      if(error){
        Bert.alert( error.reason, 'danger' );
      }
      else{
        Bert.alert( `User Deleted!`, 'success', 'growl-top-right' );
        closeModal();
      }
  })
}
}
})
