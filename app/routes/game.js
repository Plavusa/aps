import express from 'express';
import Games from '../Redis/Games';

var router = express.Router();

router.post('/createGame', (req, res, next) => {
    let creator = req.user.username;
    let rules = req.body.rules;

    Games.storeGame(creator, rules)
        .then(() => res.status(200).json({success: true}))
        .catch((reason) => res.status(200).json({success: false, reason: reason}));


});

module.exports = router;