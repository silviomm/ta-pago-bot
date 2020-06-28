const schedule = require('node-schedule');
const rule = process.env.SCHEDULER || '*/25 * * * *';
const https = require('https');
const url = 'https://bot-call-scheduler.herokuapp.com/';

module.exports = { 
    schedule: () => {
        console.log(`job: ${url} \nscheduled for: ${rule}`)
        schedule.scheduleJob(rule, function(){
            https.get(url, (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    console.log(data);
                });
            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
        });
    }
}