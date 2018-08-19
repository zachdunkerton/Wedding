import {Template} from 'meteor/templating';
import './rsvp.html';
var sub;
Template.rsvp.onCreated(function(){
  let template = Template.instance()
  this.search = new ReactiveVar("")
    sub = template.subscribe("people");
})
Template.rsvp.onDestroyed(function(){
  console.log(sub)
  sub.stop();
  console.log(sub)
})
Template.rsvp.helpers({
  person(){
    let template = Template.instance();
    var re = new RegExp("^" + template.search.get(), 'i');
    if(template.search.get() == "" || template.search.get() == null){
      return People.find();
    }
    else{
      let users = People.find({$or:[{"firstName":re}, {"lastName":re}, {"group":re}, {"profile.group":re}]});
      return users;
    }
    return People.find().fetch();
  },
  coming(){
    if(this.coming == 1){
      return true;
    }
    else{
      return false;
    }
  },
  notcoming(){
    if(this.coming == -1){
      return true;
    }
    else{
      return false;
    }
  },
  unsure(){
    if(this.coming == 0){
      return true;
    }
    else{
      return false;
    }
  }
})

Template.rsvp.events({
  'keyup .search':function(event, template){
  template.search.set(template.find('.search').value);
},
'click .addUser':function(){
  FlowRouter.go('/add');
},
'click #deleteGuest':function(event,template){
  if(confirm("Are you sure?")){
    Meteor.call("deleteGuest", this._id)
  }
}
});
