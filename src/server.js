const bot = require('./bot');
const express = require('express');

app = express();

const PORT = 3000;
app.listen(PORT, (e) => {
    if (!e){
        console.log("Server is linstening on port " + PORT);
    }else{
        console.log("ERROR: " + e);
    }
});

app.get('/api/v1/alert', bot.apiEvent);

bot.runbot();
