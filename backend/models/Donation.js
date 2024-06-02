var mongoose = require("mongoose");

var DonationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donor",
    required: true,
  },
  entity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entity",
    required: true,
  },
  parts: [
    {
      type: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
    },
  ],
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Donation", DonationSchema);