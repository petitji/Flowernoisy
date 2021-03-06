var Utils = require('./Utils.js');

class User{
    constructor (id, name, intelligence, luck, acting, chip){
        this.id = id;
        this.name = name;
        this.intelligence = intelligence;
        this.luck = luck;
        this.acting = acting;
        this.chip = chip;
    }

    async calculateCheat(){
        var randomNumber = Utils.getRandomInt(1,2);
        let test = (this.acting/50) * (this.intelligence/100) * (1/randomNumber) * 200;
        // console.log(test);
        return test;
    }
    
    async calculateLucky(){
        var randomNumber = Utils.getRandomInt(1,3);
        let test= (this.luck/50) * (this.intelligence/100) * (1/randomNumber) * 200;
        // console.log(test);
        return test;
    }
}


module.exports = User;

module.exports.convertToUser = async function (data){
    return await new User(data.id, data.name, data.intelligence, data.luck, data.acting, data.chip);
}