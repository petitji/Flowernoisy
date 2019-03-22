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
        var randomNumber = Utils.getRandomInt(1,7);
        return (this.acting/50) * (this.intelligence/100) * (1/randomNumber) * 100;
    }
    
    async calculateLucky(){
        var randomNumber = Utils.getRandomInt(1,7);
        return (this.luck/50) * (this.intelligence/100) * (1/randomNumber) * 100;
    }
}


module.exports = User;

module.exports.convertToUser = async function (data){
    return await new User(data.id, data.name, data.intelligence, data.luck, data.acting, data.chip);
}