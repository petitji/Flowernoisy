
const Enum = require('./Enum.js');
const ServerAPI = require('./serverApi.js');
var ChinchiroDice = require('./chinchiro.js');
var User = require('./user.js');

//모든 boolean 값들은 1을 true로 합니다.
//is 등으로 시작하는 변수들

//아래 함수의 주석을 풀고 테스트하셔요~!

//ServerAPI.createGamble(Enum.GambleKind.Chinchiro, "developer", "tester", 1);
//ServerAPI.updateGamble(11, Enum.GambleKind.Chinchiro, "developer");
//ServerAPI.updateChip("developer", "tester", 2);
//ServerAPI.createGambleLog(11, Enum.GambleKind.Chinchiro, "developer", Enum.ChinchiroActivity.DiceRoll, "6,6,6");
//ServerAPI.getUser("developer");
//ServerAPI.updateCheatCount("developer", 11);


main();

async function main(){
    var user1Id = "developer";
    var user2Id = "tester";
    var isVoteGamble = 1;

    await StartChinchiro(user1Id, user2Id, isVoteGamble);
    //속임수를 쓸 경우
    if(true){

    }
}

// async function playChinchiro(user1Id, user2Id){
    
//     //속임수를 쓰는 경우
//     var user1Dice = await ChinchiroDice.getCheatDice(user1Id);
//     //속임수를 안 쓰는 경우
//     var user2Dice = await ChinchiroDice.getDice(user2Id);

//     var winner = "";
//     if(user1Dice.rank() > user2Dice.rank()){
//         winner = user1Id;
//     }

 
// }

// async function StartChinchiro(user1Id, user2Id, isVoteGamble){
//     ServerAPI.createGamble(Enum.GambleKind.Chinchiro, user1Id, user2Id, isVoteGamble);

// }
// async function playChinchiroCheat(userId, gambleId){
//     ServerAPI.updateCheatCount(userId, gambleId);
// }


 

//var user2 = new User("tester", "테스터", 25, 25, 25, 25);