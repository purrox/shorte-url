const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const {singleton: controller} = require('./controller');

router.post('/shorten',
    [check('url')
        .isURL().withMessage('This is not a valid url.')
        .notEmpty().withMessage('The url field is required.')
    ],
    controller.createUrl);

router.get('/r/:hash', controller.redirectUrl);

router.get('/s/:hash', controller.findUrl);


module.exports = router;