import {Template} from 'meteor/templating';
import './addpeople.html';
Template.addpeople.onCreated(function(){
  let template = Template.instance()
  template.subscribe("people");
  this.added = new ReactiveVar([])
})

Template.addpeople.helpers({
  getAdded(){
    let template = Template.instance();
    return template.added.get();
  }
});

Template.addpeople.events({
  "click .fa-plus": function(event, template){
     var person = template.find("#addNew").value;
     var add = template.added.get()
     add.push(person);
     template.added.set(add)
     template.find("#addNew").value = "";
  },
  "keyup":function(event,template){
    if(event.which == 13){
      var person = template.find("#addNew").value;
      var add = template.added.get()
      add.push(person);
      template.added.set(add)
      template.find("#addNew").value = "";
    }
  },
  'click .submit':function(event, template){
    var table = template.find('#groupTable');
    var name;
    var group = template.find("#groupName").value;
    for(var i = 0; i<table.rows.length-1; i++){
      if(table.rows[i].childNodes[1]){
         name = table.rows[i].childNodes[1].childNodes[1].innerHTML.trim().split(" ");
         Meteor.call('addPerson', name[0], name[1], group, function(error){
           if(error){
            console.log(error);
           }
           else{
             Bert.alert('Guest Added!', 'success', 'growl-top-right');
             FlowRouter.go('/guestlist');
           }
         })
      }
      else{
        name = table.rows[i].childNodes[1].childNodes[1].innerHTML.trim().split(" ");
        Meteor.call('addPerson', name[0], name[1], group, function(){
          if(error){
           console.log(error);
          }
          else{
            Bert.alert('Guest Added!', 'success', 'growl-top-right');
            FlowRouter.go('/guestlist');
          }
        })
      }
    }

  }
});
