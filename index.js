const express = require("express");
const bodyParser = require("body-parser");
const {Registration,LvlOneToNine,LvlTenScript}=require("./Scripts")
const {writeToContract,WriteToLevelContract}=require("./Writescipts")
const cors = require('cors');
const app = express();
const port = 3902;
const DBfunction=require('./Database')
DBfunction.connection()
app.use(cors());
app.use(bodyParser.json())
// Registration();
// LvlOneToNine();
// LvlTenScript()
// writeToContract()
WriteToLevelContract()

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});