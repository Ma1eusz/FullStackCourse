const mongoose = require("mongoose");

// USAGE: node mongo.js yourpassword Anna 040-1234556
if (
  process.argv.length < 3 ||
  (process.argv.length > 3 && process.argv.length < 5)
) {
  console.log(`USAGE: node mongo.js password name number`);
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://matiburkowski:97eh3YIsL7bdFuC3@part3db.tmwcibn.mongodb.net/?retryWrites=true&w=majority&appName=part3db`;

mongoose
  .connect(url)
  .catch((err) => {
    console.error(err);
  });

mongoose.connection.on("error", (err) => {
  console.err(err);
});

const PersonSchema = mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", PersonSchema, "persons");

if (process.argv.length === 3) {
  let count = 0;
  Person.find({}).then((result) => {
    console.log("phonebook:\n");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
      count += 1;
    });
    mongoose.connection.close();
    console.log("\ntotal:", count);
    process.exit(0);
  });
}

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

person
  .save()
  .then((result) => {
    console.log(`added ${result.name} to phonebook`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(err);
  });
