const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
const router = require('./routes/todo.router');

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('server/public'));

// ROUTES
app.use('/tasks', router);
app.use('/', router);


// LISTENING
app.listen(PORT, () => {
    console.log('listening on port: ', PORT);
});
