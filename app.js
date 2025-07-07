const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const bodyParser = require('body-parser');
const url = require('./components/url/routes.js');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(url);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'reva-fe/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname,  'reva-fe/build',  'index.html'));
    });
}

module.exports = app;
