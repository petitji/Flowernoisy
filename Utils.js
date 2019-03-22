
module.exports.getRandomInt = function(min, max) {       
    return Math.floor(Math.random() * max) + min;
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
