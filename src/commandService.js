const Util = require('./util');
const utils = new Util();
const mongoose = require('mongoose')
const contestantT = require("./db/contestant");
// let contestantT = mongoose.model('Contestants', contestantSchema);

module.exports = {

    photoMsg: (msg, contestants) => {
        if (msg.photo !== undefined && msg.photo?.length > 0 && utils.isTaPagoValidMsg(msg.caption)) {
            let contestant = contestants.get(msg.from.id);
            
            if(contestant === undefined) {
                contestant = {
                    username: msg.from.username,
                    weeklyCount: 0,
                    totalCount: 0
                }
            }

            contestant.startWeek = utils.getStartWeek();
            contestant.endWeek = utils.getEndWeek();
            contestant.totalCount++;
            contestant.weeklyCount = utils.weeklyCountCheck(contestant);
    
            contestants.set(msg.from.id, contestant);
    
            return `BIRL! Boa @${msg.from.username} ${utils.decode_utf8(utils.muscle)}`;
        }
    },

    allTimeStandings: (contestants) => {

        contestantT.create({
            weeklyCount: 1,
            totalCount: 3,
            username: 'silviomm',
            startWeek: new Date(),
            endWeek: new Date()
        }, (err, con) => {
            if(err) console.log(err);
            else console.log(con);
        })

        if(contestants.size === 0) {
            return `Só tem peidão aqui... ${utils.decode_utf8(utils.poop)}`;
        }

        var arr = [];
        contestants.forEach(c => {
            arr.push(c);
        });
        arr.sort((c1, c2) => {
            if (c1.totalCount < c2.totalCount) {
                return 1;
            }
            if (c1.totalCount > c2.totalCount) {
                return -1;
            }
            return 0;
        });

        var resp = ``;
        arr.forEach(c => {
            resp += `${utils.muscleCount(c.totalCount)} - @${c.username}\n`;
        });

        return resp;
    },

    weekStandings: (msg, contestants) => {

        if(contestants.size === 0) {
            return `Só tem peidão aqui... ${utils.decode_utf8(utils.poop)}`;
        }

        var arr = [];
        contestants.forEach(c => {
            arr.push(c);
        });

        arr.sort((c1, c2) => {
            if (c1.weeklyCount < c2.weeklyCount) {
                return 1;
            }
            if (c1.weeklyCount > c2.weeklyCount) {
                return -1;
            }
            return 0;
        });

        var resp = ``;
        arr.forEach(c => {
            resp += `${utils.muscleCount(c.weeklyCount)} - @${c.username}\n`;
        });

        return resp;
    }
}

