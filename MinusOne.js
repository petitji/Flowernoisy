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

function createSameCardSet(){
    var cardSet = createCardSet();
    return new MinusOne(cardSet, cardSet);
}

function CheatCards(){
    var cardsArray = new Array();
    cardsArray.push(new MinusOne(new CardSet(Enum.MinusOneCard.Rock, Enum.MinusOneCard.Rock), new CardSet(Enum.MinusOneCard.Scissor, Enum.MinusOneCard.Scissor)));
    cardsArray.push(new MinusOne(new CardSet(Enum.MinusOneCard.Scissor, Enum.MinusOneCard.Scissor), new CardSet(Enum.MinusOneCard.Paper, Enum.MinusOneCard.Paper)));
    cardsArray.push(new MinusOne(new CardSet(Enum.MinusOneCard.Paper, Enum.MinusOneCard.Paper), new CardSet(Enum.MinusOneCard.Rock, Enum.MinusOneCard.Rock)))
    var randomNum = Utils.getRandomInt(0, 2);
    return cardsArray[randomNum];
}

function LuckyUser1Cards(){
    var cardsArray = new Array();
    cardsArray.push(new MinusOne(createCardSet(), new CardSet(Enum.MinusOneCard.Scissor, Enum.MinusOneCard.Scissor)));
    cardsArray.push(new MinusOne(createCardSet(), new CardSet(Enum.MinusOneCard.Paper, Enum.MinusOneCard.Paper)));
    cardsArray.push(new MinusOne(createCardSet(), new CardSet(Enum.MinusOneCard.Rock, Enum.MinusOneCard.Rock)))
    var randomNum = Utils.getRandomInt(0, 2);
    return cardsArray[randomNum];
}

function LuckyUser2Cards(){
    var cardsArray = new Array();
    cardsArray.push(new MinusOne(new CardSet(Enum.MinusOneCard.Scissor, Enum.MinusOneCard.Scissor), createCardSet()));
    cardsArray.push(new MinusOne(new CardSet(Enum.MinusOneCard.Paper, Enum.MinusOneCard.Paper), createCardSet()));
    cardsArray.push(new MinusOne(new CardSet(Enum.MinusOneCard.Rock, Enum.MinusOneCard.Rock), createCardSet()))
    var randomNum = Utils.getRandomInt(0, 2);
    return cardsArray[randomNum];
}

async function checkIfCheated(userId, gambleId){
    let isCheatSuccessful = await ServerAPI.getGambleLog(gambleId, Enum.GambleKind.MinusOne, userId, Enum.MinusOneActivity.Cheat);
    return isCheatSuccessful == 1;
}

async function isCheatSuccessful(userId, gambleId){
    let serverUser1=  await ServerAPI.getUser(userId);
    var user =  await User.convertToUser(serverUser1);
    var userCheat = await user.calculateCheat();

    let luckNow = Utils.getRandomInt(1,100);
    console.log(userId + "의 현재운/속임수확률 : " + luckNow  + "/" + userCheat);
    
    if(luckNow < userCheat){
        console.log(userId + "은 속임수에 성공했다!");
        await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.MinusOne, userId, Enum.MinusOneActivity.Cheat, 1);
        return;
    }
    
    console.log(userId + "은 속임수에 실패했다.");
    await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.MinusOne, userId, Enum.MinusOneActivity.Cheat, 0);
    return;
}

async function getCards(user1Id, user2Id){
    let serverUser1=  await ServerAPI.getUser(user1Id);
    var user1 =  await User.convertToUser(serverUser1);
    var user1Luck = await user1.calculateLucky();

    let luckNow1 = Utils.getRandomInt(1,100);
    console.log(user1Id+ "의 현재운/운좋을 확률 : " + luckNow1  + "/" + user1Luck);

    let serverUser2 = await ServerAPI.getUser(user2Id);
    var user2 =  await User.convertToUser(serverUser2);
    var user2Luck = await user2.calculateLucky();

    let luckNow2 = Utils.getRandomInt(1,100);
    console.log(user2Id+ "의 현재운/운좋을 확률 : " + luckNow2  + "/" + user2Luck);
    
    //둘다 운이 좋을 경우
    if(luckNow1 < user1Luck && luckNow2 < user2Luck){
        console.log(user1Id + "은 운이 좋았다!");
        console.log(user2Id + "은 운이 좋았다!");
        return createSameCardSet();
    //한명만 운이 좋을 경우
    }else if(luckNow1 < user1Luck){
        console.log(user1Id + "은 운이 좋았다!");
        return LuckyUser1Cards();
    }else if(luckNow2 < user2Luck){
        console.log(user2Id + "은 운이 좋았다!");
        return LuckyUser2Cards();
    }else{
        console.log(user1Id + "은 운이 좋지 않았다.");
        console.log(user2Id + "은 운이 좋지 않았다.");
        return createMinusOneSet();
    }
}

async function getPastCard(gambleId, userId){
    let cards = await ServerAPI.getGambleLog(gambleId, Enum.GambleKind.MinusOne, userId, Enum.MinusOneActivity.GivePlayerCard);
    return Utils.toArray(cards.toString());
}

function removeCard(pastCards, card){
    var index = pastCards.findIndex(x => x.trim() == card);
    pastCards.splice(index, 1);
    return pastCards.toString();
}

async function getLeftCard(gambleId, userId){
    let leftCard = await ServerAPI.getGambleLog(gambleId, Enum.GambleKind.MinusOne, userId, Enum.MinusOneActivity.SetPlayerCard);
    return leftCard.toString().trim();
}

module.exports.startMinusOne = async function (user1Id, user2Id, isVoteGamble){
    return await ServerAPI.createGamble(Enum.GambleKind.MinusOne, user1Id, user2Id, isVoteGamble);
}

module.exports.betChip = async function(gambleId, userId, chipCount){
    return await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.MinusOne, userId, Enum.MinusOneActivity.BetChip, chipCount);
}   

module.exports.cheat = async function(gambleId, userId){
    var statusCode = await ServerAPI.updateCheatCount(userId, gambleId);
    if(statusCode != 204){
        console.log("속임수 횟수가 없다.");
        return;
    }
    return await isCheatSuccessful(userId, gambleId);
}

module.exports.cards = async function(gambleId, user1, user2){
    var isUser1Cheated  = await checkIfCheated(user1, gambleId);
    var isUser2Cheated  = await checkIfCheated(user2, gambleId);

    //둘 다 속임수를 쓴 경우
    if(isUser1Cheated && isUser2Cheated){
        var cards = createSameCardSet();
        await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.MinusOne, user1, Enum.MinusOneActivity.GivePlayerCard, cards.user1.toString());
        await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.MinusOne, user2, Enum.MinusOneActivity.GivePlayerCard, cards.user2.toString());
        return cards;
    }
    //속임수가 있으면 속임수를 리턴
    else if(isUser1Cheated){
        var cards = CheatCards();
        await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.MinusOne, user1, Enum.MinusOneActivity.GivePlayerCard, cards.user1.toString());
        await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.MinusOne, user2, Enum.MinusOneActivity.GivePlayerCard, cards.user2.toString());
        return cards;
    }else if(isUser2Cheated){
        var cards = CheatCards();
        await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.MinusOne, user1, Enum.MinusOneActivity.GivePlayerCard, cards.user2.toString());
        await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.MinusOne, user2, Enum.MinusOneActivity.GivePlayerCard, cards.user1.toString());
        return cards;
    }else{
        var cards = await getCards(user1, user2);
        await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.MinusOne, user1, Enum.MinusOneActivity.GivePlayerCard, cards.user1.toString());
        await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.MinusOne, user2, Enum.MinusOneActivity.GivePlayerCard, cards.user2.toString());
        return cards;
    }
}

module.exports.submit = async function (gambleId, userId, card){
    var pastCard = await getPastCard(gambleId, userId);
    
    if(!pastCard.find(element => element.trim() == card)){
        console.log("현재 가지고 있는 카드와 맞지 않습니다.");
        return false;
    };

    var leftCard = removeCard(pastCard, card);
    await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.MinusOne, userId, Enum.MinusOneActivity.SetPlayerCard, leftCard);
    return leftCard;
}

module.exports.getWinner = async function (gambleId, user1, user2){
    var user1Card = await getLeftCard(gambleId, user1);
    var user2Card = await getLeftCard(gambleId, user2);

    if(user1Card.win(user2Card)){
        return user1;
    }else if(user2Card.win(user1Card)){
        return user2;
    }else{
        return 0;
    }
}

module.exports.finishMinusOne = async function (gambleId, winnerId){
    await ServerAPI.updateGamble(gambleId, Enum.GambleKind.MinusOne, winnerId);
}

String.prototype.win = function win(user2Card) {
    if((this == "보" && user2Card == "바위") || this == "가위" && user2Card == "보" || this == "바위" && user2Card == "가위"){
        return true;
    }
    if((this == "보" && user2Card == "보") || this == "가위" && user2Card == "가위" || this == "바위" && user2Card == "바위"){
        return 0;
    }
    if((this == "보" && user2Card == "가위") || this == "가위" && user2Card == "바위" || this == "바위" && user2Card == "보"){
        return false;
    }
    return false;
};