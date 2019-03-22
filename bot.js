
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

    //await ChinchiroDice.startChinchiro(user1Id, user2Id, isVoteGamble);
    //await ChinchiroDice.betChinchiro(16, user1Id, 3);
    //await ChinchiroDice.betChinchiro(16, user2Id, 5);
    //await ChinchiroDice.doCheatDiceChinchiro(user1Id, 16);
    //await ChinchiroDice.doDiceChinchiro(user2Id, 16);
    // var winner = await ChinchiroDice.getWinner(16, user1Id, user2Id);
    //await ChinchiroDice.finishChinchiro(16, user1Id);

    //await ESP.startESP(user1Id, user2Id, isVoteGamble);
    //await ESP.setDealerCard(17);
    //await ESP.betChip(17, user1Id, 3);
    //await ESP.betChip(17, user2Id, 5);
    //await ESP.cheat(17, user1Id);
    //await ESP.submitUserCard(17, user1Id, "A,B,C,D,E");
    //await ESP.submitUserCard(17, user2Id, "C,B,A,E,D");
    //var winner = await ESP.getWinner(16, user1Id, user2Id);
    //await ESP.finishESP(gambleId, winner);

    //await MinusOne.startMinusOne(user1Id, user2Id, isVoteGamble); 19
    
}


