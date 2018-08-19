import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.mainpage.helpers({
  guest(){
    return template.find("#groupid").value;
  }
});

Template.mainpage.events({
  "click #submitRSVP": function(event, template){
     var id = template.find("#groupid").value;
     var sub = template.subscribe("guest", id);
     Tracker.autorun(()=>{
		 if(sub.ready()){
		    if(People.find().count()<1){
		     	template.find("#groupid").value ="No guests with that code"
		     }
		     else{
		     	var route = '/guest/' + id;
		     	FlowRouter.go(route);
		     }
		 }
     })
  }
});
