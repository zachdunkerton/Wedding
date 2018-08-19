FlowRouter.route('/', {
name: 'mainpage',
action(){
     BlazeLayout.render('MainLayout', {main: 'mainpage'});
}
})
FlowRouter.route('/add', {
name: 'add',
action(){
	if(Meteor.userId()){
     BlazeLayout.render('MainLayout', {main: 'addpeople'});
	}
	else{
		FlowRouter.go("/")
	}
}
})
FlowRouter.route('/guestlist', {
name: 'rsvp',
action(){
	if(Meteor.userId()){
     BlazeLayout.render('MainLayout', {main: 'rsvp'});
	}
	else{
		FlowRouter.go("/")
	}
}
})
FlowRouter.route('/login', {
name: 'login',
action(){
     BlazeLayout.render('MainLayout', {main: 'login'});
}
})
FlowRouter.route('/users', {
name: 'users',
action(){
	if(Meteor.userId()){
     BlazeLayout.render('MainLayout', {main: 'users'});
	}
	else{
		FlowRouter.go("/")
	}
}
})
FlowRouter.route('/guest/:id', {
name: 'guest',
action(){
    BlazeLayout.render('MainLayout', {main: 'guest'});
}
})
