
var ServerAPI = require('./serverApi.js');
var Utils = require('./Utils.js');
const Enum = require('./Enum.js');

const cardArray = new Array("A", "B", "C", "D", "E");

function rank(card1, card2){
    var matchCount = 0;
    for(var index=0; index<5; index++){
        if(card1[index] == card2[index])
            matchCount++;
    }
    
    return matchCount;
}

async function getPastCard(gambleId, userId){
    var card = await ServerAPI.GetGambleLog(gambleId, Enum.GambleKind.ESP, userId);
    return Utils.ToArray(card);
}

module.exports.startESP = async function (user1Id, user2Id, isVoteGamble){
    await ServerAPI.createGamble(Enum.GambleKind.ESP, user1Id, user2Id, isVoteGamble);
}

module.exports.setDealerCard = async function(gambleId){
    var dealerCard = Utils.shuffle(cardArray);
    await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.ESP, "0", Enum.ESPActivity.DealerCardSet, dealerCard.toString());
}

module.exports.betChip = async function(gambleId, userId, chipCount){
    await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.ESP, userId, Enum.ESPActivity.BetChip, chipCount);
}   

module.exports.submitUserCard = async function(gambleId, userId, userCard){
    await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.ESP, userId, Enum.ESPActivity.PlayerCardSet, userCard);
}

module.exports.cheat = async function(gambleId, userId){
    var dealerCard = await getPastCard(gambleId, "0");
    await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.ESP, userId, Enum.ESPActivity.Cheat, "");
    return dealerCard;
}

module.exports.getWinner = async function(gambleId, user1, user2){
    var dealerCard = await getPastCard(gambleId, "0");
    var card1 = await getPastCard(gambleId, user1);
    var card2 = await getPastCard(gambleId, user2);

    var card1Rank = rank(dealerCard, card1);
    var card2Rank = rank(dealerCard, card2);

    if(card1Rank > card2Rank){
        return user1;
    }else if(card2Rank > card1Rank){
        return user2;
    }else{
        return "0";
    }
}

module.exports.finishESP = async function (gambleId, winnerId){
    await ServerAPI.updateGamble(gambleId, Enum.GambleKind.ESP, winnerId);
}

