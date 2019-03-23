var ServerAPI = require('./serverApi.js');
var Utils = require('./Utils.js');
const Enum = require('./Enum.js');
var User = require('./User.js');

const RSP = [{"Rock": "바위"}, {"Scissor":"가위"}, {"Paper":"보"}];

function MinusOne(user1Card, user2Card){
    this.user1 = user1Card;
    this.user2 = user2Card;
}

class CardSet{
    constructor(item1, item2){
        this.item1 = item1;
        this.item2 = item2;
    }

    toString() {
        return this.item1 + ", " + this.item2;
    }
}

function createCardSet(){
    return new CardSet(getRandomRSP(), getRandomRSP());
}

function getRandomRSP(){
    return Object.values(RSP[Utils.getRandomInt(0, 3)]).toString();
}

function createMinusOneSet(){
    return new MinusOne(createCardSet(), createCardSet());
}

function CheatCards(){
    var cardsArray = new Array();
    cardsArray.push(new MinusOne(new CardSet(Enum.MinusOneCard.Rock, Enum.MinusOneCard.Rock), new CardSet(Enum.MinusOneCard.Scissor, Enum.MinusOneCard.Scissor)));
    cardsArray.push(new MinusOne(new CardSet(Enum.MinusOneCard.Scissor, Enum.MinusOneCard.Scissor), new CardSet(Enum.MinusOneCard.Paper, Enum.MinusOneCard.Paper)));
    cardsArray.push(new MinusOne(new CardSet(Enum.MinusOneCard.Paper, Enum.MinusOneCard.Paper), new CardSet(Enum.MinusOneCard.Rock, Enum.MinusOneCard.Rock)))
    var randomNum = Utils.getRandomInt(0, 2);
    return cardsArray[randomNum];
}

function LuckCards(){
    var cardsArray = new Array();
    cardsArray.push(new MinusOne(createCardSet(), new CardSet(Enum.MinusOneCard.Scissor, Enum.MinusOneCard.Scissor)));
    cardsArray.push(new MinusOne(createCardSet(), new CardSet(Enum.MinusOneCard.Paper, Enum.MinusOneCard.Paper)));
    cardsArray.push(new MinusOne(createCardSet(), new CardSet(Enum.MinusOneCard.Rock, Enum.MinusOneCard.Rock)))
    var randomNum = Utils.getRandomInt(0, 2);
    return cardsArray[randomNum];
}

async function getCheatCard(gambleId, userId){ 
    let serverUser1=  await ServerAPI.getUser(userId);
    var user =  await User.convertToUser(serverUser1);
    var userCheat = await user.calculateCheat();

    let luckNow = Utils.getRandomInt(1,100);
    console.log(userId+ "의 현재운/속임수성공 확률 : " + luckNow  + "/" + userCheat);
    
    if(luckNow < userCheat){
        console.log(userId + "은 속임수에 성공했다!");
        
        var cards = CheatCards();
        await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.MinusOne, userId, Enum.MinusOneActivity.Cheat, "");
        return cards;
    }
    
    console.log(userId + "은 속임수에 실패했다.");
    return createMinusOneSet();
}

async function getCard(gambleId, userId){
    let serverUser1=  await ServerAPI.getUser(userId);
    var user =  await User.convertToUser(serverUser1);
    var userLuck = await user.calculateLucky();

    let luckNow = Utils.getRandomInt(1,100);
    console.log(userId+ "의 현재운/운좋을 확률 : " + luckNow  + "/" + userLuck);
    
    if(luckNow < userLuck){
        console.log(userId + "은 운이 좋았다!");
        return LuckCards();
    }
    
    console.log(userId + "은 운이 좋지 않았다.");
    return createMinusOneSet();
}

module.exports.startMinusOne = async function (user1Id, user2Id, isVoteGamble){
    await ServerAPI.createGamble(Enum.GambleKind.MinusOne, user1Id, user2Id, isVoteGamble);
}

module.exports.betChip = async function(gambleId, userId, chipCount){
    await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.MinusOne, userId, Enum.ESPActivity.BetChip, chipCount);
}   

module.exports.cheat = async function (gambleId, userId){
    return await getCheatCard(gambleId, userId);
}

module.exports.cards = async function(gambleId, userId){
    return await getCard(gambleId, userId);
}

//속임수일 때 index 가 0이면 이기는 카드 , 1이 지는 카드
module.exports.giveCard = async function(gambleId, cards, userId, index){
    var cards = index > 0 ? cards.user2 : cards.user1;
    await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.MinusOne, userId, Enum.MinusOneActivity.GivePlayerCard, JSON.stringify(cards));
    return cards.toString();
}

module.exports.finishMinusOne = async function (gambleId, winnerId){
    await ServerAPI.updateGamble(gambleId, Enum.GambleKind.MinusOne, winnerId);
}
