const { ethers } = require("ethers");
const { registrationContract, registrationContractAbi,UserContract,UserContractAbi,Level10Contract,Level10ContractAbi } = require("./exports");
const { RegistrationData,LevelsOneToNine,LevelsTen } = require("./Database");
const provider = new ethers.JsonRpcProvider("https://rpc.soniclabs.com");
const contract = new ethers.Contract(
  registrationContract,
  registrationContractAbi,
  provider
);
const oneToNine = new ethers.Contract(
  UserContract,
  UserContractAbi,
  provider
);
const TenLevel = new ethers.Contract(
  Level10Contract,
  Level10ContractAbi,
  provider
);

async function Registration() {
  try {
    console.log("registration function is working");
    const userData = await contract.lastUserId();
    console.log("data from last user id is", Number(userData));
    for (let i = 1; i <= Number(userData); i++) {
      const userAddress = await contract.countIdToAddress(i);
      const userData = await contract.users(userAddress);
      const userUpline = await contract.userUpline(userAddress);
      // const userid = await contract.countIdToAddress(userAddress);

      const downLinersCount = await contract.directDownlinesCount(userAddress);
      let downLiners = [];
      for (let i = 0; i < Number(downLinersCount); i++) {
        const downLinersAddress = await contract.directDownlines(
          userAddress,
          i
        );
        downLiners.push(downLinersAddress);
      }
      const userDocument = {
        userAddress: userAddress,
        name: userData[0],
        uplineId: userData[1],
        userId: userData[2],
        imgURL: userData[3],
        joiningDate: Number(userData[4]),
        countId: Number(userData[5]),
        uplineCountID: Number(userData[6]),
        uplineAddress: userUpline,
        directDownlines: downLiners,
      };
      await RegistrationData.create(userDocument);

      console.log("docs = ", userDocument);
    }
  } catch (error) {
    console.log("error whil getting data from blockchain", error);
  }
}
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
async function LvlOneToNine(){
  try {
    
    
    const cursor = RegistrationData.find({}, { userAddress: 1, _id: 0 }).cursor(); // Fetch only `userAddress`
    for await (let doc of cursor) {
      console.log("User Address:", doc.userAddress);
      const userData = await oneToNine.users(doc.userAddress);
      const virtuallUpline = await oneToNine.virtualUplineOf(doc.userAddress);
      const virtuallIds = await oneToNine.virtualIds(doc.userAddress);
      const isactive = await oneToNine.isActive(doc.userAddress);
      const stories = await oneToNine.getStories(doc.userAddress);
      const VirtualDirect = await oneToNine.totalVirtualDirect(doc.userAddress);

      console.log("user data = ",stories);
      let virtualDirectsArr = [];

      for(let i=0;i<Number(VirtualDirect);i++){
        const data = await oneToNine.virtualDirectsOf(doc.userAddress,i);
        console.log(i,"------",data);
        virtualDirectsArr.push(data);

      }
      const lvlEntry = new LevelsOneToNine({
        userAddress: doc.userAddress,
        team_Id: Number(userData[1]),
        totalIncome: String(userData[2]),
        totalVirtualIncome: String(userData[3]),
        transactionCount: Number(userData[4]),
        totalDirect: Number(userData[5]),
        lastUpdate: Number(userData[6]), 
        currentUserLevel: Number(userData[7]),
        firstActivationDate: Number(userData[8]),
        virtualUpline: virtuallUpline,
        virtualDirects: virtualDirectsArr,
        virtualId: Number(virtuallIds),
        isActive: isactive,
        history: stories
    });
    await lvlEntry.save();
    console.log("Data saved for user:",lvlEntry);

  }
    // for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    //   console.log("User Address:", doc.userAddress);
    //   // You can process each address here (e.g., send transactions, fetch blockchain data, etc.)
    // }
  } catch (error) {
  console.log("error while getting lvl 1 to 9 data ",error);
  
  }
}
async function LvlTenScript(){
  try {
    
    
    const cursor = RegistrationData.find({}, { userAddress: 1, _id: 0 }).cursor(); // Fetch only `userAddress`
    for await (let doc of cursor) {
      console.log("User Address:", doc.userAddress);
      const userData = await TenLevel.users(doc.userAddress);
      const virtuallUpline = await TenLevel.virtualUplineOf(doc.userAddress);
      const virtuallIds = await TenLevel.virtualIds(doc.userAddress);
      const isactive = await TenLevel.isActive(doc.userAddress);
      const stories = await TenLevel.getStories(doc.userAddress);
      const VirtualDirect = await TenLevel.totalVirtualDirect(doc.userAddress);

      console.log("user data = ",stories);
      let virtualDirectsArr = [];

      for(let i=0;i<Number(VirtualDirect);i++){
        const data = await TenLevel.virtualDirectsOf(doc.userAddress,i);
        console.log(i,"------",data);
        virtualDirectsArr.push(data);

      }
      const lvlEntry = new LevelsTen({
        userAddress: doc.userAddress,
        team_Id: Number(userData[1]),
        totalIncome: String(userData[2]),
        totalVirtualIncome: String(userData[3]),
        transactionCount: Number(userData[4]),
        totalDirect: Number(userData[5]),
        lastUpdate: Number(userData[6]), 
        currentUserLevel: Number(userData[7]),
        firstActivationDate: Number(userData[8]),
        virtualUpline: virtuallUpline,
        virtualDirects: virtualDirectsArr,
        virtualId: Number(virtuallIds),
        isActive: isactive,
        history: stories
    });
    await lvlEntry.save();
    console.log("Data saved for user:",lvlEntry);
  }
    // for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    //   console.log("User Address:", doc.userAddress);
    //   // You can process each address here (e.g., send transactions, fetch blockchain data, etc.)
    // }
  } catch (error) {
  console.log("error while getting lvl 1 to 9 data ",error);
  
  }
}
module.exports = { Registration,LvlOneToNine,LvlTenScript };
