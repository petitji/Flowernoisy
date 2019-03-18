
const request = require('request');
const Enum = require('./Enum.js');

//모든 boolean 값들은 1을 true로 합니다.
//is 등으로 시작하는 변수들

//아래 함수의 주석을 풀고 테스트하셔요~!

//createGamble(Enum.GambleKind.Chinchiro, "developer", "tester", 1);
//updateGamble(10, Enum.GambleKind, 1, "developer");
//updateChip("developer", "tester", 2);
//createGambleLog(9, Enum.GambleKind, "developer", Enum.ChinchiroActivity.DiceRoll, "6,6,6");

function createGamble(gambleKind, user1, user2, isVoteGamble){
    request.post({
    url:     'http://flowernoisy.dothome.co.kr/GambleApi/gamble',
    form:    { "kind": gambleKind, "user1":user1, "user2":user2, "isVoteGamble":isVoteGamble }
    }, function(error, response, body){
        if (error) throw new Error(error);

        //Bad Request (유저가 없거나 적절하지 못한 값일 경우)
        if(response.statusCode == 400){
            const info = JSON.parse(body);
            console.log(info);
            return;
        }
        //심각한 일이 일어남;
        if(response.statusCode == 500){
            console.log(body);
            return;
        }
        //정상 201- created
        if(response.statusCode == 201){
            console.log(body);
            return;
        }

        //그 외 이상한 애들
        console.log(body);
    });
}

function updateGamble(_id, _kind, _isOn, _winner){
    var options = { method: 'PUT',
        url: 'http://flowernoisy.dothome.co.kr/GambleApi/gamble',
        headers: 
        {
            'Content-Type': 'application/x-www-form-urlencoded' },
        form: 
        { isOn: _isOn,
            winner: _winner,
            kind: _kind,
            id: _id,
             } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        //Bad Request (유저가 없거나 적절하지 못한 값일 경우)
        if(response.statusCode == 400){
            const info = JSON.parse(body);
            console.log(info);
            return;
        }
        //심각한 일이 일어남;
        if(response.statusCode == 500){
            console.log(body);
            return;
        }
        //정상 204 - no content
        if(response.statusCode == 204){
            console.log(body);
            return;
        }

        //그 외 이상한 애들
        console.log(body);
    });
}

function updateChip(_from, _to, _chipCount){
    var options = { method: 'PUT',
        url: 'http://flowernoisy.dothome.co.kr/ChipApi/chip',
        headers: 
        {
            'Content-Type': 'application/x-www-form-urlencoded' },
        form: 
        {   from: _from,
            to: _to,
            chipCount: _chipCount
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        //Bad Request (유저가 없거나 적절하지 못한 값일 경우)
        if(response.statusCode == 400){
            const info = JSON.parse(body);
            console.log(info);
            return;
        }
        //심각한 일이 일어남;
        if(response.statusCode == 500){
            console.log(body);
            return;
        }
        //정상 204 - no content
        if(response.statusCode == 204){
            console.log(body);
            return;
        }

        //그 외 이상한 애들
        console.log(body);
    });
}

function createGambleLog(gambleId, kind, user, activityKind, value){
    request.post({
    url:     'http://flowernoisy.dothome.co.kr/GambleApi/gambleLog',
    form:    { "gambleId" : gambleId, "kind": kind, "user":user, "activityKind":activityKind, "value":value }
    }, function(error, response, body){
        if (error) throw new Error(error);

        //Bad Request (유저가 없거나 적절하지 못한 값일 경우)
        if(response.statusCode == 400){
            const info = JSON.parse(body);
            console.log(info);
            return;
        }
        //심각한 일이 일어남;
        if(response.statusCode == 500){
            console.log(body);
            return;
        }
        //정상 201- created
        if(response.statusCode == 201){
            console.log(body);
            return;
        }

        //그 외 이상한 애들
        console.log(body);
    });
}