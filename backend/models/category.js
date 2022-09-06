const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  icon: String,
  color: String,
});

exports.Category = mongoose.model("Category", categorySchema);
