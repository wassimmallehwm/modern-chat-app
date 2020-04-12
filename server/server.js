const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');

const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const userRoutes = require('./routes/user');
const app = express();


mongoose.connect('mongodb://localhost/chat',
                {useNewUrlParser : true,
                useCreateIndex: true,
            useUnifiedTopology: true}).then(() => {
    console.log('Connected to DB'); 
}).catch(err => {
   console.error('Failed '+ err); 
});

// app.get('/', (req, res) => {
//     res.sendfile(__dirname + "/public/index.html");
// })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use('/img', express.static(path.join(__dirname + '/img')));




app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 
    'GET, POST, PATCH, DELETE, OPTIONS, PUT');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(helmet());
app.use(compression());

app.use('/api/user', userRoutes);


const expressServer = app.listen(3000);
const io = socketio(expressServer);
console.log('listening on port 3000');


module.exports = {
    io
}

require('./sockets');
//require('./express');
