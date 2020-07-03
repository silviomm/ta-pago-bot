var TelegramBot = require('node-telegram-bot-api');

var token = process.env.TA_PAGO_TOKEN;
var bot = new TelegramBot(token, {
    polling: true
});

var commandService = require('./src/commandService');
const Util = require('./src/util');
const utils = new Util();

bot.onText(/\/week_standings/, async (msg) => {
    var resp = await commandService.weekStandings(msg);
    utils.response(bot, msg.chat.id, resp);
});

bot.onText(/\/all_time_standings/, async (msg) => {
    var resp = await commandService.allTimeStandings(msg);
    utils.response(bot, msg.chat.id, resp);
});

bot.on('message', async (msg) => { 
   var resp = await commandService.photoMsg(msg);
   utils.response(bot, msg.chat.id, resp); 
});

const server = require('./src/server');
server.init();

// const scheduler = require('./src/scheduler-call');
// scheduler.schedule();

const mongo = require('./src/db/mongo');
