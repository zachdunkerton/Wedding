People = new Mongo.Collection('people');

People.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

People.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});
