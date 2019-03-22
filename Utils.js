var User = require('./user.js');
var ChinchiroDice = require('./chinchiro.js');


module.exports.getRandomInt = function(min, max) {       
    return Math.floor(Math.random() * max) + min;
}

module.exports.convertToUser = async function (data){
    return await new User(data.id, data.name, data.intelligence, data.luck, data.acting, data.chip);
}


module.exports.shuffle = function (a){
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

module.exports.toArray = function(text){
    return text.split(",");
}
