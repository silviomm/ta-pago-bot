const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var url = process.env.MONGODB_URI || "mongodb://localhost:27017/tapago";
var dbConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // user: 'root',
    // pass: 'root'
}

mongoose.connect(url, dbConfig).then(() => {
    console.log('Connected to tapago db!');
}).catch(err => {
    console.log('error connecting to the database');
    process.exit();
});