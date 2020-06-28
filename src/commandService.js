const Util = require('./util');
const utils = new Util();
const contestantDb = require("./db/contestant");
const contestant = require('./db/contestant');

module.exports = {

    photoMsg: async (msg, contestants) => {
        if (msg.photo !== undefined && msg.photo?.length > 0 && utils.isTaPagoValidMsg(msg.caption)) {
                
            let query = contestantDb.find({
                username: msg.from.username,
                groupId: msg.chat.id
            });
            let result = await query.exec();
            let contestant;
            if(result.length === 0) {
                result = await contestantDb.create({
                    weeklyCount: 0,
                    totalCount: 0,
                    username: msg.from.username,
                    groupId: msg.chat.id
                });
                if(result.length === 0) throw new Exception('could not create contestant');
                contestant = result;
            }
            else {
                contestant = result[0];
            }

            contestant.startWeek = utils.getStartWeek();
            contestant.endWeek = utils.getEndWeek();
            contestant.totalCount++;
            contestant.weeklyCount = utils.weeklyCountCheck(contestant);

            query = contestantDb.findByIdAndUpdate(contestant._id, contestant);
            result = await query.exec();
    
            console.log('oie')

            return `BIRL! Boa @${msg.from.username} ${utils.decode_utf8(utils.muscle)}`;
        }
    },

    allTimeStandings: async (msg, contestants) => {
        let query = contestantDb.find({
            groupId: msg.chat.id
        });
        let result = await query.exec();
        
        if(result.length === 0) {
            return `Só tem peidão aqui... ${utils.decode_utf8(utils.poop)}`;
        }

        result.sort((c1, c2) => {
            if (c1.totalCount < c2.totalCount) {
                return 1;
            }
            if (c1.totalCount > c2.totalCount) {
                return -1;
            }
            return 0;
        });

        var resp = ``;
        result.forEach(c => {
            resp += `${utils.muscleCount(c.totalCount)} - @${c.username}\n`;
        });

        return resp;
    },

    weekStandings: async (msg, contestants) => {
        let query = contestantDb.find({
            groupId: msg.chat.id
        });
        let result = await query.exec();
        
        if(result.length === 0) {
            return `Só tem peidão aqui... ${utils.decode_utf8(utils.poop)}`;
        }

        result.sort((c1, c2) => {
            if (c1.weeklyCount < c2.weeklyCount) {
                return 1;
            }
            if (c1.weeklyCount > c2.weeklyCount) {
                return -1;
            }
            return 0;
        });

        var resp = ``;
        result.forEach(c => {
            resp += `${utils.muscleCount(c.weeklyCount)} - @${c.username}\n`;
        });

        return resp;
    }
}

