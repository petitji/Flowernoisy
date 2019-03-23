
var ChinchiroDice = require('./chinchiro.js');
var ESP = require('./ESP.js');
var MinusOne = require('./MinusOne.js');

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
    //await MinusOne.cheat(27, user1Id);
    //await MinusOne.cheat(27, user2Id);
    //await MinusOne.betChip(27, user1Id, 3);
    //await MinusOne.betChip(27, user2Id, 5);
    //var cards = await MinusOne.cards(27, user1Id, user2Id);
    //console.log(cards.user1.toString())
    //console.log(cards.user2.toString());
    //await MinusOne.submit(27, user1Id, "보");
    //await MinusOne.submit(27, user2Id, "보");
    //var winner = await MinusOne.getWinner(27, user1Id, user2Id);
    //if(winner ==0) 다시 진행
    //await MinusOne.finishMinusOne(27, user1Id);

}


