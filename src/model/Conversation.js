const mongoose = require("mongoose");

const groupInfoSchema = new mongoose.Schema({
  name: String,
  owner: String,
});

const schema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    groupInfo: {
      type: groupInfoSchema,
      default: null,
    },
    messages: [{ type: mongoose.Schema.Types.ObjectId }],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", schema);

module.exports = Conversation;
