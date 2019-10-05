const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const Todo = require("../models/todo-model");

//connect to mongodb
mongoose.connect(
  keys.mongodb.dbURI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  () => {
    console.log("Connected to mongodb");
  }
);

const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = app => {
  app.get("/todo", (req, res) => {
    Todo.find({}, (err, data) => {
      if (err) throw err;
      res.render("todo", { todo: data });
    });
  });

  app.post("/todo", urlencodedParser, (req, res) => {
    let newTodo = Todo(req.body).save((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete("/todo/:item", (req, res) => {
    Todo.find({ item: req.params.item.replace(/\-/g, "") }).deleteOne(
      (err, data) => {
        if (err) throw err;
        console.log(data);
        res.json(data);
      }
    );
  });
};
