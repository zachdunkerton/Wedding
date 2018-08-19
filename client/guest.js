Template.guest.onCreated(function(){
  this.id = new ReactiveVar(0);
  let template = Template.instance();
  name = FlowRouter.getParam('id');
  template.subscribe("guest", name);
  setTimeout(function(){
      $("#loading").fadeOut();
      $("#theTable").fadeIn();
      $("#pic").fadeIn();
      $("#submitButtonDiv").fadeIn();
      people = People.find().fetch();
      for(peeps in people){
        if(people[peeps].coming == 1){
          id_checkbox = '#' + people[peeps].firstName; 
          id_label = "#" + people[peeps]._id
          $(id_checkbox).prop('checked',true);
          $(id_label).css("background-position", "40% 0");
        }
      }
    }, 4000)
});

Template.guest.helpers({
  guestID(){
    return FlowRouter.getParam('id');
  },
  guest(){
    return People.find();
  },
  id(){
    return this._id
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
  },
  plusone_name(){
    return this.firstName + " " + this.lastName;
  },
  plus1(){
    if(this.plusOne){
      return true;
    }
    else{
      return false;
    }
  }
});
$(document).ready(function () {

  $(document).on('change', '[type=checkbox]', function() {
    var box = document.getElementById( $(this).attr("value"));
    if(this.checked){
      $(box).css("background-position", "40% 0");
    }
    else{
      $(box).css("background-position", "60% -40px");
    }
    
  }); 
  $(document).on('click', '#submitButton', function() {
    people = []
    $('input[type=checkbox]').each(function () {
      person = People.findOne($(this).attr("value"))
      people.push(person)
      if($(this).is(":checked")){
        if(person.plusOne==true){
          if($("#plusone").val().split(' ').length >1){
            Meteor.call("updatePlusOne", $(this).attr("value"), $("#plusone").val().split(' ')[0], $("#plusone").val().split(' ')[1]);  
          }
          else{
            Meteor.call("updatePlusOne", $(this).attr("value"), "No_Name", "Entered");
          }
        }
        else{
          Meteor.call("updateComing", $(this).attr("value"), 1);
        }
      }
      else{
         Meteor.call("updateComing", $(this).attr("value"), -1);
      }
    });
    setTimeout(function(){
      Meteor.call("sendEmail", people)
    },3000)
    $("#theTable").fadeOut();
    $("#pic").fadeOut();
    $("#submitButtonDiv").fadeOut();
    $("#thanks").css('visibility','visible').fadeIn();
    setTimeout(function(){
      FlowRouter.go('/')
    }, 3000)
  })
})


