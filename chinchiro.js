

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

function getRandomInt(min, max) {       
    // Create byte array and fill with 1 random number
    var byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);

    var range = max - min + 1;
    var max_range = 256;
    if (byteArray[0] >= Math.floor(max_range / range) * range)
        return getRandomInt(min, max);
    return min + (byteArray[0] % range);
}

var LuckyDices = [
    new Dice(4,5,6),
    new Dice(1,1,1),
    new Dice(2,2,2),
    new Dice(3,3,3),
    new Dice(4,4,4),
    new Dice(5,5,5),
    new Dice(6,6,6),
];

function getNormalDice(){
    return new Dice(getRandomInt(1,6), getRandomInt(1,6), getRandomInt(1,6));
}

function getLuckyDice(){
    return LuckyDices[getRandomInt(1,7)];
}

function getCheatDice(){
    return new Dice(1,1,1);
}

