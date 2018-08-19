import { Meteor } from 'meteor/meteor';

Meteor.startup(function () {
  process.env.MAIL_URL = "smtps://zachdunkerton@gmail.com:06Haveanice08@smtp.gmail.com:465";
  process.env.MONGOURL =  "mongodb://<db_username>:<db_password>@<db_server_host>:<db_server_port>/<db_name>"
});