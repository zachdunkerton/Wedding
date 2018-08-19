Meteor.publish("people", function(){
  //if(this.userId){
    return People.find();
  //}
})
Meteor.publish("guest", function(name){
    return People.find({"group":name});
})
Meteor.publish("users", function(name){
	if(this.userId){
		return Meteor.users.find({},{"profile":1, "emails":1})
	}
    
})
