const mongoose = require("mongoose");
function connection() {
  mongoose
    .connect(
      "mongodb+srv://kashifali0969082:9bGTtQoSf45u51OT@cluster0.kkwfi7t.mongodb.net/"
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB:", err));
}

const TransferUserDataSchema = new mongoose.Schema({
  userAddress: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  uplineId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  imgURL: {
    type: String,
  },
  joiningDate: {
    type: Number,
    required: true,
  },
  countId: {
    type: Number,
    required: true,
    unique: true,
  },
  uplineCountID: {
    type: Number,
  },
  uplineAddress: {
    type: String,
    required: true,
  },
  directDownlines: {
    type: [String],
    default: [],
  },
});
// struct TransferUserData {
//   address userAddress; // User’s address
//   uint256 team_Id; // Team ID
//   uint256 totalIncome; // Total income
//   uint256 totalVirtualIncome; // Total virtual income
//   uint256 transactionCount; // Transaction count
//   uint256 totalDirect; // Total direct referrals
//   uint256 lastUpdate; // Last update timestamp
//   uint256 currentUserLevel; // Current level
//   uint256 firstActivationDate; // First activation timestamp
//   address virtualUpline; // Virtual upline address
//   address[] virtualDirects; // Array of virtual direct downlines
//   uint256 virtualId; // Virtual ID
//   bool isActive; // Active status
//   UserHistory[] history; // User history
// }
const LvlSchema = new mongoose.Schema({
  userAddress: {
    type: String,
    required: true,
  },
  team_Id: {
    type: Number,
    required: true,
  },
  totalIncome: {
    type: String,
    required: true,
  },
  totalVirtualIncome: {
    type: String,
    required: true,
  },
  transactionCount: {
    type: Number,
    required: true,
  },
  totalDirect: {
    type: Number,
    required: true,
  },
  lastUpdate: {
    type: Number,
    required: true,
  },
  currentUserLevel: {
    type: Number,
    required: true,
  },
  firstActivationDate: {
    type: Number,
    required: true,
  },
  virtualUpline: {
    type: String,
    required: true,
  },
  virtualDirects: {
    type: [String],
    default: [],
  },
  virtualId: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  history: [[String, String, String, String]],
});
const LvlTenSchema = new mongoose.Schema({
  userAddress: {
    type: String,
    required: true,
  },
  team_Id: {
    type: String,
    required: true,
  },
  totalIncome: {
    type: String,
    required: true,
  },
  totalVirtualIncome: {
    type: String,
    required: true,
  },
  transactionCount: {
    type: String,
    required: true,
  },
  totalDirect: {
    type: String,
    required: true,
  },
  lastUpdate: {
    type: String,
    required: true,
  },
  currentUserLevel: {
    type: String,
    required: true,
  },
  firstActivationDate: {
    type: String,
    required: true,
  },
  virtualUpline: {
    type: String,
    required: true,
  },
  virtualDirects: {
    type: [String],
    default: [],
  },
  virtualId: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  history: [[String, String, String, String]],
});
const RegistrationData = mongoose.model(
  "RegistrationData",
  TransferUserDataSchema
);
const LevelsOneToNine = mongoose.model("LvlSchema", LvlSchema);
const LevelsTen = mongoose.model("LvlTenSchema", LvlTenSchema);

module.exports = { connection, RegistrationData, LevelsOneToNine, LevelsTen };
