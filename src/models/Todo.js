import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "Username not provided",
    required: false,
  },
  avatar: {
    type: String,
    default:
      "https://source.boringavatars.com/marble/120/Maria%20Mitchell?colors=264653,2a9d8f,e9c46a,f4a261,e76f51",
    required: false,
  },
  todo_title: {
    type: String,
    default: "Not Title provided",
    required: false,
  },
  todo_content: {
    type: String,
    default: "Not Content provided",
    required: false,
  },
  todo_date: {
    type: Date,
    required: false,
  },
  todo_time: {
    // Da ricontrollare
    type: Date,
    required: false,
  },
  categories: {
    type: String,
    required: false,
  },
  isInProgress: {
    type: Boolean,
    default: true,
    required: false,
  },
});

module.exports = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
