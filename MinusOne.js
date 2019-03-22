var ServerAPI = require('./serverApi.js');
var Utils = require('./Utils.js');
const Enum = require('./Enum.js');


module.exports.startMinusOne = async function (user1Id, user2Id, isVoteGamble){
    await ServerAPI.createGamble(Enum.GambleKind.MinusOne, user1Id, user2Id, isVoteGamble);
}

module.exports.betChip = async function(gambleId, userId, chipCount){
    await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.MinusOne, userId, Enum.ESPActivity.BetChip, chipCount);
}   

module.exports.finishMinusOne = async function (gambleId, winnerId){
    await ServerAPI.updateGamble(gambleId, Enum.GambleKind.MinusOne, winnerId);
}

