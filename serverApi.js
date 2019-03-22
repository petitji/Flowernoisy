const request = require('request');
const Enum = require('./Enum.js');
const User = require('./user.js');

//갬블을 생성합니다. 
//gambleKind - 갬블의 종류
//user1 - 갬블 하는 유저1
//user2 - 갬블 하는 유저2
//isVoteGamble - 백화요란전 여부 1:yes 0:no
module.exports.createGamble = function(gambleKind, user1, user2, isVoteGamble){
    return new Promise(function(resolve, reject){
    request.post({
        url:     'http://flowernoisy.dothome.co.kr/GambleApi/gamble',
        form:    { "kind": gambleKind, "user1":user1, "user2":user2, "isVoteGamble":isVoteGamble }
        }, function(error, response, body){
            if (error) throw new reject(error);
    
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
                resolve(JSON.parse(body));
                return;
            }
    
            //그 외 이상한 애들
            console.log(body);
        });
    });
};

//갬블 종료시 업데이트 합니다.
//id - 종료하고자 하는 갬블의 ID
//kind - 종료하고자 하는 갬블의 종류
//winner - 승리한 유저의 ID
module.exports.updateGamble = function(_id, _kind, _winner){
    var options = { method: 'PUT',
        url: 'http://flowernoisy.dothome.co.kr/GambleApi/gamble',
        headers: 
        {
            'Content-Type': 'application/x-www-form-urlencoded' },
        form: 
        {   winner: _winner,
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
};

// 유저의 칩교환 시 칩 개수 업데이트
//from - 칩을 주는 유저ID
//to - 칩을 받는 유저ID
//chipCount - 교환하는 칩의 개수
module.exports.updateChip = function(_from, _to, _chipCount){
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
};

//갬블 로그를 입력합니다.
//gambleId - 로그를 넣고자 하는 갬블의 Id
//kind - 로그 넣는 갬블의 종류
//user - 갬블 행위를 한 유저Id
//activityKind - 갬블 행위 종류
//value - 행위의 값 (친치로:주사위, ESP게임:카드 등)
module.exports.createGambleLog = function(gambleId, kind, user, activityKind, value){
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
};

//유저의 정보를 가져옵니다
//userId - 가지고 오고자 하는 유저의 ID
module.exports.getUser = async function(userId){
    return new Promise(function(resolve, reject){
        request('http://flowernoisy.dothome.co.kr/UserApi/user?userId=' + userId, function(error, response, body) {  
            if(error) return reject(error);
            try{
                resolve(JSON.parse(body));
            }catch(e){
            }
        });
    });
}

//속임수 성공시 멤버의 속임수 사용횟수를 줄이며 갬블에서 속임수 성공했다는 로그를 남깁니다.
//userId - 속임수 성공한 멤버 Id
//gambleId - 속임수 성공한 갬블의 Id
module.exports.updateCheatCount = function(_userId, _gambleId){
    var options = { method: 'PUT',
        url: 'http://flowernoisy.dothome.co.kr/UserApi/user',
        headers: 
        {
            'Content-Type': 'application/x-www-form-urlencoded' },
        form: 
        {   userId: _userId,
            gambleId: _gambleId
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

module.exports.getGambleLog = async function(gambleId, gambleKind, userId, activityKind){
    return new Promise(function(resolve, reject){
        request('http://flowernoisy.dothome.co.kr/GambleApi/gambleLog?gambleId=' + gambleId + '&gambleKind=' + gambleKind + '&userId=' + userId + "&activityKind=" + activityKind,
        function(error, response, body) {  
            if(error) return reject(error);
            try{
                resolve(JSON.parse(body));
            }catch(e){
            }
        });
    });
}