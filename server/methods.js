Meteor.methods({
  addPerson(firstName, lastName, group){
  var plusOne = false;
  if(firstName == "Plus" && lastName == "One"){
    plusOne = true;
  }
  let item = {
    firstName: firstName,
    lastName: lastName,
    group: group,
    coming: 0,
    plusOne: plusOne
  }
  var x = People.find(item).fetch();
  if(x.length < 1){
    People.insert(item);
  }
},
  updateComing(id, coming){
    return People.update({_id:id},{$set:{coming:coming}});
  },
  updatePlusOne(id, firstName, lastName){
    return People.update({_id:id},{$set:{coming:1, firstName:firstName, lastName:lastName}});
  },
  deleteGuest(id){
    People.remove(id)
  },
  sendEmail(people){
    persons = []
    for(x in people){
      person = People.findOne(people[x]._id)
      persons.push(person)
    }
    SSR.compileTemplate('htmlEmail', Assets.getText('email.html'));
        var emailData = {
          people: people
        };
        var to = ["megew00d96@gmail.com","zachdunkerton@gmail.com"]
      Email.send({
        to: to,
        from: "zachdunkerton@gmail.com",
        subject: "RSVP",
        html: SSR.render('htmlEmail', emailData),
      });
  }
})
