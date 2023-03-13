const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const cors = require("cors");
const { Contact } = require("./mongoConnection");

const app = express();

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

morgan.token("type", (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :type")
);

app.get("/api/persons", (req, res, next) => {
  res.set("Content-Type", "application/json");

  Contact.find({})
    .then((contacts) => {
      res.status(201).json(contacts);
    })
    .catch((err) => next(err));
});

app.get("/api/persons/info", (req, res, next) => {
  res.set("Content-Type", "text/html");

  return Contact.find({})
    .then((contacts) => {
      return res
        .status(200)
        .end(
          `<p>Phonebook has info for ${
            contacts.length
          } people</p><p>${new Date()}</p>`
        );
    })
    .catch((err) => next(err));
});

app.get("/api/persons/:id", (req, res, next) => {
  res.set("Content-Type", "application/json");
  const personId = req.params.id;

  return Contact.findById(personId)
    .then((contact) => {
      if (contact != null) {
        return res.status(201).json(contact);
      } else {
        return res.status(404).json({ Error: "Person not found" });
      }
    })
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
  res.set("Content-Type", "application/json");
  const contactId = req.params.id;
  const contact = req.body;

  const contactUpdate = {
    name: contact.name,
    number: contact.number,
  };

  console.log(contactUpdate);

  return Contact.findByIdAndUpdate(contactId, contactUpdate, { new: true })
    .then((updatedContact) => {
      return res.status(201).json(updatedContact);
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res, next) => {
  res.set("Content-Type", "application/json");
  const person = req.body;

  if (!person.name) {
    return res.status(400).json({ Error: "Name missing" });
  } else if (!person.number) {
    return res.status(400).json({ Error: "Number missing" });
  } else {
    const contact = new Contact({
      name: person.name,
      number: person.number,
    });

    return contact
      .save()
      .then((contact) => {
        return res.status(200).json(contact);
      })
      .catch((err) => next(err));
  }
});

app.delete("/api/persons/:id", (req, res, next) => {
  res.set("Content-Type", "application/json");

  const personId = req.params.id;
  return Contact.findByIdAndDelete(personId)
    .then((contact) => {
      if (contact != null) {
        return res.status(204).end();
      } else {
        return res.status(404).json({ Error: "Person not found" });
      }
    })
    .catch((err) => next(err));
});

app.use((req, res) => {
  res.status(404).json({ Error: "Page Not Found" });
});

app.use((err, req, res, next) => {
  switch (err.name) {
    case "ReferenceError":
      res
        .status(404)
        .json({ Error: "Internal error, could not load the data" });
      break;
    case "MongooseError":
      res
        .status(500)
        .json({ Error: "Internal error, server connection failed" });
      break;
    case "ValidationError":
      res.status(400).json({ Error: err.message });
      break;
    default:
      res.status(500).json({ Error: "Internal error" });
  }

  next(err);
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, (err) => {
  err ? console.error(err) : console.log("listening on port:", PORT);
});
