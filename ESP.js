
var ServerAPI = require('./serverApi.js');
var Utils = require('./Utils.js');
const Enum = require('./Enum.js');
var User = require('./User.js');

const cardArray = new Array("A", "B", "C", "D", "E");
const digitArray = new Array(0, 1, 2, 3, 4);

function rank(card1, card2){
    var matchCount = 0;
    for(var index=0; index<5; index++){
        if(card1[index] == card2[index])
            matchCount++;
    }
    
    return matchCount;
}

async function getPastCard(gambleId, userId){
    var card = await ServerAPI.getGambleLog(gambleId, Enum.GambleKind.ESP, userId, Enum.ESPActivity.SubmitPlayerCard);
    return Utils.toArray(card);
}

async function getDealerPastCard(gambleId, userId){
    var card = await ServerAPI.getGambleLog(gambleId, Enum.GambleKind.ESP, "dealer", Enum.ESPActivity.DealerCardSet);
    return Utils.toArray(card);
}

function partDealerDice(dealerCard){
    let random = digitArray.sort(() => .5 - Math.random()).slice(0,3);
    let randomNumber1 = random[0];
    let randomNumber2 = random[1];
    let randomNumber3 = random[2];

    const newArray = [...dealerCard];
    newArray[randomNumber1] = "*";
    newArray[randomNumber2] = "*";
    newArray[randomNumber3] = "*";

    return newArray.toString();
}

async function getCheatCard(gambleId, userId){
    let serverUser1=  await ServerAPI.getUser(userId);
    var user =  await User.convertToUser(serverUser1);
    var userCheat = await user.calculateCheat();

    let luckNow = Utils.getRandomInt(1,100);
    console.log(userId+ "의 현재운/속임수성공 확률 : " + luckNow  + "/" + userCheat);
    
    if(luckNow < userCheat){
        console.log(userId + "은 속임수에 성공했다!");
        
        var dealerCard = await getDealerPastCard(gambleId, "0");
        await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.ESP, userId, Enum.ESPActivity.Cheat, 1);
        await ServerAPI.createGambleLog(gambleId, Enum.GambleKind,ESP, userId, Enum.ESPActivity.ShowHint, dealerCard.toString());
        return dealerCard.toString();
    }
    
    console.log(userId + "은 속임수에 실패했다.");
    await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.ESP, userId, Enum.ESPActivity.Cheat, 0);
    return "";
}

async function getLuckyCard(gambleId, userId){
    let serverUser1=  await ServerAPI.getUser(userId);
    var user =  await User.convertToUser(serverUser1);
    var userLuck = await user.calculateLucky();

    let luckNow = Utils.getRandomInt(1,100);
    console.log(userId+ "의 현재운/운좋을 확률 : " + luckNow  + "/" + userLuck);
    
    if(luckNow < userLuck){
        console.log(userId + "은 운이 좋았다!");
        var dealerCard = await getDealerPastCard(gambleId, "0");
        var hint = partDealerDice(dealerCard);
        await ServerAPI.createGambleLog(gambleId, Enum.GambleKind,ESP, userId, Enum.ESPActivity.ShowHint, hint);
        return hint;
    }
    
    console.log(userId + "은 운이 좋지 않았다.");
    return "";
}

module.exports.startESP = async function (user1Id, user2Id, isVoteGamble){
    return await ServerAPI.createGamble(Enum.GambleKind.ESP, user1Id, user2Id, isVoteGamble);
}

module.exports.setDealerCard = async function(gambleId){
    var dealerCard = Utils.shuffle(cardArray);
    await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.ESP, "dealer", Enum.ESPActivity.DealerCardSet, dealerCard.toString());
}

module.exports.betChip = async function(gambleId, userId, chipCount){
    await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.ESP, userId, Enum.ESPActivity.BetChip, chipCount);
}   

module.exports.submitUserCard = async function(gambleId, userId, userCard){
    await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.ESP, userId, Enum.ESPActivity.SubmitPlayerCard, userCard);
}

module.exports.cheat = async function(gambleId, userId){
    var statusCode = await ServerAPI.updateCheatCount(userId, gambleId);
    if(statusCode != 204){
        return;
    }

    var cheatCard = await getCheatCard(gambleId, userId);
    return cheatCard;
}

module.exports.card = async function(gambleId, userId){
    var card = await getLuckyCard(gambleId, userId);
    return card;
}

module.exports.getWinner = async function(gambleId, user1, user2){
    var dealerCard = await getDealerPastCard(gambleId, "0");
    var card1 = await getPastCard(gambleId, user1);
    var card2 = await getPastCard(gambleId, user2);

    var card1Rank = rank(dealerCard, card1);
    var card2Rank = rank(dealerCard, card2);

    if(card1Rank > card2Rank){
        console.log(user1 + "이 승리했다.");
        return user1;
    }else if(card2Rank > card1Rank){
        console.log(user2 + "이 승리했다.");
        return user2;
    }else{
        console.log("비겼다.");
        return "0";
    }
}

module.exports.finishESP = async function (gambleId, winnerId){
    await ServerAPI.updateGamble(gambleId, Enum.GambleKind.ESP, winnerId);
}

