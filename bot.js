
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
    var isVoteGamble = 0;

    //var gamble =await ChinchiroDice.startChinchiro(user1Id, user2Id, isVoteGamble);
     //await ChinchiroDice.betChinchiro(20, user1Id, 3);
    // await ChinchiroDice.betChinchiro(20, user2Id, 5);
    //await ChinchiroDice.cheat(user1Id, 67);
    //await ChinchiroDice.cheat(user2Id, 67);
    //var dice = await ChinchiroDice.rollDice(user1Id, 67);
    //var dice = await ChinchiroDice.rollDice(user2Id, 67);
    //var test = await ChinchiroDice.checkIfCheatedAndDraw(user1Id, 22);
    //console.log(test);
    // var winner = await ChinchiroDice.getWinner(20, user1Id, user2Id);
    // if(winner==0){
    //     var dice = await ChinchiroDice.rollDice(user1Id, 20);
    //     var dice = await ChinchiroDice.rollDice(user2Id, 20);
    // }
    //await ChinchiroDice.finishChinchiro(20, winner);

    //var gamble = await ESP.startESP(user1Id, user2Id, isVoteGamble);
    //await ESP.setDealerCard(68);
    //await ESP.betChip(34, user1Id, 3);
    //await ESP.betChip(34, user2Id, 5);
    //await ESP.betChip(34, user1Id, 2);
    //await ESP.cheat(68, user1Id);
    //await ESP.cheat(68, user2Id);
    //var card =  await ESP.card(68, user1Id);
    //console.log(card);
    //var card2 =  await ESP.card(68, user2Id);
    //console.log(card2);
    //await ESP.submitUserCard(68, user1Id, "A,B,C,D,E");
    //await ESP.submitUserCard(68, user2Id, "E,D,C,B,A");
    //var winner = await ESP.getWinner(68, user1Id, user2Id);
    // if(winner == 0) console.log("다시");
    //var dealerCard = await ESP.dealerCard(34); 
    //console.log(dealerCard);
    //await ESP.finishESP(34, user1Id);

    //var gamble = await MinusOne.startMinusOne(user1Id, user2Id, isVoteGamble); 
    //await MinusOne.cheat(69, user1Id);
    //await MinusOne.cheat(69, user2Id);
    //await MinusOne.betChip(27, user1Id, 3);
    //await MinusOne.betChip(27, user2Id, 5);
    //var cards = await MinusOne.cards(69, user1Id, user2Id);
    //console.log(cards);
    //var left = await MinusOne.submit(42, user1Id, cards.user1.item2);
    //console.log(left);
    //await MinusOne.submit(69, user1Id, "바위");
    //await MinusOne.submit(69, user2Id, "바위");
    //var winner = await MinusOne.getWinner(69, user1Id, user2Id);
    //console.log(winner);
    //if(winner ==0) 다시 진행
    //await MinusOne.finishMinusOne(27, user1Id);

}


