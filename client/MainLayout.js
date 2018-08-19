import {Template} from 'meteor/templating';
import './MainLayout.html';
Template.MainLayout.events({
"click #users":function(){
	FlowRouter.go("/users");
},
"click #add":function(){
	FlowRouter.go("/add");
},
"click #list":function(){
	FlowRouter.go("/guestlist");
},
"click #logout":function(){
	event.preventDefault();
    Session.keys = {};
    Meteor.logout();
    FlowRouter.go('/');
}
})