
var ChinchiroDice = require('./chinchiro.js');
var ESP = require('./ESP.js');
var MinusOne = require('./MinusOne.js');

var ServerApi = require('./serverApi.js');

//모든 boolean 값들은 1을 true로 합니다.
//is 등으로 시작하는 변수들

//아래 함수의 주석을 풀고 테스트하셔요~!

chinchiroMain();

async function chinchiroMain(){
    var user1Id = "developer";
    var user2Id = "tester";
    var isVoteGamble = 1;

    //var gamble =await ChinchiroDice.startChinchiro(user1Id, user2Id, isVoteGamble);
    //await ChinchiroDice.betChinchiro(26, user1Id, 3);
    //await ChinchiroDice.betChinchiro(26, user2Id, 5);
    //await ChinchiroDice.cheat(user1Id, 26);
    //await ChinchiroDice.cheat(user2Id, 26);
    //var dice = await ChinchiroDice.rollDice(user1Id, 26);
    //var dice = await ChinchiroDice.rollDice(user2Id, 26);
    //var winner = await ChinchiroDice.getWinner(26, user1Id, user2Id);
    //if(winner==0) 다시 진행
    //await ChinchiroDice.finishChinchiro(26, "developer");

    //var gamble = await ESP.startESP(user1Id, user2Id, isVoteGamble);
    //await ESP.setDealerCard(25);
    //await ESP.betChip(25, user1Id, 3);
    //await ESP.betChip(25, user2Id, 5);
    //var dealerCard = await ESP.cheat(25, user1Id);
    //var luckyCard =  await ESP.card(25, user1Id);
    //await ESP.submitUserCard(25, user1Id, "B,A,C,D,E");
    //await ESP.submitUserCard(25, user2Id, "C,B,A,E,D");
    //var winner = await ESP.getWinner(25, user1Id, user2Id);
    //if(winner == 0) 다시 진행
    //await ESP.finishESP(25, user1Id);

    //var gamble = await MinusOne.startMinusOne(user1Id, user2Id, isVoteGamble); 
    //var cheatCards = await MinusOne.cheat(23, user1Id, user2Id);
    //var user1Card = await MinusOne.giveCard(19, cheatCards, user1Id, 0);
    // var user2Card = await MinusOne.giveCard(19, cheatCards, user2Id, 1);
    
    //둘다 운이 좋았을 경우?
    //  var cards = await MinusOne.card(19, user1Id);
    //  console.log(cards);
    //  var user1Card = await MinusOne.giveCard(cards, user1Id, 0);
    //  var user2Card = await MinusOne.giveCard(cards, user2Id, 1);

    // await MinusOne.submitUserCard(gambleId, user1Id, card);
    // await MinusOne.submitUserCard(gambleId, user2Id, card);

    // var winner = await ESP.getWinner(20, user1Id, user2Id);
    // await ESP.finishESP(20, user1Id);

}


