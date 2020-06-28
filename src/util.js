class Utils {

    constructor() {
        this.muscle = '\xF0\x9F\x92\xAA';
        this.poop = '\xF0\x9F\x92\xA9';
    }

    decode_utf8(s) {
        return decodeURIComponent(escape(s));
    }

    response(bot, chatId, resp) {
        if(resp !== '' && resp !== null && resp !== undefined)
            bot.sendMessage(chatId, resp);
    }

    getStartWeek() {
        var today = new Date();
        var diff = today.getDate() - today.getDay();
        today.setDate(diff);
        today.setHours(0, 0, 1);
        return new Date(today.setDate(diff));
    }
    
    getEndWeek() {
        var today = new Date();
        var diff = (6 - today.getDay()%6)
        return new Date(today.getFullYear(), today.getMonth(), today.getDate() + diff);
    }
    
    weeklyCountCheck(contestant) {
        var today = new Date();
        if(today >= contestant.startWeek && today <= contestant.endWeek) {
            return contestant.weeklyCount + 1;
        }
        else {
            return 1;
        }
    }

    muscleCount(n) {
        var resp = '';
        
        for(var i=0; i < n; i++) {
            resp += `${this.decode_utf8(this.muscle)}`;
        }
        if(resp === '') {
            resp = `${this.decode_utf8(this.poop)}`;
        }
        return resp;
    }

    isTaPagoValidMsg(text) {
        if(text === undefined || text === '' || text === null) {
            return false;
        }
    
        var taPagoMsgs = ['tapago', 'Tapago', 'ta pago', 'Ta pago', 'tá pago', 'Tá pago'];
    
        for (let index = 0; index < taPagoMsgs.length; index++) {
            let t = taPagoMsgs[index];
            if(text.includes(t)) return true;        
        }

        return false;
    }
}

module.exports = Utils;