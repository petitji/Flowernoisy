
const ServerAPI = require('./serverApi.js');
const Enum = require('./Enum.js');

//모든 boolean 값들은 1을 true로 합니다.
//is 등으로 시작하는 변수들

//아래 함수의 주석을 풀고 테스트하셔요~!

//ServerAPI.createGamble(Enum.GambleKind.Chinchiro, "developer", "tester", 1);
//ServerAPI.updateGamble(11, Enum.GambleKind.Chinchiro, "developer");
//ServerAPI.updateChip("developer", "tester", 2);
//ServerAPI.createGambleLog(11, Enum.GambleKind.Chinchiro, "developer", Enum.ChinchiroActivity.DiceRoll, "6,6,6");
//ServerAPI.getUser("developer");
//ServerAPI.updateCheatCount("developer", 11);