
var User = require('./user.js');

function getRandomInt(min, max) {       
    return Math.floor(Math.random() * max) + min;
}

async function convertToUser(data){
    return await new User(data.id, data.name, data.intelligence, data.luck, data.acting, data.chip);
}

class ChinchiroDice{
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
        if(this.equals(new ChinchiroDice(1,1,1))){
            return 6;
        }
        //아라시
        else if(this.equals(new ChinchiroDice(2,2,2)) || this.equals(new ChinchiroDice(3,3,3)) ||
        this.equals(new ChinchiroDice(4,4,4)) || this.equals(new ChinchiroDice(5,5,5)) || this.equals(new ChinchiroDice(6,6,6))){
            return 5;
        }
        //시고로
        else if(this.equals(new ChinchiroDice(4,5,6))){
            return 4;
        }
        //히후미
        else if(this.equals(new ChinchiroDice(1,2,3))){
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

module.exports = ChinchiroDice;


module.exports.LuckyDices = [
    new ChinchiroDice(4,5,6),
    new ChinchiroDice(1,1,1),
    new ChinchiroDice(2,2,2),
    new ChinchiroDice(3,3,3),
    new ChinchiroDice(4,4,4),
    new ChinchiroDice(5,5,5),
    new ChinchiroDice(6,6,6),
];

module.exports.NormalDice = function() {
    return new ChinchiroDice(getRandomInt(1,6), getRandomInt(1,6), getRandomInt(1,6));
}

module.exports.LuckyDice = function (){
    return this.LuckyDices[getRandomInt(0, 6)];
}

module.exports.CheatDice = function (){
    return new ChinchiroDice(1,1,1);
}

module.exports.getCheatDice = async function (userId){
    let serverUser1=  await ServerAPI.getUser(userId);
    var user =  await convertToUser(serverUser1);
    var userCheat = await user.calculateCheat();

    let luckNow = getRandomInt(1,100);
    
    if(userCheat < luckNow){
        return ChinchiroDice.LuckyDice();
    }
    
    return ChinchiroDice.NormalDice();
}
   
module.exports.getDice = async function (userId){
    let serverUser1=  await ServerAPI.getUser(userId);
    var user =  await convertToUser(serverUser1);
    var userLuck = await user.calculateLucky();

    let luckNow = getRandomInt(1,100);
    
    if(userLuck < luckNow){
        return ChinchiroDice.LuckyDice();
    }
    
    return ChinchiroDice.NormalDice();
}


