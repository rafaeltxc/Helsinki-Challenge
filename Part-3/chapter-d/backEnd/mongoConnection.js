/*global process */
require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log("could not connect to mongodb", err.message);
  });

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (v) => {
        return /^[0-9]{2,3}-[0-9]+$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number, missing hyfen!`,
    },
    required: true,
  },
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = {
  Contact: mongoose.model("Contact", contactSchema),
};
