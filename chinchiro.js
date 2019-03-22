
var ServerAPI = require('./serverApi.js');
var Utils = require('./Utils.js');
const Enum = require('./Enum.js');

class Dice{
    constructor (item1, item2, item3){
        this.item1 = item1;
        this.item2 = item2;
        this.item3 = item3;
    }

    equals(dice){
        return ((this.item1 == dice.item1) && (this.item2 == dice.item2) && (this.item3 == dice.item3)) ||
        ((this.item1 == dice.item1) && (this.item2 == dice.item3) && (this.item3 == dice.item2)) ||
        ((this.item1 == dice.item2) && (this.item2 == dice.item1) && (this.item3 == dice.item3)) ||
        ((this.item1 == dice.item2) && (this.item2 == dice.item3) && (this.item3 == dice.item1)) ||
        ((this.item1 == dice.item3) && (this.item2 == dice.item1) && (this.item3 == dice.item2)) ||
        ((this.item1 == dice.item3) && (this.item2 == dice.item2) && (this.item3 == dice.item1));
    }

    rank (){
        //핀조로
        if(this.equals(new Dice(1,1,1))){
            return 6;
        }
        //아라시
        else if(this.equals(new Dice(2,2,2)) || this.equals(new Dice(3,3,3)) ||
        this.equals(new Dice(4,4,4)) || this.equals(new Dice(5,5,5)) || this.equals(new Dice(6,6,6))){
            return 5;
        }
        //시고로
        else if(this.equals(new Dice(4,5,6))){
            return 4;
        }
        //히후미
        else if(this.equals(new Dice(1,2,3))){
            return 0;
        }
        //눈있음
        else if( (this.item1 == this.item2 && this.item2 != this.item3) || (this.item2 == this.item3 && this.item3 != this.item1) ||
        (this.item1 == this.item3 && this.item != this.item2)){
            return 2;
        }
        //눈없음
        else{
            return 1;
        }
    }
}

module.exports = Dice;


LuckyDices = [
    new Dice(4,5,6),
    new Dice(1,1,1),
    new Dice(2,2,2),
    new Dice(3,3,3),
    new Dice(4,4,4),
    new Dice(5,5,5),
    new Dice(6,6,6),
];

function NormalDice() {
    return new Dice(Utils.getRandomInt(1,6), Utils.getRandomInt(1,6), Utils.getRandomInt(1,6));
}

function LuckyDice(){
    return this.LuckyDices[Utils.getRandomInt(0, 6)];
}

function CheatDice(){
    return new Dice(1,1,1);
}

async function getCheatDice(userId){
    let serverUser1=  await ServerAPI.getUser(userId);
    var user =  await Utils.convertToUser(serverUser1);
    var userCheat = await user.calculateCheat();

    let luckNow = Utils.getRandomInt(1,100);
    console.log(userId + "의 현재운/속임수확률 : " + luckNow  + "/" + userCheat);
    
    if(luckNow < userCheat){
        console.log(userId + "은 속임수에 성공했다!");
        return CheatDice();
    }
    
    console.log(userId + "은 속임수에 실패했다.");
    return NormalDice();
}
   
async function getRandomDice(userId){
    let serverUser1=  await ServerAPI.getUser(userId);
    var user =  await Utils.convertToUser(serverUser1);
    var userLuck = await user.calculateLucky();

    let luckNow = Utils.getRandomInt(1,100);
    console.log(userId+ "의 현재운/운좋을 확률 : " + luckNow  + "/" + userLuck);
    
    if(luckNow < userLuck){
        console.log(userId + "은 운이 좋았다!");
        return LuckyDice();
    }
    
    console.log(userId + "은 운이 좋지 않았다.");
    return NormalDice();
}

async function convertToChinchiro (data){
    var parsed = JSON.parse(data);
    return new Dice(parsed.item1, parsed.item2, parsed.item3);
}

   
async function getPastDice (gambleId, userId){
    let dice = await ServerAPI.getGambleLog(gambleId, Enum.GambleKind.Chinchiro, userId, Enum.ChinchiroActivity.DiceRoll);
    return await convertToChinchiro(dice);
}

module.exports.startChinchiro = async function (user1Id, user2Id, isVoteGamble){
    return await ServerAPI.createGamble(Enum.GambleKind.Chinchiro, user1Id, user2Id, isVoteGamble);
}

module.exports.betChinchiro = async function (gambleId, userId, chipCount){
    await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.Chinchiro, userId, Enum.ChinchiroActivity.BetChip, chipCount);
}

module.exports.doCheatDiceChinchiro = async function(userId, gambleId){
    var statusCode = await ServerAPI.updateCheatCount(userId, gambleId);
    if(statusCode != 204){
        return;
    }
    var dice = await getCheatDice(userId);
    await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.Chinchiro, userId, Enum.ChinchiroActivity.Cheat, JSON.stringify(dice));
}

module.exports.doDiceChinchiro = async function (userId, gambleId){
    var dice = await getRandomDice(userId);
    await ServerAPI.createGambleLog(gambleId, Enum.GambleKind.Chinchiro, userId, Enum.ChinchiroActivity.DiceRoll, JSON.stringify(dice));
}

module.exports.getWinner = async function (gambleId, user1, user2){
    var dice1 = await getPastDice(gambleId, user1);
    var dice2 = await getPastDice(gambleId, user2);
    
    if(dice1.rank() > dice2.rank()){
        return user1;
    }else if(dice1.rank() < dice2.rank()){
        return user2;
    }else{
        return 0;
    }
}

module.exports.finishChinchiro = async function (gambleId, winnerId){
    await ServerAPI.updateGamble(gambleId, Enum.GambleKind.Chinchiro, winnerId);
}