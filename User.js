
var ServerAPI = require('./serverApi.js');

function getRandomInt(min, max) {       
    return Math.floor(Math.random() * max) + min;
}
var errHandler = function(err) {
    console.log(err);
}

class User{
    constructor (id, name, intelligence, luck, acting, chip){
        this.id = id;
        this.name = name;
        this.intelligence = intelligence;
        this.luck = luck;
        this.acting = acting;
        this.chip = chip;
    }

    async calculateLucky(){
        var randomNumber = getRandomInt(1,7);
        var test = (this.luck/50) * (this.intelligence/100) * (1/randomNumber) * 100;
        console.log(test);
        return (this.luck/50) * (this.intelligence/100) * (1/randomNumber) * 100;
    }

    getUserId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getIntellgence(){
        return this.intelligence;
    }

    getLuck(){
        return this.luck;
    }

    getActing(){
        return this.luck;
    }

    getChip(){
        return this;chip;
    }

    

    async calculateCheat(){
        var randomNumber = getRandomInt(1,7);
        return (this.acting/50) * (this.intelligence/100) * (1/randomNumber) * 100;
    }

    
}


module.exports = User;

